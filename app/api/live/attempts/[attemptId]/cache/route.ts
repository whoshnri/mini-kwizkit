import { asJson, readBody } from "@/server/lib/http";
import prisma from "@/server/lib/prisma";
import { liveStudentParticipantId } from "@/server/lib/stream";
import {
  computeSecondsRemaining,
  saveExamProgress,
  validateLiveAttemptAccess,
} from "@/server/services/proctoringService";
import {
  getAttemptCache,
  upsertAttemptCache,
  type CachedAttemptProgress,
} from "@/server/services/liveCacheService";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  const { attemptId } = await params;
  const body = await readBody<{
    testSlug?: string;
    studentId?: string;
    answers?: Record<string, string | number | null>;
    flagged?: string[];
    currentIndex?: number;
    secondsRemaining?: number;
  }>(request);

  const testSlug = body.testSlug ?? "";
  const studentId = body.studentId ?? "";
  if (!testSlug || !studentId) {
    return asJson({ status: 400, message: "Missing testSlug or studentId.", metadata: null }, 400);
  }

  const access = await validateLiveAttemptAccess({
    testSlug,
    attemptId,
    participantId: liveStudentParticipantId(studentId),
  });

  if (!access) {
    return asJson({ status: 403, message: "Not allowed.", metadata: null }, 403);
  }

  const attempt = await prisma.liveTestAttempt.findUnique({
    where: { id: attemptId },
    select: {
      examStartedAt: true,
      timePenaltySeconds: true,
      test: { select: { duration: true } },
    },
  });

  const secondsRemaining =
    typeof body.secondsRemaining === "number"
      ? body.secondsRemaining
      : computeSecondsRemaining({
          durationMinutes: attempt?.test.duration ?? access.durationMinutes,
          examStartedAt: attempt?.examStartedAt ?? access.examStartedAt,
          timePenaltySeconds: attempt?.timePenaltySeconds ?? access.timePenaltySeconds,
        });

  await saveExamProgress({
    attemptId,
    testSlug,
    answers: body.answers ?? {},
    flagged: body.flagged ?? [],
    currentIndex: body.currentIndex ?? 0,
  });

  const payload: CachedAttemptProgress = {
    attemptId,
    testSlug,
    answers: body.answers ?? {},
    flagged: body.flagged ?? [],
    currentIndex: body.currentIndex ?? 0,
    secondsRemaining,
    savedAt: new Date().toISOString(),
  };

  const cached = await upsertAttemptCache(payload);
  return asJson({
    status: 200,
    message: cached.cached ? "Attempt cached." : "Progress saved (cache unavailable).",
    metadata: cached,
  });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  const { attemptId } = await params;
  const cached = await getAttemptCache(attemptId);
  return asJson({
    status: 200,
    message: cached ? "Cache hit." : "Cache miss.",
    metadata: cached,
  });
}
