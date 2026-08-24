import type { User } from "@prisma/client";
import prisma from "../lib/prisma";

export type SessionUser = User;

export function publicUser<T extends { passwordHash?: unknown }>(user: T) {
  const { passwordHash: _passwordHash, ...safe } = user;
  return safe;
}

export async function getVerifiedAccount(authUser: {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
}) {
  if (!authUser.id) {
    return { account: null as User | null, valid: false, onboardingRequired: false };
  }

  const account = await prisma.user.findFirst({
    where: { OR: [{ accountId: authUser.id }, { id: authUser.id }] },
  });

  if (!account) {
    return { account: null as User | null, valid: false, onboardingRequired: false };
  }

  return {
    account: publicUser(account),
    valid: true,
    onboardingRequired: false,
  };
}
