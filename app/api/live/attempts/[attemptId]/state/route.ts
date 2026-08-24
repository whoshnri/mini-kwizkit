import { asJson } from "@/server/lib/http";
import { getExamAttemptState } from "@/server/services/liveTestService";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  const { attemptId } = await params;
  const testSlug = new URL(request.url).searchParams.get("testSlug") ?? "";
  return asJson(await getExamAttemptState(attemptId, testSlug));
}
