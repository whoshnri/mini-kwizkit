import { getAuthSession } from "@/server/lib/session";
import type { User } from "@prisma/client";
import type { Plan } from "@/lib/schemas";

type AccountUser = Omit<User, "passwordHash"> & { passwordHash?: string | null };

export async function requireSessionUser(request: Request) {
  const session = await getAuthSession(request.headers);
  return session?.user ?? null;
}

export function asPublicAccount(user: AccountUser) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    uniqueId: user.uniqueId,
    image: user.image,
    gender: user.gender,
    phone: user.phone,
    city: user.city,
    accountId: user.accountId,
    isActive: user.isActive,
    plan: "solo_paygo" as Plan,
    aiTokensRemaining: 0,
    planExpiresAt: null as string | null,
    walletId: null as string | null,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}
