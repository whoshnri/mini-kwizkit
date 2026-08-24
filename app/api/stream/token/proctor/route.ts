import { requireSessionUser } from "@/server/lib/require-session";
import { createProctorStreamToken } from "@/server/services/streamService";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const user = await requireSessionUser(request);
  if (!user) {
    return Response.json({ status: 401, message: "Sign in required.", metadata: null }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { testSlug?: string };
  const result = await createProctorStreamToken(body.testSlug ?? "", user);
  return Response.json(result);
}
