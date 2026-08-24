"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "../SessionContext";

export default function AppLayout({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
