import { getStudentChatHistory } from "@/server/services/monitorEventsService";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ testSlug: string }> }
) {
  const { testSlug } = await params;
  const { searchParams } = new URL(request.url);
  const result = await getStudentChatHistory({
    testSlug,
    attemptId: searchParams.get("attemptId") ?? "",
    participantId: searchParams.get("participantId") ?? "",
  });
  return Response.json(result);
}
