import type { RoomMonitorEvent } from "../types/monitor-events";

export type CachedAttemptProgress = {
  attemptId: string;
  testSlug: string;
  answers: Record<string, string | number | null>;
  flagged: string[];
  currentIndex: number;
  secondsRemaining: number;
  savedAt: string;
};

export type CachedChatMessage = Extract<RoomMonitorEvent, { type: "broadcast" }> & {
  id: string;
};
