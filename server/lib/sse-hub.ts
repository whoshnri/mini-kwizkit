import type {
  MonitorSSEEnvelope,
  RoomMonitorEvent,
  StudentRoomEvent,
} from "@/server/types/monitor-events";

type SSEWriter = {
  id: string;
  write: (payload: MonitorSSEEnvelope) => Promise<void>;
  close: () => void;
};

const roomSubscribers = new Map<string, Set<SSEWriter>>();
const studentRoomSubscribers = new Map<string, Set<SSEWriter>>();

function getOrCreateSet<T>(map: Map<string, Set<T>>, key: string) {
  let set = map.get(key);
  if (!set) {
    set = new Set();
    map.set(key, set);
  }
  return set;
}

function removeSubscriber(map: Map<string, Set<SSEWriter>>, key: string, writer: SSEWriter) {
  const set = map.get(key);
  if (!set) return;
  set.delete(writer);
  if (set.size === 0) {
    map.delete(key);
  }
}

async function publishToSet(
  subscribers: Set<SSEWriter> | undefined,
  payload: MonitorSSEEnvelope
): Promise<number> {
  if (!subscribers?.size) return 0;

  let delivered = 0;

  await Promise.all(
    [...subscribers].map(async (subscriber) => {
      try {
        await subscriber.write(payload);
        delivered += 1;
      } catch {
        subscriber.close();
      }
    })
  );

  return delivered;
}

export function subscribeRoomEvents(roomId: string, writer: SSEWriter) {
  getOrCreateSet(roomSubscribers, roomId).add(writer);
  return () => removeSubscriber(roomSubscribers, roomId, writer);
}

export function subscribeStudentRoomEvents(roomId: string, writer: SSEWriter) {
  getOrCreateSet(studentRoomSubscribers, roomId).add(writer);
  return () => removeSubscriber(studentRoomSubscribers, roomId, writer);
}

export async function publishRoomEvent(roomId: string, event: RoomMonitorEvent) {
  return publishToSet(roomSubscribers.get(roomId), { channel: "room", event });
}

export async function publishStudentRoomEvent(roomId: string, event: StudentRoomEvent) {
  return publishToSet(studentRoomSubscribers.get(roomId), { channel: "student_room", event });
}
