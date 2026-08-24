"use server";

import { AUTH_REQUIRED, requireActionUser } from "@/server/lib/action-session";
import { makePrivate as hideTest, makePublic as publishTest } from "@/server/services/makeActive";

export async function makePrivate(testId: string) {
  const user = await requireActionUser();
  if (!user) return { error: "Sign in required." };

  return hideTest(testId);
}

export async function makePublic(testId: string, duration: number) {
  const user = await requireActionUser();
  if (!user) return { error: "Sign in required." };

  return publishTest(testId, duration);
}
