"use server";

import { AUTH_REQUIRED, requireActionUser } from "@/server/lib/action-session";
import { generateQuestions } from "@/server/services/aiService";

export async function run(initialPrompt: string, fileText: string) {
  const user = await requireActionUser();
  if (!user) return { status: "error" as const, message: "Sign in required.", details: "Sign in required." };

  return generateQuestions(initialPrompt, fileText);
}
