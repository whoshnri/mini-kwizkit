import {
  createStudentStreamToken,
} from "@/server/services/streamService";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    testSlug?: string;
    attemptId?: string;
  };
  const result = await createStudentStreamToken(body.testSlug ?? "", body.attemptId ?? "");
  return Response.json(result);
}
