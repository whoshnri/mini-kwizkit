"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { PiArrowLeft } from "react-icons/pi";
import {
  createProctorStreamToken,
  getProctorRoster,
  sendProctorBroadcast,
  type ProctorRosterEntry,
} from "@/app/actions/streamOps";
import { LiveExamTimer } from "@/components/exam/LiveExamTimer";
import { useExamRoom } from "@/hooks/useExamRoom";
import { useProctorRoomEvents } from "@/hooks/useProctorRoomEvents";
import { useRoomSocket } from "@/hooks/useRoomSocket";
import { StreamGrid } from "@/components/exam/StreamGrid";
import { ProctorChatPanel } from "@/components/exam/ProctorChatPanel";
import { LiveErrorShell } from "@/components/exam/LiveLoadingShell";
import { mergeMonitorSeats, paginateSeats } from "@/components/exam/StreamTile";
import type { MentionRef } from "@/lib/monitor-events";

const PAGE_SIZE = 9;

type LiveProctorClientProps = {
  testSlug: string;
  testName: string;
  subjectName: string;
  durationMinutes: number;
  roomId: string;
  participantId: string;
  proctorName: string;
  requireWebcam: boolean;
  requireMic: boolean;
};

export default function LiveProctorClient({
  testSlug,
  testName,
  subjectName,
  durationMinutes,
  roomId,
  participantId,
  proctorName,
  requireWebcam,
  requireMic,
}: LiveProctorClientProps) {
  const requiresStream = requireWebcam || requireMic;
  const [roster, setRoster] = useState<ProctorRosterEntry[]>([]);
  const [presence, setPresence] = useState<Array<{ id: string; name: string }>>([]);
  const [page, setPage] = useState(0);

  const getToken = useCallback(async () => {
    const response = await createProctorStreamToken(testSlug);
    if (response.status !== 200 || !response.metadata) {
      return { ok: false as const, message: response.message };
    }
    return { ok: true as const, token: response.metadata.token };
  }, [testSlug]);

  const {
    connect,
    connected,
    error: streamError,
    participants,
  } = useExamRoom(roomId, "proctor", getToken);

  const { sendPageChange } = useRoomSocket({
    roomId,
    participantId,
    name: proctorName,
    role: "proctor",
    onParticipantList: (list) => {
      setPresence(list.filter((person) => person.id.startsWith("student-")));
    },
    onParticipantLeft: (id) => {
      setPresence((current) => current.filter((person) => person.id !== id));
    },
  });

  const { feed, violations, handleAction } = useProctorRoomEvents(testSlug, true);

  const seats = useMemo(
    () =>
      mergeMonitorSeats({
        roster,
        presence,
        livekit: participants,
        expectVideo: requiresStream,
      }),
    [presence, requiresStream, roster, participants]
  );

  const paging = useMemo(() => paginateSeats(seats, page, PAGE_SIZE), [page, seats]);

  useEffect(() => {
    if (page !== paging.page) {
      setPage(paging.page);
    }
  }, [page, paging.page]);

  useEffect(() => {
    let cancelled = false;

    async function loadRoster() {
      const response = await getProctorRoster(testSlug);
      if (cancelled || response.status !== 200 || !response.metadata) return;
      setRoster(response.metadata);
    }

    void loadRoster();
    const timer = window.setInterval(() => {
      void loadRoster();
    }, 8_000);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [testSlug]);

  useEffect(() => {
    if (!requiresStream) return;
    void connect();
  }, [connect, requiresStream]);

  useEffect(() => {
    if (!requiresStream) return;
    sendPageChange(
      paging.page,
      paging.visible.map((seat) => seat.participantId)
    );
  }, [paging.page, paging.visible, requiresStream, sendPageChange]);

  useEffect(() => {
    if (requiresStream && streamError) {
      toast.error(streamError);
    }
  }, [requiresStream, streamError]);

  const mentionParticipants = useMemo(
    () =>
      seats.map((seat) => ({
        participantId: seat.participantId,
        name: seat.name || seat.email || seat.participantId,
      })),
    [seats]
  );

  const handleBroadcast = useCallback(
    async (message: string, mentions: MentionRef[]) => {
      const response = await sendProctorBroadcast(testSlug, message, mentions);
      if (response.status !== 200) {
        toast.error(response.message);
      }
      return {
        ok: response.status === 200,
        message: response.message,
      };
    },
    [testSlug]
  );

  if (requiresStream && streamError && !connected && seats.length === 0 && roster.length === 0) {
    return (
      <LiveErrorShell
        title="Unable to open monitor"
        message={streamError}
        action={
          <Link href={`/dashboard/tests/${testSlug}`} className="rubric-button-secondary">
            Back to test
          </Link>
        }
      />
    );
  }

  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-[var(--background)] p-4 text-[var(--foreground)] md:p-5">
      <div className="mx-auto flex h-full w-full flex-col gap-4">
        <header className="flex shrink-0 flex-col gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-5 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={`/dashboard/tests/${testSlug}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--foreground)] transition hover:border-[var(--foreground)]/25 active:scale-95"
              title="Back to test"
            >
              <PiArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="mt-1 text-2xl font-bold md:text-3xl">{testName}</h1>
              <span className="text-sm font-medium text-[var(--muted)]">
                {subjectName || "General"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 md:flex md:items-center md:gap-4">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2.5 text-2xl font-semibold tabular-nums">
              {seats.length}
            </div>

            <div className="min-w-[145px]">
              <LiveExamTimer durationMinutes={durationMinutes} compact />
            </div>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-4 xl:flex-row">
          <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <StreamGrid
              seats={paging.visible}
              page={paging.page}
              totalPages={paging.totalPages}
              onNext={() => setPage((current) => Math.min(current + 1, paging.totalPages - 1))}
              onPrev={() => setPage((current) => Math.max(current - 1, 0))}
              waitingForStudents={seats.length === 0}
              violations={violations}
              onProctorAction={handleAction}
            />
          </section>

          <div className="h-[420px] shrink-0 xl:h-auto xl:w-[380px]">
            <ProctorChatPanel
              feed={feed}
              participants={mentionParticipants}
              onBroadcast={handleBroadcast}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
