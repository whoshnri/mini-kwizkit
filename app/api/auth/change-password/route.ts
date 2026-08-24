import { NextResponse } from "next/server";
import { readSessionToken } from "@/server/lib/session";
import { requireSessionUser } from "@/server/lib/require-session";
import { changeUserPassword } from "@/server/services/authService";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const user = await requireSessionUser(request);
  if (!user) {
    return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    currentPassword?: string;
    newPassword?: string;
    revokeOtherSessions?: boolean;
  };

  const result = await changeUserPassword({
    userId: user.id,
    currentToken: readSessionToken(request.headers) ?? "",
    currentPassword: body.currentPassword ?? "",
    newPassword: body.newPassword ?? "",
    revokeOtherSessions: body.revokeOtherSessions,
  });

  if ("error" in result) {
    return NextResponse.json({ ok: false, error: result.error }, { status: result.status });
  }

  return NextResponse.json({ ok: true });
}
