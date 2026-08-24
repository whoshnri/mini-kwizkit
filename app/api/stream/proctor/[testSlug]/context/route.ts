import { requireSessionUser } from "@/server/lib/require-session";
import { getProctorMonitorContext } from "@/server/services/streamService";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ testSlug: string }> }
) {
  const user = await requireSessionUser(request);
  if (!user) {
    return Response.json({ status: 401, message: "Sign in required.", metadata: null }, { status: 401 });
  }

  const { testSlug } = await params;
  const context = await getProctorMonitorContext(testSlug, user);
  if (!context) {
    return Response.json({ status: 404, message: "Not allowed.", metadata: null }, { status: 404 });
  }

  return Response.json({ status: 200, message: "Context loaded.", metadata: context });
}
