"use client";

import * as DropdownMenu from"@radix-ui/react-dropdown-menu";
import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from"react";
import { forwardRef, useMemo, useState } from"react";
import {
 PiCaretDown,
 PiCaretRight,
 PiCheck,
 PiMagnifyingGlass,
 PiPlus,
 PiSpinnerGap,
} from"react-icons/pi";

function DashboardDropdown({ ...props }: ComponentPropsWithoutRef<typeof DropdownMenu.Root>) {
 return <DropdownMenu.Root {...props} />;
}

function DashboardDropdownTrigger({
 ...props
}: ComponentPropsWithoutRef<typeof DropdownMenu.Trigger>) {
 return <DropdownMenu.Trigger {...props} />;
}

const DashboardDropdownContent = forwardRef<
 ElementRef<typeof DropdownMenu.Content>,
 ComponentPropsWithoutRef<typeof DropdownMenu.Content> & { align?:"start"|"center"|"end"}
>(({ className ="", sideOffset = 8, align ="end", ...props }, ref) => (
 <DropdownMenu.Portal>
 <DropdownMenu.Content
 ref={ref}
 align={align}
 sideOffset={sideOffset}
 className={`z-50 min-w-[240px] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] p-1.5 text-[var(--foreground)] shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 ${className}`}
 {...props}

 />
 </DropdownMenu.Portal>
));
DashboardDropdownContent.displayName ="DashboardDropdownContent";

const DashboardDropdownItem = forwardRef<
 ElementRef<typeof DropdownMenu.Item>,
 ComponentPropsWithoutRef<typeof DropdownMenu.Item> & { inset?: boolean }
>(({ className ="", inset, ...props }, ref) => (
 <DropdownMenu.Item
 ref={ref}
 className={`relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-sm outline-none transition-colors focus:bg-[var(--surface-muted)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${
 inset ?"pl-8":""
 } ${className}`}
 {...props}
 />
));
DashboardDropdownItem.displayName ="DashboardDropdownItem";

const DashboardDropdownLabel = forwardRef<
 ElementRef<typeof DropdownMenu.Label>,
 ComponentPropsWithoutRef<typeof DropdownMenu.Label> & { inset?: boolean }
>(({ className ="", inset, ...props }, ref) => (
 <DropdownMenu.Label
 ref={ref}
 className={`px-3 py-2 text-xs font-bold uppercase text-[var(--rubric-muted)] ${
 inset ?"pl-8":""
 } ${className}`}
 {...props}
 />
));
DashboardDropdownLabel.displayName ="DashboardDropdownLabel";

const DashboardDropdownSeparator = forwardRef<
 ElementRef<typeof DropdownMenu.Separator>,
 ComponentPropsWithoutRef<typeof DropdownMenu.Separator>
>(({ className ="", ...props }, ref) => (
 <DropdownMenu.Separator ref={ref} className={`my-1 h-px bg-[var(--border)] ${className}`} {...props} />
));
DashboardDropdownSeparator.displayName ="DashboardDropdownSeparator";

const DashboardDropdownSub = DropdownMenu.Sub;

function DashboardDropdownSubTrigger({
 className ="",
 children,
 ...props
}: ComponentPropsWithoutRef<typeof DropdownMenu.SubTrigger>) {
 return (
 <DropdownMenu.SubTrigger
 className={`flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-sm outline-none focus:bg-[var(--surface-muted)] ${className}`}
 {...props}
 >
 {children}
 <PiCaretRight className="ml-auto h-4 w-4"/>
 </DropdownMenu.SubTrigger>
 );
}

const DashboardDropdownSubContent = forwardRef<
 ElementRef<typeof DropdownMenu.SubContent>,
 ComponentPropsWithoutRef<typeof DropdownMenu.SubContent>
>(({ className ="", ...props }, ref) => (
 <DropdownMenu.Portal>
 <DropdownMenu.SubContent
 ref={ref}
 className={`z-50 min-w-[200px] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] p-1.5 shadow-xl ${className}`}
 {...props}
 />
 </DropdownMenu.Portal>
));
DashboardDropdownSubContent.displayName ="DashboardDropdownSubContent";

const DashboardDropdownCheckboxItem = forwardRef<
 ElementRef<typeof DropdownMenu.CheckboxItem>,
 ComponentPropsWithoutRef<typeof DropdownMenu.CheckboxItem>
>(({ className ="", children, checked, ...props }, ref) => (
 <DropdownMenu.CheckboxItem
 ref={ref}
 checked={checked}
 className={`relative flex cursor-pointer select-none items-center rounded-lg py-2.5 pl-8 pr-3 text-sm outline-none focus:bg-[var(--surface-muted)] ${className}`}
 {...props}
 >
 <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
 <DropdownMenu.ItemIndicator>
 <PiCheck className="h-4 w-4"/>
 </DropdownMenu.ItemIndicator>
 </span>
 {children}
 </DropdownMenu.CheckboxItem>
));
DashboardDropdownCheckboxItem.displayName ="DashboardDropdownCheckboxItem";

type DashboardSelectOption = {
 label: string;
 value: string;
 disabled?: boolean;
};

function DashboardSelect({
 value,
 options,
 onValueChange,
 placeholder ="Select",
 disabled,
 className ="",
 searchable = true,
 searchPlaceholder ="Search options...",
 maxMenuHeight = 200,
 trigger,
 onCreate,
 createLabel,
 loading = false,
}: {
 value: string;
 options: DashboardSelectOption[];
 onValueChange: (value: string) => void;
 placeholder?: string;
 disabled?: boolean;
 className?: string;
 searchable?: boolean;
 searchPlaceholder?: string;
 maxMenuHeight?: number;
 trigger?: ReactNode;
 onCreate?: (query: string) => Promise<string | null | void> | string | null | void;
 createLabel?: string;
 loading?: boolean;
}) {
 const [open, setOpen] = useState(false);
 const [query, setQuery] = useState("");
 const [creating, setCreating] = useState(false);
 const selected = options.find((option) => option.value === value);
 const trimmedQuery = query.trim();
 const filteredOptions = useMemo(() => {
 const normalizedQuery = trimmedQuery.toLowerCase();
 if (!normalizedQuery) return options;
 return options.filter(
 (option) =>
 option.label.toLowerCase().includes(normalizedQuery) ||
 option.value.toLowerCase().includes(normalizedQuery)
 );
 }, [options, trimmedQuery]);
 const exactMatch = options.some(
 (option) => option.label.trim().toLowerCase() === trimmedQuery.toLowerCase()
 );
 const creatable = Boolean(onCreate);
 const canCreate = Boolean(onCreate && trimmedQuery && !exactMatch && !creating && !loading);
 const busy = creating || loading;

 async function createFromQuery() {
 if (!canCreate || !onCreate) return;
 setCreating(true);
 try {
 const createdValue = await onCreate(trimmedQuery);
 if (!createdValue) return;
 onValueChange(createdValue);
 setOpen(false);
 setQuery("");
 } finally {
 setCreating(false);
 }
 }

 return (
 <DashboardDropdown
 open={open}
 onOpenChange={(nextOpen) => {
 if (creating) return;
 setOpen(nextOpen);
 if (!nextOpen) setQuery("");
 }}
 >
 {trigger ? (
 <DashboardDropdownTrigger asChild disabled={disabled || creating}>
 {trigger}
 </DashboardDropdownTrigger>
 ) : (
 <DashboardDropdownTrigger asChild disabled={disabled || creating}>
 <button
 type="button"
 disabled={disabled || creating}
 className={`flex h-12 w-full items-center justify-between gap-3 rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 text-left text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
 >
 <span className={`min-w-0 truncate ${selected ?"":"text-[var(--rubric-muted)]"}`}>
 {creating ?"Creating…": selected?.label ?? placeholder}
 </span>
 <SelectTrailingIcon
 busy={busy}
 showPlus={creatable && !selected}
 />
 </button>
 </DashboardDropdownTrigger>
 )}
 <DashboardDropdownContent align="start"className="w-[var(--radix-dropdown-menu-trigger-width)] p-0">
 {searchable && (
 <div className="border-b border-[var(--border)] p-2">
 <div className="relative">
 <PiMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--rubric-muted)]"/>
 <input
 autoFocus
 disabled={creating}
 value={query}
 onChange={(event) => setQuery(event.target.value)}
 onKeyDown={(event) => {
 event.stopPropagation();
 if (event.key ==="Enter") {
 event.preventDefault();
 if (canCreate) void createFromQuery();
 }
 }}
 placeholder={creatable ?"Search or create...": searchPlaceholder}
 className="h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] pl-9 pr-10 text-sm outline-none placeholder:text-[var(--rubric-muted)] focus:border-[var(--foreground)] disabled:opacity-70"
 />
 {creatable && (
 <button
 type="button"
 disabled={!canCreate}
 onMouseDown={(event) => event.preventDefault()}
 onClick={() => void createFromQuery()}
 className="absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-[var(--foreground)] transition hover:bg-[var(--surface)] disabled:text-[var(--rubric-muted)] disabled:hover:bg-transparent"
 aria-label={trimmedQuery ? `Create ${trimmedQuery}`:"Create"}
 >
 {creating ? (
 <PiSpinnerGap className="h-4 w-4 animate-spin"/>
 ) : (
 <PiPlus className="h-4 w-4"/>
 )}
 </button>
 )}
 </div>
 </div>
 )}
 <div
 className="overflow-y-auto p-1.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
 style={{ maxHeight: maxMenuHeight }}
 >
 {loading && options.length === 0 && !creating ? (
 <SelectLoadingState />
 ) : creating ? (
 <SelectCreatingState name={trimmedQuery} />
 ) : (
 <>
 {filteredOptions.length ? (
 filteredOptions.map((option) => (
 <DashboardDropdownItem
 key={option.value}
 disabled={option.disabled}
 onSelect={() => {
 onValueChange(option.value);
 setOpen(false);
 setQuery("");
 }}
 className="justify-between"
 >
 <span className="truncate">{option.label}</span>
 {option.value === value && <PiCheck className="h-4 w-4 shrink-0"/>}
 </DashboardDropdownItem>
 ))
 ) : canCreate ? null : creatable ? (
 <SelectEmptyCreateState />
 ) : (
 <div className="px-3 py-6 text-center text-sm text-[var(--rubric-muted)]">
 No options found.
 </div>
 )}
 {canCreate && (
 <>
 {filteredOptions.length > 0 ? (
 <>
 <DashboardDropdownSeparator className="mx-1"/>
 <DashboardDropdownItem
 onSelect={(event) => {
 event.preventDefault();
 void createFromQuery();
 }}
 className="mt-0.5 gap-2 font-medium"
 >
 <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--surface-muted)]">
 <PiPlus className="h-3.5 w-3.5"/>
 </span>
 <span className="truncate">
 {createLabel || `Create “${trimmedQuery}”`}
 </span>
 </DashboardDropdownItem>
 </>
 ) : (
 <div className="px-1 pb-1">
 <div className="flex flex-col items-center px-3 pb-2 pt-6 text-center">
 <span className="flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-[var(--border)] bg-[var(--surface-muted)]">
 <PiPlus className="h-5 w-5"/>
 </span>
 <p className="mt-3 text-xs text-[var(--rubric-muted)]">
 No match yet
 </p>
 </div>
 <DashboardDropdownItem
 onSelect={(event) => {
 event.preventDefault();
 void createFromQuery();
 }}
 className="justify-center gap-2 font-medium"
 >
 <PiPlus className="h-4 w-4 shrink-0"/>
 <span className="truncate">
 {createLabel || `Create “${trimmedQuery}”`}
 </span>
 </DashboardDropdownItem>
 </div>
 )}
 </>
 )}
 </>
 )}
 </div>
 </DashboardDropdownContent>
 </DashboardDropdown>
 );
}

function SelectTrailingIcon({
 busy,
 showPlus,
}: {
 busy: boolean;
 showPlus: boolean;
}) {
 if (busy) {
 return <PiSpinnerGap className="h-4 w-4 shrink-0 animate-spin text-[var(--rubric-muted)]"/>;
 }
 if (showPlus) {
 return <PiPlus className="h-4 w-4 shrink-0 text-[var(--rubric-muted)]"/>;
 }
 return <PiCaretDown className="h-4 w-4 shrink-0 text-[var(--rubric-muted)]"/>;
}

function SelectLoadingState() {
 return (
 <div className="space-y-2 px-1.5 py-2" aria-live="polite" aria-busy="true">
 {[0, 1, 2].map((index) => (
 <div
 key={index}
 className="flex h-10 items-center gap-3 rounded-lg px-2"
 >
 <div className="h-4 w-4 shrink-0 animate-pulse rounded-full bg-[var(--surface-muted)]"/>
 <div
 className="h-3 animate-pulse rounded-full bg-[var(--surface-muted)]"
 style={{ width: `${58 - index * 12}%` }}
 />
 </div>
 ))}
 <div className="flex items-center justify-center gap-2 pt-1 text-xs text-[var(--rubric-muted)]">
 <PiSpinnerGap className="h-3.5 w-3.5 animate-spin"/>
 Loading…
 </div>
 </div>
 );
}

function SelectCreatingState({ name }: { name: string }) {
 return (
 <div className="flex flex-col items-center px-4 py-8 text-center" aria-live="polite" aria-busy="true">
 <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)]">
 <PiSpinnerGap className="h-5 w-5 animate-spin text-[var(--foreground)]"/>
 </span>
 <p className="mt-3 text-sm font-semibold text-[var(--foreground)]">
 Creating{name ? ` “${name}”` :""}…
 </p>
 <p className="mt-1 text-xs text-[var(--rubric-muted)]">This only takes a moment</p>
 </div>
 );
}

function SelectEmptyCreateState() {
 return (
 <div className="flex flex-col items-center px-4 py-8 text-center">
 <span className="flex h-11 w-11 items-center justify-center rounded-full border border-dashed border-[var(--border)] bg-[var(--surface-muted)] text-[var(--foreground)]">
 <PiPlus className="h-5 w-5"/>
 </span>
 <p className="mt-3 text-sm font-semibold text-[var(--foreground)]">
 Nothing here yet
 </p>
 <p className="mt-1 text-xs text-[var(--rubric-muted)]">
 Type a name, then press the plus to create it
 </p>
 </div>
 );
}

export {
 DashboardDropdown,
 DashboardDropdownTrigger,
 DashboardDropdownContent,
 DashboardDropdownItem,
 DashboardDropdownLabel,
 DashboardDropdownSeparator,
 DashboardDropdownSub,
 DashboardDropdownSubTrigger,
 DashboardDropdownSubContent,
 DashboardDropdownCheckboxItem,
 DashboardSelect,
};
