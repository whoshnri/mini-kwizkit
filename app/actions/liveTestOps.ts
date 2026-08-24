"use server";

import { revalidatePath } from "next/cache";
import {
  completeLiveSetup as completeSetup,
  getExamAttemptState as loadExamState,
  getPublicLiveTest as loadPublicTest,
  requestLiveAccessOtp as requestOtp,
  startExamAttempt as startAttempt,
  submitLiveAttempt as submitAttempt,
  verifyLiveAccessOtp as verifyOtp,
} from "@/server/services/liveTestService";
import {
  computeSecondsRemaining,
  saveExamProgress as persistProgress,
  validateLiveAttemptAccess,
} from "@/server/services/proctoringService";
import {
  getAttemptCache,
  upsertAttemptCache,
  type CachedAttemptProgress,
} from "@/server/services/liveCacheService";
import prisma from "@/server/lib/prisma";
import { liveStudentParticipantId } from "@/server/lib/stream";
import { getStudentChatHistory as loadStudentChat } from "@/server/services/monitorEventsService";
import type { ViolationFlag } from "@/lib/violation";

type ActionResult<T = null> = {
  status: number;
  message: string;
  metadata: T;
};

export type LiveQuestionOption = {
  key: string;
  value: string;
  originalIndex?: number;
};

export type LiveQuestion = {
  id: string;
  text: string;
  type: "multiple_choice" | "short_answer" | "essay" | "true_or_false";
  marks: number;
  options: LiveQuestionOption[];
  order: number;
};

export type LiveTestSettings = {
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  allowRetake: boolean;
  showResults: boolean;
  passPercentage: number;
  enableTabSwitching: boolean;
  tabSwitchLimit: number;
  disableCopyPaste: boolean;
  requireWebcam: boolean;
  requireMic: boolean;
  requiresAccessPassword: boolean;
  testTime: number;
};

export type LiveTestPayload = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  subject: string;
  duration: number;
  totalMarks: number;
  numberOfQuestions: number;
  ownerName: string;
  rules: string[];
  questions: LiveQuestion[];
  allowRetake: boolean;
  showResults: boolean;
  settings: LiveTestSettings;
};

export type ExamAttemptState = {
  examStartedAt: string | null;
  durationMinutes: number;
  timePenaltySeconds: number;
  proctorDeductions: number;
  endedByProctor: boolean;
  endReason: string | null;
  secondsRemaining: number;
  currentIndex?: number;
  answers?: Record<string, string | number | null>;
  flagged?: string[];
  violationFlags?: ViolationFlag[];
  allowRetake?: boolean;
  showResults?: boolean;
  alreadySubmitted?: boolean;
};

export async function getPublicLiveTest(testSlug: string): Promise<LiveTestPayload | null> {
  return loadPublicTest(testSlug);
}

export async function requestLiveAccessOtp(
  testSlug: string,
  email: string
): Promise<ActionResult<{ email: string }>> {
  return requestOtp(testSlug, email);
}

export async function verifyLiveAccessOtp(
  testSlug: string,
  email: string,
  otp: string,
  accessPassword?: string
) {
  return verifyOtp(testSlug, email, otp, accessPassword);
}

export async function completeLiveSetup(attemptId: string): Promise<ActionResult> {
  return completeSetup(attemptId);
}

export async function startExamAttempt(attemptId: string, testSlug: string) {
  return startAttempt(attemptId, testSlug);
}

export async function getExamAttemptState(attemptId: string, testSlug: string) {
  return loadExamState(attemptId, testSlug);
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
  return persistProgress({
    attemptId,
    testSlug,
    answers,
    flagged,
    currentIndex,
  });
}

export async function cacheExamAttempt({
  attemptId,
  testSlug,
  studentId,
  answers,
  flagged,
  currentIndex,
  secondsRemaining,
}: {
  attemptId: string;
  testSlug: string;
  studentId: string;
  answers: Record<string, string | number | null>;
  flagged: string[];
  currentIndex: number;
  secondsRemaining: number;
}) {
  if (!testSlug || !studentId) {
    return { status: 400, message: "Missing testSlug or studentId.", metadata: null };
  }

  const access = await validateLiveAttemptAccess({
    testSlug,
    attemptId,
    participantId: liveStudentParticipantId(studentId),
  });

  if (!access) {
    return { status: 403, message: "Not allowed.", metadata: null };
  }

  const attempt = await prisma.liveTestAttempt.findUnique({
    where: { id: attemptId },
    select: {
      examStartedAt: true,
      timePenaltySeconds: true,
      test: { select: { duration: true } },
    },
  });

  const remaining =
    typeof secondsRemaining === "number"
      ? secondsRemaining
      : computeSecondsRemaining({
          durationMinutes: attempt?.test.duration ?? access.durationMinutes,
          examStartedAt: attempt?.examStartedAt ?? access.examStartedAt,
          timePenaltySeconds: attempt?.timePenaltySeconds ?? access.timePenaltySeconds,
        });

  await persistProgress({
    attemptId,
    testSlug,
    answers,
    flagged,
    currentIndex,
  });

  const payload: CachedAttemptProgress = {
    attemptId,
    testSlug,
    answers,
    flagged,
    currentIndex,
    secondsRemaining: remaining,
    savedAt: new Date().toISOString(),
  };

  const cached = await upsertAttemptCache(payload);
  return {
    status: 200,
    message: cached.cached ? "Attempt cached." : "Progress saved (cache unavailable).",
    metadata: cached,
  };
}

export async function getCachedExamAttempt(attemptId: string) {
  const cached = await getAttemptCache(attemptId);
  return {
    status: 200,
    message: cached ? "Cache hit." : "Cache miss.",
    metadata: cached,
  };
}

export async function getStudentChatHistory(
  testSlug: string,
  attemptId: string,
  participantId: string
) {
  return loadStudentChat({ testSlug, attemptId, participantId });
}

export async function submitLiveAttempt({
  attemptId,
  answers,
  flagged,
}: {
  attemptId: string;
  answers: Record<string, string | number | null>;
  flagged: string[];
}) {
  const result = await submitAttempt({ attemptId, answers, flagged });

  if (result.status === 200 && result.metadata && "testSlug" in result.metadata && result.metadata.testSlug) {
    revalidatePath(`/live/${result.metadata.testSlug}/test`);
  }

  return result;
}
