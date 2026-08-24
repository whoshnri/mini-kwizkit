import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import type { User } from "@prisma/client";
import prisma from "./prisma";
import { env } from "./env";

export const SESSION_COOKIE = "kwizkit.session";
const SESSION_DAYS = 30;

export type AuthSession = {
  user: User;
  token: string;
};

export function readSessionToken(headers: Headers) {
  const cookie = headers.get("cookie") ?? "";
  const match = cookie.match(/(?:^|; )kwizkit\.session=([^;]+)/);
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

export async function createLoginSession(userId: string) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await prisma.loginSession.create({
    data: { token, expiresAt, userId },
  });
  return { token, expiresAt };
}

export async function findSessionUser(headers: Headers): Promise<AuthSession | null> {
  const token = readSessionToken(headers);
  if (!token) return null;

  const row = await prisma.loginSession.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!row || row.expiresAt < new Date()) {
    if (row) {
      await prisma.loginSession.delete({ where: { id: row.id } }).catch(() => null);
    }
    return null;
  }

  return { user: row.user, token };
}

export async function getAuthSession(headers: Headers) {
  try {
    return await findSessionUser(headers);
  } catch (error) {
    console.error("[auth] getSession failed", error);
    return null;
  }
}

export async function revokeSession(token: string) {
  await prisma.loginSession.deleteMany({ where: { token } });
}

export async function revokeOtherSessions(userId: string, keepToken: string) {
  await prisma.loginSession.deleteMany({
    where: { userId, token: { not: keepToken } },
  });
}

export async function attachSessionCookie(token: string, expiresAt: Date) {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: env.nodeEnv === "production",
    expires: expiresAt,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function requireUser(headers: Headers) {
  const session = await getAuthSession(headers);
  if (!session?.user) return null;
  return session;
}
