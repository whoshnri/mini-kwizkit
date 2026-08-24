"use server";

import { Settings } from "@/lib/setting";
import { AUTH_REQUIRED, requireActionUser } from "@/server/lib/action-session";
import { saveSettings as persistSettings } from "@/server/services/saveSettings";

export async function saveSettings(testId: string, settings: Settings) {
  const user = await requireActionUser();
  if (!user) return { error: "Sign in required." };

  return persistSettings(testId, settings);
}
