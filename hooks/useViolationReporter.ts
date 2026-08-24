"use client";

import { useCallback, useRef } from"react";
import type { ViolationFlag } from"@/lib/violation";

type Options = {
 onSessionEnded?: (reason: string) => void;
};

export function useViolationReporter(
 testSlug: string,
 attemptId: string,
 participantId: string,
 options?: Options
) {
 const queueRef = useRef<Promise<void>>(Promise.resolve());
 const onSessionEndedRef = useRef(options?.onSessionEnded);
 onSessionEndedRef.current = options?.onSessionEnded;

 const reportViolation = useCallback(
 (flag: ViolationFlag) => {
 queueRef.current = queueRef.current
 .then(async () => {
 const response = await fetch(
"/api/stream/proctoring/violation",
 {
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({ testSlug, attemptId, participantId, flag }),
 }
 );

 if (!response.ok) return;

 const payload = (await response.json().catch(() => null)) as {
 metadata?: { endedByLimit?: boolean; endReason?: string | null };
 } | null;

 if (payload?.metadata?.endedByLimit) {
 onSessionEndedRef.current?.(
 payload.metadata.endReason ||"Tab switch limit exceeded."
 );
 }
 })
 .catch(() => undefined);
 },
 [attemptId, participantId, testSlug]
 );

 return { reportViolation };
}
