import type { Gender } from "@prisma/client";
import prisma from "@/server/lib/prisma";
import { asPublicAccount } from "@/server/lib/require-session";
import { publicUser } from "@/server/services/checkAccount";

export type AccountUpdateInput = {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  uniqueId?: string | null;
  image?: string | null;
  gender?: Gender;
  phone?: string | null;
  city?: string | null;
  username?: string | null;
};

function optionalText(value: string | null | undefined) {
  if (value === undefined) return undefined;
  const trimmed = value?.trim() ?? "";
  return trimmed || null;
}

export async function fetchAccountOverview(userId: string) {
  try {
    const account = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            tests: true,
            studentsCreated: true,
          },
        },
      },
    });

    if (!account) return { error: "Account not found" };

    const [liveAttempts, testScores] = await Promise.all([
      prisma.liveTestAttempt.count({ where: { test: { createdById: userId } } }),
      prisma.testScore.count({ where: { test: { createdById: userId } } }),
    ]);

    const { _count, passwordHash: _passwordHash, ...user } = account;

    return {
      account: asPublicAccount(user),
      wallet: { id: "local", balance: 0, transactions: [] },
      usage: {
        tests: _count.tests,
        subjects: 0,
        students: account._count.studentsCreated,
        classes: 0,
        certificates: 0,
        attendanceSessions: 0,
        materials: 0,
        liveAttempts,
        testScores,
      },
    };
  } catch (error) {
    console.error("[FETCH_ACCOUNT_OVERVIEW_ERROR]", error);
    return { error: "Failed to load account overview" };
  }
}

export async function updateAccount(userId: string, input: AccountUpdateInput) {
  try {
    const current = await prisma.user.findUnique({ where: { id: userId } });
    if (!current) return { error: "Account not found" };

    const account = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(input.firstName !== undefined ? { firstName: optionalText(input.firstName) } : {}),
        ...(input.lastName !== undefined ? { lastName: optionalText(input.lastName) } : {}),
        ...(input.uniqueId !== undefined ? { uniqueId: optionalText(input.uniqueId) } : {}),
        ...(input.image !== undefined ? { image: optionalText(input.image) ?? null } : {}),
        ...(input.gender !== undefined ? { gender: input.gender } : {}),
        ...(input.phone !== undefined ? { phone: optionalText(input.phone) } : {}),
        ...(input.city !== undefined ? { city: optionalText(input.city) } : {}),
        ...(input.username !== undefined
          ? { username: optionalText(input.username)?.toLowerCase() ?? null }
          : {}),
        ...(input.email !== undefined ? { email: optionalText(input.email)?.toLowerCase() ?? null } : {}),
      },
    });

    return { account: publicUser(account), message: "Account updated" };
  } catch (error) {
    console.error("[UPDATE_ACCOUNT_ERROR]", error);
    return { error: "Failed to update account" };
  }
}

export async function topUpWallet(_userId: string, _amount: number) {
  return { error: "Billing is not part of this app." };
}

export async function fetchTransactions(_userId: string) {
  return { transactions: [], wallet: { id: "local", balance: 0 } };
}
