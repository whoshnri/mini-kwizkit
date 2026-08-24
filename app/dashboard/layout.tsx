"use client";

import Header from "./components/Header";
import QueryProvider from "@/components/providers/QueryProvider";
import { UnsavedChangesProvider } from "./components/UnsavedChanges";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <UnsavedChangesProvider>
        <div className="h-dvh overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
          <main className="h-dvh min-w-0 overflow-y-auto">
            <Header />
            <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-6 sm:px-6 sm:pt-8">
              {children}
            </div>
          </main>
        </div>
      </UnsavedChangesProvider>
    </QueryProvider>
  );
}
