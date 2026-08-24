"use server";

import { revalidatePath } from "next/cache";
import { Plan } from "@/lib/schemas";
import { AUTH_REQUIRED, requireActionUser } from "@/server/lib/action-session";

export async function updateUserPlan(_userId: string, _plan: Plan) {
  const user = await requireActionUser();
  if (!user) return { error: "Sign in required." };

  return { error: "Plans are not part of this app." };
}

export async function getPlanDetails(_userId: string) {
  const user = await requireActionUser();
  if (!user) return { error: "Sign in required." };

  revalidatePath("/dashboard/account");
  return {
    plan: "solo_paygo",
    aiTokensRemaining: 0,
  };
}
