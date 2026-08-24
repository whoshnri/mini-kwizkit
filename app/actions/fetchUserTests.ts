"use server";

import { AUTH_REQUIRED, requireActionUser } from "@/server/lib/action-session";
import { fetchTests as fetchTestsForUser } from "@/server/services/fetchUserTests";

export async function fetchTests(_sub: string) {
  const user = await requireActionUser();
  if (!user) return { error: "Sign in required." };

  return fetchTestsForUser(user.id);
}
