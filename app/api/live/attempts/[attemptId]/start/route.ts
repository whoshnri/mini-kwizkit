import { asJson, readBody } from "@/server/lib/http";
import { startExamAttempt } from "@/server/services/liveTestService";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  const { attemptId } = await params;
  const body = await readBody<{ testSlug?: string }>(request);
  return asJson(await startExamAttempt(attemptId, body.testSlug ?? ""));
}
