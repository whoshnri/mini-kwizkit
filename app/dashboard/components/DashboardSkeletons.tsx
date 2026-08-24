"use client";

export function Skeleton({ className =""}: { className?: string }) {
 return (
 <div
 className={`animate-pulse rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] ${className}`}
 style={{ animationDuration:"1.5s"}}
 />
 );
}

export function StatCardSkeleton() {
 return (
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
 {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
 <div
 key={i}
 className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm"
 >
 <div className="flex items-center justify-between">
 <Skeleton className="h-4 w-24"/>
 <Skeleton className="h-9 w-9 rounded-full"/>
 </div>
 <div className="mt-4 space-y-2">
 <Skeleton className="h-8 w-20"/>
 <Skeleton className="h-3 w-32"/>
 </div>
 </div>
 ))}
 </div>
 );
}

export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
 return (
 <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
 {/* Table Header */}
 <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-muted)] px-6 py-4">
 <Skeleton className="h-4 w-32"/>
 <Skeleton className="h-8 w-24 rounded-lg"/>
 </div>

 {/* Table Rows */}
 <div className="divide-y divide-[var(--border)]">
 {Array.from({ length: rows }).map((_, rIdx) => (
 <div key={rIdx} className="flex items-center justify-between px-6 py-4">
 <div className="flex items-center gap-3">
 <Skeleton className="h-9 w-9 rounded-full shrink-0"/>
 <div className="space-y-1.5">
 <Skeleton className="h-4 w-40"/>
 <Skeleton className="h-3 w-24"/>
 </div>
 </div>
 <div className="hidden sm:flex items-center gap-8">
 {Array.from({ length: columns - 1 }).map((_, cIdx) => (
 <Skeleton key={cIdx} className="h-4 w-20"/>
 ))}
 </div>
 <Skeleton className="h-8 w-8 rounded-full"/>
 </div>
 ))}
 </div>
 </div>
 );
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
 return (
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
 {Array.from({ length: count }).map((_, idx) => (
 <div
 key={idx}
 className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm space-y-4"
 >
 <div className="flex items-start justify-between gap-3">
 <div className="space-y-2 flex-1">
 <Skeleton className="h-5 w-3/4"/>
 <Skeleton className="h-3.5 w-1/2"/>
 </div>
 <Skeleton className="h-8 w-8 rounded-full shrink-0"/>
 </div>

 <div className="space-y-2 pt-2 border-t border-[var(--border)]">
 <Skeleton className="h-3 w-full"/>
 <Skeleton className="h-3 w-5/6"/>
 </div>

 <div className="flex items-center justify-between pt-2">
 <Skeleton className="h-6 w-20 rounded-full"/>
 <Skeleton className="h-8 w-24 rounded-xl"/>
 </div>
 </div>
 ))}
 </div>
 );
}

export function DetailHeaderSkeleton() {
 return (
 <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
 <div className="flex items-center justify-between">
 <Skeleton className="h-4 w-36"/>
 <Skeleton className="h-8 w-28 rounded-xl"/>
 </div>
 <Skeleton className="h-8 w-64"/>
 <Skeleton className="h-4 w-96"/>
 <div className="flex gap-4 pt-4">
 <Skeleton className="h-10 w-32 rounded-xl"/>
 <Skeleton className="h-10 w-32 rounded-xl"/>
 </div>
 </div>
 );
}
