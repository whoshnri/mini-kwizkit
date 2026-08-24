"use client";

import { useEffect, useRef } from"react";

type SSEHandler = (event: string, data: unknown) => void;

function parseSSEChunk(chunk: string) {
 let eventType ="message";
 const dataLines: string[] = [];

 for (const line of chunk.split("\n")) {
 if (line.startsWith("event:")) {
 eventType = line.slice(6).trim();
 } else if (line.startsWith("data:")) {
 dataLines.push(line.slice(5).trim());
 }
 }

 if (dataLines.length === 0) {
 return null;
 }

 const raw = dataLines.join("\n");

 try {
 return { eventType, data: JSON.parse(raw) as unknown };
 } catch {
 return { eventType, data: raw };
 }
}

export function useMonitorSSE(url: string | null, onEvent: SSEHandler, enabled = true) {
 const onEventRef = useRef(onEvent);
 onEventRef.current = onEvent;

 useEffect(() => {
 if (!enabled || !url) {
 return;
 }

 const streamUrl: string = url;
 const controller = new AbortController();
 let reconnectTimer: number | null = null;
 let buffer ="";

 async function connect() {
 try {
 const response = await fetch(streamUrl, {
 credentials:"include",
 headers: { Accept:"text/event-stream"},
 signal: controller.signal,
 });

 if (!response.ok || !response.body) {
 throw new Error(`SSE failed (${response.status})`);
 }

 const reader = response.body.getReader();
 const decoder = new TextDecoder();

 while (true) {
 const { done, value } = await reader.read();
 if (done) {
 break;
 }

 buffer += decoder.decode(value, { stream: true });
 const normalized = buffer.replace(/\r\n/g,"\n");
 const chunks = normalized.split("\n\n");
 buffer = chunks.pop() ??"";

 for (const chunk of chunks) {
 const parsed = parseSSEChunk(chunk.trim());
 if (parsed) {
 onEventRef.current(parsed.eventType, parsed.data);
 }
 }
 }
 } catch (error) {
 if (controller.signal.aborted) {
 return;
 }

 reconnectTimer = window.setTimeout(() => {
 void connect();
 }, 3000);
 }
 }

 void connect();

 return () => {
 controller.abort();
 if (reconnectTimer !== null) {
 window.clearTimeout(reconnectTimer);
 }
 };
 }, [url, enabled]);
}
