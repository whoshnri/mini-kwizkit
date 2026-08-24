import { createSseResponse } from "@/server/lib/sse-response";
import { subscribeStudentRoomEvents } from "@/server/lib/sse-hub";
import { validateStudentEventAccess } from "@/server/services/monitorEventsService";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ testSlug: string }> }
) {
  const { testSlug } = await params;
  const { searchParams } = new URL(request.url);
  const access = await validateStudentEventAccess({
    testSlug,
    attemptId: searchParams.get("attemptId") ?? "",
    participantId: searchParams.get("participantId") ?? "",
  });

  if (!access) {
    return Response.json({ status: 403, message: "Not allowed.", metadata: null }, { status: 403 });
  }

  return createSseResponse(request, (writer) =>
    subscribeStudentRoomEvents(access.roomId, writer)
  );
}
