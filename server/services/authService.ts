import prisma from "@/server/lib/prisma";
import { hashPassword, verifyPassword } from "@/server/lib/password";
import {
  createLoginSession,
  revokeOtherSessions,
  revokeSession,
} from "@/server/lib/session";

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] ?? null,
    lastName: parts.length > 1 ? parts.slice(1).join(" ") : null,
  };
}

export async function signUpUser(input: {
  name: string;
  username: string;
  email: string;
  password: string;
}) {
  const email = input.email.trim().toLowerCase();
  const username = input.username.trim().toLowerCase();
  const password = input.password;

  if (!email || !username || !input.name.trim() || !password) {
    return { error: "Fill in all fields to create your account.", status: 400 as const };
  }
  if (username.length < 3) {
    return { error: "Username must be at least 3 characters.", status: 400 as const };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters.", status: 400 as const };
  }

  const existing = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existing) {
    if (!existing.passwordHash && existing.email === email) {
      const { firstName, lastName } = splitName(input.name);
      const user = await prisma.user.update({
        where: { id: existing.id },
        data: {
          username,
          passwordHash: await hashPassword(password),
          firstName: existing.firstName || firstName,
          lastName: existing.lastName || lastName,
        },
      });
      const session = await createLoginSession(user.id);
      return { user, session };
    }

    return { error: "An account with that email or username already exists.", status: 409 as const };
  }

  const id = crypto.randomUUID();
  const { firstName, lastName } = splitName(input.name);

  const user = await prisma.user.create({
    data: {
      id,
      accountId: id,
      email,
      username,
      passwordHash: await hashPassword(password),
      firstName,
      lastName,
      isActive: true,
    },
  });

  const session = await createLoginSession(user.id);
  return { user, session };
}

export async function signInUser(input: { identifier: string; password: string }) {
  const identifier = input.identifier.trim().toLowerCase();
  if (!identifier || !input.password) {
    return { error: "Enter your email or username and password.", status: 400 as const };
  }

  const user = await prisma.user.findFirst({
    where: identifier.includes("@")
      ? { email: identifier }
      : { username: identifier },
  });

  if (!user?.passwordHash || !(await verifyPassword(input.password, user.passwordHash))) {
    return { error: "Invalid email, username, or password.", status: 401 as const };
  }

  const session = await createLoginSession(user.id);
  return { user, session };
}

export async function changeUserPassword(input: {
  userId: string;
  currentToken: string;
  currentPassword: string;
  newPassword: string;
  revokeOtherSessions?: boolean;
}) {
  if (input.newPassword.length < 8) {
    return { error: "New password must be at least 8 characters.", status: 400 as const };
  }

  const user = await prisma.user.findUnique({ where: { id: input.userId } });
  if (!user?.passwordHash || !(await verifyPassword(input.currentPassword, user.passwordHash))) {
    return { error: "Current password is incorrect.", status: 401 as const };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: await hashPassword(input.newPassword) },
  });

  if (input.revokeOtherSessions) {
    await revokeOtherSessions(user.id, input.currentToken);
  }

  return { ok: true as const };
}

export async function signOutUser(token: string | null) {
  if (token) await revokeSession(token);
}
