import prisma from "@/server/lib/prisma";
import { parseTestSettings } from "@/server/lib/parseTestSettings";
import { publishRoomEvent, publishStudentRoomEvent } from "@/server/lib/sse-hub";
import { liveStreamRoomId, liveStudentParticipantId, parseStudentIdFromParticipantIdentity } from "@/server/lib/stream";
import { fail, ok } from "@/server/lib/response";
import type { ProctorAction, ViolationFlag } from "@/server/types/violation";
import { MAX_VIOLATION_FLAGS } from "@/server/types/violation";
import type { SessionUser } from "./checkAccount";
import { getProctorMonitorContext } from "./streamService";

function parseViolationFlags(raw: unknown): ViolationFlag[] {
  if (!Array.isArray(raw)) return [];
  return raw as ViolationFlag[];
}

export async function validateLiveAttemptAccess({
  testSlug,
  attemptId,
  participantId,
}: {
  testSlug: string;
  attemptId: string;
  participantId: string;
}) {
  const studentId = parseStudentIdFromParticipantIdentity(participantId);
  if (!studentId || !attemptId || !testSlug) return null;

  const attempt = await prisma.liveTestAttempt.findFirst({
    where: {
      id: attemptId,
      submittedAt: null,
      studentId,
      test: { slug: testSlug, visibility: true },
    },
    select: {
      id: true,
      studentId: true,
      examStartedAt: true,
      timePenaltySeconds: true,
      proctorDeductions: true,
      endedByProctor: true,
      endReason: true,
      test: {
        select: { id: true, duration: true, slug: true },
      },
      student: {
        select: { firstName: true, lastName: true, email: true },
      },
    },
  });

  if (!attempt) return null;

  return {
    attemptId: attempt.id,
    roomId: liveStreamRoomId(attempt.test.id),
    participantId: liveStudentParticipantId(attempt.studentId),
    studentName:
      [attempt.student.firstName, attempt.student.lastName].filter(Boolean).join(" ") ||
      attempt.student.email,
    durationMinutes: attempt.test.duration ?? 0,
    examStartedAt: attempt.examStartedAt,
    timePenaltySeconds: attempt.timePenaltySeconds,
    proctorDeductions: attempt.proctorDeductions,
    endedByProctor: attempt.endedByProctor,
    endReason: attempt.endReason,
  };
}

export function computeSecondsRemaining({
  durationMinutes,
  examStartedAt,
  timePenaltySeconds,
}: {
  durationMinutes: number;
  examStartedAt: Date | null;
  timePenaltySeconds: number;
}) {
  // Untimed tests: keep a large remaining value so clients do not auto-submit.
  if (!durationMinutes || durationMinutes <= 0) {
    return Number.MAX_SAFE_INTEGER;
  }

  if (!examStartedAt) {
    return durationMinutes * 60;
  }

  const totalSeconds = durationMinutes * 60;
  const elapsed = Math.floor((Date.now() - examStartedAt.getTime()) / 1000);
  return Math.max(0, totalSeconds - elapsed - timePenaltySeconds);
}

export async function startExamAttempt(attemptId: string, testSlug: string) {
  const attempt = await prisma.liveTestAttempt.findFirst({
    where: {
      id: attemptId,
      submittedAt: null,
      test: { slug: testSlug, visibility: true },
    },
    select: {
      id: true,
      examStartedAt: true,
      timePenaltySeconds: true,
      proctorDeductions: true,
      endedByProctor: true,
      endReason: true,
      violationFlags: true,
      test: { select: { duration: true, allowRetake: true } },
    },
  });

  if (!attempt) {
    return fail(404, "Attempt not found.");
  }

  let examStartedAt = attempt.examStartedAt;
  if (!examStartedAt) {
    examStartedAt = new Date();
    await prisma.liveTestAttempt.update({
      where: { id: attemptId },
      data: { examStartedAt },
    });
  }

  const durationMinutes = attempt.test.duration ?? 0;
  const secondsRemaining = computeSecondsRemaining({
    durationMinutes,
    examStartedAt,
    timePenaltySeconds: attempt.timePenaltySeconds,
  });

  return ok("Exam started.", {
    examStartedAt: examStartedAt.toISOString(),
    durationMinutes,
    timePenaltySeconds: attempt.timePenaltySeconds,
    proctorDeductions: attempt.proctorDeductions,
    endedByProctor: attempt.endedByProctor,
    endReason: attempt.endReason,
    violationFlags: parseViolationFlags(attempt.violationFlags),
    allowRetake: attempt.test.allowRetake,
    secondsRemaining,
  });
}

function parseAnswers(raw: string): Record<string, string | number | null> {
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null
      ? (parsed as Record<string, string | number | null>)
      : {};
  } catch {
    return {};
  }
}

function parseFlagged(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export async function saveExamProgress({
  attemptId,
  testSlug,
  answers,
  flagged,
  currentIndex,
}: {
  attemptId: string;
  testSlug: string;
  answers: Record<string, string | number | null>;
  flagged: string[];
  currentIndex: number;
}) {
  const attempt = await prisma.liveTestAttempt.findFirst({
    where: {
      id: attemptId,
      submittedAt: null,
      test: { slug: testSlug, visibility: true },
    },
    select: { id: true },
  });

  if (!attempt) {
    return fail(404, "Attempt not found.");
  }

  await prisma.liveTestAttempt.update({
    where: { id: attemptId },
    data: {
      answers: JSON.stringify(answers),
      flagged: JSON.stringify(flagged),
      examCurrentIndex: Math.max(0, currentIndex),
    },
  });

  return ok("Progress saved.", null);
}

export async function getExamAttemptState(attemptId: string, testSlug: string) {
  const attempt = await prisma.liveTestAttempt.findFirst({
    where: {
      id: attemptId,
      submittedAt: null,
      test: { slug: testSlug, visibility: true },
    },
    select: {
      examStartedAt: true,
      timePenaltySeconds: true,
      proctorDeductions: true,
      endedByProctor: true,
      endReason: true,
      examCurrentIndex: true,
      answers: true,
      flagged: true,
      violationFlags: true,
      submittedAt: true,
      test: { select: { duration: true, allowRetake: true, showResults: true } },
    },
  });

  if (!attempt) {
    const submitted = await prisma.liveTestAttempt.findFirst({
      where: {
        id: attemptId,
        submittedAt: { not: null },
        test: { slug: testSlug },
      },
      select: {
        submittedAt: true,
        test: { select: { allowRetake: true, showResults: true } },
      },
    });

    if (submitted) {
      return fail(403, "This attempt has already been submitted.", {
        alreadySubmitted: true,
        allowRetake: submitted.test.allowRetake,
        showResults: submitted.test.showResults,
        submittedAt: submitted.submittedAt?.toISOString() ?? null,
      });
    }

    return fail(404, "Attempt not found.");
  }

  const durationMinutes = attempt.test.duration ?? 0;
  const secondsRemaining = computeSecondsRemaining({
    durationMinutes,
    examStartedAt: attempt.examStartedAt,
    timePenaltySeconds: attempt.timePenaltySeconds,
  });

  return ok("Exam state loaded.", {
    examStartedAt: attempt.examStartedAt?.toISOString() ?? null,
    durationMinutes,
    timePenaltySeconds: attempt.timePenaltySeconds,
    proctorDeductions: attempt.proctorDeductions,
    endedByProctor: attempt.endedByProctor,
    endReason: attempt.endReason,
    secondsRemaining,
    currentIndex: attempt.examCurrentIndex,
    answers: parseAnswers(attempt.answers),
    flagged: parseFlagged(attempt.flagged),
    violationFlags: parseViolationFlags(attempt.violationFlags),
    allowRetake: attempt.test.allowRetake,
    showResults: attempt.test.showResults,
    alreadySubmitted: false,
  });
}

export async function reportViolation({
  testSlug,
  attemptId,
  participantId,
  flag,
}: {
  testSlug: string;
  attemptId: string;
  participantId: string;
  flag: ViolationFlag;
}) {
  const access = await validateLiveAttemptAccess({ testSlug, attemptId, participantId });
  if (!access) {
    return fail(403, "Not allowed.");
  }

  const attempt = await prisma.liveTestAttempt.findUnique({
    where: { id: attemptId },
    select: {
      violationFlags: true,
      endedByProctor: true,
      endReason: true,
      test: {
        select: {
          settings: true,
          allowRetake: true,
          showResults: true,
          duration: true,
        },
      },
    },
  });

  if (!attempt) {
    return fail(404, "Attempt not found.");
  }

  const settings = parseTestSettings(attempt.test.settings, {
    allowRetake: attempt.test.allowRetake,
    showResults: attempt.test.showResults,
    duration: attempt.test.duration,
  });

  // Ignore tab-switch reports when tracking is disabled for this test.
  if (flag.type === "TAB_SWITCH" && !settings.security.enableTabSwitching) {
    return ok("Tab switching is not tracked for this test.", {
      flagId: flag.id,
      violationFlags: parseViolationFlags(attempt.violationFlags),
      endedByLimit: false,
    });
  }

  const existing = parseViolationFlags(attempt.violationFlags);
  const updated = [...existing, flag].slice(-MAX_VIOLATION_FLAGS);

  const tabSwitchCount = updated.filter((entry) => entry.type === "TAB_SWITCH").length;
  const exceededTabLimit =
    flag.type === "TAB_SWITCH" &&
    settings.security.enableTabSwitching &&
    settings.security.tabSwitchLimit >= 0 &&
    tabSwitchCount > settings.security.tabSwitchLimit;

  const updateData: {
    violationFlags: ViolationFlag[];
    endedByProctor?: boolean;
    endReason?: string;
  } = {
    violationFlags: updated,
  };

  if (exceededTabLimit && !attempt.endedByProctor) {
    updateData.endedByProctor = true;
    updateData.endReason = `Tab switch limit exceeded (${settings.security.tabSwitchLimit}).`;
  }

  await prisma.liveTestAttempt.update({
    where: { id: attemptId },
    data: updateData,
  });

  await publishRoomEvent(access.roomId, {
    type: "violation",
    participantId,
    studentName: access.studentName,
    flag,
    timestamp: flag.timestamp,
  });

  if (exceededTabLimit) {
    const endAction = {
      type: "END_SESSION" as const,
      reason: updateData.endReason ?? "Tab switch limit exceeded.",
      timestamp: Date.now(),
    };

    await publishStudentRoomEvent(access.roomId, {
      type: "proctor_action",
      participantId,
      action: endAction,
      timestamp: endAction.timestamp,
    });
  }

  return ok("Violation recorded.", {
    flagId: flag.id,
    violationFlags: updated,
    endedByLimit: exceededTabLimit,
    endReason: updateData.endReason ?? attempt.endReason,
  });
}

export async function applyProctorAction({
  testSlug,
  participantId,
  action,
  user,
  flagId,
}: {
  testSlug: string;
  participantId: string;
  action?: ProctorAction;
  user: SessionUser;
  flagId?: string;
}) {
  const context = await getProctorMonitorContext(testSlug, user);
  if (!context) {
    return fail(403, "Not allowed.");
  }

  const studentId = parseStudentIdFromParticipantIdentity(participantId);
  if (!studentId) {
    return fail(400, "Invalid participant.");
  }

  const attempt = await prisma.liveTestAttempt.findFirst({
    where: {
      testId: context.test.id,
      studentId,
      submittedAt: null,
    },
    orderBy: { startedAt: "desc" },
    select: {
      id: true,
      violationFlags: true,
      proctorDeductions: true,
      timePenaltySeconds: true,
      endedByProctor: true,
    },
  });

  if (!attempt) {
    return fail(404, "Active attempt not found.");
  }

  const updateData: {
    proctorDeductions?: number;
    timePenaltySeconds?: number;
    endedByProctor?: boolean;
    endReason?: string;
    violationFlags?: ViolationFlag[];
  } = {};

  if (action) {
    if (action.type === "DEDUCT_MARKS" && action.value) {
      updateData.proctorDeductions = attempt.proctorDeductions + action.value;
    }

    if (action.type === "REDUCE_TIME" && action.value) {
      updateData.timePenaltySeconds = attempt.timePenaltySeconds + action.value;
    }

    if (action.type === "END_SESSION") {
      updateData.endedByProctor = true;
      updateData.endReason = action.reason;
    }
  }

  const flags = parseViolationFlags(attempt.violationFlags);
  if (flagId) {
    updateData.violationFlags = flags.map((f) =>
      f.id === flagId ? { ...f, acknowledged: true, ...(action ? { action } : {}) } : f
    );
  } else if (flags.length > 0) {
    const lastUnacked = [...flags].reverse().find((f) => !f.acknowledged);
    if (lastUnacked) {
      updateData.violationFlags = flags.map((f) =>
        f.id === lastUnacked.id ? { ...f, acknowledged: true, ...(action ? { action } : {}) } : f
      );
    }
  }

  // Persist penalties / acknowledgements on the attempt before streaming to the student.
  await prisma.liveTestAttempt.update({
    where: { id: attempt.id },
    data: updateData,
  });

  const roomId = context.roomId;
  const state = await getExamAttemptState(attempt.id, testSlug);

  if (action) {
    const delivered = await publishStudentRoomEvent(roomId, {
      type: "proctor_action",
      participantId,
      action,
      timestamp: action.timestamp,
    });

    if (action.type !== "WARN") {
      await publishRoomEvent(roomId, {
        type: "proctor_action_applied",
        participantId,
        studentName: await (async () => {
          const student = await prisma.student.findUnique({
            where: { id: studentId },
            select: { firstName: true, lastName: true, email: true },
          });
          if (!student) return "Student";
          return (
            [student.firstName, student.lastName].filter(Boolean).join(" ") || student.email
          );
        })(),
        action,
        timestamp: action.timestamp,
      });
    }

    if (delivered === 0) {
      return fail(
        409,
        "Student is not connected. The action was saved but did not reach them.",
        state.metadata
      );
    }
  }

  return ok("Action applied.", state.metadata);
}

export async function getProctorViolationHistory(testSlug: string, user: SessionUser) {
  const context = await getProctorMonitorContext(testSlug, user);
  if (!context) {
    return fail(403, "Not allowed.", [] as Array<{
      participantId: string;
      studentName: string;
      violationFlags: ViolationFlag[];
    }>);
  }

  const attempts = await prisma.liveTestAttempt.findMany({
    where: {
      testId: context.test.id,
      submittedAt: null,
    },
    select: {
      studentId: true,
      violationFlags: true,
      student: {
        select: { firstName: true, lastName: true, email: true },
      },
    },
  });

  const history = attempts.map((attempt) => ({
    participantId: liveStudentParticipantId(attempt.studentId),
    studentName:
      [attempt.student.firstName, attempt.student.lastName].filter(Boolean).join(" ") ||
      attempt.student.email,
    violationFlags: parseViolationFlags(attempt.violationFlags),
  }));

  return ok("Violation history loaded.", history);
}
