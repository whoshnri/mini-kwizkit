"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";
import { publicErrorMessage } from "@/lib/public-error";

export type AuthMode = "sign-in" | "sign-up";

const dashboardURL = "/dashboard";

async function waitForPostAuthURL() {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const response = await fetch("/api/auth/session", {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });
    const data = await response.json().catch(() => ({}));

    if (data?.account) {
      return dashboardURL;
    }

    await new Promise((resolve) => setTimeout(resolve, 150));
  }

  return dashboardURL;
}

export function useAuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setMessage(null);
  }

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setMessage(null);

    try {
      if (mode === "sign-in") {
        const identifier = String(formData.get("identifier") ?? "").trim();
        const password = String(formData.get("password") ?? "");

        if (!identifier || !password) {
          throw new Error("Enter your email or username and password.");
        }

        const response = await signIn({ identifier, password });
        if (!response.ok) {
          throw new Error(response.error || "Sign-in failed.");
        }

        router.replace(await waitForPostAuthURL());
        router.refresh();
        return;
      }

      const name = String(formData.get("name") ?? "").trim();
      const username = String(formData.get("username") ?? "").trim();
      const email = String(formData.get("email") ?? "").trim();
      const password = String(formData.get("password") ?? "");

      if (!name || !username || !email || !password) {
        throw new Error("Fill in all fields to create your account.");
      }

      const response = await signUp({ name, username, email, password });
      if (!response.ok) {
        throw new Error(response.error || "Sign-up failed.");
      }

      router.replace(await waitForPostAuthURL());
      router.refresh();
    } catch (error) {
      setMessage(publicErrorMessage(error, "Something went wrong."));
    } finally {
      setPending(false);
    }
  }

  return {
    mode,
    message,
    pending,
    busy: pending,
    switchMode,
    handleSubmit,
  };
}
