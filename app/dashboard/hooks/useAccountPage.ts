"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSession } from "@/app/SessionContext";
import { useTheme } from "@/app/ThemeContext";
import {
  AccountUpdateInput,
  fetchAccountOverview,
  topUpWallet,
  updateAccount,
} from "@/app/actions/accountOps";
import { updateUserPlan } from "@/app/actions/planOps";
import { changePassword, signOut } from "@/lib/auth-client";
import { publicErrorMessage } from "@/lib/public-error";
import { Plan } from "@/lib/schemas";
import { PLAN_CONFIG } from "@/lib/plans";
import { useUnsavedChanges } from "@/app/dashboard/components/UnsavedChanges";

export type AccountTab = "profile" | "security" | "billing" | "preferences";

export function useAccountPage() {
  const router = useRouter();
  const { session, refreshSession } = useSession();
  const { theme, setTheme } = useTheme();
  const [overview, setOverview] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [topUpOpen, setTopUpOpen] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);
  const [tab, setTab] = useState<AccountTab>("profile");
  const [topUpAmount, setTopUpAmount] = useState(5000);
  const [form, setForm] = useState<AccountUpdateInput>({});
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [revokeOtherSessions, setRevokeOtherSessions] = useState(true);

  const userId = session?.id;

  const load = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const response = await fetchAccountOverview(userId);

    if ("error" in response) {
      toast.error(publicErrorMessage(response.error, "Could not load your account."));
      setOverview(null);
    } else {
      setOverview(response);
      setForm({
        firstName: response.account.firstName,
        lastName: response.account.lastName,
        email: response.account.email,
        uniqueId: response.account.uniqueId,
        image: response.account.image,
        gender: response.account.gender,
        phone: response.account.phone,
        city: response.account.city,
        username: response.account.username,
      });
      setUsername(response.account.username ?? "");
    }

    setLoading(false);
  }, [userId]);

  useEffect(() => {
    void load();
  }, [load]);

  const usageCards = useMemo(() => {
    const usage = overview?.usage ?? {};
    return [
      ["Tests", usage.tests ?? 0],
      ["Attempts", usage.liveAttempts ?? 0],
      ["Scores", usage.testScores ?? 0],
    ] as const;
  }, [overview]);

  async function saveAccount() {
    if (!userId) return;
    if (!form.firstName?.trim() || !form.lastName?.trim()) {
      toast.error("First and last name are required.");
      return;
    }

    setSaving(true);
    const response = await updateAccount(userId, {
      ...form,
      username: username.trim() || null,
    });
    setSaving(false);
    if ("error" in response) {
      toast.error(publicErrorMessage(response.error, "Could not save your profile."));
      return;
    }

    toast.success("Profile saved.");
    await refreshSession();
    await load();
  }

  async function saveImage(url: string) {
    setForm((current) => ({ ...current, image: url }));
    if (!userId) return;
    const response = await updateAccount(userId, { ...form, image: url });
    if ("error" in response) {
      toast.error(publicErrorMessage(response.error, "Could not save your photo."));
      return;
    }
    await refreshSession();
  }

  async function savePassword() {
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    setPasswordSaving(true);
    const response = await changePassword({
      currentPassword,
      newPassword,
      revokeOtherSessions,
    });
    setPasswordSaving(false);

    if (!response.ok) {
      toast.error(publicErrorMessage(response.error, "Could not update password."));
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    toast.success("Password updated.");
  }

  async function submitTopUp() {
    if (!userId) return;
    setSaving(true);
    const response = await topUpWallet(userId, topUpAmount);
    setSaving(false);
    if ("error" in response) {
      toast.error(publicErrorMessage(response.error, "Could not top up your wallet."));
      return;
    }
    toast.success(response.message);
    setTopUpOpen(false);
    await load();
  }

  async function changePlan(plan: Plan) {
    if (!userId) return;
    setSaving(true);
    const response = await updateUserPlan(userId, plan);
    setSaving(false);
    if ("error" in response) {
      toast.error(publicErrorMessage(response.error, "Could not update your plan."));
      return;
    }
    toast.success("Plan updated successfully");
    setPlanOpen(false);
    await refreshSession();
    await load();
  }

  async function handleSignOut() {
    await signOut();
    router.replace("/auth");
  }

  const currentPlanLimits = useMemo(() => {
    if (!overview?.account?.plan) return null;
    return PLAN_CONFIG[overview.account.plan as Plan];
  }, [overview]);

  const hasChanges = useMemo(() => {
    const account = overview?.account;
    if (!account) return false;
    return (
      (form.firstName ?? "") !== (account.firstName ?? "") ||
      (form.lastName ?? "") !== (account.lastName ?? "") ||
      (form.uniqueId ?? "") !== (account.uniqueId ?? "") ||
      (form.gender ?? "") !== (account.gender ?? "") ||
      (form.phone ?? "") !== (account.phone ?? "") ||
      (form.city ?? "") !== (account.city ?? "") ||
      username.trim() !== (account.username ?? "")
    );
  }, [form, overview, username]);

  useUnsavedChanges(hasChanges);

  return {
    session,
    overview,
    loading,
    saving,
    passwordSaving,
    form,
    setForm,
    username,
    setUsername,
    tab,
    setTab,
    topUpOpen,
    setTopUpOpen,
    planOpen,
    setPlanOpen,
    topUpAmount,
    setTopUpAmount,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    revokeOtherSessions,
    setRevokeOtherSessions,
    usageCards,
    saveAccount,
    saveImage,
    savePassword,
    submitTopUp,
    changePlan,
    handleSignOut,
    currentPlanLimits,
    theme,
    setTheme,
  };
}
