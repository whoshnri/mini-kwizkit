"use server";

import { Gender } from "@/lib/schemas";
import { AUTH_REQUIRED, requireActionUser } from "@/server/lib/action-session";
import {
  fetchAccountOverview as loadOverview,
  fetchTransactions as loadTransactions,
  topUpWallet as addFunds,
  updateAccount as saveAccount,
} from "@/server/services/accountService";

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

export async function fetchAccountOverview(_userId: string) {
  const user = await requireActionUser();
  if (!user) return { error: "Sign in required." };

  return loadOverview(user.id);
}

export async function updateAccount(_userId: string, input: AccountUpdateInput) {
  const user = await requireActionUser();
  if (!user) return { error: "Sign in required." };

  return saveAccount(user.id, input);
}

export async function topUpWallet(_userId: string, amount: number) {
  const user = await requireActionUser();
  if (!user) return { error: "Sign in required." };

  return addFunds(user.id, amount);
}

export async function fetchTransactions(_userId: string) {
  const user = await requireActionUser();
  if (!user) return { error: "Sign in required." };

  return loadTransactions(user.id);
}
