"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from"react";
import {
 ConnectionState,
 RemoteParticipant,
 Room,
 RoomEvent,
 Track,
 VideoPresets,
} from"livekit-client";

const PAGE_SIZE = 9;

const PROCTOR_ROOM_OPTIONS = {
 videoCaptureDefaults: {
 resolution: VideoPresets.h180.resolution,
 },
 publishDefaults: {
 videoSimulcastLayers: [VideoPresets.h180],
 videoEncoding: {
 maxBitrate: 150_000,
 maxFramerate: 10,
 },
 dtx: true,
 },
 adaptiveStream: true,
 dynacast: true,
};

function syncVisibleVideoSubscriptions(
 room: Room,
 participants: RemoteParticipant[],
 page: number
) {
 const visibleIds = new Set(
 participants
 .slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
 .map((participant) => participant.identity)
 );

 for (const participant of room.remoteParticipants.values()) {
 if (!visibleIds.has(participant.identity)) continue;

 participant.trackPublications.forEach((publication) => {
 if (publication.kind === Track.Kind.Video && !publication.isSubscribed) {
 publication.setSubscribed(true);
 }
 });
 }

 for (const participant of room.remoteParticipants.values()) {
 if (visibleIds.has(participant.identity)) continue;

 participant.trackPublications.forEach((publication) => {
 if (publication.kind === Track.Kind.Video && publication.isSubscribed) {
 publication.setSubscribed(false);
 }
 });
 }
}

type TokenResult =
 | { ok: true; token: string }
 | { ok: false; message: string };

export function useExamRoom(
 roomId: string,
 role:"proctor"|"student",
 getToken: () => Promise<TokenResult>
) {
 const roomRef = useRef<Room | null>(null);
 const connectInFlightRef = useRef(false);
 const getTokenRef = useRef(getToken);

 const [participants, setParticipants] = useState<RemoteParticipant[]>([]);
 const [page, setPage] = useState(0);
 const [connected, setConnected] = useState(false);
 const [connecting, setConnecting] = useState(false);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
 getTokenRef.current = getToken;
 }, [getToken]);

 const totalPages = Math.max(1, Math.ceil(participants.length / PAGE_SIZE));

 const visibleParticipants = useMemo(
 () => participants.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
 [participants, page]
 );

 useEffect(() => {
 const room = roomRef.current;
 if (!room || role !=="proctor"|| room.state !== ConnectionState.Connected) {
 return;
 }

 syncVisibleVideoSubscriptions(room, participants, page);
 }, [page, participants, role]);

 const connect = useCallback(async () => {
 const existingRoom = roomRef.current;
 if (existingRoom?.state === ConnectionState.Connected) {
 return;
 }

 if (connectInFlightRef.current) {
 return;
 }

 connectInFlightRef.current = true;
 setError(null);
 setConnecting(true);

 try {
 const tokenResult = await getTokenRef.current();
 if (!tokenResult.ok) {
 setError(tokenResult.message);
 return;
 }

 const livekitUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;
 if (!livekitUrl) {
 setError("NEXT_PUBLIC_LIVEKIT_URL is not configured");
 return;
 }

 existingRoom?.disconnect();

 const room = new Room(PROCTOR_ROOM_OPTIONS);

 room.on(RoomEvent.ParticipantConnected, (participant) => {
 setParticipants((prev) => {
 if (prev.some((entry) => entry.identity === participant.identity)) {
 return prev;
 }
 return [...prev, participant];
 });
 });

 room.on(RoomEvent.ParticipantDisconnected, (participant) => {
 setParticipants((prev) =>
 prev.filter((entry) => entry.identity !== participant.identity)
 );
 });

 room.on(RoomEvent.Connected, () => {
 setConnected(true);
 setConnecting(false);
 setParticipants(Array.from(room.remoteParticipants.values()));
 if (role ==="proctor") {
 syncVisibleVideoSubscriptions(room, Array.from(room.remoteParticipants.values()), 0);
 }
 });

 room.on(RoomEvent.Disconnected, () => {
 setConnected(false);
 setConnecting(false);
 });

 await room.connect(livekitUrl, tokenResult.token);
 roomRef.current = room;

 if (role ==="student") {
 await room.localParticipant.setCameraEnabled(true);
 await room.localParticipant.setMicrophoneEnabled(true);
 }
 } catch (connectError) {
 setError(
 connectError instanceof Error ? connectError.message :"Failed to connect to live room"
 );
 setConnecting(false);
 } finally {
 connectInFlightRef.current = false;
 }
 }, [role]);

 const disconnect = useCallback(() => {
 roomRef.current?.disconnect();
 roomRef.current = null;
 setConnected(false);
 setConnecting(false);
 }, []);

 const nextPage = useCallback(() => {
 setPage((current) => Math.min(current + 1, totalPages - 1));
 }, [totalPages]);

 const prevPage = useCallback(() => {
 setPage((current) => Math.max(current - 1, 0));
 }, []);

 useEffect(() => {
 return () => {
 roomRef.current?.disconnect();
 roomRef.current = null;
 };
 }, []);

 return {
 connect,
 disconnect,
 connected,
 connecting,
 error,
 visibleParticipants,
 participants,
 page,
 totalPages,
 nextPage,
 prevPage,
 room: roomRef.current,
 };
}
