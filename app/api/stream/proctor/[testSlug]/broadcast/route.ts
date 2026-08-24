import { requireSessionUser } from "@/server/lib/require-session";
import { sendProctorBroadcast } from "@/server/services/monitorEventsService";
import type { MentionRef } from "@/server/types/monitor-events";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ testSlug: string }> }
) {
  const user = await requireSessionUser(request);
  if (!user) {
    return Response.json({ status: 401, message: "Sign in required.", metadata: null }, { status: 401 });
  }

  const { testSlug } = await params;
  const body = (await request.json().catch(() => ({}))) as {
    message?: string;
    mentions?: MentionRef[];
  };

  const result = await sendProctorBroadcast(testSlug, user, body.message ?? "", body.mentions ?? []);
  return Response.json(result);
}
