"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SegmentedTab<T extends string = string> = {
  id: T;
  label: ReactNode;
  icon?: ReactNode;
  count?: number;
};

export function SegmentedTabs<T extends string>({
  items,
  value,
  onChange,
  stretch = false,
  className,
}: {
  items: Array<SegmentedTab<T>>;
  value: T;
  onChange: (id: T) => void;
  stretch?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex max-w-full overflow-x-auto rounded-full border border-[var(--border)] bg-[var(--surface-muted)] p-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        stretch ? "w-full" : "w-fit",
        className
      )}
    >
      {items.map((item) => {
        const selected = item.id === value;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={cn(
              "flex shrink-0 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
              stretch && "flex-1",
              selected
                ? "bg-[var(--foreground)] text-[var(--background)] shadow-sm"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            )}
          >
            {item.icon}
            {item.label}
            {item.count !== undefined && (
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-bold",
                  selected
                    ? "bg-[var(--background)]/15"
                    : "bg-[var(--surface)] text-[var(--muted)]"
                )}
              >
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
