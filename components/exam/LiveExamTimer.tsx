"use client";

import { useEffect, useState } from"react";
import { PiTimer } from"react-icons/pi";

type LiveExamTimerProps = {
 durationMinutes: number;
 compact?: boolean;
};

function formatTime(totalSeconds: number) {
 const hours = Math.floor(totalSeconds / 3600);
 const minutes = Math.floor((totalSeconds % 3600) / 60);
 const seconds = totalSeconds % 60;
 return`${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}

export function LiveExamTimer({ durationMinutes, compact = false }: LiveExamTimerProps) {
 const [secondsLeft, setSecondsLeft] = useState(Math.max(durationMinutes, 1) * 60);

 useEffect(() => {
 setSecondsLeft(Math.max(durationMinutes, 1) * 60);
 }, [durationMinutes]);

 useEffect(() => {
 if (durationMinutes <= 0) {
 return;
 }

 const timer = window.setInterval(() => {
 setSecondsLeft((current) => Math.max(current - 1, 0));
 }, 1000);

 return () => window.clearInterval(timer);
 }, [durationMinutes]);

 if (durationMinutes <= 0) {
 return null;
 }

 const urgent = secondsLeft <= 300;

 if (compact) {
 return (
 <div
 className={`inline-flex items-center gap-2 rounded-2xl border p-4 ${urgent
 ?"border-[rgba(180,35,24,0.25)] bg-[rgba(180,35,24,0.08)] text-[var(--rubric-danger)]"
 :"border-[var(--border)] bg-[var(--foreground)] text-[var(--background)]"
 }`}
 >
 <PiTimer className="h-5 w-5 shrink-0 opacity-80"/>
 <div className="text-left">
 <p className="text-2xl font-semibold tabular-nums">
 {formatTime(secondsLeft)}
 </p>
 </div>
 </div>
 );
 }

 return (
 <div className="rounded-2xl border border-[var(--border)] bg-[var(--foreground)] p-4 text-[var(--background)]">
 <div className="flex items-center gap-2 text-sm opacity-75">
 <PiTimer className="h-5 w-5"/>
 Time remaining
 </div>
 <p className="mt-2 text-3xl font-semibold tabular-nums">{formatTime(secondsLeft)}</p>
 </div>
 );
}
