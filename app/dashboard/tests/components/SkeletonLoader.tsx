"use client";

import { CardGridSkeleton } from "../../components/DashboardSkeletons";

export default function SkeletonLoader() {
  return <CardGridSkeleton count={6} />;
}