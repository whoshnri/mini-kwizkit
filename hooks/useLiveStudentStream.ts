"use client";

import { useCallback, useEffect, useRef, useState } from"react";
import { ConnectionState, Room, RoomEvent, Track, VideoPresets } from"livekit-client";
import { fetchStudentStreamToken } from"@/lib/stream-api-client";
import { liveStudentParticipantId } from"@/lib/stream";
import { useRoomSocket } from"@/hooks/useRoomSocket";
import { useStudentBroadcastEvents } from"@/hooks/useStudentBroadcastEvents";
import type { ProctorAction, ViolationFlag } from"@/lib/violation";

const STUDENT_ROOM_OPTIONS = {
 videoCaptureDefaults: {
 resolution: VideoPresets.h180.resolution,
 },
 publishDefaults: {
 videoEncoding: {
 maxBitrate: 150_000,
 maxFramerate: 10,
 },
 dtx: true,
 },
 adaptiveStream: true,
 dynacast: true,
};

type UseLiveStudentStreamOptions = {
 testSlug: string;
 roomId: string;
 attemptId: string;
 studentId: string;
 studentName: string;
 enabled?: boolean;
 publishCamera?: boolean;
 publishMicrophone?: boolean;
 initialViolationFlags?: ViolationFlag[];
 onProctorAction?: (action: ProctorAction) => void;
};

export function useLiveStudentStream({
 testSlug,
 roomId,
 attemptId,
 studentId,
 studentName,
 enabled = true,
 publishCamera = true,
 publishMicrophone = true,
 initialViolationFlags = [],
 onProctorAction,
}: UseLiveStudentStreamOptions) {
 const roomRef = useRef<Room | null>(null);
 const localVideoRef = useRef<HTMLVideoElement | null>(null);
 const connectInFlightRef = useRef(false);
 const [connected, setConnected] = useState(false);
 const [connecting, setConnecting] = useState(false);
 const [error, setError] = useState<string | null>(null);
 const participantId = liveStudentParticipantId(studentId);

 useRoomSocket({
 roomId,
 participantId,
 name: studentName,
 role:"student",
 });

 const { messages, notices, activeAction, endCountdown, dismissAction } = useStudentBroadcastEvents({
 testSlug,
 attemptId,
 participantId,
 enabled: enabled && Boolean(attemptId),
 initialViolationFlags,
 onProctorAction,
 });

 const disconnect = useCallback(() => {
 roomRef.current?.disconnect();
 roomRef.current = null;
 setConnected(false);
 setConnecting(false);
 }, []);

 const shouldConnectLiveKit = publishCamera || publishMicrophone;

 useEffect(() => {
 if (!enabled || !attemptId) {
 disconnect();
 return;
 }

 if (!shouldConnectLiveKit) {
 return;
 }

 if (roomRef.current?.state === ConnectionState.Connected) {
 return;
 }

 if (connectInFlightRef.current) {
 return;
 }

 let cancelled = false;
 connectInFlightRef.current = true;

 async function connect() {
 setError(null);
 setConnecting(true);

 try {
 const response = await fetchStudentStreamToken(testSlug, attemptId);
 if (cancelled) return;

 if (response.status !== 200 || !response.metadata) {
 setError(response.message);
 return;
 }

 const livekitUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;
 if (!livekitUrl) {
 setError("NEXT_PUBLIC_LIVEKIT_URL is not configured");
 return;
 }

 roomRef.current?.disconnect();

 const room = new Room(STUDENT_ROOM_OPTIONS);

 room.on(RoomEvent.Connected, () => {
 if (!cancelled) {
 setConnected(true);
 setConnecting(false);
 }
 });
 room.on(RoomEvent.Disconnected, () => {
 setConnected(false);
 setConnecting(false);
 });

 await room.connect(livekitUrl, response.metadata.token);
 if (cancelled) {
 room.disconnect();
 return;
 }

 roomRef.current = room;
 if (publishCamera) {
 await room.localParticipant.setCameraEnabled(true);
 }
 if (publishMicrophone) {
 await room.localParticipant.setMicrophoneEnabled(true);
 }

 const publication = room.localParticipant.getTrackPublication(Track.Source.Camera);
 const track = publication?.track;
 if (track && localVideoRef.current) {
 track.attach(localVideoRef.current);
 }
 } catch (connectError) {
 if (!cancelled) {
 setError(
 connectError instanceof Error ? connectError.message :"Failed to join stream"
 );
 }
 } finally {
 connectInFlightRef.current = false;
 if (!cancelled && roomRef.current?.state !== ConnectionState.Connected) {
 setConnecting(false);
 }
 }
 }

 void connect();

 return () => {
 cancelled = true;
 connectInFlightRef.current = false;
 disconnect();
 };
 }, [attemptId, disconnect, enabled, publishCamera, publishMicrophone, shouldConnectLiveKit, testSlug]);

 useEffect(() => {
 const room = roomRef.current;
 const element = localVideoRef.current;
 if (!room || !element || !connected) return;

 const publication = room.localParticipant.getTrackPublication(Track.Source.Camera);
 const track = publication?.track;
 if (track) {
 track.attach(element);
 }
 }, [connected]);

 return {
 connected,
 connecting,
 error,
 disconnect,
 localVideoRef,
 broadcastMessages: messages,
 proctorNotices: notices,
 activeProctorAction: activeAction,
 endCountdown,
 dismissProctorAction: dismissAction,
 };
}
