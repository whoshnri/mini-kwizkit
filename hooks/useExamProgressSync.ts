"use client";

import { useEffect, useRef, useState } from"react";
import {
 cacheExamAttempt,
 getCachedExamAttempt,
 getExamAttemptState,
} from"@/app/actions/liveTestOps";

type AnswerMap = Record<string, string | number | null>;

type Options = {
 testSlug: string;
 attemptId: string | null;
 studentId: string | null;
 answers: AnswerMap;
 flagged: string[];
 currentIndex: number;
 secondsRemaining: number;
 enabled: boolean;
 onServerState?: (state: {
 answers: AnswerMap;
 flagged: string[];
 currentIndex: number;
 }) => void;
};

export function useExamProgressSync({
 testSlug,
 attemptId,
 studentId,
 answers,
 flagged,
 currentIndex,
 secondsRemaining,
 enabled,
 onServerState,
}: Options) {
 const [lastCacheSavedAt, setLastCacheSavedAt] = useState<string | null>(null);
 const [cacheNotice, setCacheNotice] = useState<string | null>(null);
 const [cacheSaving, setCacheSaving] = useState(false);
 const snapshotRef = useRef({ answers, flagged, currentIndex, secondsRemaining });
 snapshotRef.current = { answers, flagged, currentIndex, secondsRemaining };

 useEffect(() => {
 if (!enabled || !attemptId || !studentId) return;

 let cancelled = false;

 async function hydrate() {
 const cached = await getCachedExamAttempt(attemptId!);
 if (cancelled) return;

 if (cached.status === 200 && cached.metadata) {
 onServerState?.({
 answers: cached.metadata.answers ?? {},
 flagged: cached.metadata.flagged ?? [],
 currentIndex: cached.metadata.currentIndex ?? 0,
 });
 setLastCacheSavedAt(cached.metadata.savedAt);
 return;
 }

 const response = await getExamAttemptState(attemptId!, testSlug);
 if (cancelled || response.status !== 200 || !response.metadata) return;

 onServerState?.({
 answers: response.metadata.answers ?? {},
 flagged: response.metadata.flagged ?? [],
 currentIndex: response.metadata.currentIndex ?? 0,
 });
 }

 void hydrate();

 return () => {
 cancelled = true;
 };
 }, [attemptId, enabled, onServerState, studentId, testSlug]);

 useEffect(() => {
 if (!enabled || !attemptId || !studentId) return;

 const save = async () => {
 const snap = snapshotRef.current;
 setCacheSaving(true);
 try {
 const result = await cacheExamAttempt({
 attemptId,
 testSlug,
 studentId,
 answers: snap.answers,
 flagged: snap.flagged,
 currentIndex: snap.currentIndex,
 secondsRemaining: snap.secondsRemaining,
 });

 if (result.status === 200) {
 const savedAt = result.metadata?.savedAt ?? new Date().toISOString();
 setLastCacheSavedAt(savedAt);
 setCacheNotice(
 result.metadata?.cached
 ?"Answers synced to secure cache"
 :"Answers saved (cache unavailable)"
 );
 }
 } finally {
 setCacheSaving(false);
 }
 };

 // Immediate first upsert shortly after mount, then every minute.
 const first = window.setTimeout(() => {
 void save();
 }, 5_000);

 const timer = window.setInterval(() => {
 void save();
 }, 60_000);

 return () => {
 window.clearTimeout(first);
 window.clearInterval(timer);
 };
 }, [attemptId, enabled, studentId, testSlug]);

 useEffect(() => {
 if (!cacheNotice) return;
 const timer = window.setTimeout(() => setCacheNotice(null), 4_000);
 return () => window.clearTimeout(timer);
 }, [cacheNotice]);

 return {
 lastCacheSavedAt,
 cacheNotice,
 cacheSaving,
 };
}
