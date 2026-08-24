"use server";

import { AUTH_REQUIRED, requireActionUser } from "@/server/lib/action-session";
import { fetchSettings as loadSettings } from "@/server/services/fetchSettings";

export async function fetchSettings(testId: string) {
  const user = await requireActionUser();
  if (!user) return { error: "Sign in required." };

  return loadSettings(testId);
}
