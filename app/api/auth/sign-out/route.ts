import { NextResponse } from "next/server";
import { clearSessionCookie, readSessionToken } from "@/server/lib/session";
import { signOutUser } from "@/server/services/authService";

export const runtime = "nodejs";

export async function POST(request: Request) {
  await signOutUser(readSessionToken(request.headers));
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
