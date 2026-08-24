import { asJson, readBody } from "@/server/lib/http";
import { verifyLiveAccessOtp } from "@/server/services/liveTestService";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await readBody<{ email?: string; otp?: string; accessPassword?: string }>(request);
  return asJson(
    await verifyLiveAccessOtp(slug, body.email ?? "", body.otp ?? "", body.accessPassword)
  );
}
