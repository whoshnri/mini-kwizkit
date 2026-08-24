"use server";

import { AUTH_REQUIRED, requireActionUser } from "@/server/lib/action-session";
import type { ProctorAction } from "@/lib/violation";
import {
  applyProctorAction,
  getProctorViolationHistory as loadViolations,
} from "@/server/services/proctoringService";

type ActionResult<T = null> = {
  status: number;
  message: string;
  metadata: T;
};

export async function getProctorViolationHistory(testSlug: string) {
  const user = await requireActionUser();
  if (!user) return { ...AUTH_REQUIRED, metadata: [] };

  return loadViolations(testSlug, user);
}

export async function sendProctorAction(
  testSlug: string,
  participantId: string,
  action?: ProctorAction,
  flagId?: string
) {
  const user = await requireActionUser();
  if (!user) return AUTH_REQUIRED;

  return applyProctorAction({
    testSlug,
    participantId,
    action,
    user,
    flagId,
  }) as Promise<ActionResult>;
}
