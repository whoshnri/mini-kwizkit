import { asJson } from "@/server/lib/http";
import { getPublicLiveTest } from "@/server/services/liveTestService";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const test = await getPublicLiveTest(slug);
  if (!test) {
    return asJson({ status: 404, message: "Test not found.", metadata: null }, 404);
  }
  return asJson({ status: 200, message: "Test loaded.", metadata: test });
}
