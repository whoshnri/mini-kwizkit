"use client";

import { useEffect } from"react";
import { PiWarningCircle, PiX } from"react-icons/pi";
import type { ProctorAction } from"@/lib/violation";

type StudentProctorToastProps = {
 action: ProctorAction;
 onDismiss: () => void;
};

export function StudentProctorToast({ action, onDismiss }: StudentProctorToastProps) {
 useEffect(() => {
 if (action.type ==="WARN") {
 const timer = window.setTimeout(onDismiss, 8000);
 return () => window.clearTimeout(timer);
 }
 }, [action.type, onDismiss]);

 if (action.type !=="WARN") {
 return null;
 }

 return (
 <div className="pointer-events-auto fixed left-1/2 top-4 z-50 w-[min(92vw,380px)] -translate-x-1/2 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 shadow-lg">
 <div className="flex items-start gap-3">
 <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-muted)]">
 <PiWarningCircle className="h-5 w-5 text-[var(--rubric-warning)]"/>
 </div>
 <div className="min-w-0 flex-1">
 <p className="text-xs font-bold uppercase text-[var(--rubric-warning)]">
 Proctor warning
 </p>
 <p className="mt-1 text-sm text-[var(--muted)]">{action.reason}</p>
 </div>
 <button
 type="button"
 onClick={onDismiss}
 aria-label="Dismiss warning"
 className="rounded-lg p-1 text-[var(--rubric-muted)] hover:bg-[var(--surface-muted)]"
 >
 <PiX className="h-4 w-4"/>
 </button>
 </div>
 </div>
 );
}
