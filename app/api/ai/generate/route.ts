import { generateQuestions } from "@/server/services/aiService";
import { requireSessionUser } from "@/server/lib/require-session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const user = await requireSessionUser(request);
  if (!user) {
    return Response.json({ status: "error", message: "Sign in required." }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    prompt?: string;
    fileText?: string;
  };

  const result = await generateQuestions(body.prompt ?? "", body.fileText ?? "");
  return Response.json(result);
}
