"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from"react";
import { useRouter } from"next/navigation";
import {
 PiCheckCircle,
 PiFlag,
 PiFlagFill,
 PiPaperPlaneTilt,
 PiTimer,
 PiWarningCircle,
 PiVideoCamera,
 PiCaretDown,
 PiCaretUp,
 PiCloudArrowUp,
} from"react-icons/pi";
import type { LiveQuestion, LiveTestPayload } from"@/app/actions/liveTestOps";
import { saveExamProgress, submitLiveAttempt } from"@/app/actions/liveTestOps";
import { StudentActionOverlay } from"@/components/exam/StudentActionOverlay";
import { useAIProctoring } from"@/hooks/useAIProctoring";
import { useBrowserActivityMonitor } from"@/hooks/useBrowserActivityMonitor";
import { useExamProgressSync } from"@/hooks/useExamProgressSync";
import { useLiveStudentStream } from"@/hooks/useLiveStudentStream";
import { useProctoringCamera } from"@/hooks/useProctoringCamera";
import { useSyncedExamTimer } from"@/hooks/useSyncedExamTimer";
import { useViolationReporter } from"@/hooks/useViolationReporter";
import { liveStreamRoomId, liveStudentParticipantId } from"@/lib/stream";
import type { ProctorAction, ViolationFlag } from"@/lib/violation";
import { StudentBroadcastPanel } from"@/components/exam/StudentBroadcastPanel";
import { LiveLoadingShell, StreamConnectionBadge } from"@/components/exam/LiveLoadingShell";
import { clearExamProgress } from"./examSessionStorage";
import {
 clearStoredLiveAttempt,
 readStoredLiveAttempt,
 type StoredLiveAttempt,
} from"./liveAttemptStorage";

type AnswerMap = Record<string, string | number | null>;

type SubmitResult = {
 score: number;
 totalMarks: number;
 baseScore?: number;
 proctorDeductions?: number;
 violationFlags?: ViolationFlag[];
 endReason?: string | null;
 showResults?: boolean;
 allowRetake?: boolean;
 passed?: boolean;
 passPercentage?: number;
 percentage?: number;
};

const DEFAULT_LIVE_SETTINGS = {
 shuffleQuestions: false,
 shuffleOptions: false,
 allowRetake: false,
 showResults: false,
 passPercentage: 50,
 enableTabSwitching: true,
 tabSwitchLimit: 3,
 disableCopyPaste: false,
 requireWebcam: false,
 requireMic: false,
 requiresAccessPassword: false,
 testTime: 0,
};

export default function LiveTestClient({ test }: { test: LiveTestPayload }) {
 const router = useRouter();
 const settings = {
 ...DEFAULT_LIVE_SETTINGS,
 ...(test.settings ?? {}),
 allowRetake: test.allowRetake,
 showResults: test.showResults,
 testTime: test.duration ?? 0,
 };
 const isUntimed = !settings.testTime || settings.testTime <= 0;
 const [attempt, setAttempt] = useState<StoredLiveAttempt | null>(null);
 const [currentIndex, setCurrentIndex] = useState(0);
 const [answers, setAnswers] = useState<AnswerMap>({});
 const [flagged, setFlagged] = useState<string[]>([]);
 const [submitting, setSubmitting] = useState(false);
 const [result, setResult] = useState<SubmitResult | null>(null);
 const [error, setError] = useState<string | null>(null);
 const [cameraExpanded, setCameraExpanded] = useState(true);
 const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
 const [confirmUnderstood, setConfirmUnderstood] = useState(false);
 const [blockedMessage, setBlockedMessage] = useState<string | null>(null);

 const handleDownloadPDF = useCallback(() => {
 const printWindow = window.open("","_blank");
 if (!printWindow) return;

 const html =`
 <html>
 <head>
 <title>${test.name} - Submitted Answers</title>
 <style>
 @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
 body {
 font-family:'Outfit', -apple-system, BlinkMacSystemFont,"Segoe UI", Roboto, sans-serif;
 color: #1c1c1c;
 padding: 80px 40px 40px 40px;
 max-width: 600px;
 margin: auto auto;
 line-height: 1.6;
 background-color: #fafaf9;
 }
 .container {
 background: #ffffff;
 border: 1px solid #e0ddd6;
 border-radius: 24px;
 padding: 40px;
 box-shadow: 0 4px 20px rgba(28, 28, 28, 0.03);
 }
 .header {
 border-bottom: 1px solid #e0ddd6;
 padding-bottom: 24px;
 margin-bottom: 32px;
 }
 .badge {
 display: inline-block;
 background-color: #e8e3d8;
 color: #1c1c1c;
 font-size: 11px;
 font-weight: 700;
 text-transform: uppercase;
 letter-spacing: 0.05em;
 padding: 4px 10px;
 border-radius: 9999px;
 margin-bottom: 12px;
 }
 .title {
 font-size: 26px;
 font-weight: 700;
 margin: 0 0 12px 0;
 color: #1c1c1c;
 letter-spacing: -0.02em;
 }
 .meta {
 font-size: 13px;
 color: #4a4a4a;
 display: grid;
 grid-template-columns: repeat(2, 1fr);
 gap: 10px;
 }
 .meta-item span {
 font-weight: 600;
 color: #1c1c1c;
 }
 .question-card {
 margin-bottom: 28px;
 page-break-inside: avoid;
 }
 .question-num {
 font-size: 12px;
 font-weight: 700;
 text-transform: uppercase;
 letter-spacing: 0.05em;
 color: #888780;
 margin-bottom: 6px;
 }
 .question-text {
 font-size: 16px;
 font-weight: 600;
 margin: 0 0 14px 0;
 color: #1c1c1c;
 }
 .answer-section {
 background-color: #f5f5f3;
 border: 1px solid #e0ddd6;
 border-radius: 16px;
 padding: 20px;
 }
 .answer-label {
 font-size: 10px;
 font-weight: 700;
 text-transform: uppercase;
 letter-spacing: 0.05em;
 color: #888780;
 margin-bottom: 8px;
 }
 .answer-value {
 font-size: 14px;
 white-space: pre-wrap;
 color: #1c1c1c;
 }
 .empty-answer {
 color: #888780;
 font-style: italic;
 }
 .watermark {
 position: fixed;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%) rotate(-15deg);
 width: 380px;
 height: 380px;
 opacity: 0.035;
 pointer-events: none;
 z-index: -100;
 }
 .pdf-footer {
 margin-top: 48px;
 border-top: 1px solid #e0ddd6;
 padding-top: 16px;
 font-size: 11px;
 color: #888780;
 display: flex;
 align-items: center;
 gap: 6px;
 justify-content: center;
 page-break-inside: avoid;
 }
 @media print {
 body {
 background-color: #ffffff;
 padding: 80px 0 0 0;
 }
 .container {
 border: none;
 box-shadow: none;
 padding: 0;
 }
 }
 </style>
 </head>
 <body>
 <div class="watermark">
 <svg width="100%"height="100%"viewBox="0 0 259 277"fill="none"xmlns="http://www.w3.org/2000/svg">
 <path d="M0 145L126 182V277L0 237V145Z"fill="#000000"/>
 <path d="M126 182L259 105V199L126 277V182Z"fill="#000000"/>
 <path d="M43 48L175 86V180L43 143V48Z"fill="#000000"/>
 <path d="M175 86L259 37V132L175 180V86Z"fill="#000000"/>
 <path d="M43 48L132 0L259 37L175 86L43 48Z"fill="#000000"/>
 <rect x="133"y="178.338"width="47"height="34"transform="rotate(-27 133 178.338)"fill="#000000"/>
 <path d="M0 145L43 120L175 157L126 182L0 145Z"fill="#000000"/>
 <path opacity="0.25"d="M126 182V277"stroke="#000000"stroke-width="2"/>
 </svg>
 </div>
 <div class="container">
 <div class="header">
 <h1 class="title">${test.name}</h1>
 <div class="meta">
 <div class="meta-item"><span>Subject:</span> ${test.subject}</div>
 <div class="meta-item"><span>Date:</span> ${new Date().toLocaleDateString()}</div>
 <div class="meta-item"><span>Student Email:</span> ${attempt?.email ??""}</div>
 <div class="meta-item"><span>Student Name:</span> ${attempt?.studentName ??""}</div>
 </div>
 </div>
 <div class="questions">
 ${test.questions.map((q, idx) => {
 const answer = answers[q.id];
 let displayAnswer ="";
 if (answer === undefined || answer === null || String(answer).trim() ==="") {
 displayAnswer ='<span class="empty-answer">No answer submitted</span>';
 } else if (q.type ==="multiple_choice"|| q.type ==="true_or_false") {
 const opt =
 q.type ==="multiple_choice"&& typeof answer ==="number"
 ? q.options.find((o) => (o.originalIndex ?? -1) === answer) ??
 q.options[answer]
 : q.options.find((o) => o.key === String(answer));
 displayAnswer = opt ?`<strong>(${opt.key})</strong> ${opt.value}`: String(answer);
 } else {
 displayAnswer = String(answer);
 }

 return`
 <div class="question-card">
 <div class="question-num">Question ${idx + 1} (${q.marks} marks)</div>
 <h2 class="question-text">${q.text}</h2>
 <div class="answer-section">
 <div class="answer-value">${displayAnswer}</div>
 </div>
 </div>
`;
 }).join("")}
 </div>
 <div class="pdf-footer">
 <svg width="12"height="13"viewBox="0 0 259 277"fill="none"xmlns="http://www.w3.org/2000/svg">
 <path d="M0 145L126 182V277L0 237V145Z"fill="#4A4A4A"/>
 <path d="M126 182L259 105V199L126 277V182Z"fill="#1C1C1C"/>
 <path d="M43 48L175 86V180L43 143V48Z"fill="#D8D3C8"/>
 <path d="M175 86L259 37V132L175 180V86Z"fill="#1C1C1C"/>
 <path d="M43 48L132 0L259 37L175 86L43 48Z"fill="#E8E3D8"/>
 <rect x="133"y="178.338"width="47"height="34"transform="rotate(-27 133 178.338)"fill="#1C1C1C"/>
 <path d="M0 145L43 120L175 157L126 182L0 145Z"fill="#E8E3D8"/>
 <path opacity="0.25"d="M126 182V277"stroke="#121212"stroke-width="2"/>
 </svg>
 <span>Verified by Rubric</span>
 </div>
 </div>
 <script>
 window.onload = function() {
 window.print();
 };
 </script>
 </body>
 </html>
`;

 printWindow.document.write(html);
 printWindow.document.close();
 }, [answers, test, attempt]);

 useEffect(() => {
 const storedAttempt = readStoredLiveAttempt(test.slug);
 if (!storedAttempt) {
 router.replace(`/live/${test.slug}/access`);
 return;
 }

 setAttempt(storedAttempt);
 }, [router, test.slug]);

 const examActive = Boolean(attempt) && !result && !blockedMessage;

 const {
 secondsLeft,
 timePenaltySeconds,
 proctorDeductions,
 ready: timerReady,
 blocked: attemptBlocked,
 blockReason,
 violationFlags,
 syncFromServer,
 } = useSyncedExamTimer(test.slug, attempt?.attemptId ?? null, examActive || Boolean(attempt));

 useEffect(() => {
 if (attemptBlocked && blockReason) {
 setBlockedMessage(blockReason);
 clearExamProgress(test.slug);
 clearStoredLiveAttempt(test.slug);
 }
 }, [attemptBlocked, blockReason, test.slug]);

 const handleProctorAction = useCallback(
 (_action: ProctorAction) => {
 syncFromServer();
 },
 [syncFromServer]
 );

 const handleServerProgress = useCallback(
 (state: { answers: AnswerMap; flagged: string[]; currentIndex: number }) => {
 setAnswers((current) => (Object.keys(current).length > 0 ? current : state.answers));
 setFlagged((current) => (current.length > 0 ? current : state.flagged));
 setCurrentIndex((current) => (current > 0 ? current : state.currentIndex));
 },
 []
 );

 const { cacheNotice, cacheSaving, lastCacheSavedAt } = useExamProgressSync({
 testSlug: test.slug,
 attemptId: attempt?.attemptId ?? null,
 studentId: attempt?.studentId ?? null,
 answers,
 flagged,
 currentIndex,
 secondsRemaining: secondsLeft,
 enabled: examActive && timerReady,
 onServerState: handleServerProgress,
 });

 const { proctoringVideoRef } = useProctoringCamera({
 enabled: examActive && settings.requireWebcam,
 });

 const {
 connected,
 connecting,
 error: streamError,
 broadcastMessages,
 proctorNotices,
 localVideoRef,
 activeProctorAction,
 endCountdown,
 dismissProctorAction,
 } = useLiveStudentStream({
 testSlug: test.slug,
 roomId: liveStreamRoomId(test.id),
 attemptId: attempt?.attemptId ??"",
 studentId: attempt?.studentId ??"",
 studentName: attempt?.studentName ??"Student",
 enabled: examActive,
 publishCamera: settings.requireWebcam,
 publishMicrophone: settings.requireMic,
 initialViolationFlags: violationFlags,
 onProctorAction: handleProctorAction,
 });

 const participantId = attempt ? liveStudentParticipantId(attempt.studentId) :"";
 const submitOnLimitRef = useRef<() => void>(() => undefined);
 const { reportViolation } = useViolationReporter(
 test.slug,
 attempt?.attemptId ??"",
 participantId,
 {
 onSessionEnded: () => {
 submitOnLimitRef.current();
 },
 }
 );

 useAIProctoring({
 primaryVideoRef: proctoringVideoRef,
 fallbackVideoRef: localVideoRef,
 onViolation: reportViolation,
 enabled: examActive && timerReady && settings.requireWebcam,
 });

 useBrowserActivityMonitor({
 onViolation: reportViolation,
 enabled: examActive && timerReady && settings.enableTabSwitching,
 });

 const currentQuestion = test.questions[currentIndex];
 const answeredCount = useMemo(
 () =>
 test.questions.filter((question) => {
 const answer = answers[question.id];
 return answer !== undefined && answer !== null && String(answer).trim() !=="";
 }).length,
 [answers, test.questions]
 );

 const unansweredQuestions = useMemo(
 () =>
 test.questions.filter((question) => {
 const answer = answers[question.id];
 return answer === undefined || answer === null || String(answer).trim() ==="";
 }),
 [answers, test.questions]
 );

 const flaggedQuestions = useMemo(
 () => test.questions.filter((question) => flagged.includes(question.id)),
 [flagged, test.questions]
 );

 function formatAnswer(question: LiveQuestion, answer: string | number | null | undefined) {
 if (answer === undefined || answer === null || String(answer).trim() ==="") {
 return"Not answered";
 }
 if (question.type ==="multiple_choice"&& typeof answer ==="number") {
 const option =
 question.options.find((entry) => (entry.originalIndex ?? -1) === answer) ??
 question.options[answer];
 return option ?`${option.key}. ${option.value}`: String(answer);
 }
 if (question.type ==="true_or_false") {
 return String(answer);
 }
 return String(answer);
 }

 function setAnswer(questionId: string, value: string | number | null) {
 setAnswers((current) => ({ ...current, [questionId]: value }));
 }

 function toggleFlag(questionId: string) {
 setFlagged((current) =>
 current.includes(questionId)
 ? current.filter((id) => id !== questionId)
 : [...current, questionId]
 );
 }

 const handleSubmit = useCallback(async () => {
 if (!attempt || submitting) return;

 setSubmitting(true);
 setError(null);

 await saveExamProgress({
 attemptId: attempt.attemptId,
 testSlug: test.slug,
 answers,
 flagged,
 currentIndex,
 });

 const response = await submitLiveAttempt({
 attemptId: attempt.attemptId,
 answers,
 flagged,
 });

 setSubmitting(false);

 if (response.status !== 200 || !response.metadata) {
 setError(response.message);
 return;
 }

 clearExamProgress(test.slug);
 clearStoredLiveAttempt(test.slug);
 setShowSubmitConfirm(false);
 setConfirmUnderstood(false);
 setResult(response.metadata);
 }, [answers, attempt, currentIndex, flagged, submitting, test.slug]);

 useEffect(() => {
 submitOnLimitRef.current = () => {
 void handleSubmit();
 };
 }, [handleSubmit]);

 useEffect(() => {
 if (!showSubmitConfirm) {
 setConfirmUnderstood(false);
 }
 }, [showSubmitConfirm]);

 useEffect(() => {
 if (isUntimed || !timerReady || secondsLeft > 0 || submitting || result || !attempt) return;
 void handleSubmit();
 }, [attempt, handleSubmit, isUntimed, result, secondsLeft, submitting, timerReady]);

 useEffect(() => {
 if (
 activeProctorAction?.type !=="END_SESSION"||
 endCountdown > 0 ||
 submitting ||
 result ||
 !attempt
 ) {
 return;
 }

 void handleSubmit();
 }, [activeProctorAction, attempt, endCountdown, handleSubmit, result, submitting]);

 const needsLiveKit = settings.requireWebcam || settings.requireMic;
 const streamStatus = !needsLiveKit
 ?"idle"
 : streamError
 ?"error"
 : connected
 ?"connected"
 : connecting
 ?"connecting"
 :"idle";

 if (!attempt) {
 return (
 <LiveLoadingShell
 eyebrow={test.subject}
 title={test.name}
 description="Restoring your attempt and preparing your monitored session."
 steps={[
 { label:"Loading attempt", active: true },
 { label: settings.requireWebcam ? "Connecting camera" : "Opening test", done: false },
 ]}
 />
 );
 }

 if (blockedMessage) {
 return (
 <main className="flex min-h-dvh items-center justify-center bg-[var(--background)] p-4">
 <section className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-8 text-center">
 <PiWarningCircle className="mx-auto h-12 w-12 text-[var(--rubric-warning)]"/>
 <h1 className="mt-4 text-2xl font-semibold">Attempt unavailable</h1>
 <p className="mt-3 text-sm text-[var(--muted)]">{blockedMessage}</p>
 {!test.allowRetake && (
 <p className="mt-3 text-xs text-[var(--rubric-muted)]">
 Retakes are disabled for this test. Ask your instructor to enable retake if you need
 another attempt.
 </p>
 )}
 <button
 type="button"
 onClick={() => router.replace(`/live/${test.slug}/access`)}
 className="rubric-button-primary mt-6 w-full"
 >
 Back to access
 </button>
 </section>
 </main>
 );
 }

 if (!currentQuestion) {
 return (
 <main className="flex min-h-dvh items-center justify-center bg-[var(--background)] p-4">
 <div className="max-w-md rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-6 text-center">
 <PiWarningCircle className="mx-auto h-10 w-10 text-[var(--rubric-warning)]"/>
 <h1 className="mt-4 text-xl font-semibold">No questions available</h1>
 <p className="mt-2 text-sm text-[var(--muted)]">
 This test has no questions yet.
 </p>
 </div>
 </main>
 );
 }

 if (result) {
 return (
 <main className="flex min-h-dvh items-center justify-center bg-[var(--background)] p-4">
 <section className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-8 text-center">
 <div className="relative mb-6 flex items-center justify-center rounded-full mx-auto">
 <PiCheckCircle className="h-20 w-20 text-[var(--rubric-success)]"/>
 </div>

 <h1 className="text-2xl font-bold text-[var(--foreground)]">
 Attempt Submitted
 </h1>

 <p className="mt-3 text-base text-[var(--muted)]">
 Your answers for{""}
 <span className="font-semibold text-[var(--foreground)]">{test.name}</span> have been
 recorded. You can safely close this window.
 </p>

 {result.showResults && (
 <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-4 text-left">
 <p className="text-sm text-[var(--rubric-muted)]">Score</p>
 <p className="mt-1 text-2xl font-semibold">
 {result.score} / {result.totalMarks}
 </p>
 {typeof result.percentage ==="number"&& (
 <p className="mt-1 text-sm text-[var(--muted)]">
 {result.percentage}% · Pass mark {result.passPercentage ?? settings.passPercentage}%
 </p>
 )}
 {typeof result.passed ==="boolean"&& (
 <p
 className={`mt-2 text-sm font-semibold ${
 result.passed ?"text-[var(--rubric-success)]":"text-[var(--rubric-danger)]"
 }`}
 >
 {result.passed ?"Passed":"Did not pass"}
 </p>
 )}
 {(result.proctorDeductions ?? 0) > 0 && (
 <p className="mt-2 text-xs text-[var(--rubric-warning)]">
 Includes -{result.proctorDeductions} proctor deductions
 </p>
 )}
 </div>
 )}

 {!result.allowRetake && (
 <p className="mt-4 text-xs text-[var(--rubric-muted)]">
 Retakes are disabled. This was your only attempt unless your instructor enables retake.
 </p>
 )}

 <div className="mt-8 pt-6 border-t border-[var(--border)]">
 <p className="text-sm text-[var(--rubric-muted)] mb-4">
 If you want a receipt of your work, click below to generate and download a PDF of your
 answers.
 </p>
 <button
 type="button"
 onClick={handleDownloadPDF}
 className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[var(--foreground)] px-6 py-3.5 text-sm font-bold text-[var(--background)] transition hover:opacity-90 active:scale-95 shadow-md hover:shadow-lg cursor-pointer duration-150"
 >
 <span>Download</span>
 </button>
 </div>
 </section>
 </main>
 );
 }

 return (
 <main 
 className="min-h-dvh bg-[var(--background)] p-4 text-[var(--foreground)] md:p-6"
 onCopy={settings.disableCopyPaste ? (e) => e.preventDefault() : undefined}
 onCut={settings.disableCopyPaste ? (e) => e.preventDefault() : undefined}
 onPaste={settings.disableCopyPaste ? (e) => e.preventDefault() : undefined}
 onContextMenu={settings.disableCopyPaste ? (e) => e.preventDefault() : undefined}
 >
 {settings.requireWebcam && (
 <video ref={proctoringVideoRef} className="hidden"playsInline muted autoPlay />
 )}

 {activeProctorAction && (
 <StudentActionOverlay
 action={activeProctorAction}
 countdown={
 activeProctorAction.type ==="END_SESSION"? endCountdown : undefined
 }
 onDismiss={dismissProctorAction}
 />
 )}
 <section className="mx-auto flex w-full max-w-7xl items-start gap-6">
 <div className="min-w-0 flex-1">
 <header className="mb-5 rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-5">
 <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
 <div>
 <p className="text-sm font-semibold text-[var(--rubric-muted)]">
 {test.subject}
 </p>
 <h1 className="mt-1 text-2xl font-semibold md:text-3xl">{test.name}</h1>
 </div>
 <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
 <span>{answeredCount} answered</span>
 <span>{flagged.length} flagged</span>
 <StreamConnectionBadge status={streamStatus} errorMessage={streamError} />
 </div>
 </div>
 </header>

 <QuestionPanel
 question={currentQuestion}
 index={currentIndex}
 total={test.questions.length}
 answer={answers[currentQuestion.id]}
 flagged={flagged.includes(currentQuestion.id)}
 onAnswer={(value) => setAnswer(currentQuestion.id, value)}
 onToggleFlag={() => toggleFlag(currentQuestion.id)}
 />

 {error && (
 <p className="mt-4 rounded-xl border border-[rgba(180,35,24,0.2)] bg-[rgba(180,35,24,0.08)] px-3 py-2 text-sm text-[var(--rubric-danger)]">
 {error}
 </p>
 )}

 <div className="mt-5 flex justify-between gap-3">
 <button
 onClick={() => setCurrentIndex((index) => Math.max(index - 1, 0))}
 disabled={currentIndex === 0}
 className="rubric-button-secondary disabled:cursor-not-allowed disabled:opacity-40"
 >
 Previous
 </button>
 {currentIndex === test.questions.length - 1 ? (
 <button
 onClick={() => setShowSubmitConfirm(true)}
 disabled={submitting}
 className="rubric-button-primary disabled:cursor-not-allowed disabled:opacity-60"
 >
 <PiPaperPlaneTilt className="h-5 w-5"/>
 {submitting ?"Submitting...":"Submit test"}
 </button>
 ) : (
 <button
 onClick={() =>
 setCurrentIndex((index) => Math.min(index + 1, test.questions.length - 1))
 }
 className="rubric-button-primary"
 >
 Next question
 </button>
 )}
 </div>
 </div>

 <aside className="sticky top-6 hidden h-[calc(100dvh-3rem)] w-96 flex-none flex-col gap-4 lg:flex">
 <div className="flex min-h-0 flex-1 flex-col rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-4">
 <div className="shrink-0 rounded-2xl border border-[var(--border)] bg-[var(--foreground)] p-4 text-[var(--background)]">
 <div className="flex items-center gap-2 text-sm text-[var(--background)]/75">
 <PiTimer className="h-5 w-5"/>
 {isUntimed ?"Time limit":"Time remaining"}
 </div>
 <p className="mt-2 text-3xl font-semibold tabular-nums">
 {isUntimed
 ?"Untimed"
 : timerReady
 ? formatTime(secondsLeft)
 :"--:--"}
 </p>
 {(timePenaltySeconds > 0 || proctorDeductions > 0) && (
 <p className="mt-2 text-xs text-[var(--background)]/70">
 {timePenaltySeconds > 0 &&`-${timePenaltySeconds}s time`}
 {timePenaltySeconds > 0 && proctorDeductions > 0 &&"·"}
 {proctorDeductions > 0 &&`-${proctorDeductions} marks`}
 </p>
 )}
 </div>

 <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
 <StudentBroadcastPanel messages={broadcastMessages} notices={proctorNotices} />
 </div>

 <div className="mt-4 shrink-0">
 <h2 className="text-lg font-semibold">Question navigator</h2>
 <p className="mt-1 text-sm text-[var(--rubric-muted)]">
 Answered, current, and flagged states stay visible here.
 </p>
 </div>

 <div className="mt-4 max-h-40 overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
 <div className="grid grid-cols-5 gap-2">
 {test.questions.map((question, index) => {
 const isCurrent = index === currentIndex;
 const isAnswered =
 answers[question.id] !== undefined &&
 answers[question.id] !== null &&
 String(answers[question.id]).trim() !=="";
 const isFlagged = flagged.includes(question.id);

 return (
 <button
 key={question.id}
 onClick={() => setCurrentIndex(index)}
 className={`relative flex h-11 items-center justify-center rounded-xl border text-sm font-semibold transition-colors ${
 isCurrent
 ?"border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
 : isAnswered
 ?"border-[rgba(47,107,79,0.25)] bg-[rgba(47,107,79,0.1)] text-[var(--rubric-success)]"
 :"border-[var(--border)] bg-[var(--surface-muted)] text-[var(--muted)] hover:bg-[var(--surface-muted)]"
 }`}
 >
 {index + 1}
 {isFlagged && (
 <PiFlagFill className="absolute -right-1 -top-1 h-4 w-4 text-[var(--rubric-warning)]"/>
 )}
 </button>
 );
 })}
 </div>
 </div>

 <button
 onClick={() => setShowSubmitConfirm(true)}
 disabled={submitting}
 className="rubric-button-primary mt-4 w-full shrink-0 disabled:cursor-not-allowed disabled:opacity-60"
 >
 <PiPaperPlaneTilt className="h-5 w-5"/>
 Submit
 </button>
 </div>
 </aside>
 </section>

 {/* Submission Confirmation Modal */}
 {showSubmitConfirm && (
 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md">
 <div className="flex max-h-[90dvh] w-full max-w-2xl flex-col overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface-strong)] shadow-2xl">
 <div className="border-b border-[var(--border)] p-6">
 <h2 className="text-2xl font-bold text-[var(--foreground)]">
 Review your attempt
 </h2>
 <p className="mt-2 text-sm text-[var(--muted)]">
 Confirm your answers below before locking this submission.
 {!test.allowRetake
 ?"You cannot re-attempt this test after submitting."
 :"You may be allowed to retake later if your instructor keeps retakes enabled."}
 </p>
 <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
 <span className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1">
 {answeredCount} answered
 </span>
 <span className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1">
 {unansweredQuestions.length} unanswered
 </span>
 <span className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1">
 {flaggedQuestions.length} flagged
 </span>
 </div>
 </div>

 <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-6">
 {test.questions.map((question, index) => {
 const isFlagged = flagged.includes(question.id);
 const answer = answers[question.id];
 const isUnanswered =
 answer === undefined || answer === null || String(answer).trim() ==="";

 return (
 <div
 key={question.id}
 className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-4"
 >
 <div className="flex items-start justify-between gap-3">
 <p className="text-xs font-bold uppercase text-[var(--rubric-muted)]">
 Question {index + 1} · {question.marks} marks
 </p>
 <div className="flex items-center gap-2">
 {isFlagged && (
 <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--rubric-warning)]">
 <PiFlagFill className="h-3.5 w-3.5"/>
 Flagged
 </span>
 )}
 {isUnanswered && (
 <span className="text-xs font-semibold text-[var(--rubric-danger)]">
 Unanswered
 </span>
 )}
 </div>
 </div>
 <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
 {question.text}
 </p>
 <p
 className={`mt-3 text-sm ${
 isUnanswered
 ?"italic text-[var(--rubric-muted)]"
 :"text-[var(--muted)]"
 }`}
 >
 {formatAnswer(question, answer)}
 </p>
 </div>
 );
 })}
 </div>

 <div className="space-y-4 border-t border-[var(--border)] p-6">
 <label className="flex items-start gap-3 text-left text-sm text-[var(--muted)]">
 <input
 type="checkbox"
 checked={confirmUnderstood}
 onChange={(event) => setConfirmUnderstood(event.target.checked)}
 className="mt-1 h-4 w-4 rounded border-[var(--border)]"
 />
 <span>
 I understand I can still edit this submission until I confirm, and after
 submitting I{""}
 {test.allowRetake
 ?"may only retake if the instructor keeps retakes enabled"
 :"cannot re-attempt this test"}
 .
 </span>
 </label>

 <div className="flex flex-col gap-3 sm:flex-row">
 <button
 onClick={() => setShowSubmitConfirm(false)}
 disabled={submitting}
 className="w-full rounded-full bg-transparent py-3.5 text-sm font-bold text-[var(--muted)] transition hover:bg-[var(--surface-muted)] sm:order-1"
 >
 Keep editing
 </button>
 <button
 onClick={handleSubmit}
 disabled={submitting || !confirmUnderstood}
 className="rubric-button-primary w-full shadow-md disabled:cursor-not-allowed disabled:opacity-60 sm:order-2"
 >
 {submitting ?"Submitting...":"Confirm and submit"}
 </button>
 </div>
 </div>
 </div>
 </div>
 )}

 {(cacheNotice || cacheSaving) && (
 <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] shadow-lg">
 <PiCloudArrowUp
 className={`h-5 w-5 text-[var(--rubric-success)] ${cacheSaving ?"animate-pulse":""}`}
 />
 <div>
 <p>{cacheNotice ??"Saving answers to secure cache..."}</p>
 {lastCacheSavedAt && !cacheSaving && (
 <p className="text-xs font-medium text-[var(--rubric-muted)]">
 Last sync {new Date(lastCacheSavedAt).toLocaleTimeString()}
 </p>
 )}
 </div>
 </div>
 )}

 {/* Floating Camera Feed */}
 {settings.requireWebcam && (
 <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
 <div 
 className={`flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] shadow-xl w-64 md:w-80 ${
 cameraExpanded ?"flex":"hidden"
 }`}
 >
 <div className="relative aspect-video w-full bg-black">
 <video
 ref={localVideoRef}
 className="h-full w-full object-cover scale-x-[-1]"
 playsInline
 muted
 autoPlay
 />
 <div className="absolute bottom-2 left-2 flex items-center gap-2 rounded-full bg-black/50 px-2.5 py-1 text-white backdrop-blur-md">
 <div
 className={`h-2 w-2 rounded-full ${
 connected ?"bg-green-500": streamError ?"bg-red-500":"bg-yellow-500 animate-pulse"
 }`}
 />
 <span className="text-[10px] font-semibold uppercase">
 {connected ?"Active": streamError ?"Error":"Connecting"}
 </span>
 </div>
 </div>
 </div>
 <button
 onClick={() => setCameraExpanded(!cameraExpanded)}
 className="flex h-10 items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 text-sm font-semibold text-[var(--foreground)] shadow-md transition hover:bg-[var(--surface-muted)]"
 >
 <PiVideoCamera className="h-5 w-5"/>
 {cameraExpanded ? (
 <>
 Hide feed <PiCaretDown className="h-4 w-4"/>
 </>
 ) : (
 <>
 Show feed <PiCaretUp className="h-4 w-4"/>
 </>
 )}
 </button>
 </div>
 )}
 </main>
 );
}

function QuestionPanel({
 question,
 index,
 total,
 answer,
 flagged,
 onAnswer,
 onToggleFlag,
}: {
 question: LiveQuestion;
 index: number;
 total: number;
 answer: string | number | null | undefined;
 flagged: boolean;
 onAnswer: (value: string | number | null) => void;
 onToggleFlag: () => void;
}) {
 return (
 <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-5 md:p-8">
 <div className="flex items-start justify-between gap-4">
 <div>
 <p className="text-sm font-semibold text-[var(--rubric-muted)]">
 Question {index + 1} of {total} · {question.marks} marks
 </p>
 <h2 className="mt-3 text-2xl font-semibold">{question.text}</h2>
 </div>
 <button
 onClick={onToggleFlag}
 className={`inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold ${
 flagged
 ?"border-[rgba(161,98,7,0.25)] bg-[rgba(161,98,7,0.12)] text-[var(--rubric-warning)]"
 :"border-[var(--border)] bg-[var(--surface-muted)] text-[var(--muted)]"
 }`}
 >
 {flagged ? <PiFlagFill className="h-5 w-5"/> : <PiFlag className="h-5 w-5"/>}
 Flag
 </button>
 </div>

 <div className="mt-8">
 {question.type ==="multiple_choice"&& (
 <div className="space-y-3">
 {question.options.map((option, optionIndex) => {
 const answerValue = option.originalIndex ?? optionIndex;
 return (
 <button
 key={`${question.id}-${option.key}-${answerValue}`}
 onClick={() => onAnswer(answerValue)}
 className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
 answer === answerValue
 ?"border-[var(--foreground)] bg-[var(--background)]"
 :"border-[var(--border)] bg-[var(--surface-muted)] hover:border-[var(--foreground)]/25"
 }`}
 >
 <span
 className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${
 answer === answerValue
 ?"border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
 :"border-[var(--border)] bg-[var(--surface-strong)] text-[var(--muted)]"
 }`}
 >
 {option.key}
 </span>
 <span className="text-sm font-medium">{option.value}</span>
 </button>
 );
 })}
 </div>
 )}

 {question.type ==="true_or_false"&& (
 <div className="grid gap-3 sm:grid-cols-2">
 {["true","false"].map((value) => (
 <button
 key={value}
 onClick={() => onAnswer(value)}
 className={`rounded-2xl border p-5 text-left text-sm font-semibold capitalize ${
 answer === value
 ?"border-[var(--foreground)] bg-[var(--background)]"
 :"border-[var(--border)] bg-[var(--surface-muted)] hover:border-[var(--foreground)]/25"
 }`}
 >
 {value}
 </button>
 ))}
 </div>
 )}

 {(question.type ==="short_answer"|| question.type ==="essay") && (
 <textarea
 value={typeof answer ==="string"? answer :""}
 onChange={(event) => onAnswer(event.target.value)}
 rows={question.type ==="essay"? 10 : 4}
 className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-4 text-sm outline-none focus:border-[var(--foreground)]"
 placeholder="Type your answer here"
 />
 )}
 </div>
 </section>
 );
}

function formatTime(totalSeconds: number) {
 const minutes = Math.floor(totalSeconds / 60);
 const seconds = totalSeconds % 60;
 return`${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}
