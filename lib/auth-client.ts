async function readJson<T extends { ok?: boolean; error?: string }>(
  response: Response,
  fallback: T
): Promise<T> {
  const data = await response.json().catch(() => null);
  if (!data || typeof data !== "object") {
    return fallback;
  }
  return data as T;
}

export async function signIn(input: {
  identifier: string;
  password: string;
}) {
  const response = await fetch("/api/auth/sign-in", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return readJson(response, {
    ok: false,
    error: "Sign-in failed. Please try again.",
  });
}

export async function signUp(input: {
  name: string;
  username: string;
  email: string;
  password: string;
}) {
  const response = await fetch("/api/auth/sign-up", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return readJson(response, {
    ok: false,
    error: "Sign-up failed. Please try again.",
  });
}

export async function signOut() {
  const response = await fetch("/api/auth/sign-out", {
    method: "POST",
    credentials: "include",
  });
  return readJson(response, { ok: true });
}

export async function changePassword(input: {
  currentPassword: string;
  newPassword: string;
  revokeOtherSessions?: boolean;
}) {
  const response = await fetch("/api/auth/change-password", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return readJson(response, {
    ok: false,
    error: "Could not update password.",
  });
}
