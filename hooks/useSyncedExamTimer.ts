"use client";

import { useCallback, useEffect, useRef, useState } from"react";
import { getExamAttemptState, startExamAttempt } from"@/app/actions/liveTestOps";
import type { ViolationFlag } from"@/lib/violation";

type ExamTimerState = {
 secondsLeft: number;
 timePenaltySeconds: number;
 proctorDeductions: number;
 endedByProctor: boolean;
 endReason: string | null;
 examStartedAt: string | null;
 violationFlags: ViolationFlag[];
 ready: boolean;
 blocked: boolean;
 blockReason: string | null;
};

export function useSyncedExamTimer(testSlug: string, attemptId: string | null, enabled: boolean) {
 const [state, setState] = useState<ExamTimerState>({
 secondsLeft: 0,
 timePenaltySeconds: 0,
 proctorDeductions: 0,
 endedByProctor: false,
 endReason: null,
 examStartedAt: null,
 violationFlags: [],
 ready: false,
 blocked: false,
 blockReason: null,
 });
 const refreshInFlightRef = useRef(false);

 const applyServerState = useCallback(
 (metadata: {
 secondsRemaining: number;
 timePenaltySeconds: number;
 proctorDeductions: number;
 endedByProctor: boolean;
 endReason: string | null;
 examStartedAt?: string | null;
 violationFlags?: ViolationFlag[];
 }) => {
 setState((current) => ({
 ...current,
 secondsLeft: metadata.secondsRemaining,
 timePenaltySeconds: metadata.timePenaltySeconds,
 proctorDeductions: metadata.proctorDeductions,
 endedByProctor: metadata.endedByProctor,
 endReason: metadata.endReason,
 examStartedAt: metadata.examStartedAt ?? current.examStartedAt,
 violationFlags: metadata.violationFlags ?? current.violationFlags,
 ready: true,
 blocked: false,
 blockReason: null,
 }));
 },
 []
 );

 const refreshState = useCallback(async () => {
 if (!attemptId || refreshInFlightRef.current) return null;

 refreshInFlightRef.current = true;
 try {
 const response = await getExamAttemptState(attemptId, testSlug);
 if (response.status === 403 && response.metadata?.alreadySubmitted) {
 setState((current) => ({
 ...current,
 ready: true,
 blocked: true,
 blockReason:
 response.message ||
"You have already submitted this test. Retakes are disabled.",
 }));
 return null;
 }

 if (response.status !== 200 || !response.metadata) {
 return null;
 }

 applyServerState(response.metadata);
 return response.metadata;
 } finally {
 refreshInFlightRef.current = false;
 }
 }, [applyServerState, attemptId, testSlug]);

 useEffect(() => {
 if (!enabled || !attemptId) return;

 let cancelled = false;

 async function bootstrap() {
 const started = await startExamAttempt(attemptId!, testSlug);
 if (cancelled) return;

 if (started.status === 200 && started.metadata) {
 setState({
 secondsLeft: started.metadata.secondsRemaining,
 timePenaltySeconds: started.metadata.timePenaltySeconds,
 proctorDeductions: started.metadata.proctorDeductions,
 endedByProctor: started.metadata.endedByProctor,
 endReason: started.metadata.endReason,
 examStartedAt: started.metadata.examStartedAt,
 violationFlags: started.metadata.violationFlags ?? [],
 ready: true,
 blocked: false,
 blockReason: null,
 });
 return;
 }

 if (started.status === 403 || started.status === 404) {
 setState((current) => ({
 ...current,
 ready: true,
 blocked: true,
 blockReason: started.message ||"This attempt is no longer available.",
 }));
 return;
 }

 await refreshState();
 }

 void bootstrap();

 return () => {
 cancelled = true;
 };
 }, [attemptId, enabled, refreshState, testSlug]);

 useEffect(() => {
 if (!state.ready || !enabled || state.blocked) return;

 const timer = window.setInterval(() => {
 setState((current) => ({
 ...current,
 secondsLeft: Math.max(current.secondsLeft - 1, 0),
 }));
 }, 1000);

 return () => window.clearInterval(timer);
 }, [enabled, state.blocked, state.ready]);

 useEffect(() => {
 if (!enabled || !attemptId || !state.ready || state.blocked) return;

 const syncTimer = window.setInterval(() => {
 void refreshState();
 }, 60_000);

 return () => window.clearInterval(syncTimer);
 }, [attemptId, enabled, refreshState, state.blocked, state.ready]);

 const syncFromServer = useCallback(() => {
 void refreshState();
 }, [refreshState]);

 return {
 ...state,
 refreshState,
 syncFromServer,
 };
}
