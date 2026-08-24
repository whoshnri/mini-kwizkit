"use client";

import { PiFloppyDisk, PiArrowCounterClockwise } from"react-icons/pi";
import { DashboardButton } from"../primitives";

export function DetailSaveBar({
 hasChanges,
 saving,
 onSave,
 onDiscard,
}: {
 hasChanges: boolean;
 saving: boolean;
 onSave: () => void;
 onDiscard: () => void;
}) {
 if (!hasChanges) return null;

 return (
 <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 px-4 sm:px-6 lg:left-[220px] lg:px-9">
 <div className="pointer-events-auto mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)]/95 p-4 shadow-2xl backdrop-blur-md">
 <p className="text-sm font-semibold text-[var(--muted)]">
 You have unsaved changes
 </p>
 <div className="flex gap-2">
 <DashboardButton variant="secondary"onClick={onDiscard} disabled={saving}>
 <PiArrowCounterClockwise className="h-4 w-4"/>
 Discard
 </DashboardButton>
 <DashboardButton onClick={onSave} disabled={saving} loading={saving}>
 <PiFloppyDisk className="h-4 w-4"/>
 {saving ?"Saving...":"Save changes"}
 </DashboardButton>
 </div>
 </div>
 </div>
 );
}
