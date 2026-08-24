"use server";

import { AUTH_REQUIRED, requireActionUser } from "@/server/lib/action-session";
import type { MentionRef } from "@/lib/monitor-events";
import {
  createProctorStreamToken as mintProctorToken,
  createStudentStreamToken as mintStudentToken,
  getProctorMonitorContext as loadProctorContext,
  getProctorRoster as loadRoster,
} from "@/server/services/streamService";
import {
  getRoomChatHistory,
  sendProctorBroadcast as broadcastProctorMessage,
} from "@/server/services/monitorEventsService";

type ActionResult<T = null> = {
  status: number;
  message: string;
  metadata: T;
};

type StreamTokenPayload = {
  token: string;
  roomId: string;
  participantId: string;
  name: string;
};

export async function createStudentStreamToken(
  testSlug: string,
  attemptId: string
): Promise<ActionResult<StreamTokenPayload | null>> {
  return mintStudentToken(testSlug, attemptId);
}

export async function createProctorStreamToken(
  testSlug: string
): Promise<ActionResult<StreamTokenPayload | null>> {
  const user = await requireActionUser();
  if (!user) return AUTH_REQUIRED;

  return mintProctorToken(testSlug, user);
}

export async function sendProctorBroadcast(
  testSlug: string,
  message: string,
  mentions: MentionRef[] = []
): Promise<ActionResult<{ timestamp: number } | null>> {
  const user = await requireActionUser();
  if (!user) return AUTH_REQUIRED;

  return broadcastProctorMessage(testSlug, user, message, mentions);
}

export async function getProctorChatHistory(testSlug: string) {
  const user = await requireActionUser();
  if (!user) return { ...AUTH_REQUIRED, metadata: [] };

  return getRoomChatHistory(testSlug, user);
}

export async function getProctorMonitorContext(testSlug: string) {
  const user = await requireActionUser();
  if (!user) return null;

  return loadProctorContext(testSlug, user);
}

export type ProctorRosterEntry = {
  participantId: string;
  name: string;
  email: string | null;
};

export async function getProctorRoster(testSlug: string) {
  const user = await requireActionUser();
  if (!user) return { ...AUTH_REQUIRED, metadata: [] as ProctorRosterEntry[] };

  return loadRoster(testSlug, user);
}

export async function getStreamRoomMetadata(testSlug: string) {
  const context = await getProctorMonitorContext(testSlug);
  if (!context) {
    return { status: 403, message: "Not allowed.", metadata: null };
  }

  return {
    status: 200,
    message: "Room metadata loaded.",
    metadata: { roomId: context.roomId },
  };
}
