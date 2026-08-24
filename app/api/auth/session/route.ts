import { NextResponse } from "next/server";
import { getAuthSession } from "@/server/lib/session";
import { asPublicAccount } from "@/server/lib/require-session";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const session = await getAuthSession(request.headers);
  if (!session?.user) {
    return NextResponse.json({
      user: null,
      session: null,
      account: null,
      onboardingRequired: false,
    });
  }

  const account = asPublicAccount(session.user);
  return NextResponse.json({
    user: account,
    account,
    onboardingRequired: false,
  });
}
