import type { CachedAttemptProgress, CachedChatMessage } from "./liveCacheTypes";

export type { CachedAttemptProgress, CachedChatMessage };

const chat = new Map<string, CachedChatMessage[]>();
const attempts = new Map<string, CachedAttemptProgress>();

export async function cacheChatMessage(testId: string, message: CachedChatMessage) {
  const list = chat.get(testId) ?? [];
  list.unshift(message);
  chat.set(testId, list.slice(0, 200));
}

export async function publishChatViaQStash(..._args: unknown[]) {
  return;
}

export async function getCachedChatMessages(testId: string) {
  return [...(chat.get(testId) ?? [])].reverse();
}

export async function upsertAttemptCache(progress: CachedAttemptProgress) {
  attempts.set(progress.attemptId, progress);
  return { cached: true as const, ttlSeconds: 3600, savedAt: progress.savedAt };
}

export async function getAttemptCache(attemptId: string) {
  return attempts.get(attemptId) ?? null;
}

export async function clearAttemptCache(attemptId: string) {
  attempts.delete(attemptId);
}
