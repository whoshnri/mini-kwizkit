import type { ProctorAction, ViolationFlag } from"@/lib/violation";

export type MentionRef = {
 participantId: string;
 name: string;
};

export type RoomMonitorEvent =
 | {
 type:"student_joined";
 participantId: string;
 name: string;
 timestamp: number;
 }
 | {
 type:"student_left";
 participantId: string;
 name: string;
 timestamp: number;
 }
 | {
 type:"broadcast";
 message: string;
 from: string;
 mentions: MentionRef[];
 timestamp: number;
 }
 | {
 type:"violation";
 participantId: string;
 studentName: string;
 flag: ViolationFlag;
 timestamp: number;
 }
 | {
 type:"proctor_action_applied";
 participantId: string;
 studentName: string;
 action: ProctorAction;
 timestamp: number;
 };

export type StudentRoomEvent =
 | {
 type:"broadcast";
 message: string;
 from: string;
 mentions: MentionRef[];
 timestamp: number;
 }
 | {
 type:"proctor_action";
 participantId: string;
 action: ProctorAction;
 timestamp: number;
 };

export type MonitorFeedItem = { id: string } & RoomMonitorEvent;

export type StudentBroadcastItem = { id: string; isMention: boolean } & Extract<
 StudentRoomEvent,
 { type:"broadcast"}
>;

export type StudentNoticeItem = {
 id: string;
 type:"proctor_notice";
 action: ProctorAction;
 timestamp: number;
};

export type MentionParticipant = {
 participantId: string;
 name: string;
};
