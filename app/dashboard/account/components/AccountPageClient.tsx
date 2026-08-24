"use client";

import Link from "next/link";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  PiCheck,
  PiMoon,
  PiPencilSimple,
  PiPlus,
  PiSignOut,
  PiSun,
  PiWallet,
} from "react-icons/pi";
import {
  DashboardButton,
  DashboardField,
  DashboardPanel,
  DashboardSwitch,
  ResponsiveSheet,
  StatusBadge,
  fieldClass,
} from "../../components/primitives";
import { useAccountPage, type AccountTab } from "../../hooks/useAccountPage";
import { formatDate, formatMoney, genderOptions, labelize } from "../../lib/schoolOptions";
import { DashboardSelect } from "../../components/DashboardDropdown";
import { FileUpload } from "@/components/uploads/FileUpload";
import { browserFileSrc } from "@/lib/upload";
import { SegmentedTabs } from "@/components/SegmentedTabs";
import { Plan } from "@/lib/schemas";
import { DetailHeaderSkeleton } from "../../components/DashboardSkeletons";

const tabs: { id: AccountTab; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "security", label: "Security" },
  { id: "billing", label: "Plan & billing" },
  { id: "preferences", label: "Preferences" },
];

const planOptions: { id: Plan; name: string; price: string; desc: string }[] = [
  { id: "solo_paygo", name: "Pay as you go", price: "₦0", desc: "No commitment, pay as you use" },
  { id: "solo_starter", name: "Solo Starter", price: "₦5,000", desc: "Up to 50 students, 10 tests" },
  { id: "solo_growth", name: "Solo Growth", price: "₦12,000", desc: "200 students, unlimited tests" },
  { id: "inst_starter", name: "Institution Starter", price: "₦50,000", desc: "200 students, 5 staff" },
];

export default function AccountPageClient() {
  const account = useAccountPage();

  if (account.loading) {
    return <DetailHeaderSkeleton />;
  }

  const details = account.overview?.account;
  const wallet = account.overview?.wallet;
  const transactions = wallet?.transactions ?? [];
  const fullName =
    [details?.firstName, details?.lastName].filter(Boolean).join(" ") || "Rubric user";
  const initials = `${details?.firstName?.[0] ?? "R"}${details?.lastName?.[0] ?? ""}`;
  const limits = account.currentPlanLimits;

  return (
    <div className="space-y-6 pb-8">
      <DashboardPanel className="p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--foreground)] text-lg font-semibold text-[var(--background)]">
              {details?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={browserFileSrc(details.image)} alt="" className="h-full w-full object-cover" />
              ) : (
                initials
              )}
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold tracking-tight">{fullName}</h1>
              <p className="mt-1 truncate text-sm text-[var(--muted)]">{details?.email}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge tone="success">{labelize(details?.plan ?? "solo_paygo")}</StatusBadge>
            <DashboardButton variant="secondary" onClick={() => account.setTab("profile")}>
              <PiPencilSimple className="h-4 w-4" />
              Edit profile
            </DashboardButton>
          </div>
        </div>
      </DashboardPanel>

      <SegmentedTabs
        value={account.tab}
        onChange={account.setTab}
        items={tabs}
      />

      {account.tab === "profile" && (
        <DashboardPanel className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Profile</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              These details show on tests, receipts, and your dashboard.
            </p>
          </div>

          <div className="mb-6 rounded-2xl bg-[var(--surface-muted)] p-4">
            <FileUpload
              variant="avatar"
              folder="avatars"
              accept="image/jpeg,image/png,image/webp,image/gif"
              maxSizeMB={5}
              value={account.form.image ?? ""}
              onChange={(url) => void account.saveImage(url)}
              initials={initials}
              label="Profile photo"
              hint="JPG, PNG, or WebP. Saves as soon as you upload."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <DashboardField label="First name">
              <input
                value={account.form.firstName ?? ""}
                onChange={(event) =>
                  account.setForm((current) => ({ ...current, firstName: event.target.value }))
                }
                className={fieldClass}
              />
            </DashboardField>
            <DashboardField label="Last name">
              <input
                value={account.form.lastName ?? ""}
                onChange={(event) =>
                  account.setForm((current) => ({ ...current, lastName: event.target.value }))
                }
                className={fieldClass}
              />
            </DashboardField>
            <DashboardField label="Email">
              <input
                type="email"
                value={account.form.email ?? ""}
                readOnly
                className={`${fieldClass} cursor-not-allowed opacity-80`}
              />
            </DashboardField>
            <DashboardField label="Staff / unique ID">
              <input
                value={account.form.uniqueId ?? ""}
                onChange={(event) =>
                  account.setForm((current) => ({ ...current, uniqueId: event.target.value }))
                }
                placeholder="Optional"
                className={fieldClass}
              />
            </DashboardField>
            <DashboardField label="Phone">
              <PhoneInput
                placeholder="Enter phone number"
                value={account.form.phone ?? undefined}
                onChange={(value) =>
                  account.setForm((current) => ({ ...current, phone: value ?? "" }))
                }
                defaultCountry="NG"
                className="theme-input phone-input"
              />
            </DashboardField>
            <DashboardField label="City">
              <input
                value={account.form.city ?? ""}
                onChange={(event) =>
                  account.setForm((current) => ({ ...current, city: event.target.value }))
                }
                className={fieldClass}
              />
            </DashboardField>
            <DashboardField label="Gender">
              <DashboardSelect
                value={account.form.gender ?? "male"}
                onValueChange={(value) =>
                  account.setForm((current) => ({ ...current, gender: value as typeof account.form.gender }))
                }
                options={genderOptions.map((option) => ({
                  value: option,
                  label: labelize(option),
                }))}
              />
            </DashboardField>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <p className="mr-auto text-xs text-[var(--muted)]">
              Member since {formatDate(details?.createdAt)}
            </p>
            <DashboardButton
              onClick={() => void account.saveAccount()}
              disabled={account.saving}
              loading={account.saving}
            >
              {account.saving ? "Saving…" : "Save profile"}
            </DashboardButton>
          </div>
        </DashboardPanel>
      )}

      {account.tab === "security" && (
        <div className="grid gap-5 xl:grid-cols-2">
          <DashboardPanel className="p-6">
            <h2 className="text-lg font-semibold">Sign-in</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Username is used on the login screen along with your email.
            </p>
            <div className="mt-5 grid gap-4">
              <DashboardField label="Username">
                <input
                  value={account.username}
                  onChange={(event) => account.setUsername(event.target.value)}
                  className={fieldClass}
                  autoComplete="username"
                />
              </DashboardField>
              <DashboardField label="Email">
                <input
                  value={details?.email ?? ""}
                  readOnly
                  className={`${fieldClass} cursor-not-allowed opacity-80`}
                />
              </DashboardField>
            </div>
            <DashboardButton
              className="mt-6"
              onClick={() => void account.saveAccount()}
              disabled={account.saving}
              loading={account.saving}
            >
              {account.saving ? "Saving…" : "Save username"}
            </DashboardButton>
          </DashboardPanel>

          <DashboardPanel className="p-6">
            <h2 className="text-lg font-semibold">Password</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Choose a password with at least 8 characters.
            </p>
            <div className="mt-5 grid gap-4">
              <DashboardField label="Current password">
                <input
                  type="password"
                  value={account.currentPassword}
                  onChange={(event) => account.setCurrentPassword(event.target.value)}
                  className={fieldClass}
                  autoComplete="current-password"
                />
              </DashboardField>
              <DashboardField label="New password">
                <input
                  type="password"
                  value={account.newPassword}
                  onChange={(event) => account.setNewPassword(event.target.value)}
                  className={fieldClass}
                  autoComplete="new-password"
                />
              </DashboardField>
              <DashboardField label="Confirm new password">
                <input
                  type="password"
                  value={account.confirmPassword}
                  onChange={(event) => account.setConfirmPassword(event.target.value)}
                  className={fieldClass}
                  autoComplete="new-password"
                />
              </DashboardField>
              <label className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3">
                <span className="text-sm font-medium">Sign out other devices</span>
                <DashboardSwitch
                  checked={account.revokeOtherSessions}
                  onChange={account.setRevokeOtherSessions}
                />
              </label>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <DashboardButton
                onClick={() => void account.savePassword()}
                disabled={account.passwordSaving}
                loading={account.passwordSaving}
              >
                {account.passwordSaving ? "Updating…" : "Update password"}
              </DashboardButton>
              <Link href="/forgot-password" className="text-sm text-[var(--muted)] underline underline-offset-4">
                Forgot password?
              </Link>
            </div>
          </DashboardPanel>

          <DashboardPanel className="p-6 xl:col-span-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold">Session</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Sign out of this browser. You can sign back in anytime.
                </p>
              </div>
              <DashboardButton variant="danger" onClick={() => void account.handleSignOut()}>
                <PiSignOut className="h-4 w-4" />
                Sign out
              </DashboardButton>
            </div>
          </DashboardPanel>
        </div>
      )}

      {account.tab === "billing" && (
        <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
          <div className="space-y-5">
            <DashboardPanel className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Subscription</h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {labelize(details?.plan ?? "solo_paygo")} · expires{" "}
                    {details?.planExpiresAt ? formatDate(details.planExpiresAt) : "never"}
                  </p>
                </div>
                <StatusBadge tone="success">Active</StatusBadge>
              </div>
              {limits && (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Students", limits.maxStudents === 0 ? "Pay as you go" : String(limits.maxStudents)],
                    [
                      "Tests / month",
                      limits.maxTestsPerMonth === "unlimited"
                        ? "Unlimited"
                        : String(limits.maxTestsPerMonth),
                    ],
                    ["Storage", `${limits.maxStorageGB} GB`],
                    ["Support", labelize(limits.support)],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4"
                    >
                      <p className="text-xs font-bold uppercase text-[var(--muted)]">{label}</p>
                      <p className="mt-2 text-sm font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              )}
              <DashboardButton
                variant="secondary"
                className="mt-6"
                onClick={() => account.setPlanOpen(true)}
              >
                Change plan
              </DashboardButton>
            </DashboardPanel>

            <DashboardPanel className="p-6">
              <h2 className="mb-5 text-lg font-semibold">Workspace usage</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {account.usageCards.map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4"
                  >
                    <p className="text-xs font-bold uppercase text-[var(--muted)]">{label}</p>
                    <p className="mt-2 text-2xl font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </DashboardPanel>

            <DashboardPanel className="p-6">
              <h2 className="mb-5 text-lg font-semibold">Recent transactions</h2>
              <div className="space-y-3">
                {transactions.length ? (
                  transactions.map((transaction: { id: string; type: string; amount: number; createdAt: string }) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-3"
                    >
                      <div>
                        <p className="text-sm font-semibold">
                          {transaction.type === "cr" ? "Credit" : "Debit"}
                        </p>
                        <p className="text-xs text-[var(--muted)]">
                          {formatDate(transaction.createdAt)}
                        </p>
                      </div>
                      <p className="font-semibold">{formatMoney(transaction.amount)}</p>
                    </div>
                  ))
                ) : (
                  <p className="rounded-xl border border-dashed border-[var(--border)] p-5 text-sm text-[var(--muted)]">
                    No transactions yet.
                  </p>
                )}
              </div>
            </DashboardPanel>
          </div>

          <DashboardPanel className="h-fit p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[var(--muted)]">Wallet</p>
                <p className="mt-2 text-4xl font-semibold">{formatMoney(wallet?.balance)}</p>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--foreground)] text-[var(--background)]">
                <PiWallet className="h-6 w-6" />
              </span>
            </div>
            <div className="mt-6 grid gap-3">
              <DashboardButton onClick={() => account.setTopUpOpen(true)}>
                <PiPlus className="h-5 w-5" />
                Top up
              </DashboardButton>
            </div>
          </DashboardPanel>
        </div>
      )}

      {account.tab === "preferences" && (
        <DashboardPanel className="p-6">
          <h2 className="text-lg font-semibold">Appearance</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            This preference is saved on this device.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {(["light", "dark"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => account.setTheme(mode)}
                className={`flex items-center justify-between rounded-2xl border-2 px-5 py-4 text-left ${
                  account.theme === mode
                    ? "border-[var(--foreground)] bg-[var(--surface-muted)]"
                    : "border-[var(--border)] hover:border-[var(--muted)]"
                }`}
              >
                <div className="flex items-center gap-3">
                  {mode === "dark" ? <PiMoon className="h-5 w-5" /> : <PiSun className="h-5 w-5" />}
                  <span className="font-semibold capitalize">{mode}</span>
                </div>
                {account.theme === mode && (
                  <span className="flex size-6 items-center justify-center rounded-full bg-[var(--foreground)] text-[var(--background)]">
                    <PiCheck className="h-3.5 w-3.5" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </DashboardPanel>
      )}

      {account.planOpen && (
        <ResponsiveSheet
          title="Change subscription plan"
          onClose={() => account.setPlanOpen(false)}
          className="md:max-w-2xl"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {planOptions.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => account.changePlan(plan.id)}
                disabled={account.saving || details?.plan === plan.id}
                className={`relative flex flex-col rounded-2xl border-2 p-5 text-left transition ${
                  details?.plan === plan.id
                    ? "border-[var(--foreground)] bg-[var(--surface-muted)]"
                    : "border-[var(--border)] hover:border-[var(--muted)]"
                }`}
              >
                {details?.plan === plan.id && (
                  <span className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--foreground)] text-[var(--background)]">
                    <PiCheck className="h-3.5 w-3.5" />
                  </span>
                )}
                <p className="font-bold text-lg">{plan.name}</p>
                <p className="mt-1 text-2xl font-bold">
                  {plan.price}
                  <span className="text-xs font-normal text-[var(--muted)]">
                    {plan.id === "solo_paygo" ? "" : "/mo"}
                  </span>
                </p>
                <p className="mt-3 text-sm text-[var(--muted)]">{plan.desc}</p>
              </button>
            ))}
          </div>
        </ResponsiveSheet>
      )}

      {account.topUpOpen && (
        <ResponsiveSheet
          title="Top up wallet"
          onClose={() => account.setTopUpOpen(false)}
          footer={
            <DashboardButton
              onClick={() => void account.submitTopUp()}
              disabled={account.saving}
              className="w-full"
            >
              Top up wallet
            </DashboardButton>
          }
        >
          <DashboardField label="Amount">
            <input
              type="number"
              min={1}
              value={account.topUpAmount}
              onChange={(event) => account.setTopUpAmount(Number(event.target.value))}
              className={fieldClass}
            />
          </DashboardField>
          <p className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4 text-sm text-[var(--muted)]">
            This is a test top-up. It creates a credit transaction and increases the wallet balance.
          </p>
        </ResponsiveSheet>
      )}
    </div>
  );
}
