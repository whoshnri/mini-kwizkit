"use client";

import { FC, useRef, useEffect } from"react";
import { useForm } from"react-hook-form";
import { zodResolver } from"@hookform/resolvers/zod";
import { motion, AnimatePresence } from"framer-motion";
import {
 DashboardButton,
 DashboardField,
 fieldClass,
 ResponsiveSheet,
 textareaClass,
} from"./primitives";
import { useAIContentModal } from"@/app/dashboard/hooks/useAIContentModal";
import { AiModalStep, AiQuestionType } from"@/app/dashboard/lib/aiModal";
import {
 aiContentSchema,
 type AiContentFormValues,
} from"@/lib/schemas/dashboardSchemas";
import {
 CheckCircle2,
 Sparkles,
 Check,
 ArrowUp,
 RefreshCw,
} from"lucide-react";
import { PenNibIcon, UploadIcon } from"@phosphor-icons/react";
import FlareIcon from"@mui/icons-material/Flare";
import CircularProgress from"@mui/material/CircularProgress";

interface AIContentModalProps {
 isOpen: boolean;
 onClose: () => void;
 currentContent?: string;
}

const AIContentModal: FC<AIContentModalProps> = ({
 isOpen,
 onClose,
 currentContent,
}) => {
 const modal = useAIContentModal({ onClose, currentContent });

 if (!isOpen) return null;

 return (
 <ResponsiveSheet
 title="AI Assistant"
 onClose={modal.close}
 className="md:max-w-3xl"
 >
 <div className="space-y-6">
 <MultistepFlow modal={modal} />
 </div>
 </ResponsiveSheet>
 );
};

export default AIContentModal;

type ModalController = ReturnType<typeof useAIContentModal>;

function MultistepFlow({ modal }: { modal: ModalController }) {
 const step2Ref = useRef<HTMLDivElement>(null);

 useEffect(() => {
 if (modal.step === AiModalStep.Configuration && step2Ref.current) {
 step2Ref.current.scrollIntoView({ behavior:"smooth", block:"start"});
 }
 }, [modal.step]);

 if (modal.step === AiModalStep.Onboarding) {
 return <OnboardingStep modal={modal} />;
 }

 if (modal.step === AiModalStep.Loading) {
 return <LoadingStep />;
 }

 if (modal.step === AiModalStep.Review) {
 return <ReviewStep modal={modal} />;
 }

 const isConfigured = modal.step === AiModalStep.Configuration;

 return (
 <div className="space-y-6">
 {/* STEP 1: Goal Selection (Pushed Upward when Configured) */}
 <div className="space-y-3">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2 text-xs font-semi uppercase text-[var(--rubric-muted)]">
 <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--foreground)] text-xs text-[var(--background)]">
 1
 </span>
 <span>Goal</span>
 </div>

 {isConfigured && (
 <button
 type="button"
 onClick={() => modal.resetToUseCaseSelection()}
 className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-2 text-xs font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface-muted)]"
 >
 <RefreshCw className="h-3 w-3"/>
 <span>Change Goal</span>
 </button>
 )}
 </div>

 {isConfigured ? (
 /* Scrolled Up Collapsed Summary Card in Rubric Theme */
 <motion.div
 initial={{ opacity: 0, y: -8 }}
 animate={{ opacity: 1, y: 0 }}
 className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-4 text-left"
 >
 <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--foreground)] text-[var(--background)]">
 {modal.useCase ==="revise"? (
 <PenNibIcon className="h-5 w-5"/>
 ) : (
 <FlareIcon className="h-5 w-5"/>
 )}
 </div>
 <div>
 <p className="text-sm font-semibold text-[var(--foreground)]">
 {modal.useCase ==="revise"
 ?"Revise Existing Content"
 :"Create New Content"}
 </p>
 <p className="text-xs text-[var(--rubric-muted)]">
 {modal.useCase ==="revise"
 ?"Improve, rephrase, or expand questions in this test."
 :"Generate fresh questions from your prompt or notes."}
 </p>
 </div>
 </motion.div>
 ) : (
 /* Step 1 Choice Cards in Rubric Theme */
 <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-1">
 <button
 type="button"
 onClick={() => modal.selectUseCase("revise")}
 className="flex min-h-36 cursor-pointer flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-5 text-left transition hover:border-[var(--foreground)] hover:bg-[var(--surface-muted)]"
 >
 <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)]">
 <PenNibIcon className="h-5 w-5"/>
 </div>
 <div>
 <h3 className="text-base font-semibold text-[var(--foreground)]">
 Revise Content
 </h3>
 <p className="mt-1 text-xs text-[var(--rubric-muted)]">
 Improve, shorten, or rephrase questions already in this test.
 </p>
 </div>
 </button>

 <button
 type="button"
 onClick={() => modal.selectUseCase("create")}
 className="flex min-h-36 cursor-pointer flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-5 text-left transition hover:border-[var(--foreground)] hover:bg-[var(--surface-muted)]"
 >
 <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)]">
 <FlareIcon className="h-5 w-5"/>
 </div>
 <div>
 <h3 className="text-base font-semibold text-[var(--foreground)]">
 Create Content
 </h3>
 <p className="mt-1 text-xs text-[var(--rubric-muted)]">
 Generate a new question set from your prompt or uploaded
 notes.
 </p>
 </div>
 </button>
 </div>
 )}
 </div>

 {/* STEP 2: Scrolled-Into-View Configuration Form (React Hook Form + Zod) */}
 {isConfigured && (
 <div ref={step2Ref} className="space-y-4 pt-2">
 <div className="flex items-center gap-2 text-xs font-semi uppercase text-[var(--rubric-muted)] pt-5">
 <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--foreground)] text-xs text-[var(--background)]">
 2
 </span>
 <span>Configure & Guide AI</span>
 </div>

 <ConfigurationStepForm modal={modal} />
 </div>
 )}
 </div>
 );
}

function ConfigurationStepForm({ modal }: { modal: ModalController }) {
 const {
 register,
 handleSubmit,
 setValue,
 watch,
 formState: { errors },
 } = useForm<AiContentFormValues>({
 resolver: zodResolver(aiContentSchema),
 defaultValues: {
 subject: modal.subject ||"",
 numQuestions: modal.numQuestions || 5,
 prompt: modal.prompt ||"",
 questionTypes: modal.questionTypes || ["multiple_choice"],
 },
 });

 const selectedQuestionTypes = watch("questionTypes") || [];

 const toggleType = (type: AiQuestionType) => {
 const current = selectedQuestionTypes;
 const updated = current.includes(type)
 ? current.length === 1
 ? current
 : current.filter((t) => t !== type)
 : [...current, type];

 setValue("questionTypes", updated as any);
 modal.toggleQuestionType(type);
 };

 const onFormSubmit = (data: AiContentFormValues) => {
 modal.setSubject(data.subject ||"");
 modal.setNumQuestions(data.numQuestions);
 modal.setPrompt(data.prompt);
 modal.generate();
 };

 return (
 <motion.form
 initial={{ opacity: 0, y: 16 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.2, ease:"easeOut"}}
 onSubmit={handleSubmit(onFormSubmit)}
 className="space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm"
 >
 <div className="space-y-4">
 <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
 <DashboardField label="Subject">
 <input
 {...register("subject")}
 onChange={(e) => {
 register("subject").onChange(e);
 modal.setSubject(e.target.value);
 }}
 placeholder="e.g., Biology"
 className={fieldClass}
 />
 {errors.subject && (
 <p className="mt-1 text-xs text-[var(--rubric-danger)]">
 {errors.subject.message}
 </p>
 )}
 </DashboardField>

 <DashboardField label="Number of Questions">
 <input
 type="number"
 {...register("numQuestions", { valueAsNumber: true })}
 onChange={(e) => {
 register("numQuestions", { valueAsNumber: true }).onChange(e);
 modal.setNumQuestions(Number(e.target.value));
 }}
 className={fieldClass}
 min="1"
 max="20"
 />
 {errors.numQuestions && (
 <p className="mt-1 text-xs text-[var(--rubric-danger)]">
 {errors.numQuestions.message}
 </p>
 )}
 </DashboardField>
 </div>

 <div className="space-y-2">
 <span className="block text-xs font-bold text-[var(--rubric-muted)]">
 Question Types
 </span>
 <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
 {[
 { value:"multiple_choice", label:"Multiple Choice"},
 { value:"true_or_false", label:"True / False"},
 { value:"short_answer", label:"Short Answer"},
 { value:"essay", label:"Essay"},
 ].map((option) => {
 const selected = selectedQuestionTypes.includes(
 option.value as AiQuestionType,
 );
 return (
 <button
 key={option.value}
 type="button"
 onClick={() => toggleType(option.value as AiQuestionType)}
 className={`flex items-center gap-2 rounded-xl border p-3 text-left transition text-xs font-semibold ${
 selected
 ?"border-[var(--rubric-black)] bg-[var(--foreground)] text-[var(--background)]"
 :"border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-muted)]"
 }`}
 >
 <span
 className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${
 selected
 ?"border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]"
 :"border-[var(--border)] bg-[var(--surface)]"
 }`}
 >
 {selected && <Check className="h-2.5 w-2.5"/>}
 </span>
 {option.label}
 </button>
 );
 })}
 </div>
 {errors.questionTypes && (
 <p className="mt-1 text-xs text-[var(--rubric-danger)]">
 {errors.questionTypes.message}
 </p>
 )}
 </div>

 <DashboardField label="AI Prompt">
 <textarea
 {...register("prompt")}
 onChange={(e) => {
 register("prompt").onChange(e);
 modal.setPrompt(e.target.value);
 }}
 placeholder="Describe the topic, grade level, format, and any rules the questions should follow."
 rows={4}
 className={textareaClass}
 />
 {errors.prompt && (
 <p className="mt-1 text-xs text-[var(--rubric-danger)]">
 {errors.prompt.message}
 </p>
 )}
 </DashboardField>

 <div>
 <span className="mb-2 block text-xs font-bold text-[var(--rubric-muted)]">
 Optional Guide (.txt)
 </span>
 <label
 onDrop={modal.handleDrop}
 onDragOver={modal.handleDragEvents}
 onDragEnter={modal.handleDragEvents}
 onDragLeave={modal.handleDragEvents}
 className={`flex min-h-28 w-full cursor-pointer items-center justify-center rounded-xl border border-dashed px-4 py-4 transition ${
 modal.isDragging
 ?"border-[var(--rubric-black)] bg-[var(--surface-muted)]"
 :"border-[var(--border)] bg-[var(--surface-strong)] hover:bg-[var(--surface-muted)]"
 }`}
 >
 <div className="space-y-1 text-center">
 <UploadIcon className="mx-auto h-6 w-6 text-[var(--foreground)]"/>
 <div className="text-xs text-[var(--muted)]">
 <span className="font-semibold text-[var(--foreground)]">
 Upload a file
 </span>
 {""}
 or drag & drop
 <input
 id="file-upload"
 name="file-upload"
 type="file"
 accept=".txt"
 onChange={modal.handleFileChange}
 className="sr-only"
 />
 </div>
 <p className="text-xs text-[var(--rubric-muted)]">
 TXT up to 1MB
 </p>
 </div>
 </label>
 {modal.fileName && (
 <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[var(--foreground)]">
 <CheckCircle2 className="h-4 w-4"/>
 File attached: {modal.fileName}
 </p>
 )}
 </div>
 </div>

 <div className="flex justify-end gap-3 pt-2">
 <DashboardButton
 type="button"
 variant="secondary"
 onClick={modal.close}
 >
 Cancel
 </DashboardButton>
 <DashboardButton type="submit">
 <FlareIcon className="h-4 w-4"/>
 Generate Questions
 </DashboardButton>
 </div>
 </motion.form>
 );
}

function OnboardingStep({ modal }: { modal: ModalController }) {
 return (
 <div className="space-y-6">
 <div>
 <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--surface-muted)] text-[var(--foreground)]">
 <Sparkles className="h-5 w-5"/>
 </div>
 <h2 className="text-2xl font-semibold text-[var(--foreground)]">
 Create better questions with AI
 </h2>
 <p className="mt-2 text-sm text-[var(--muted)]">
 Start with a goal, add the context you want Rubric to follow, then
 review each generated question before importing it into your test.
 </p>
 </div>

 <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4">
 <ul className="space-y-3 text-sm text-[var(--muted)]">
 <li>
 <strong className="font-semibold text-[var(--foreground)]">
 Choose a goal.
 </strong>
 {""}
 Revise existing text or create fresh questions.
 </li>
 <li>
 <strong className="font-semibold text-[var(--foreground)]">
 Add context.
 </strong>
 {""}
 Include the subject, count, and a clear prompt.
 </li>
 <li>
 <strong className="font-semibold text-[var(--foreground)]">
 Attach notes.
 </strong>
 {""}
 Upload a <code>.txt</code> file when you want the output to follow
 source material.
 </li>
 </ul>
 </div>

 <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
 <label className="flex cursor-pointer items-center text-sm font-medium text-[var(--muted)]">
 <input
 type="checkbox"
 checked={modal.dontShowAgain}
 onChange={(event) => modal.setDontShowAgain(event.target.checked)}
 className="h-4 w-4 rounded border-[var(--border)] accent-[var(--rubric-black)]"
 />
 <span className="ml-2">Don't show this again</span>
 </label>
 <DashboardButton type="button"onClick={modal.proceedFromOnboarding}>
 Get Started
 </DashboardButton>
 </div>
 </div>
 );
}

function LoadingStep() {
 return (
 <div className="flex flex-col items-center justify-center py-20">
 <CircularProgress
 size={40}
 color="inherit"
 className="text-[var(--foreground)]"
 aria-label="Loading…"
 />
 <h2 className="mt-4 text-xl font-semibold text-[var(--foreground)]">
 Generating questions...
 </h2>
 <p className="mt-1 text-sm text-[var(--muted)]">
 The AI is preparing your draft.
 </p>
 </div>
 );
}

function ReviewStep({ modal }: { modal: ModalController }) {
 return (
 <div className="space-y-6">
 <div className="flex items-center justify-between">
 <div>
 <h2 className="text-xl font-semibold text-[var(--foreground)]">
 Review Generated Questions
 </h2>
 <p className="text-xs text-[var(--rubric-muted)]">
 Review and fine-tune questions before importing into your test.
 </p>
 </div>
 <DashboardButton type="button"onClick={modal.importQuestions}>
 Import {modal.generatedQuestions.length} Questions
 </DashboardButton>
 </div>

 <div className="max-h-[450px] space-y-4 overflow-y-auto pr-1">
 {modal.generatedQuestions.map((q, idx) => (
 <div
 key={q.id || idx}
 className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm space-y-3"
 >
 <div className="flex items-center justify-between">
 <span className="text-xs font-semi uppercase text-[var(--rubric-muted)]">
 Question {idx + 1} ({q.type})
 </span>
 </div>
 <input
 value={q.text}
 onChange={(e) =>
 modal.updateQuestion(q.id,"text", e.target.value)
 }
 className={fieldClass}
 />
 </div>
 ))}
 </div>
 </div>
 );
}
