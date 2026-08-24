import prisma from "@/server/lib/prisma";
import { mintLiveKitToken } from "@/server/lib/livekit-token";
import { parseTestSettings, settingsRequireLiveKit } from "@/server/lib/parseTestSettings";
import { fail, ok, type ActionResult } from "@/server/lib/response";
import {
  liveProctorParticipantId,
  liveStreamRoomId,
  liveStudentParticipantId,
} from "@/server/lib/stream";
import type { SessionUser } from "./checkAccount";

type StreamTokenPayload = {
  token: string;
  roomId: string;
  participantId: string;
  name: string;
};

export type LiveProctorFlagView = {
  id: string;
  studentId: string;
  participantIdentity: string;
  studentName: string;
  note: string | null;
  createdAt: string;
};

function studentDisplayName(student: {
  firstName: string | null;
  lastName: string | null;
  email?: string | null;
}) {
  return (
    [student.firstName, student.lastName].filter(Boolean).join(" ") || student.email || "Student"
  );
}

export async function createStudentStreamToken(
  testSlug: string,
  attemptId: string
): Promise<ActionResult<StreamTokenPayload | null>> {
  if (!testSlug || !attemptId) {
    return fail(400, "Missing test or attempt.");
  }

  const attempt = await prisma.liveTestAttempt.findFirst({
    where: {
      id: attemptId,
      submittedAt: null,
      test: {
        slug: testSlug,
        visibility: true,
      },
    },
    select: {
      studentId: true,
      student: {
        select: { firstName: true, lastName: true, email: true },
      },
      test: {
        select: {
          id: true,
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

  if (!settingsRequireLiveKit(settings)) {
    return fail(400, "This test does not require a live video or audio stream.");
  }

  const participantId = liveStudentParticipantId(attempt.studentId);
  const name = studentDisplayName(attempt.student);

  const tokenResult = await mintLiveKitToken({
    roomId: liveStreamRoomId(attempt.test.id),
    participantId,
    name,
    role: "student",
  });

  if (!tokenResult.ok) {
    return fail(500, tokenResult.message);
  }

  return ok("Token issued.", {
    token: tokenResult.token,
    roomId: tokenResult.roomId,
    participantId: tokenResult.participantId,
    name: tokenResult.name,
  });
}

export async function createProctorStreamToken(
  testSlug: string,
  user: SessionUser
): Promise<ActionResult<StreamTokenPayload | null>> {
  const test = await prisma.test.findUnique({
    where: { slug: testSlug },
    select: {
      id: true,
      visibility: true,
      createdById: true,
      settings: true,
      allowRetake: true,
      showResults: true,
      duration: true,
    },
  });

  if (!test || !test.visibility) {
    return fail(404, "Test not found.");
  }

  if (test.createdById !== user.id) {
    return fail(403, "You are not allowed to monitor this test.");
  }

  const settings = parseTestSettings(test.settings, {
    allowRetake: test.allowRetake,
    showResults: test.showResults,
    duration: test.duration,
  });

  if (!settingsRequireLiveKit(settings)) {
    return fail(400, "This test does not require a live video or audio stream.");
  }

  const participantId = liveProctorParticipantId(user.id);
  const name =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email || "Proctor";

  const tokenResult = await mintLiveKitToken({
    roomId: liveStreamRoomId(test.id),
    participantId,
    name,
    role: "proctor",
  });

  if (!tokenResult.ok) {
    return fail(500, tokenResult.message);
  }

  return ok("Token issued.", {
    token: tokenResult.token,
    roomId: tokenResult.roomId,
    participantId: tokenResult.participantId,
    name: tokenResult.name,
  });
}

export async function getProctorMonitorContext(testSlug: string, user: SessionUser) {
  const test = await prisma.test.findUnique({
    where: { slug: testSlug },
    select: {
      id: true,
      slug: true,
      name: true,
      visibility: true,
      createdById: true,
      duration: true,
      settings: true,
      allowRetake: true,
      showResults: true,
      subjectName: true,
    },
  });

  if (!test || !test.visibility || test.createdById !== user.id) {
    return null;
  }

  const settings = parseTestSettings(test.settings, {
    allowRetake: test.allowRetake,
    showResults: test.showResults,
    duration: test.duration,
  });

  return {
    test: {
      id: test.id,
      slug: test.slug,
      name: test.name,
      visibility: test.visibility,
      createdById: test.createdById,
      duration: test.duration,
      subject: { name: test.subjectName || "General" },
      requireWebcam: settings.security.requireWebcam,
      requireMic: settings.security.requireMic,
    },
    proctor: {
      id: user.id,
      name:
        [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email || "Proctor",
    },
    roomId: liveStreamRoomId(test.id),
    participantId: liveProctorParticipantId(user.id),
    requireWebcam: settings.security.requireWebcam,
    requireMic: settings.security.requireMic,
  };
}

export type ProctorRosterEntry = {
  participantId: string;
  name: string;
  email: string | null;
};

export async function getProctorRoster(
  testSlug: string,
  user: SessionUser
): Promise<ActionResult<ProctorRosterEntry[] | null>> {
  const context = await getProctorMonitorContext(testSlug, user);
  if (!context) {
    return fail(403, "Not allowed.");
  }

  const attempts = await prisma.liveTestAttempt.findMany({
    where: {
      testId: context.test.id,
      submittedAt: null,
    },
    orderBy: { startedAt: "asc" },
    select: {
      studentId: true,
      student: {
        select: { firstName: true, lastName: true, email: true },
      },
    },
  });

  return ok(
    "Roster loaded.",
    attempts.map((attempt) => ({
      participantId: liveStudentParticipantId(attempt.studentId),
      name: studentDisplayName(attempt.student),
      email: attempt.student.email,
    }))
  );
}
