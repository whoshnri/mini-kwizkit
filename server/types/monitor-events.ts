import type { ProctorAction, ViolationFlag } from "./violation";

export type MentionRef = {
  participantId: string;
  name: string;
};

export type RoomMonitorEvent =
  | {
      type: "student_joined";
      participantId: string;
      name: string;
      timestamp: number;
    }
  | {
      type: "student_left";
      participantId: string;
      name: string;
      timestamp: number;
    }
  | {
      type: "broadcast";
      message: string;
      from: string;
      mentions: MentionRef[];
      timestamp: number;
    }
  | {
      type: "violation";
      participantId: string;
      studentName: string;
      flag: ViolationFlag;
      timestamp: number;
    }
  | {
      type: "proctor_action_applied";
      participantId: string;
      studentName: string;
      action: ProctorAction;
      timestamp: number;
    };

export type StudentRoomEvent =
  | {
      type: "broadcast";
      message: string;
      from: string;
      mentions: MentionRef[];
      timestamp: number;
    }
  | {
      type: "proctor_action";
      participantId: string;
      action: ProctorAction;
      timestamp: number;
    };

export type MonitorSSEEnvelope =
  | { channel: "room"; event: RoomMonitorEvent }
  | { channel: "student_room"; event: StudentRoomEvent };
