import type { MentionRef } from"@/lib/monitor-events";

export function formatChatTime(timestamp: number) {
 return new Date(timestamp).toLocaleTimeString([], {
 hour:"2-digit",
 minute:"2-digit",
 });
}

export function messageMentionsParticipant(
 mentions: MentionRef[] | undefined,
 participantId: string
) {
 return mentions?.some((mention) => mention.participantId === participantId) ?? false;
}

export function highlightMentions(message: string, mentions: MentionRef[] = []) {
 if (mentions.length === 0) {
 return [{ text: message, mention: false }];
 }

 const sorted = [...mentions].sort((a, b) => b.name.length - a.name.length);
 const parts: Array<{ text: string; mention: boolean }> = [];
 let cursor = 0;

 while (cursor < message.length) {
 let nextMatch: { index: number; mention: MentionRef } | null = null;

 for (const mention of sorted) {
 const token =`@${mention.name}`;
 const index = message.indexOf(token, cursor);
 if (index === -1) continue;
 if (!nextMatch || index < nextMatch.index) {
 nextMatch = { index, mention };
 }
 }

 if (!nextMatch) {
 parts.push({ text: message.slice(cursor), mention: false });
 break;
 }

 if (nextMatch.index > cursor) {
 parts.push({ text: message.slice(cursor, nextMatch.index), mention: false });
 }

 parts.push({
 text:`@${nextMatch.mention.name}`,
 mention: true,
 });

 cursor = nextMatch.index +`@${nextMatch.mention.name}`.length;
 }

 return parts.length > 0 ? parts : [{ text: message, mention: false }];
}
