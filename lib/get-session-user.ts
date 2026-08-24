import { headers } from "next/headers";
import { asPublicAccount } from "@/server/lib/require-session";
import { getAuthSession } from "@/server/lib/session";

export async function getSessionUser() {
  const session = await getAuthSession(await headers());
  if (!session?.user) return null;
  return asPublicAccount(session.user);
}
