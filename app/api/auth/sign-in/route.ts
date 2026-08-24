import { NextResponse } from "next/server";
import { attachSessionCookie } from "@/server/lib/session";
import { signInUser } from "@/server/services/authService";
import { asPublicAccount } from "@/server/lib/require-session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    identifier?: string;
    email?: string;
    username?: string;
    password?: string;
  };

  const result = await signInUser({
    identifier: body.identifier || body.email || body.username || "",
    password: body.password ?? "",
  });

  if ("error" in result) {
    return NextResponse.json({ ok: false, error: result.error }, { status: result.status });
  }

  await attachSessionCookie(result.session.token, result.session.expiresAt);
  return NextResponse.json({
    ok: true,
    user: asPublicAccount(result.user),
  });
}
