import { publishRoomEvent, publishStudentRoomEvent } from "@/server/lib/sse-hub";
import { liveStreamRoomId, parseStudentIdFromParticipantIdentity } from "@/server/lib/stream";
import { fail, ok } from "@/server/lib/response";
import type { MentionRef } from "@/server/types/monitor-events";
import type { SessionUser } from "./checkAccount";
import prisma from "@/server/lib/prisma";
import { cacheChatMessage, getCachedChatMessages, publishChatViaQStash } from "./liveCacheService";
import { getProctorMonitorContext } from "./streamService";

async function assertProctorRoom(testSlug: string, user: SessionUser) {
  const context = await getProctorMonitorContext(testSlug, user);
  if (!context) {
    return null;
  }
  return context;
}

export async function sendProctorBroadcast(
  testSlug: string,
  user: SessionUser,
  message: string,
  mentions: MentionRef[] = []
) {
  const context = await assertProctorRoom(testSlug, user);
  if (!context) {
    return fail(403, "Not allowed.");
  }

  const trimmed = message.trim();
  if (!trimmed) {
    return fail(400, "Message cannot be empty.");
  }

  const proctorName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email || "Proctor";
  const timestamp = Date.now();
  const normalizedMentions = mentions.filter(
    (mention, index, list) =>
      mention.participantId &&
      mention.name &&
      list.findIndex((item) => item.participantId === mention.participantId) === index
  );

  const broadcast = {
    type: "broadcast" as const,
    message: trimmed,
    from: proctorName,
    mentions: normalizedMentions,
    timestamp,
  };

  const cachedMessage = {
    id: `chat-${timestamp}-${Math.random().toString(36).slice(2, 8)}`,
    ...broadcast,
  };

  // Persist to Upstash Redis first, then optionally fan-out via QStash.
  await cacheChatMessage(context.test.id, cachedMessage);
  await publishChatViaQStash(context.test.id, cachedMessage);

  await publishRoomEvent(context.roomId, broadcast);
  await publishStudentRoomEvent(context.roomId, broadcast);

  return ok("Broadcast sent.", { timestamp, id: cachedMessage.id });
}

export async function getRoomChatHistory(testSlug: string, user: SessionUser) {
  const context = await assertProctorRoom(testSlug, user);
  if (!context) {
    return fail(403, "Not allowed.", [] as Awaited<ReturnType<typeof getCachedChatMessages>>);
  }

  const messages = await getCachedChatMessages(context.test.id);
  return ok("Chat history loaded.", messages);
}

export async function getStudentChatHistory({
  testSlug,
  attemptId,
  participantId,
}: {
  testSlug: string;
  attemptId: string;
  participantId: string;
}) {
  const access = await validateStudentEventAccess({ testSlug, attemptId, participantId });
  if (!access) {
    return fail(403, "Not allowed.", [] as Awaited<ReturnType<typeof getCachedChatMessages>>);
  }

  const test = await prisma.test.findUnique({
    where: { slug: testSlug },
    select: { id: true },
  });

  if (!test) {
    return fail(404, "Test not found.", []);
  }

  const messages = await getCachedChatMessages(test.id);
  return ok("Chat history loaded.", messages);
}

export async function validateStudentEventAccess({
  testSlug,
  attemptId,
  participantId,
}: {
  testSlug: string;
  attemptId: string;
  participantId: string;
}) {
  if (!testSlug || !attemptId || !participantId) {
    return null;
  }

  const parsedStudentId = parseStudentIdFromParticipantIdentity(participantId);
  if (!parsedStudentId) {
    return null;
  }

  const attempt = await prisma.liveTestAttempt.findFirst({
    where: {
      id: attemptId,
      submittedAt: null,
      studentId: parsedStudentId,
      test: {
        slug: testSlug,
        visibility: true,
      },
    },
    select: {
      test: {
        select: { id: true },
      },
    },
  });

  if (!attempt) {
    return null;
  }

  return {
    roomId: liveStreamRoomId(attempt.test.id),
    participantId,
  };
}

export async function resolveProctorRoomStream(testSlug: string, user: SessionUser) {
  return assertProctorRoom(testSlug, user);
}
