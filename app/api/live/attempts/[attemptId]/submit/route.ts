import { asJson, readBody } from "@/server/lib/http";
import { submitLiveAttempt } from "@/server/services/liveTestService";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  const { attemptId } = await params;
  const body = await readBody<{
    answers?: Record<string, string | number | null>;
    flagged?: string[];
  }>(request);

  return asJson(
    await submitLiveAttempt({
      attemptId,
      answers: body.answers ?? {},
      flagged: body.flagged ?? [],
    })
  );
}
