"use client";

import { useEffect, useRef } from"react";
import type { ViolationFlag } from"@/lib/violation";

type Options = {
 onViolation: (flag: ViolationFlag) => void;
 enabled: boolean;
};

export function useBrowserActivityMonitor({ onViolation, enabled }: Options) {
 const onViolationRef = useRef(onViolation);
 onViolationRef.current = onViolation;
 const lastFlagRef = useRef<number>(0);

 useEffect(() => {
 if (!enabled) return;

 function handleViolation() {
 const now = Date.now();
 // Cooldown of 10 seconds to prevent spam
 if (now - lastFlagRef.current > 10000) {
 lastFlagRef.current = now;
 onViolationRef.current({
 id: crypto.randomUUID(),
 timestamp: now,
 type:"TAB_SWITCH",
 detail:"Student switched away from the exam tab or window lost focus",
 severity:"high",
 confidence: 1,
 acknowledged: false,
 });
 }
 }

 function handleVisibilityChange() {
 if (document.hidden || document.visibilityState ==="hidden") {
 handleViolation();
 }
 }

 function handleBlur() {
 handleViolation();
 }

 document.addEventListener("visibilitychange", handleVisibilityChange);
 window.addEventListener("blur", handleBlur);

 return () => {
 document.removeEventListener("visibilitychange", handleVisibilityChange);
 window.removeEventListener("blur", handleBlur);
 };
 }, [enabled]);
}
