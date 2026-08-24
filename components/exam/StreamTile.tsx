"use client";

import { memo, useEffect, useRef, useState } from "react";
import { PiCircleNotch } from "react-icons/pi";
import { ParticipantEvent, RemoteParticipant, RemoteTrack, Track } from "livekit-client";

export type MonitorSeat = {
  participantId: string;
  name: string;
  email?: string | null;
  livekit?: RemoteParticipant | null;
  expectVideo: boolean;
};

type Props = {
  seat: MonitorSeat;
};

function displayLabel(seat: MonitorSeat) {
  return seat.name || seat.email || seat.participantId;
}

function initials(seat: MonitorSeat) {
  const source = (seat.name || seat.email || "?").trim();
  const parts = source.split(/[\s._@-]+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
}

function AvatarPlaceholder({
  seat,
  label,
}: {
  seat: MonitorSeat;
  label: string;
}) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[var(--surface-muted)] text-[var(--foreground)]">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] text-lg font-semibold">
        {initials(seat)}
      </div>
      <div className="px-4 text-center">
        <p className="text-sm font-semibold">{seat.name || "Student"}</p>
        {seat.email ? (
          <p className="mt-0.5 truncate text-xs text-[var(--muted)]">{seat.email}</p>
        ) : null}
      </div>
      <span className="sr-only">{label}</span>
    </div>
  );
}

export const StreamTile = memo(function StreamTile({ seat }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const participant = seat.livekit ?? null;
  const expectVideo = seat.expectVideo && Boolean(participant);

  useEffect(() => {
    setReady(false);
    setTimedOut(false);
  }, [seat.participantId, expectVideo]);

  useEffect(() => {
    if (!expectVideo || ready) return;
    const timer = window.setTimeout(() => setTimedOut(true), 8_000);
    return () => window.clearTimeout(timer);
  }, [expectVideo, ready, seat.participantId]);

  useEffect(() => {
    const element = videoRef.current;
    if (!element || !participant || !expectVideo) return;

    let mounted = true;
    let attachedTrack: RemoteTrack | undefined;

    const detachCurrent = () => {
      if (attachedTrack) {
        attachedTrack.detach(element);
        attachedTrack = undefined;
      }
    };

    const attachVideo = () => {
      if (!mounted) return;

      const publication = participant.getTrackPublication(Track.Source.Camera);
      const track = publication?.track;

      if (!track || track.kind !== Track.Kind.Video) {
        detachCurrent();
        setReady(false);
        return;
      }

      if (attachedTrack === track) {
        setReady(true);
        return;
      }

      detachCurrent();
      track.attach(element);
      attachedTrack = track;
      setReady(true);
    };

    const onTrackUnsubscribed = (track: RemoteTrack) => {
      if (track.kind !== Track.Kind.Video) return;
      track.detach(element);
      if (attachedTrack === track) {
        attachedTrack = undefined;
        setReady(false);
      }
    };

    attachVideo();
    participant.on(ParticipantEvent.TrackSubscribed, attachVideo);
    participant.on(ParticipantEvent.TrackPublished, attachVideo);
    participant.on(ParticipantEvent.TrackUnsubscribed, onTrackUnsubscribed);

    return () => {
      mounted = false;
      participant.off(ParticipantEvent.TrackSubscribed, attachVideo);
      participant.off(ParticipantEvent.TrackPublished, attachVideo);
      participant.off(ParticipantEvent.TrackUnsubscribed, onTrackUnsubscribed);
      detachCurrent();
    };
  }, [expectVideo, participant]);

  const showPlaceholder = !expectVideo || (!ready && timedOut);
  const showConnecting = expectVideo && !ready && !timedOut;

  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] shadow-md">
      {showPlaceholder && <AvatarPlaceholder seat={seat} label={displayLabel(seat)} />}
      {showConnecting && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-[var(--surface-muted)] text-[var(--muted)]">
          <PiCircleNotch className="h-6 w-6 animate-spin" />
          <span className="text-[10px] font-semibold uppercase">Connecting stream</span>
          <p className="px-3 text-center text-xs font-medium text-[var(--foreground)]">
            {displayLabel(seat)}
          </p>
        </div>
      )}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        disablePictureInPicture
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        style={{ opacity: ready ? 1 : 0 }}
      />
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[color-mix(in_srgb,var(--foreground)_55%,transparent)] via-[color-mix(in_srgb,var(--foreground)_20%,transparent)] to-transparent p-3 pt-8 text-xs text-[var(--background)]">
        <span className="flex items-center gap-2">
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${
              ready ? "bg-[var(--rubric-success)]" : "bg-[var(--muted)]"
            }`}
          />
          <span className="truncate font-bold">{displayLabel(seat)}</span>
        </span>
      </div>
    </div>
  );
});

export function seatFromLivekit(
  participant: RemoteParticipant,
  extras?: { email?: string | null; expectVideo?: boolean }
): MonitorSeat {
  return {
    participantId: participant.identity,
    name: participant.name || participant.identity,
    email: extras?.email,
    livekit: participant,
    expectVideo: extras?.expectVideo ?? true,
  };
}

export function mergeMonitorSeats({
  roster,
  presence,
  livekit,
  expectVideo,
}: {
  roster: Array<{ participantId: string; name: string; email?: string | null }>;
  presence: Array<{ id: string; name: string }>;
  livekit: RemoteParticipant[];
  expectVideo: boolean;
}): MonitorSeat[] {
  const livekitById = new Map(livekit.map((participant) => [participant.identity, participant]));
  const merged = new Map<string, MonitorSeat>();

  for (const entry of roster) {
    merged.set(entry.participantId, {
      participantId: entry.participantId,
      name: entry.name,
      email: entry.email,
      livekit: livekitById.get(entry.participantId) ?? null,
      expectVideo,
    });
  }

  for (const person of presence) {
    if (!person.id.startsWith("student-")) continue;
    const existing = merged.get(person.id);
    merged.set(person.id, {
      participantId: person.id,
      name: existing?.name || person.name || person.id,
      email: existing?.email,
      livekit: livekitById.get(person.id) ?? existing?.livekit ?? null,
      expectVideo,
    });
  }

  for (const participant of livekit) {
    if (!participant.identity.startsWith("student-")) continue;
    const existing = merged.get(participant.identity);
    merged.set(participant.identity, {
      participantId: participant.identity,
      name: existing?.name || participant.name || participant.identity,
      email: existing?.email,
      livekit: participant,
      expectVideo,
    });
  }

  return [...merged.values()];
}

export function paginateSeats(seats: MonitorSeat[], page: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(seats.length / pageSize));
  const safePage = Math.min(page, totalPages - 1);
  return {
    page: safePage,
    totalPages,
    visible: seats.slice(safePage * pageSize, (safePage + 1) * pageSize),
  };
}
