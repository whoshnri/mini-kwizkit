import { requireSessionUser } from "@/server/lib/require-session";
import { getProctorRoster } from "@/server/services/streamService";

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
  const result = await getProctorRoster(testSlug, user);
  return Response.json(result);
}
