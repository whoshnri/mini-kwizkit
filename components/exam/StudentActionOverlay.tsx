"use client";

import { PiClockCountdown, PiMinusCircle, PiWarningCircle, PiXCircle } from"react-icons/pi";
import type { ProctorAction } from"@/lib/violation";
import { SirenIcon } from"@phosphor-icons/react";

type StudentActionOverlayProps = {
 action: ProctorAction;
 countdown?: number;
 onDismiss: () => void;
};

const ACTION_STYLE = {
 DEDUCT_MARKS: {
 icon: PiMinusCircle,
 title:"Marks Deducted",
 accent:"text-[var(--rubric-danger)] bg-[var(--rubric-danger)]/5 border-[var(--rubric-danger)]/20",
 badge:"bg-[var(--rubric-danger)]/10 text-[var(--rubric-danger)]",
 },
 REDUCE_TIME: {
 icon: PiClockCountdown,
 title:"Exam Time Reduced",
 accent:"text-[var(--rubric-danger)] bg-[var(--rubric-danger)]/5 border-[var(--rubric-danger)]/20",
 badge:"bg-[var(--rubric-danger)]/10 text-[var(--rubric-danger)]",
 },
 END_SESSION: {
 icon: PiXCircle,
 title:"Session Terminated",
 accent:"text-[var(--rubric-danger)] bg-[var(--rubric-danger)]/10 border-[var(--rubric-danger)]/20 animate-pulse",
 badge:"bg-[var(--rubric-danger)]/10 text-[var(--rubric-danger)]",
 },
 WARN: {
 icon: PiWarningCircle,
 title:"Integrity Warning Issued",
 accent:"text-[var(--rubric-warning)] bg-[var(--rubric-warning)]/5 border-[var(--rubric-warning)]/20 animate-pulse",
 badge:"bg-[var(--rubric-warning)]/10 text-[var(--rubric-warning)]",
 },
} as const;

function formatTimeReduction(seconds: number) {
 if (seconds >= 60) {
 const mins = Math.floor(seconds / 60);
 const secs = seconds % 60;
 return secs > 0 ?`−${mins}m ${secs}s`:`−${mins} min${mins > 1 ?"s":""}`;
 }
 return`−${seconds}s`;
}

export function StudentActionOverlay({
 action,
 countdown,
 onDismiss,
}: StudentActionOverlayProps) {

 return (
 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md animate-in fade-in duration-300">
 <div className="w-full max-w-md rounded-[28px] border border-[var(--border)] bg-[var(--surface-strong)] p-8 text-center shadow-2xl animate-in zoom-in-95 duration-200">
 
 {/* Pulsing Alert Icon Container */}
 <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl shadow-inner`}>
 <SirenIcon className="h-8 w-8"/>
 </div>

 {/* Action Header */}
 <h2 className="mt-4 text-2xl font-bold text-[var(--foreground)]">
 {action.reason}
 </h2>


 {/* Specific Action Values */}
 {action.type ==="DEDUCT_MARKS"&& action.value !== undefined && (
 <div className="mt-6 flex flex-col items-center">
 <p className="mt-1 text-4xl font-extrabold text-[var(--rubric-danger)]">
 −{action.value} Mark{action.value > 1 ?"s":""}
 </p>
 </div>
 )}

 {action.type ==="REDUCE_TIME"&& action.value !== undefined && (
 <div className="mt-6 flex flex-col items-center">
 <p className="mt-1 text-4xl font-extrabold text-[var(--rubric-danger)]">
 {formatTimeReduction(action.value)}
 </p>
 </div>
 )}

 {action.type ==="END_SESSION"&& countdown !== undefined && (
 <div className="mt-6 flex flex-col items-center">
 <span className="text-[10px] font-bold uppercase text-[var(--rubric-danger)] animate-pulse">Redirection in</span>
 <p className="mt-1 text-5xl font-black text-[var(--rubric-danger)] tabular-nums">
 {countdown}
 </p>
 </div>
 )}

 {/* Action Button */}
 {action.type !=="END_SESSION"&& (
 <button
 type="button"
 onClick={onDismiss}
 className="mt-8 w-full rounded-full bg-[var(--foreground)] py-3.5 text-sm font-bold text-[var(--background)] transition hover:opacity-90 active:scale-[0.98] shadow-md cursor-pointer"
 >
 I Acknowledge and Understand
 </button>
 )}
 </div>
 </div>
 );
}
