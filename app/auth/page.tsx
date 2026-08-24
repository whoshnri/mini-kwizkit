"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { RubricButton } from "@/components/site/RubricButton";
import Image from "next/image";
import { IoPersonOutline } from "react-icons/io5";
import type { ReactNode } from "react";
import { useAuthForm } from "./useAuthForm";
import { useTheme } from "@/app/ThemeContext";
import { SegmentedTabs } from "@/components/SegmentedTabs";

export default function AuthPage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const {
    mode,
    message,
    pending,
    busy,
    switchMode,
    handleSubmit,
  } = useAuthForm();

  useGSAP(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 16,
      duration: 0.45,
      ease: "power2.out",
    });
  }, [mode]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-4 py-12">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition-colors hover:bg-[var(--surface-muted)] sm:right-6 sm:top-6"
      >
        {theme === "dark" ? (
          <Sun className="size-4 text-amber-300" />
        ) : (
          <Moon className="size-4" />
        )}
      </button>

      <div
        ref={cardRef}
        className="rubric-card w-full max-w-[420px] rounded-[28px] p-6 shadow-[0_20px_60px_color-mix(in_srgb,var(--foreground)_6%,transparent)] sm:p-8"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <Image
            src="/logo.svg"
            alt="KwizKit"
            width={36}
            height={36}
            priority
            unoptimized
            className="auth-logo mb-3"
          />
          <h1 className="text-2xl font-medium tracking-tight text-[var(--foreground)]">
            {mode === "sign-in" ? "Welcome back." : "Create your account."}
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {mode === "sign-in"
              ? "Sign in with your email or username."
              : "A few details and you are in."}
          </p>
        </div>

        <SegmentedTabs
          className="mb-6"
          stretch
          value={mode}
          onChange={(m) => {
            setShowPassword(false);
            switchMode(m);
          }}
          items={[
            { id: "sign-in", label: "Sign in" },
            { id: "sign-up", label: "Sign up" },
          ]}
        />

        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit(new FormData(e.currentTarget));
          }}
        >
          {mode === "sign-up" && (
            <>
              <Field label="Name">
                <InputIcon icon={<IoPersonOutline className="size-4" />} />
                <input
                  name="name"
                  type="text"
                  placeholder="Ada Lovelace"
                  autoComplete="name"
                  required
                  className="theme-input pl-11"
                />
              </Field>
              <Field label="Username">
                <InputIcon icon={<User className="size-4" />} />
                <input
                  name="username"
                  type="text"
                  placeholder="adalove"
                  autoComplete="username"
                  required
                  className="theme-input pl-11"
                />
              </Field>
            </>
          )}

          <Field label={mode === "sign-in" ? "Email or username" : "Email"}>
            <InputIcon icon={<Mail className="size-4" />} />
            <input
              name={mode === "sign-in" ? "identifier" : "email"}
              type={mode === "sign-in" ? "text" : "email"}
              placeholder="you@example.com"
              autoComplete={mode === "sign-in" ? "username" : "email"}
              required
              className="theme-input pl-11"
            />
          </Field>

          <Field label="Password">
            <InputIcon icon={<Lock className="size-4" />} />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder={mode === "sign-up" ? "At least 8 characters" : "••••••••"}
              autoComplete={
                mode === "sign-in" ? "current-password" : "new-password"
              }
              minLength={mode === "sign-up" ? 8 : undefined}
              required
              className="theme-input px-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword((open) => !open)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </Field>

          {mode === "sign-in" && (
            <div className="-mt-1 text-right">
              <a
                href="/forgot-password"
                className="text-xs text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              >
                Forgot password?
              </a>
            </div>
          )}

          {message && (
            <p
              role="alert"
              className="rounded-full border border-[var(--rubric-danger)]/25 bg-[color-mix(in_srgb,var(--rubric-danger)_8%,transparent)] px-5 py-3 text-center text-sm text-[var(--rubric-danger)]"
            >
              {message}
            </p>
          )}

          <RubricButton
            type="submit"
            className="mt-1 w-full justify-center"
            disabled={busy}
          >
            {pending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : mode === "sign-in" ? (
              "Sign in"
            ) : (
              "Create account"
            )}
            {!pending && <ArrowRight className="size-4" />}
          </RubricButton>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="px-1 text-sm font-medium text-[var(--foreground)]">
        {label}
      </span>
      <div className="relative flex items-center">{children}</div>
    </label>
  );
}

function InputIcon({ icon }: { icon: ReactNode }) {
  return (
    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]">
      {icon}
    </span>
  );
}
