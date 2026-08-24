"use client";

import { memo, useState } from"react";
import { PiFlagBold, PiLightning, PiX } from"react-icons/pi";
import type { ProctorAction, ViolationFlag } from "@/lib/violation";
import { VIOLATION_LABEL } from "@/lib/violation";
import { StreamTile, type MonitorSeat } from "./StreamTile";

type ProctorStreamTileProps = {
 seat: MonitorSeat;
 violations: ViolationFlag[];
 onAction: (participantId: string, action?: ProctorAction, flagId?: string) => void;
};

export const ProctorStreamTile = memo(function ProctorStreamTile({
 seat,
 violations,
 onAction,
}: ProctorStreamTileProps) {
 const [open, setOpen] = useState(false);
 const [deductValue, setDeductValue] = useState(5);
 const [reduceValue, setReduceValue] = useState(60);
 const [reason, setReason] = useState("");

 const recent = violations.filter((v) => !v.acknowledged).slice(-3);
 const highCount = violations.filter((v) => v.severity ==="high"&& !v.acknowledged).length;

 function trigger(type: ProctorAction["type"], value?: number) {
 onAction(seat.participantId, {
 type,
 value,
 reason: reason.trim() ||"Integrity violation",
 timestamp: Date.now(),
 });
 setOpen(false);
 }

 return (
 <div className="relative h-full min-h-0">
 {highCount > 0 && (
 <div className="pointer-events-none absolute inset-0 z-20 rounded-2xl border-2 border-[var(--rubric-danger)]"/>
 )}

 <StreamTile seat={seat} />

 {recent.length > 0 && (
 <div className="absolute right-2 top-2 z-30 flex flex-col gap-1.5 items-end">
 {recent.map((flag) => (
 <span
 key={flag.id}
 title={flag.detail}
 className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase text-white shadow-xs backdrop-blur-md ${
 flag.severity ==="high"?"bg-[var(--rubric-danger)]":"bg-[var(--rubric-warning)]"
 }`}
 >
 <PiFlagBold className="h-2.5 w-2.5"/>
 <span>{VIOLATION_LABEL[flag.type]}</span>
 <button
 type="button"
 onClick={(e) => {
 e.stopPropagation();
 onAction(seat.participantId, undefined, flag.id);
 }}
 className="ml-1 rounded-full p-0.5 hover:bg-white/20 transition cursor-pointer"
 title="Dismiss alert"
 >
 <PiX className="h-4 w-4 text-white"/>
 </button>
 </span>
 ))}
 </div>
 )}

 <div className="absolute left-2 top-2 z-30">
 <button
 type="button"
 onClick={() => setOpen((value) => !value)}
 aria-label="Proctor actions"
 className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white hover:bg-black/85 transition"
 >
 <PiLightning className="h-3.5 w-3.5"/>
 </button>
 </div>

 {open && (
 <div className="absolute left-2 top-11 z-40 w-72 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)]/95 p-3 text-[11px] text-[var(--foreground)] shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150">
 <div className="mb-2 flex items-center justify-between">
 <span className="text-sm font-bold uppercase text-[var(--foreground)]">Action Desk</span>
 <button
 type="button"
 onClick={() => setOpen(false)}
 className="rounded-full p-1 text-[var(--rubric-muted)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
 >
 <PiX className="h-3.5 w-3.5"/>
 </button>
 </div>

 <div className="space-y-2">
 <div>
 <label className="mb-1 block text-[9px] font-semibold uppercase text-[var(--rubric-muted)]">Violation Reason</label>
 <input
 value={reason}
 onChange={(e) => setReason(e.target.value)}
 className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 py-1.5 text-[var(--foreground)] outline-none focus:border-[var(--foreground)]"
 placeholder="Integrity violation..."
 />
 </div>

 <div className="grid gap-2">
 <div>
 <label className="mb-1 block text-[9px] font-semibold uppercase text-[var(--rubric-muted)]">Deduct Marks</label>
 <div className="grid grid-cols-2 items-center gap-1">
 <input
 type="number"
 min={1}
 value={deductValue}
 onChange={(e) => setDeductValue(Number(e.target.value))}
 className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-1.5 py-1 text-center text-[var(--foreground)]"
 />
 <button
 type="button"
 onClick={() => trigger("DEDUCT_MARKS", deductValue)}
 className="flex-1 rounded-lg bg-[var(--rubric-warning)] py-1 text-center font-semibold text-white transition hover:opacity-90 active:scale-95"
 >
 Deduct
 </button>
 </div>
 </div>

 <div>
 <label className="mb-1 block text-[9px] font-semibold uppercase text-[var(--rubric-muted)]">Deduct Time</label>
 <div className="grid grid-cols-2 items-center gap-1">
 <input
 type="number"
 min={10}
 step={10}
 value={reduceValue}
 onChange={(e) => setReduceValue(Number(e.target.value))}
 className="rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-1 py-1 text-center text-[var(--foreground)]"
 />
 <button
 type="button"
 onClick={() => trigger("REDUCE_TIME", reduceValue)}
 className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] py-1 text-center font-semibold text-[var(--foreground)] transition hover:border-[var(--foreground)]/30 active:scale-95"
 >
 Reduce
 </button>
 </div>
 </div>
 </div>

 <div className="flex gap-2 border-t border-[var(--border)] pt-2">
 <button
 type="button"
 onClick={() => trigger("WARN")}
 className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] py-1.5 font-bold text-[var(--foreground)] transition hover:border-[var(--foreground)]/30 active:scale-95"
 >
 Warn
 </button>
 <button
 type="button"
 onClick={() => trigger("END_SESSION")}
 className="flex-1 rounded-lg bg-[var(--rubric-danger)] py-1.5 font-bold text-white transition hover:opacity-90 active:scale-95"
 >
 Terminate
 </button>
 </div>
 </div>
 </div>
 )}
 </div>
 );
});
