import { reportViolation } from "@/server/services/proctoringService";
import type { ViolationFlag } from "@/server/types/violation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    testSlug?: string;
    attemptId?: string;
    participantId?: string;
    flag?: ViolationFlag;
  };

  if (!body.flag) {
    return Response.json({ status: 400, message: "Missing violation flag.", metadata: null }, { status: 400 });
  }

  const result = await reportViolation({
    testSlug: body.testSlug ?? "",
    attemptId: body.attemptId ?? "",
    participantId: body.participantId ?? "",
    flag: body.flag,
  });

  return Response.json(result);
}
