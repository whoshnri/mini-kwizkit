import { headers } from "next/headers";
import { getAuthSession } from "@/server/lib/session";

export async function currentUser() {
  const session = await getAuthSession(await headers());
  return session?.user ?? null;
}

export async function requireActionUser() {
  return currentUser();
}

export const AUTH_REQUIRED = {
  status: 401,
  message: "Sign in required.",
  metadata: null,
} as const;
