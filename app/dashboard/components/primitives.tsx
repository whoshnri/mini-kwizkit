"use client";

import React, { useEffect, useState } from"react";
import { motion } from"framer-motion";
import { PiSpinnerGap, PiX } from"react-icons/pi";
import Image from"next/image";
import { cn } from"@/lib/utils";

export function DashboardPanel({
 children,
 className ="",
 ...props
}: React.HTMLAttributes<HTMLElement>) {
 return (
 <section
 {...props}
 className={`rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] ${className}`}
 >
 {children}
 </section>
 );
}

export function DashboardButton({
 variant ="primary",
 className ="",
 type ="button",
 loading = false,
 children,
 disabled,
 ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
 variant?:"primary"|"secondary"|"ghost"|"danger";
 loading?: boolean;
}) {
 const variants = {
 primary: "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90",
 secondary:
"border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--surface-muted)]",
 ghost:"text-[var(--muted)] hover:bg-[var(--surface-muted)]",
 danger:"bg-[var(--rubric-danger)] text-white hover:opacity-90",
 };

 return (
 <button
 type={type}
 {...props}
 disabled={disabled || loading}
 className={`inline-flex cursor-pointer h-11 items-center justify-center gap-2 rounded-full px-5 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
 >
 {loading ? <PiSpinnerGap className="h-4 w-4 animate-spin" /> : null}
 {children}
 </button>
 );
}

export function IconButton({
 className ="",
 children,
 ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
 return (
 <button
 {...props}
 className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] text-[var(--foreground)] transition hover:bg-[var(--surface-muted)] ${className}`}
 >
 {children}
 </button>
 );
}

export function DashboardField({
 label,
 children,
 className ="",
}: {
 label: string;
 children: React.ReactNode;
 className?: string;
}) {
 return (
 <label className={`block ${className}`}>
 <span className="mb-2 block text-xs font-bold text-[var(--muted)]">
 {label}
 </span>
 {children}
 </label>
 );
}

export const fieldClass =
"h-12 w-full rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-5 text-sm text-[var(--foreground)] outline-none transition disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-[var(--muted)] focus:border-[var(--ring)] focus:ring-2 focus:ring-[var(--ring)]/10";

export const textareaClass =
"w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--ring)] focus:ring-2 focus:ring-[var(--ring)]/10";

export function StatusBadge({
 tone,
 children,
}: {
 tone:"success"|"warning"|"danger"|"neutral";
 children: React.ReactNode;
}) {
  const tones = {
    success: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    warning: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    danger: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
    neutral: "bg-[var(--surface-muted)] text-[var(--muted)]",
  };

 return (
 <span
 className={`inline-flex h-8 items-center rounded-full px-3 text-xs font-bold uppercase ${tones[tone]}`}
 >
 {children}
 </span>
 );
}

export function DashboardSwitch({
 checked,
 onChange,
}: {
 checked: boolean;
 onChange: (checked: boolean) => void;
}) {
 return (
 <button
 type="button"
 aria-pressed={checked}
 onClick={() => onChange(!checked)}
 className={`flex h-[26px] w-[46px] items-center rounded-full p-[3px] transition ${
 checked
 ? "justify-end bg-[var(--foreground)]"
 : "justify-start bg-[var(--border)]"
 }`}
 >
 <span className="h-5 w-5 rounded-full bg-[var(--surface-strong)] shadow-sm" />
 </button>
 );
}

export function FormSection({
 title,
 description,
 children,
 className ="",
}: {
 title: string;
 description?: string;
 children: React.ReactNode;
 className?: string;
}) {
 return (
 <section
 className={cn(
"rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-4 md:p-5",
 className
 )}
 >
 <div className="mb-4 pb-3">
 <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--foreground)]">
 {title}
 </h3>
 {description && (
 <p className="mt-1.5 text-xs text-[var(--muted)]">{description}</p>
 )}
 </div>
 {children}
 </section>
 );
}

export function ResponsiveSheet({
 title,
 children,
 footer,
 onClose,
 className ="",
 elevated = false,
}: {
 title: string;
 children: React.ReactNode;
 footer?: React.ReactNode;
 onClose: () => void;
 className?: string;
 elevated?: boolean;
}) {
 const [isMobile, setIsMobile] = useState(() =>
 typeof window !=="undefined"
 ? window.matchMedia("(max-width: 767px)").matches
 : false
 );

 useEffect(() => {
 const query = window.matchMedia("(max-width: 767px)");
 const sync = () => setIsMobile(query.matches);
 query.addEventListener("change", sync);
 return () => query.removeEventListener("change", sync);
 }, []);

 const panelMotion = isMobile
 ? {
 initial: { y:"100%"},
 animate: { y: 0 },
 exit: { y:"100%"},
 }
 : {
 initial: { x:"100%"},
 animate: { x: 0 },
 exit: { x:"100%"},
 };

 return (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.18, ease:"easeOut"}}
 className={`fixed inset-0 ${elevated ?"z-[90]":"z-50"} flex items-end justify-center bg-[var(--rubric-black)]/40 md:items-stretch md:justify-end`}
 onMouseDown={(event) => {
 if (event.target === event.currentTarget) onClose();
 }}
 >
 <motion.div
 {...panelMotion}
 transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
 className={cn(
"flex max-h-[92dvh] w-full flex-col bg-[var(--surface-strong)]",
"rounded-t-[24px] border-t border-[var(--border)] px-[18px] pb-[18px] pt-3",
"md:h-dvh md:max-h-dvh md:max-w-lg md:rounded-none md:border-0 md:border-l md:border-[var(--border)] md:px-6 md:py-6 md:shadow-[-10px_0_40px_rgba(0,0,0,0.08)]",
 className
 )}
 style={{ scrollbarWidth:"none"}}
 >
 <div className="mb-5 flex w-full justify-center md:hidden">
 <div className="h-[5px] w-11 rounded-full bg-[var(--border)]"/>
 </div>
 <header className="mb-5 flex shrink-0 items-start justify-between gap-4">
 <div>
 <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
 {title}
 </h2>
 </div>
 <button
 type="button"
 onClick={onClose}
 className="shrink-0 text-[var(--rubric-muted)] transition hover:text-[var(--foreground)]"
 aria-label="Close"
 >
 <PiX className="h-6 w-6"/>
 </button>
 </header>
 <div
 className="min-h-0 flex-1 overflow-y-auto pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
 >
 {children}
 </div>
 {footer && <footer className="mt-auto shrink-0 border-t border-[var(--border)] pt-5">{footer}</footer>}
 </motion.div>
 </motion.div>
 );
}

export function ConfirmationDialog({
 title,
 description,
 children,
 footer,
 onClose,
}: {
 title: string;
 description?: string;
 children?: React.ReactNode;
 footer: React.ReactNode;
 onClose: () => void;
}) {
 return (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.18, ease:"easeOut"}}
 className="fixed inset-0 z-[80] flex items-center text-left justify-center bg-[var(--rubric-black)]/40 p-4"
 onMouseDown={(event) => {
 if (event.target === event.currentTarget) onClose();
 }}
 >
 <motion.div
 initial={{ y: 16, opacity: 0, scale: 0.96 }}
 animate={{ y: 0, opacity: 1, scale: 1 }}
 exit={{ y: 12, opacity: 0, scale: 0.96 }}
 transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
 className="w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-6"
 >
 <h2 className="text-xl font-semibold text-[var(--foreground)]">{title}</h2>
 {description && (
 <p className="mt-3 text-sm text-[var(--muted)]">
 {description}
 </p>
 )}
 {children && <div className="mt-5">{children}</div>}
 <div className="mt-6 flex gap-3">{footer}</div>
 </motion.div>
 </motion.div>
 );
}
