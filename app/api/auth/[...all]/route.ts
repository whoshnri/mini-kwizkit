import { NextResponse } from "next/server";
import { attachSessionCookie, clearSessionCookie, readSessionToken } from "@/server/lib/session";
import { asPublicAccount, requireSessionUser } from "@/server/lib/require-session";
import { changeUserPassword, signInUser, signOutUser, signUpUser } from "@/server/services/authService";

export const runtime = "nodejs";

async function jsonBody(request: Request) {
  return (await request.json().catch(() => ({}))) as Record<string, unknown>;
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const segments = url.pathname.replace(/^\/api\/auth\/?/, "").split("/").filter(Boolean);
  const action = segments[0] ?? "";
  const body = await jsonBody(request);

  if (action === "sign-in" || action === "login") {
    const result = await signInUser({
      identifier: String(body.identifier || body.email || body.username || ""),
      password: String(body.password ?? ""),
    });
    if ("error" in result) {
      return NextResponse.json({ ok: false, error: result.error }, { status: result.status });
    }
    await attachSessionCookie(result.session.token, result.session.expiresAt);
    return NextResponse.json({ ok: true, user: asPublicAccount(result.user) });
  }

  if (action === "sign-up" || action === "register" || action === "self") {
    const result = await signUpUser({
      name: String(body.name ?? ""),
      username: String(body.username ?? ""),
      email: String(body.email ?? ""),
      password: String(body.password ?? ""),
    });
    if ("error" in result) {
      return NextResponse.json({ ok: false, error: result.error }, { status: result.status });
    }
    await attachSessionCookie(result.session.token, result.session.expiresAt);
    return NextResponse.json({ ok: true, user: asPublicAccount(result.user) });
  }

  if (action === "sign-out" || action === "logout") {
    await signOutUser(readSessionToken(request.headers));
    await clearSessionCookie();
    return NextResponse.json({ ok: true });
  }

  if (action === "change-password") {
    const user = await requireSessionUser(request);
    if (!user) {
      return NextResponse.json({ ok: false, error: "Sign in required." }, { status: 401 });
    }
    const result = await changeUserPassword({
      userId: user.id,
      currentToken: readSessionToken(request.headers) ?? "",
      currentPassword: String(body.currentPassword ?? ""),
      newPassword: String(body.newPassword ?? ""),
      revokeOtherSessions: Boolean(body.revokeOtherSessions),
    });
    if ("error" in result) {
      return NextResponse.json({ ok: false, error: result.error }, { status: result.status });
    }
    return NextResponse.json({ ok: true });
  }

  if (action === "session") {
    const user = await requireSessionUser(request);
    if (!user) {
      return NextResponse.json({
        user: null,
        session: null,
        account: null,
        onboardingRequired: false,
      });
    }
    const account = asPublicAccount(user);
    return NextResponse.json({ user: account, account, onboardingRequired: false });
  }

  return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
}

export async function GET(request: Request) {
  return POST(request);
}
