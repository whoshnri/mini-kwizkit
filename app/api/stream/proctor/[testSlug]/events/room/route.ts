import { requireSessionUser } from "@/server/lib/require-session";
import { createSseResponse } from "@/server/lib/sse-response";
import { subscribeRoomEvents } from "@/server/lib/sse-hub";
import { resolveProctorRoomStream } from "@/server/services/monitorEventsService";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ testSlug: string }> }
) {
  const user = await requireSessionUser(request);
  if (!user) {
    return Response.json({ status: 403, message: "Not allowed.", metadata: null }, { status: 403 });
  }

  const { testSlug } = await params;
  const context = await resolveProctorRoomStream(testSlug, user);
  if (!context) {
    return Response.json({ status: 403, message: "Not allowed.", metadata: null }, { status: 403 });
  }

  return createSseResponse(request, (writer) => subscribeRoomEvents(context.roomId, writer));
}
