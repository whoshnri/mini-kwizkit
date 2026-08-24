"use client";

import { useSession } from "@/app/SessionContext";
import AccountPageClient from "./components/AccountPageClient";
import { DetailHeaderSkeleton } from "../components/DashboardSkeletons";

export default function AccountPage() {
  const { loading } = useSession();

  if (loading) {
    return <DetailHeaderSkeleton />;
  }

  return <AccountPageClient />;
}
