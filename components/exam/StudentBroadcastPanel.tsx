"use client";

import { useMemo, useRef, useState } from"react";
import { PiAt, PiMegaphoneSimple, PiShieldWarning } from"react-icons/pi";
import { useChatAutoScroll } from"@/hooks/useChatAutoScroll";
import type { StudentBroadcastItem, StudentNoticeItem } from"@/lib/monitor-events";
import { RoomChatMessage } from"@/components/exam/RoomChatMessage";
import type { ProctorActionType } from"@/lib/violation";

type StudentBroadcastPanelProps = {
 messages: StudentBroadcastItem[];
 notices?: StudentNoticeItem[];
};

type Filter ="all"|"mentions"|"notices";

const NOTICE_LABELS: Record<ProctorActionType, string> = {
 WARN:"Warning",
 DEDUCT_MARKS:"Marks deducted",
 REDUCE_TIME:"Time reduced",
 END_SESSION:"Session ending",
 DISMISS:"Dismissed",
} as const;

function formatNoticeBody(notice: StudentNoticeItem) {
 const { action } = notice;
 const label = NOTICE_LABELS[action.type];

 if (action.type ==="DEDUCT_MARKS") {
 return`${label}: -${action.value ?? 0} marks. ${action.reason}`;
 }
 if (action.type ==="REDUCE_TIME") {
 return`${label}: -${action.value ?? 0}s. ${action.reason}`;
 }
 return`${label}: ${action.reason}`;
}

export function StudentBroadcastPanel({ messages, notices = [] }: StudentBroadcastPanelProps) {
 const [filter, setFilter] = useState<Filter>("all");
 const feedRef = useRef<HTMLDivElement>(null);

 const mentionCount = useMemo(
 () => messages.filter((message) => message.isMention).length,
 [messages]
 );

 const visibleItems = useMemo(() => {
 if (filter ==="mentions") {
 return messages
 .filter((message) => message.isMention)
 .map((item) => ({ kind:"message"as const, item, timestamp: item.timestamp }));
 }

 if (filter ==="notices") {
 return notices.map((item) => ({ kind:"notice"as const, item, timestamp: item.timestamp }));
 }

 const merged = [
 ...messages.map((item) => ({ kind:"message"as const, item, timestamp: item.timestamp })),
 ...notices.map((item) => ({ kind:"notice"as const, item, timestamp: item.timestamp })),
 ];

 return merged.sort((a, b) => b.timestamp - a.timestamp);
 }, [filter, messages, notices]);

 const scrollKey = visibleItems.length > 0 ?`${visibleItems[0]!.kind}-${visibleItems[0]!.timestamp}`: null;
 useChatAutoScroll(feedRef, scrollKey,"top");

 return (
 <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)]">
 <div className="border-b border-[var(--border)] px-3 py-3">
 <div className="flex items-center gap-2">
 <PiMegaphoneSimple className="h-4 w-4 text-[var(--rubric-accent)]"/>
 <h3 className="text-sm font-semibold">Room feed</h3>
 </div>
 <div className="mt-3 flex flex-wrap gap-2">
 <button
 type="button"
 onClick={() => setFilter("all")}
 className={`rounded-full px-3 py-1 text-xs font-semibold ${
 filter ==="all"
 ?"bg-[var(--foreground)] text-[var(--background)]"
 :"border border-[var(--border)] bg-[var(--surface-strong)] text-[var(--muted)]"
 }`}
 >
 All
 </button>
 <button
 type="button"
 onClick={() => setFilter("mentions")}
 className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
 filter ==="mentions"
 ?"bg-[#6d28d9] text-white"
 :"border border-[var(--border)] bg-[var(--surface-strong)] text-[var(--muted)]"
 }`}
 >
 <PiAt className="h-3.5 w-3.5"/>
 For you
 {mentionCount > 0 && (
 <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">
 {mentionCount}
 </span>
 )}
 </button>
 <button
 type="button"
 onClick={() => setFilter("notices")}
 className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
 filter ==="notices"
 ?"bg-[var(--rubric-warning)] text-white"
 :"border border-[var(--border)] bg-[var(--surface-strong)] text-[var(--muted)]"
 }`}
 >
 <PiShieldWarning className="h-3.5 w-3.5"/>
 Notices
 {notices.length > 0 && (
 <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">
 {notices.length}
 </span>
 )}
 </button>
 </div>
 </div>

 <div ref={feedRef} className="min-h-0 flex-1 space-y-2 overflow-y-auto p-3">
 {visibleItems.length === 0 ? (
 <p className="rounded-xl border border-dashed border-[var(--border)] px-3 py-8 text-center text-xs text-[var(--rubric-muted)]">
 {filter ==="mentions"
 ?"No direct mentions yet."
 : filter ==="notices"
 ?"No proctor notices yet."
 :"Waiting for proctor messages..."}
 </p>
 ) : (
 visibleItems.map((entry) =>
 entry.kind ==="notice"? (
 <RoomChatMessage
 key={entry.item.id}
 variant="notice"
 title="Proctor notice"
 body={formatNoticeBody(entry.item)}
 timestamp={entry.item.timestamp}
 />
 ) : (
 <RoomChatMessage
 key={entry.item.id}
 variant={entry.item.isMention ?"mention":"broadcast"}
 title={entry.item.from}
 body={entry.item.message}
 mentions={entry.item.mentions}
 timestamp={entry.item.timestamp}
 />
 )
 )
 )}
 </div>
 </section>
 );
}
