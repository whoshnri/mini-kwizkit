"use client";

import { useMemo, useRef, useState } from"react";
import { PiPaperPlaneTilt } from"react-icons/pi";
import { useChatAutoScroll } from"@/hooks/useChatAutoScroll";
import type { MentionParticipant, MentionRef, MonitorFeedItem } from"@/lib/monitor-events";
import { VIOLATION_LABEL } from"@/lib/violation";
import { RoomChatMessage } from"@/components/exam/RoomChatMessage";

type ProctorChatPanelProps = {
 feed: MonitorFeedItem[];
 participants: MentionParticipant[];
 onBroadcast: (
 message: string,
 mentions: MentionRef[]
 ) => Promise<{ ok: boolean; message?: string }>;
};

function feedVariant(item: MonitorFeedItem):"join"|"leave"|"broadcast"{
 switch (item.type) {
 case"student_joined":
 return"join";
 case"student_left":
 return"leave";
 default:
 return"broadcast";
 }
}

export function ProctorChatPanel({ feed, participants, onBroadcast }: ProctorChatPanelProps) {
 const [activeTab, setActiveTab] = useState<"log"|"violations"|"chat">("log");
 const [message, setMessage] = useState("");
 const [mentions, setMentions] = useState<MentionRef[]>([]);
 const [broadcastError, setBroadcastError] = useState<string | null>(null);
 const [sending, setSending] = useState(false);
 const [mentionQuery, setMentionQuery] = useState<string | null>(null);
 const [mentionIndex, setMentionIndex] = useState(0);
 const feedRef = useRef<HTMLDivElement>(null);
 const textareaRef = useRef<HTMLTextAreaElement>(null);

 const mentionCandidates = useMemo(() => {
 if (mentionQuery === null) return [];
 const query = mentionQuery.toLowerCase();
 return participants.filter((participant) =>
 participant.name.toLowerCase().includes(query)
 );
 }, [mentionQuery, participants]);

 const filteredFeed = useMemo(() => {
 return feed.filter((item) => {
 if (activeTab ==="log") {
 return (
 item.type ==="student_joined"||
 item.type ==="student_left"||
 item.type ==="proctor_action_applied"
 );
 }
 if (activeTab ==="violations") {
 return item.type ==="violation";
 }
 if (activeTab ==="chat") {
 return item.type ==="broadcast";
 }
 return true;
 });
 }, [feed, activeTab]);

 const feedEndKey = filteredFeed.length > 0 ? filteredFeed[filteredFeed.length - 1]!.id : null;
 useChatAutoScroll(feedRef, feedEndKey);

 function updateMentionState(value: string, cursor: number) {
 const beforeCursor = value.slice(0, cursor);
 const match = beforeCursor.match(/@([^\n@]*)$/);
 if (!match) {
 setMentionQuery(null);
 setMentionIndex(0);
 return;
 }
 setMentionQuery(match[1] ??"");
 setMentionIndex(0);
 }

 function insertMention(participant: MentionParticipant) {
 const textarea = textareaRef.current;
 if (!textarea) return;

 const cursor = textarea.selectionStart;
 const beforeCursor = message.slice(0, cursor);
 const afterCursor = message.slice(cursor);
 const atIndex = beforeCursor.lastIndexOf("@");
 if (atIndex === -1) return;

 const nextMessage =`${message.slice(0, atIndex)}@${participant.name} ${afterCursor}`;
 setMessage(nextMessage);
 setMentions((current) =>
 current.some((item) => item.participantId === participant.participantId)
 ? current
 : [...current, { participantId: participant.participantId, name: participant.name }]
 );
 setMentionQuery(null);
 setMentionIndex(0);

 requestAnimationFrame(() => {
 const nextCursor = atIndex + participant.name.length + 2;
 textarea.focus();
 textarea.setSelectionRange(nextCursor, nextCursor);
 });
 }

 async function handleSubmit(event: React.FormEvent) {
 event.preventDefault();
 const trimmed = message.trim();
 if (!trimmed || sending) {
 return;
 }

 setSending(true);
 setBroadcastError(null);

 const activeMentions = mentions.filter((mention) =>
 trimmed.includes(`@${mention.name}`)
 );

 const result = await onBroadcast(trimmed, activeMentions);
 if (result.ok) {
 setMessage("");
 setMentions([]);
 setMentionQuery(null);
 } else {
 setBroadcastError(result.message ??"Could not send broadcast.");
 }

 setSending(false);
 }

 return (
 <aside className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)]">
 <div className="border-b border-[var(--border)] px-4 py-3 shrink-0">
 <div className="flex items-center justify-between">
 <h2 className="text-sm font-bold uppercase text-[var(--foreground)]">Room Monitor Panel</h2>
 </div>
 
 <div className="mt-3 flex gap-1 rounded-xl bg-[var(--surface-muted)] p-1">
 <button
 type="button"
 onClick={() => setActiveTab("log")}
 className={`flex-1 rounded-lg py-1.5 text-center text-sm font-bold transition duration-150 ${
 activeTab ==="log"
 ?"bg-[var(--surface-strong)] text-[var(--foreground)] shadow-xs"
 :"text-[var(--rubric-muted)] hover:text-[var(--foreground)]"
 }`}
 >
 Activity Logs
 </button>
 <button
 type="button"
 onClick={() => setActiveTab("violations")}
 className={`flex-1 rounded-lg py-1.5 text-center text-sm font-bold transition duration-150 ${
 activeTab ==="violations"
 ?"bg-[var(--surface-strong)] text-[var(--foreground)] shadow-xs"
 :"text-[var(--rubric-muted)] hover:text-[var(--foreground)]"
 }`}
 >
 Alerts
 </button>
 <button
 type="button"
 onClick={() => setActiveTab("chat")}
 className={`flex-1 rounded-lg py-1.5 text-center text-sm font-bold transition duration-150 ${
 activeTab ==="chat"
 ?"bg-[var(--surface-strong)] text-[var(--foreground)] shadow-xs"
 :"text-[var(--rubric-muted)] hover:text-[var(--foreground)]"
 }`}
 >
 Broadcast
 </button>
 </div>
 </div>

 <div ref={feedRef} className="min-h-0 flex-1 space-y-2 overflow-y-auto p-3">
 {filteredFeed.length === 0 ? (
 <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] px-4 py-8 text-center text-xs text-[var(--rubric-muted)]">
 {activeTab ==="log"&& (
 <>
 <p className="font-semibold">No activity logged yet</p>
 <p className="mt-1 text-[10px]">Student join/leave events and applied actions will show up here.</p>
 </>
 )}
 {activeTab ==="violations"&& (
 <>
 <p className="font-semibold text-[var(--rubric-success)]">All systems clear</p>
 <p className="mt-1 text-[10px]">No AI flags or tab-switching activity has been reported yet.</p>
 </>
 )}
 {activeTab ==="chat"&& (
 <>
 <p className="font-semibold">No broadcasts sent</p>
 <p className="mt-1 text-[10px]">Use the input form below to send warnings or messages to students.</p>
 </>
 )}
 </div>
 ) : (
 filteredFeed.map((item) => {
 if (item.type ==="student_joined") {
 return (
 <RoomChatMessage
 key={item.id}
 variant="join"
 title={item.name}
 body={`${item.name} joined the room`}
 timestamp={item.timestamp}
 />
 );
 }

 if (item.type ==="student_left") {
 return (
 <RoomChatMessage
 key={item.id}
 variant="leave"
 title={item.name}
 body={`${item.name} left the room`}
 timestamp={item.timestamp}
 />
 );
 }

 if (item.type ==="violation") {
 const bodyText = item.flag.type ==="TAB_SWITCH"
 ?"switched tabs"
 :`${VIOLATION_LABEL[item.flag.type]} — ${item.flag.detail}`;
 return (
 <RoomChatMessage
 key={item.id}
 variant="violation"
 title={item.studentName}
 body={bodyText}
 timestamp={item.timestamp}
 />
 );
 }

 if (item.type ==="proctor_action_applied") {
 return (
 <RoomChatMessage
 key={item.id}
 variant="broadcast"
 title="Proctor action"
 body={`${item.studentName}: ${item.action.reason}`}
 timestamp={item.timestamp}
 />
 );
 }

 return (
 <RoomChatMessage
 key={item.id}
 variant={feedVariant(item)}
 title={item.from}
 body={item.message}
 mentions={item.mentions ?? []}
 timestamp={item.timestamp}
 />
 );
 })
 )}
 </div>

 {activeTab ==="chat"&& (
 <form onSubmit={handleSubmit} className="relative border-t border-[var(--border)] p-3 shrink-0">
 {mentionQuery !== null && mentionCandidates.length > 0 && (
 <div className="absolute bottom-full left-3 right-3 z-50 mb-2 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] shadow-lg">
 <p className="border-b border-[var(--border)] px-3 py-2 text-[10px] font-semibold uppercase text-[var(--rubric-muted)]">
 Mention participant
 </p>
 <ul className="max-h-40 overflow-y-auto">
 {mentionCandidates.map((participant, index) => (
 <li key={participant.participantId}>
 <button
 type="button"
 onMouseDown={(event) => {
 event.preventDefault();
 insertMention(participant);
 }}
 className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs hover:bg-[var(--surface-muted)] ${
 index === mentionIndex ?"bg-[var(--surface-muted)]":""
 }`}
 >
 <span className="font-semibold text-[var(--foreground)]">{participant.name}</span>
 <span className="text-[10px] text-[var(--rubric-muted)]">@{participant.name}</span>
 </button>
 </li>
 ))}
 </ul>
 </div>
 )}

 <textarea
 ref={textareaRef}
 value={message}
 onChange={(event) => {
 setMessage(event.target.value);
 updateMentionState(event.target.value, event.target.selectionStart);
 }}
 onKeyDown={(event) => {
 if (mentionQuery !== null && mentionCandidates.length > 0) {
 if (event.key ==="ArrowDown") {
 event.preventDefault();
 setMentionIndex((current) => (current + 1) % mentionCandidates.length);
 } else if (event.key ==="ArrowUp") {
 event.preventDefault();
 setMentionIndex(
 (current) => (current - 1 + mentionCandidates.length) % mentionCandidates.length
 );
 } else if (event.key ==="Enter"&& !event.shiftKey) {
 event.preventDefault();
 insertMention(mentionCandidates[mentionIndex]!);
 return;
 }
 }

 if (event.key ==="Enter"&& !event.shiftKey) {
 event.preventDefault();
 void handleSubmit(event);
 }
 }}
 rows={3}
 placeholder="Message everyone... type @ to mention a student"
 className="w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-xs text-[var(--foreground)] outline-none focus:border-[var(--foreground)]"
 />

 {broadcastError && (
 <p className="mt-2 text-xs text-[var(--rubric-danger)]">{broadcastError}</p>
 )}

 <button
 type="submit"
 disabled={sending || !message.trim()}
 className="rubric-button-primary mt-3 inline-flex w-full items-center justify-center gap-2 disabled:opacity-60 text-xs py-2"
 >
 <PiPaperPlaneTilt className="h-4 w-4"/>
 {sending ?"Sending...":"Send broadcast"}
 </button>
 </form>
 )}
 </aside>
 );
}
