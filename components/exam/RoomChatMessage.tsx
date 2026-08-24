"use client";

import type { MentionRef } from"@/lib/monitor-events";
import { formatChatTime, highlightMentions } from"@/lib/room-chat-utils";

type RoomChatMessageProps = {
 variant:"join"|"leave"|"broadcast"|"mention"|"notice"|"violation";
 title: string;
 body?: string;
 mentions?: MentionRef[];
 timestamp: number;
};

const VARIANT_STYLES = {
 join: {
 shell:"border-[rgba(47,107,79,0.25)] bg-[rgba(47,107,79,0.05)] dark:bg-[rgba(47,107,79,0.08)]",
 title:"text-[var(--rubric-success)] font-bold",
 badge:"bg-[rgba(47,107,79,0.15)] text-[var(--rubric-success)]",
 label:"Joined",
 },
 leave: {
 shell:"border-[rgba(100,116,139,0.25)] bg-[rgba(100,116,139,0.05)] dark:bg-[rgba(100,116,139,0.08)]",
 title:"text-[var(--muted)] font-bold",
 badge:"bg-[rgba(100,116,139,0.12)] text-[var(--muted)]",
 label:"Left",
 },
 broadcast: {
 shell:"border-[rgba(59,130,246,0.22)] bg-[rgba(59,130,246,0.05)] dark:bg-[rgba(59,130,246,0.08)]",
 title:"text-[var(--rubric-info)] font-bold",
 badge:"bg-[rgba(59,130,246,0.14)] text-[var(--rubric-info)]",
 label:"Broadcast",
 },
 mention: {
 shell:"border-[rgba(124,58,237,0.28)] bg-[rgba(124,58,237,0.06)] dark:bg-[rgba(124,58,237,0.1)]",
 title:"text-[rgb(167,139,250)] font-bold dark:text-[rgb(196,181,253)]",
 badge:"bg-[rgba(124,58,237,0.16)] text-[rgb(167,139,250)]",
 label:"For you",
 },
 notice: {
 shell:"border-[rgba(161,98,7,0.28)] bg-[rgba(161,98,7,0.06)] dark:bg-[rgba(161,98,7,0.1)]",
 title:"text-[var(--rubric-warning)] font-bold",
 badge:"bg-[rgba(161,98,7,0.16)] text-[var(--rubric-warning)]",
 label:"Notice",
 },
 violation: {
 shell:"border-[rgba(180,35,24,0.25)] bg-[rgba(180,35,24,0.05)] dark:bg-[rgba(180,35,24,0.08)]",
 title:"text-[var(--rubric-danger)] font-bold",
 badge:"bg-[rgba(180,35,24,0.15)] text-[var(--rubric-danger)]",
 label:"Alert",
 },
} as const;

export function RoomChatMessage({
 variant,
 title,
 body,
 mentions = [],
 timestamp,
}: RoomChatMessageProps) {
 const styles = VARIANT_STYLES[variant];
 const parts = body ? highlightMentions(body, mentions) : [];

 return (
 <article
 className={`rounded-xl border px-3 py-2 flex items-start justify-between gap-3 transition-all duration-200 ${styles.shell}`}
 >
 <div className="text-xs text-[var(--muted)] min-w-0 break-words">
 <span className={`font-bold mr-1.5 inline-block ${styles.title}`}>
 {title}
 </span>
 <span className="font-medium inline">
 {parts.map((part, index) =>
 part.mention ? (
 <span
 key={`${part.text}-${index}`}
 className="rounded-md bg-[rgba(124,58,237,0.14)] px-1 font-semibold text-[rgb(167,139,250)] dark:text-[rgb(196,181,253)]"
 >
 {part.text}
 </span>
 ) : (
 <span key={`${part.text}-${index}`}>{part.text}</span>
 ),
 )}
 </span>
 </div>
 <time className="shrink-0 text-[10px] text-[var(--rubric-muted)] font-semibold mt-0.5">
 {formatChatTime(timestamp)}
 </time>
 </article>
 );
}
