"use client";

import Link from "next/link";
import Image from "next/image";
import { PiMoon, PiSun } from "react-icons/pi";
import { useSession } from "../../SessionContext";
import { useTheme } from "@/app/ThemeContext";
import AccountDropdownMenu from "@/app/components/AccountDropdownMenu";

export default function Header() {
  const { session } = useSession();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-[var(--border)] bg-[var(--surface-strong)]/90 px-4 backdrop-blur-md sm:px-6">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]"
      >
        <Image src="/logo.svg" alt="KwizKit" width={20} height={20} className="rounded" />
        <span className="hidden sm:inline">KwizKit</span>
      </Link>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-strong)] text-[var(--rubric-muted)] transition hover:border-[var(--foreground)]/30 hover:text-[var(--foreground)]"
        >
          {theme === "dark" ? (
            <PiSun className="h-4 w-4 text-amber-400" />
          ) : (
            <PiMoon className="h-4 w-4" />
          )}
        </button>

        {session ? (
          <AccountDropdownMenu session={session} />
        ) : (
          <div className="h-8 w-8 animate-pulse rounded-full bg-[var(--surface-muted)]" />
        )}
      </div>
    </header>
  );
}
