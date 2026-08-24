"use client";

import type { ReactNode } from"react";
import Image from"next/image";
import { PiCheck, PiCircleNotch } from"react-icons/pi";

type LiveLoadingStep = {
 label: string;
 done?: boolean;
 active?: boolean;
};

type LiveLoadingShellProps = {
 title: string;
 description?: string;
 eyebrow?: string;
 steps?: LiveLoadingStep[];
 children?: ReactNode;
};

export function LiveLoadingShell({
 title,
 description,
 eyebrow,
 steps,
 children,
}: LiveLoadingShellProps) {
 return (
 <main className="flex min-h-dvh items-center justify-center bg-[var(--background)] p-4">
 <section className="w-full max-w-lg rounded-[28px] border border-[var(--border)] bg-[var(--surface-strong)] p-6 shadow-sm md:p-8">
 <div className="mb-6 flex items-center justify-between gap-4">
 <Image src="/logo.svg"alt="Rubric"width={32} height={32} className="rounded-lg"/>
 <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold text-[var(--muted)]">
 <PiCircleNotch className="h-3.5 w-3.5 animate-spin"/>
 Working
 </span>
 </div>

 {eyebrow && (
 <p className="text-sm font-semibold text-[var(--rubric-muted)]">{eyebrow}</p>
 )}
 <h1 className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-[var(--foreground)]">
 {title}
 </h1>
 {description && (
 <p className="mt-3 text-sm text-[var(--muted)]">{description}</p>
 )}

 {steps && steps.length > 0 && (
 <ul className="mt-6 space-y-2">
 {steps.map((step) => (
 <li
 key={step.label}
 className={`flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-sm ${
 step.done
 ?"border-[rgba(47,107,79,0.25)] bg-[rgba(47,107,79,0.08)] text-[var(--rubric-success)]"
 : step.active
 ?"border-[var(--foreground)] bg-[var(--surface-muted)] text-[var(--foreground)]"
 :"border-[var(--border)] bg-[var(--surface-muted)] text-[var(--rubric-muted)]"
 }`}
 >
 <span className="flex h-6 w-6 shrink-0 items-center justify-center">
 {step.done ? (
 <PiCheck className="h-4 w-4"/>
 ) : step.active ? (
 <PiCircleNotch className="h-4 w-4 animate-spin"/>
 ) : (
 <span className="h-2 w-2 rounded-full bg-[var(--border)]"/>
 )}
 </span>
 <span className="font-medium">{step.label}</span>
 </li>
 ))}
 </ul>
 )}

 {children}
 </section>
 </main>
 );
}

export function StreamGridSkeleton({ count = 4 }: { count?: number }) {
 const { cols, rows } = gridDimensionsForSkeleton(count);

 return (
 <div
 className="grid h-full min-h-[280px] flex-1 gap-2"
 style={{
 gridTemplateColumns:`repeat(${cols}, minmax(0, 1fr))`,
 gridTemplateRows:`repeat(${rows}, minmax(0, 1fr))`,
 }}
 >
 {Array.from({ length: count }).map((_, index) => (
 <div
 key={index}
 className="relative min-h-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]"
 >
 <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[var(--surface-muted)] via-[var(--surface)] to-[var(--surface-muted-full)]"/>
 <div className="absolute inset-x-0 bottom-0 h-8 bg-[var(--foreground)]/10"/>
 </div>
 ))}
 </div>
 );
}

function gridDimensionsForSkeleton(count: number) {
 if (count <= 1) return { cols: 1, rows: 1 };
 const cols = Math.ceil(Math.sqrt(count));
 return { cols, rows: Math.ceil(count / cols) };
}

type StreamConnectionBadgeProps = {
 status:"idle"|"connecting"|"connected"|"error";
 errorMessage?: string | null;
};

export function StreamConnectionBadge({
 status,
 errorMessage,
}: StreamConnectionBadgeProps) {
 if (status ==="idle") return null;

 if (status ==="error") {
 return (
 <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(161,98,7,0.25)] bg-[rgba(161,98,7,0.1)] px-2.5 py-0.5 text-xs font-semibold text-[var(--rubric-warning)]">
 Camera offline
 {errorMessage ?`: ${errorMessage}`:""}
 </span>
 );
 }

 if (status ==="connecting") {
 return (
 <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 py-0.5 text-xs font-semibold text-[var(--muted)]">
 <PiCircleNotch className="h-3.5 w-3.5 animate-spin"/>
 Connecting camera
 </span>
 );
 }

 return (
 <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(47,107,79,0.25)] bg-[rgba(47,107,79,0.1)] px-2.5 py-0.5 text-xs font-semibold text-[var(--rubric-success)]">
 <span className="relative flex h-2 w-2">
 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--rubric-success)] opacity-40"/>
 <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--rubric-success)]"/>
 </span>
 Camera live
 </span>
 );
}

export function LiveErrorShell({
 title,
 message,
 action,
}: {
 title: string;
 message: string;
 action?: ReactNode;
}) {
 return (
 <main className="flex min-h-dvh items-center justify-center bg-[var(--background)] p-4">
 <section className="w-full max-w-lg rounded-[28px] border border-[rgba(180,35,24,0.2)] bg-[var(--surface-strong)] p-6 text-center md:p-8">
 <h1 className="text-xl font-semibold text-[var(--rubric-danger)]">{title}</h1>
 <p className="mt-3 text-sm text-[var(--muted)]">{message}</p>
 {action && <div className="mt-6 flex justify-center">{action}</div>}
 </section>
 </main>
 );
}
