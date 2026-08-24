"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from"react";
import { getStudentChatHistory } from"@/app/actions/liveTestOps";
import { useMonitorSSE } from"@/hooks/useMonitorSSE";
import { liveSounds } from"@/lib/live-sounds";
import type { StudentBroadcastItem, StudentNoticeItem, StudentRoomEvent } from"@/lib/monitor-events";
import type { ProctorAction, ViolationFlag } from"@/lib/violation";
import { messageMentionsParticipant } from"@/lib/room-chat-utils";

type UseStudentBroadcastEventsOptions = {
 testSlug: string;
 attemptId: string;
 participantId: string;
 enabled?: boolean;
 initialViolationFlags?: ViolationFlag[];
 onProctorAction?: (action: ProctorAction) => void;
};

const MAX_MESSAGES = 100;
const MAX_NOTICES = 50;

function noticeFromAction(action: ProctorAction): StudentNoticeItem {
 return {
 id:`notice-${action.timestamp}-${action.type}`,
 type:"proctor_notice",
 action,
 timestamp: action.timestamp,
 };
}

function noticesFromViolationFlags(flags: ViolationFlag[]): StudentNoticeItem[] {
 return flags
 .filter((flag) => flag.action)
 .map((flag) => noticeFromAction(flag.action!))
 .sort((a, b) => b.timestamp - a.timestamp)
 .slice(0, MAX_NOTICES);
}

export function useStudentBroadcastEvents({
 testSlug,
 attemptId,
 participantId,
 enabled = true,
 initialViolationFlags = [],
 onProctorAction,
}: UseStudentBroadcastEventsOptions) {
 const [messages, setMessages] = useState<StudentBroadcastItem[]>([]);
 const [notices, setNotices] = useState<StudentNoticeItem[]>(() =>
 noticesFromViolationFlags(initialViolationFlags)
 );
 const [activeAction, setActiveAction] = useState<ProctorAction | null>(null);
 const [endCountdown, setEndCountdown] = useState(30);
 const onProctorActionRef = useRef(onProctorAction);
 onProctorActionRef.current = onProctorAction;
 const hydratedRef = useRef(false);

 useEffect(() => {
 setNotices(noticesFromViolationFlags(initialViolationFlags));
 }, [initialViolationFlags]);

 const sseUrl =
 enabled && attemptId && participantId
 ?`/api/stream/live/${encodeURIComponent(testSlug)}/events/room?attemptId=${encodeURIComponent(attemptId)}&participantId=${encodeURIComponent(participantId)}`
 : null;

 useEffect(() => {
 if (!enabled || !attemptId || !participantId || hydratedRef.current) return;

 let cancelled = false;
 hydratedRef.current = true;

 void getStudentChatHistory(testSlug, attemptId, participantId).then((response) => {
 if (cancelled || response.status !== 200 || !response.metadata) return;

 setMessages(
 response.metadata
 .map((item) => ({
 id: item.id,
 type:"broadcast"as const,
 message: item.message,
 from: item.from,
 mentions: item.mentions,
 timestamp: item.timestamp,
 isMention: messageMentionsParticipant(item.mentions, participantId),
 }))
 .reverse()
 .slice(0, MAX_MESSAGES)
 );
 });

 return () => {
 cancelled = true;
 };
 }, [attemptId, enabled, participantId, testSlug]);

 const handleEvent = useCallback(
 (_eventName: string, data: unknown) => {
 if (!data || typeof data !=="object") {
 return;
 }

 const event = data as StudentRoomEvent | { type:"ping"};
 if (event.type ==="ping") {
 return;
 }

 if (event.type ==="proctor_action") {
 if (event.participantId !== participantId) {
 return;
 }

 if (event.action.type ==="DISMISS") {
 setActiveAction(null);
 onProctorActionRef.current?.(event.action);
 return;
 }

 setNotices((current) => [noticeFromAction(event.action), ...current].slice(0, MAX_NOTICES));
 setActiveAction(event.action);
 onProctorActionRef.current?.(event.action);

 if (event.action.type ==="WARN") {
 liveSounds.message();
 } else if (event.action.type ==="END_SESSION") {
 setEndCountdown(30);
 } else {
 liveSounds.flag();
 }
 return;
 }

 const isMention = messageMentionsParticipant(event.mentions, participantId);
 liveSounds.message();

 setMessages((current) =>
 [
 {
 id:`${event.timestamp}-${Math.random().toString(36).slice(2, 8)}`,
 ...event,
 isMention,
 },
 ...current,
 ].slice(0, MAX_MESSAGES)
 );
 },
 [participantId]
 );

 useMonitorSSE(sseUrl, handleEvent, enabled);

 useEffect(() => {
 if (activeAction?.type !=="END_SESSION") return;

 const timer = window.setInterval(() => {
 setEndCountdown((current) => Math.max(current - 1, 0));
 }, 1000);

 return () => window.clearInterval(timer);
 }, [activeAction]);

 const dismissAction = useCallback(() => {
 if (activeAction?.type !=="END_SESSION") {
 setActiveAction(null);
 }
 }, [activeAction]);

 const mentionMessages = useMemo(
 () => messages.filter((message) => message.isMention),
 [messages]
 );

 return {
 messages,
 notices,
 mentionMessages,
 activeAction,
 endCountdown,
 dismissAction,
 };
}
