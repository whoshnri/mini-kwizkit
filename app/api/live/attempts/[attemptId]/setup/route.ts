import { asJson } from "@/server/lib/http";
import { completeLiveSetup } from "@/server/services/liveTestService";

export const runtime = "nodejs";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  const { attemptId } = await params;
  return asJson(await completeLiveSetup(attemptId));
}
