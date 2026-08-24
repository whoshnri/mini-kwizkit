"use client";

import { useCallback, useEffect, useRef } from "react";

type Participant = {
  id: string;
  name: string;
  page: number;
};

type RoomSocketOptions = {
  roomId: string;
  participantId: string;
  name: string;
  role: "student" | "proctor";
  onParticipantList?: (participants: Participant[]) => void;
  onParticipantLeft?: (id: string) => void;
  onPageAck?: (page: number) => void;
};

export function useRoomSocket(_opts: RoomSocketOptions) {
  const optsRef = useRef(_opts);

  useEffect(() => {
    optsRef.current = _opts;
  }, [_opts]);

  const sendPageChange = useCallback((_page: number, _visibleIds: string[]) => {
    return;
  }, []);

  return { sendPageChange };
}
