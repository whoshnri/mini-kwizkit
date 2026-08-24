import { asJson, readBody } from "@/server/lib/http";
import { requestLiveAccessOtp } from "@/server/services/liveTestService";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await readBody<{ email?: string }>(request);
  return asJson(await requestLiveAccessOtp(slug, body.email ?? ""));
}
