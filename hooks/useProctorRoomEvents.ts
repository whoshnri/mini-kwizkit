"use client";

import { useCallback, useEffect, useState } from"react";
import { getProctorViolationHistory, sendProctorAction } from"@/app/actions/proctoringOps";
import { getProctorChatHistory } from"@/app/actions/streamOps";
import { useMonitorSSE } from"@/hooks/useMonitorSSE";
import { liveSounds } from"@/lib/live-sounds";
import toast from "react-hot-toast";
import type { MonitorFeedItem, RoomMonitorEvent } from"@/lib/monitor-events";
import type { ProctorAction, ViolationFlag } from"@/lib/violation";

const MAX_FEED_ITEMS = 80;

export type ViolationMap = Record<string, ViolationFlag[]>;

function feedItemFromEvent(event: RoomMonitorEvent): MonitorFeedItem {
 return {
 id:`${event.type}-${event.timestamp}-${Math.random().toString(36).slice(2, 8)}`,
 ...event,
 };
}

export function useProctorRoomEvents(testSlug: string, enabled = true) {
 const [feed, setFeed] = useState<MonitorFeedItem[]>([]);
 const [violations, setViolations] = useState<ViolationMap>({});

 const sseUrl = enabled
 ?`/api/stream/proctor/${encodeURIComponent(testSlug)}/events/room`
 : null;

 useEffect(() => {
 if (!enabled) return;

 void getProctorViolationHistory(testSlug).then((response) => {
 if (response.status !== 200 || !response.metadata) return;

 const map: ViolationMap = {};
 for (const entry of response.metadata) {
 map[entry.participantId] = entry.violationFlags;
 }
 setViolations(map);
 });

 void getProctorChatHistory(testSlug).then((response) => {
 if (response.status !== 200 || !response.metadata) return;

 setFeed((current) => {
 const existingIds = new Set(current.map((item) => item.id));
 const history = response.metadata!
 .filter((item) => !existingIds.has(item.id))
 .map((item) => ({
 id: item.id,
 type:"broadcast"as const,
 message: item.message,
 from: item.from,
 mentions: item.mentions,
 timestamp: item.timestamp,
 }));
 return [...history, ...current].slice(-MAX_FEED_ITEMS);
 });
 });
 }, [enabled, testSlug]);

 const handleEvent = useCallback((_eventName: string, data: unknown) => {
 if (!data || typeof data !=="object") {
 return;
 }

 const event = data as RoomMonitorEvent | { type:"ping"};
 if (event.type ==="ping") {
 return;
 }

 setFeed((current) => [...current, feedItemFromEvent(event)].slice(-MAX_FEED_ITEMS));

 if (event.type ==="violation") {
 setViolations((current) => ({
 ...current,
 [event.participantId]: [...(current[event.participantId] ?? []), event.flag],
 }));
 liveSounds.flag();
 } else if (event.type ==="student_joined") {
 liveSounds.join();
 } else if (event.type ==="student_left") {
 liveSounds.leave();
 }
 }, []);

 useMonitorSSE(sseUrl, handleEvent, enabled);

 const handleAction = useCallback(
 async (participantId: string, action?: ProctorAction, flagId?: string) => {
 if (flagId) {
 setViolations((current) => {
 const list = current[participantId] ?? [];
 return {
 ...current,
 [participantId]: list.map((f) =>
 f.id === flagId ? { ...f, acknowledged: true, ...(action ? { action } : {}) } : f
 ),
 };
 });
 }

 const response = await sendProctorAction(testSlug, participantId, action, flagId);
 if (response.status !== 200) {
 toast.error(response.message || "Could not reach the student.");
 return response;
 }

 if (action) {
 toast.success("Sent to student.");
 }

 return response;
 },
 [testSlug]
 );

 return { feed, violations, handleAction };
}
