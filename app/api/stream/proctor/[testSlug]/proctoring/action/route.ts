import { requireSessionUser } from "@/server/lib/require-session";
import { applyProctorAction } from "@/server/services/proctoringService";
import type { ProctorAction } from "@/server/types/violation";

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
    participantId?: string;
    action?: ProctorAction;
    flagId?: string;
  };

  if (!body.participantId) {
    return Response.json({ status: 400, message: "Missing participant ID.", metadata: null }, { status: 400 });
  }

  const result = await applyProctorAction({
    testSlug,
    participantId: body.participantId,
    action: body.action,
    user,
    flagId: body.flagId,
  });

  return Response.json(result);
}
