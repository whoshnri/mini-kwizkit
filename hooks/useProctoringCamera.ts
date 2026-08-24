"use client";

import { useEffect, useRef } from"react";

type Options = {
 enabled: boolean;
};

export function useProctoringCamera({ enabled }: Options) {
 const videoRef = useRef<HTMLVideoElement | null>(null);
 const streamRef = useRef<MediaStream | null>(null);

 useEffect(() => {
 if (!enabled) {
 streamRef.current?.getTracks().forEach((track) => track.stop());
 streamRef.current = null;
 if (videoRef.current) {
 videoRef.current.srcObject = null;
 }
 return;
 }

 let cancelled = false;

 async function start() {
 try {
 const stream = await navigator.mediaDevices.getUserMedia({
 video: {
 width: { ideal: 640 },
 height: { ideal: 480 },
 facingMode:"user",
 },
 audio: false,
 });

 if (cancelled) {
 stream.getTracks().forEach((track) => track.stop());
 return;
 }

 streamRef.current = stream;
 if (videoRef.current) {
 videoRef.current.srcObject = stream;
 await videoRef.current.play().catch(() => undefined);
 }
 } catch {
 // LiveKit stream is used as fallback in useAIProctoring
 }
 }

 void start();

 return () => {
 cancelled = true;
 streamRef.current?.getTracks().forEach((track) => track.stop());
 streamRef.current = null;
 };
 }, [enabled]);

 return { proctoringVideoRef: videoRef, hasDedicatedCamera: Boolean(streamRef.current) };
}
