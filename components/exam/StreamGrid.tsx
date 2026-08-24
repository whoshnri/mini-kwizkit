"use client";

import { PiUsers } from "react-icons/pi";
import type { ProctorAction, ViolationFlag } from "@/lib/violation";
import { ProctorStreamTile } from "./ProctorStreamTile";
import { StreamTile, type MonitorSeat } from "./StreamTile";

type Props = {
  seats: MonitorSeat[];
  page: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  waitingForStudents?: boolean;
  violations?: Record<string, ViolationFlag[]>;
  onProctorAction?: (participantId: string, action?: ProctorAction, flagId?: string) => void;
};

function gridDimensions(count: number) {
  if (count <= 0) return { cols: 1, rows: 1 };
  if (count === 1) return { cols: 1, rows: 1 };
  const cols = Math.ceil(Math.sqrt(count));
  return { cols, rows: Math.ceil(count / cols) };
}

export function StreamGrid({
  seats,
  page,
  totalPages,
  onNext,
  onPrev,
  waitingForStudents = false,
  violations,
  onProctorAction,
}: Props) {
  const count = seats.length;
  const { cols, rows } = gridDimensions(count);
  const proctorMode = Boolean(violations && onProctorAction);

  return (
    <div className="flex h-full min-h-0 flex-col gap-2">
      {(count === 0 || waitingForStudents) && count === 0 && (
        <div className="flex flex-1 flex-col items-center justify-center rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface-strong)] p-12 text-center">
          <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--surface-muted)]">
            <PiUsers className="h-10 w-10 text-[var(--muted)]" />
          </div>
          <h3 className="text-xl font-semibold text-[var(--foreground)]">Waiting for students</h3>
          <p className="mt-2 max-w-sm text-sm text-[var(--muted)]">
            Students appear here with their name or email when they join the test.
          </p>
        </div>
      )}

      {count > 0 && (
        <div
          className="grid min-h-0 flex-1 gap-2"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          }}
        >
          {seats.map((seat) =>
            proctorMode ? (
              <ProctorStreamTile
                key={seat.participantId}
                seat={seat}
                violations={violations?.[seat.participantId] ?? []}
                onAction={onProctorAction!}
              />
            ) : (
              <StreamTile key={seat.participantId} seat={seat} />
            )
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex shrink-0 items-center justify-between px-1">
          <button
            type="button"
            onClick={onPrev}
            disabled={page === 0}
            className="rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-1.5 text-sm font-semibold text-[var(--foreground)] disabled:opacity-30"
          >
            Prev
          </button>
          <span className="text-sm text-[var(--muted)]">
            Page {page + 1} of {totalPages}
          </span>
          <button
            type="button"
            onClick={onNext}
            disabled={page === totalPages - 1}
            className="rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-1.5 text-sm font-semibold text-[var(--foreground)] disabled:opacity-30"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
