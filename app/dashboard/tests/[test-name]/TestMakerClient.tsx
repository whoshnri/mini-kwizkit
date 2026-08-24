"use client";

import { useCallback, useState } from "react";
import {
  PiPlus,
  PiTrash,
  PiFloppyDisk,
  PiFileText,
  PiCheckCircle,
  PiCircle,
  PiWarningCircle,
  PiUsers,
  PiGear,
  PiEye,
  PiEyeSlash,
  PiSlidersHorizontal,
} from "react-icons/pi";
import {
  DashboardButton,
  DashboardField,
  fieldClass,
  ResponsiveSheet,
  textareaClass,
  DashboardPanel,
  StatusBadge,
} from "../../components/primitives";
import { DashboardSelect } from "../../components/DashboardDropdown";
import type { Question, Test } from "@/app/dashboard/hooks/useTestMaker";
import { SegmentedTabs } from "@/components/SegmentedTabs";
import {
  useEditTestForm,
  useQuestionForm,
  useTestMaker,
} from "@/app/dashboard/hooks/useTestMaker";
import { useSettingsModal } from "@/app/dashboard/hooks/useSettingsModal";
import { InviteesList, TestSettingsFields } from "../../components/TestSettingsFields";
import { DetailSaveBar } from "../../components/detail/DetailSaveBar";
import { useUnsavedChanges } from "../../components/UnsavedChanges";
import FlareIcon from "@mui/icons-material/Flare";
import AIContentModal from "../../components/Aimodal";

import { PenNibIcon } from "@phosphor-icons/react";
import { formatDate } from "../../lib/schoolOptions";
import type { TestInvitee } from "@/lib/setting";

type QuestionType = Question["type"];

const TestMakerClient = ({ testSlug }: { testSlug: string }) => {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "questions" | "settings" | "participation"
  >("questions");
  const {
    test,
    newTest,
    setNewTest,
    loading,
    error,
    saving,
    hasChanges,
    isModalOpen,
    activeQuestion,
    handleTestUpdate,
    handleDiscardChanges,
    handleModalOpen,
    handleModalClose,
    onSaveQuestion,
    handleDeleteQuestion,
    toggleVisibility,
  } = useTestMaker({ testSlug });
  const {
    settings,
    saving: savingSettings,
    loading: loadingSettings,
    saveError,
    saveSuccess,
    isDirty: settingsDirty,
    updateGeneralSetting,
    updateSecuritySetting,
    updateInvitees,
    updateTestTime,
    save: saveSettingsState,
    discard: discardSettings,
  } = useSettingsModal({ testId: test?.id ?? "" });

  const pageDirty = hasChanges || settingsDirty;
  const pageSaving = saving || savingSettings;

  const discardAll = useCallback(() => {
    handleDiscardChanges();
    discardSettings();
  }, [discardSettings, handleDiscardChanges]);

  const handleUpdateTestTime = useCallback(
    (timeInMinutes: number) => {
      updateTestTime(timeInMinutes);
      setNewTest((prev) =>
        prev
          ? { ...prev, durationMinutes: Math.max(0, timeInMinutes) }
          : prev
      );
    },
    [setNewTest, updateTestTime]
  );

  const saveAll = useCallback(async () => {
    if (settingsDirty) {
      const ok = await saveSettingsState();
      if (!ok) return;
    }
    if (hasChanges) {
      await handleTestUpdate(
        settings.testTime > 0 ? settings.testTime : 0
      );
    }
  }, [
    handleTestUpdate,
    hasChanges,
    saveSettingsState,
    settings.testTime,
    settingsDirty,
  ]);

  useUnsavedChanges(pageDirty, { onLeave: discardAll });

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[var(--background)] p-6">
        <span className="loading loading-bars loading-xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[var(--background)] p-6">
        <div className="w-full max-w-sm rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-6 text-center">
          <PiWarningCircle className="mx-auto h-10 w-10 text-[var(--rubric-danger)]" />
          <p className="mt-3 text-base font-semibold text-[var(--rubric-danger)]">
            Error loading test
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">{error}</p>
        </div>
      </div>
    );
  }

  if (!test || !newTest) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[var(--background)] p-6 text-[var(--muted)]">
        No test data found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Test Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--foreground)]">
            {newTest.name}
          </h1>
          <p className="text-sm text-[var(--rubric-muted)]">
            {newTest.subject} · {newTest.difficulty} ·{""}
            {newTest.numberOfQuestions} questions
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsAiModalOpen(true)}
            className="flex h-10 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 text-xs font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface-muted)] shadow-sm"
          >
            <FlareIcon className="h-4 w-4" />
            <span>Use AI Assistant</span>
          </button>
          <DashboardButton
            variant="secondary"
            onClick={toggleVisibility}
            className="h-10 px-4"
          >
            {newTest.visibility ? (
              <PiEye className="h-4 w-4" />
            ) : (
              <PiEyeSlash className="h-4 w-4" />
            )}
            {newTest.visibility ? "Public" : "Private"}
          </DashboardButton>
        </div>
      </div>

      <SegmentedTabs
        value={activeTab}
        onChange={setActiveTab}
        items={[
          {
            id: "overview",
            label: "Overview",
            icon: <PiFileText size={18} />,
          },
          {
            id: "questions",
            label: "Questions",
            icon: <PiCheckCircle size={18} />,
          },
          {
            id: "settings",
            label: "Settings",
            icon: <PiSlidersHorizontal size={18} />,
          },
          {
            id: "participation",
            label: "Participation",
            icon: <PiUsers size={18} />,
          },
        ]}
      />

      <div className="min-h-0">
        {activeTab === "overview" && (
          <TestOverview
            newTest={newTest}
            setNewTest={setNewTest}
            onDurationChange={handleUpdateTestTime}
            invitees={settings.users?.invitees ?? []}
            onInviteesChange={updateInvitees}
          />
        )}

        {activeTab === "questions" && (
          <div className="flex flex-row items-start gap-5 pb-6">
            <main className="flex-grow space-y-6 overflow-y-auto pr-2">
              <BuilderPage
                newTest={newTest}
                onDeleteQuestion={handleDeleteQuestion}
                onEditQuestion={handleModalOpen}
              />
            </main>

            <QuestionNavigator
              questions={newTest.questions}
              onSelectQuestion={handleModalOpen}
              onAddNew={() => handleModalOpen(null)}
            />
          </div>
        )}

        {activeTab === "settings" && (
          <TestSettingsPanel
            settings={settings}
            loading={loadingSettings}
            saveError={saveError}
            saveSuccess={saveSuccess}
            updateGeneralSetting={updateGeneralSetting}
            updateSecuritySetting={updateSecuritySetting}
            updateInvitees={updateInvitees}
            updateTestTime={handleUpdateTestTime}
          />
        )}

        {activeTab === "participation" && (
          <TestParticipation attempts={newTest.liveAttempts || []} />
        )}
      </div>

      <DetailSaveBar
        hasChanges={pageDirty}
        saving={pageSaving}
        onSave={() => void saveAll()}
        onDiscard={discardAll}
      />

      {isModalOpen && (
        <AddQuestionModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={onSaveQuestion}
          testId={test.id}
          initialQuestion={activeQuestion}
        />
      )}
      <AIContentModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        currentContent=""
      />
    </div>
  );
};

export default TestMakerClient;

function TestSettingsPanel({
  settings,
  loading,
  saveError,
  saveSuccess,
  updateGeneralSetting,
  updateSecuritySetting,
  updateInvitees,
  updateTestTime,
}: {
  settings: ReturnType<typeof useSettingsModal>["settings"];
  loading: boolean;
  saveError: string | null;
  saveSuccess: boolean;
  updateGeneralSetting: ReturnType<
    typeof useSettingsModal
  >["updateGeneralSetting"];
  updateSecuritySetting: ReturnType<
    typeof useSettingsModal
  >["updateSecuritySetting"];
  updateInvitees: ReturnType<typeof useSettingsModal>["updateInvitees"];
  updateTestTime: (timeInMinutes: number) => void;
}) {
  if (loading) {
    return (
      <DashboardPanel className="flex min-h-64 items-center justify-center p-6">
        <span className="loading loading-bars loading-xl" />
      </DashboardPanel>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <DashboardPanel className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-[var(--foreground)]">
            Test Settings
          </h3>
          <p className="mt-1 text-sm text-[var(--rubric-muted)]">
            Configure grading, security, and proctoring for live attempts.
          </p>
        </div>

        <TestSettingsFields
          formId="test-page-settings-form"
          settings={settings}
          updateGeneralSetting={updateGeneralSetting}
          updateSecuritySetting={updateSecuritySetting}
          updateInvitees={updateInvitees}
          updateTestTime={updateTestTime}
          onSubmit={(event) => event.preventDefault()}
        />

        {saveError && (
          <p className="mt-4 rounded-xl border border-[rgba(180,35,24,0.2)] bg-[rgba(180,35,24,0.08)] px-3 py-2 text-sm text-[var(--rubric-danger)]">
            {saveError}
          </p>
        )}
        {saveSuccess && !saveError && (
          <p className="mt-4 rounded-xl border border-[rgba(47,107,79,0.2)] bg-[rgba(47,107,79,0.08)] px-3 py-2 text-sm text-[var(--rubric-success)]">
            Settings saved. Live attempts will use these rules.
          </p>
        )}
      </DashboardPanel>

      <DashboardPanel className="h-fit p-6">
        <div className="mb-4 flex items-center gap-2">
          <PiGear className="h-5 w-5 text-[var(--rubric-muted)]" />
          <h3 className="text-lg font-medium text-[var(--foreground)]">
            Active config
          </h3>
        </div>
        <dl className="space-y-3 text-sm">
          <ConfigRow
            label="Time limit"
            value={
              settings.testTime > 0 ? `${settings.testTime} min` : "Untimed"
            }
          />
          <ConfigRow
            label="Pass mark"
            value={`${settings.general.passPercentage}%`}
          />
          <ConfigRow
            label="Participants"
            value={
              (settings.users?.invitees?.length ?? 0) > 0
                ? `${settings.users.invitees.length} invited`
                : "Anyone with the link"
            }
          />
          <ConfigRow
            label="Retakes"
            value={settings.general.allowRetake ? "Allowed" : "Disabled"}
          />
          <ConfigRow
            label="Show results"
            value={settings.general.showResults ? "Yes" : "No"}
          />
          <ConfigRow
            label="Shuffle"
            value={
              [
                settings.general.shuffleQuestions ? "Questions" : null,
                settings.general.shuffleOptions ? "Options" : null,
              ]
                .filter(Boolean)
                .join(",") || "Off"
            }
          />
          <ConfigRow
            label="Tab tracking"
            value={
              settings.security.enableTabSwitching
                ? `Limit ${settings.security.tabSwitchLimit}`
                : "Off"
            }
          />
          <ConfigRow
            label="Copy / paste"
            value={settings.security.disableCopyPaste ? "Blocked" : "Allowed"}
          />
          <ConfigRow
            label="Webcam"
            value={settings.security.requireWebcam ? "Required" : "Optional"}
          />
          <ConfigRow
            label="Microphone"
            value={settings.security.requireMic ? "Required" : "Optional"}
          />
          <ConfigRow
            label="Access password"
            value={settings.security.accessPassword ? "Set" : "None"}
          />
        </dl>
      </DashboardPanel>
    </div>
  );
}

function ConfigRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-[var(--border)] pb-3 last:border-b-0 last:pb-0">
      <dt className="text-[var(--rubric-muted)]">{label}</dt>
      <dd className="text-right font-medium text-[var(--foreground)]">
        {value}
      </dd>
    </div>
  );
}

function TestOverview({
  newTest,
  setNewTest,
  onDurationChange,
  invitees,
  onInviteesChange,
}: {
  newTest: Test;
  setNewTest: any;
  onDurationChange?: (minutes: number) => void;
  invitees: TestInvitee[];
  onInviteesChange: (invitees: TestInvitee[]) => void;
}) {
  const { handleChange } = useEditTestForm({ setNewTest });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <DashboardPanel className="p-6">
        <h3 className="mb-4 text-lg font-medium">Test Information</h3>
        <div className="space-y-4">
          <DashboardField label="Test Name">
            <input
              type="text"
              name="name"
              value={newTest.name}
              onChange={handleChange}
              className={fieldClass}
            />
          </DashboardField>
          <DashboardField label="Subject">
            <input
              type="text"
              name="subject"
              value={typeof newTest.subject === "string" ? newTest.subject : ""}
              onChange={handleChange}
              placeholder="e.g., Biology"
              className={fieldClass}
            />
          </DashboardField>
          <DashboardField label="Description">
            <textarea
              name="description"
              value={newTest.description ?? ""}
              onChange={handleChange}
              className={textareaClass}
              rows={4}
            />
          </DashboardField>
          <div className="grid grid-cols-2 gap-4">
            <DashboardField label="Difficulty">
              <DashboardSelect
                value={newTest.difficulty}
                onValueChange={(value) =>
                  setNewTest((prev: any) =>
                    prev
                      ? { ...prev, difficulty: value as Test["difficulty"] }
                      : prev,
                  )
                }
                options={[
                  { value: "easy", label: "Easy" },
                  { value: "medium", label: "Medium" },
                  { value: "hard", label: "Hard" },
                ]}
              />
            </DashboardField>
            <DashboardField label="Duration (minutes)">
              <input
                type="number"
                name="durationMinutes"
                value={newTest.durationMinutes || 0}
                onChange={(event) => {
                  handleChange(event);
                  onDurationChange?.(parseInt(event.target.value, 10) || 0);
                }}
                className={fieldClass}
              />
            </DashboardField>
          </div>
        </div>
      </DashboardPanel>

      <DashboardPanel className="p-6">
        <InviteesList invitees={invitees} onChange={onInviteesChange} />
      </DashboardPanel>
    </div>
  );
}

function TestParticipation({ attempts }: { attempts: any[] }) {
  return (
    <DashboardPanel className="overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-medium">Test Attempts</h3>
        <p className="text-sm text-[var(--rubric-muted)]">
          Track student participation and scores.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[var(--surface-muted)] border-y border-[var(--border)]">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase text-[var(--rubric-muted)]">
                Student
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-[var(--rubric-muted)]">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-[var(--rubric-muted)]">
                Score
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-[var(--rubric-muted)]">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {attempts.length > 0 ? (
              attempts.map((attempt) => (
                <tr
                  key={attempt.id}
                  className="hover:bg-[var(--surface-muted)]/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-[var(--foreground)]">
                      {attempt.student.firstName} {attempt.student.lastName}
                    </div>
                    <div className="text-xs text-[var(--rubric-muted)]">
                      {attempt.student.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge
                      tone={attempt.submittedAt ? "success" : "warning"}
                    >
                      {attempt.submittedAt ? "Submitted" : "Ongoing"}
                    </StatusBadge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-[var(--foreground)]">
                      {attempt.score ?? "-"}/{attempt.totalMarks ?? "-"}
                    </div>
                    {attempt.score !== null && attempt.totalMarks && (
                      <div className="text-[10px] text-[var(--rubric-muted)]">
                        {Math.round((attempt.score / attempt.totalMarks) * 100)}
                        %
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--rubric-muted)]">
                    {formatDate(attempt.startedAt)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-sm text-[var(--rubric-muted)]"
                >
                  No participation records found yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardPanel>
  );
}

function BuilderPage({
  newTest,
  onDeleteQuestion,
  onEditQuestion,
}: {
  newTest: Test;
  onDeleteQuestion: (questionId: string) => void;
  onEditQuestion: (question: Question) => void;
}) {
  return (
    <div className="mb-24 rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 md:p-6">
      <h3 className="mb-4 text-xl font-medium">
        Questions ({newTest.questions.length})
      </h3>

      {newTest.questions.length > 0 ? (
        <div className="space-y-4">
          {newTest.questions.map((question, index) => (
            <div
              key={question.id}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-4"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex-grow pr-4">
                  <h4 className="font-medium">
                    {index + 1}. {question.text}
                  </h4>
                </div>
                <div className="flex flex-shrink-0 gap-2">
                  <button
                    onClick={() => onEditQuestion(question)}
                    className="rounded-full border border-[var(--border)] bg-[var(--surface-strong)] p-2 text-[var(--foreground)]"
                    title="Edit Question"
                  >
                    <PenNibIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDeleteQuestion(question.id)}
                    className="rounded-full border border-[rgba(180,35,24,0.18)] bg-[rgba(180,35,24,0.08)] p-2 text-[var(--rubric-danger)]"
                    title="Delete Question"
                  >
                    <PiTrash className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {(
                ["multiple_choice", "true_or_false"] as QuestionType[]
              ).includes(question.type) &&
                question.options && (
                  <ul className="mb-2 space-y-1 text-sm">
                    {Object.entries(question.options).map(
                      ([key, value], optionIndex) => (
                        <li
                          key={key}
                          className={`flex items-center gap-2 ${
                            optionIndex === question.correctOption
                              ? "font-medium text-[var(--foreground)]"
                              : "text-[var(--muted)]"
                          }`}
                        >
                          {optionIndex === question.correctOption ? (
                            <PiCheckCircle className="h-4 w-4" />
                          ) : (
                            <PiCircle className="h-4 w-4 text-[var(--rubric-muted)]" />
                          )}
                          <span>
                            {String.fromCharCode(65 + optionIndex)}.{""}
                            {String(value)}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                )}

              <div className="mt-3 flex items-center justify-between border-t border-[var(--border)] pt-3 text-xs text-[var(--rubric-muted)]">
                <span className="rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-2 py-1 text-xs font-medium text-[var(--foreground)]">
                  {question.marks} Points
                </span>
                {question.explanation && (
                  <p className="text-sm italic text-[var(--muted)]">
                    <span className="font-medium">Explanation available</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-[var(--border)] py-16 text-center">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)]">
            <PiFileText className="h-12 w-12 text-[var(--rubric-muted)]" />
          </div>
          <h3 className="mb-2 text-lg font-medium">No questions yet</h3>
          <p className="text-[var(--muted)]">
            Add your first question using the navigator on the right.
          </p>
        </div>
      )}
    </div>
  );
}

function QuestionNavigator({
  questions,
  onSelectQuestion,
  onAddNew,
}: {
  questions: Question[];
  onSelectQuestion: (question: Question) => void;
  onAddNew: () => void;
}) {
  return (
    <aside className="sticky top-6 hidden h-[calc(60dvh-3rem)] w-80 flex-none lg:flex">
      <div className="flex min-h-0 w-full flex-col rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-4">
        <div className="mb-4 shrink-0 flex items-center justify-between">
          <h3 className="text-lg font-medium">Question navigator</h3>
        </div>
        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {questions.map((question, index) => (
            <button
              key={question.id}
              onClick={() => onSelectQuestion(question)}
              className="flex w-full items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-3 text-left transition-colors hover:bg-[var(--surface-strong)]"
            >
              <PiFileText className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--foreground)]" />
              <div className="flex-grow">
                <p className="truncate text-sm font-medium">
                  {index + 1}. {question.text.slice(0, 20)}...
                </p>
                <p className="text-xs text-[var(--rubric-muted)]">
                  {question.type.replace(/_/g, "")} - {question.marks} marks
                </p>
              </div>
            </button>
          ))}
          {questions.length === 0 && (
            <p className="py-8 text-center text-sm text-[var(--rubric-muted)]">
              Your questions will appear here.
            </p>
          )}
        </div>
        <div className="mt-4 shrink-0 border-t border-[var(--border)] pt-4">
          <button onClick={onAddNew} className="rubric-button-primary w-full">
            <PiPlus className="h-5 w-5" /> Add new question
          </button>
        </div>
      </div>
    </aside>
  );
}

function AddQuestionModal({
  isOpen,
  onClose,
  onSave,
  testId,
  initialQuestion,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (q: Question) => void;
  testId: string;
  initialQuestion: Question | null;
}) {
  const {
    isEditing,
    newQuestion,
    setNewQuestion,
    handleOptionChange,
    handleSave,
  } = useQuestionForm({
    testId,
    initialQuestion,
    onSave,
    onClose,
  });

  if (!isOpen) return null;

  return (
    <ResponsiveSheet
      title={isEditing ? "Edit question" : "Add question"}
      onClose={onClose}
      className="md:max-w-[660px]"
      footer={
        <DashboardButton onClick={handleSave} className="w-full md:w-auto">
          <PiFloppyDisk className="h-4 w-4" />
          {isEditing ? "Update question" : "Save question"}
        </DashboardButton>
      }
    >
      <div className="space-y-4">
        <DashboardField label="Question type">
          <DashboardSelect
            value={newQuestion.type}
            onValueChange={(value) =>
              setNewQuestion((prev) => ({
                ...prev,
                type: value as QuestionType,
              }))
            }
            options={[
              { value: "multiple_choice", label: "Multiple Choice" },
              { value: "true_or_false", label: "True / False" },
              { value: "short_answer", label: "Short Answer" },
              { value: "essay", label: "Essay" },
            ]}
          />
        </DashboardField>

        <DashboardField label="Question text">
          <textarea
            required
            value={newQuestion.text}
            onChange={(e) =>
              setNewQuestion((prev) => ({ ...prev, text: e.target.value }))
            }
            className={textareaClass}
            rows={3}
            placeholder="Type the question students will answer"
          />
        </DashboardField>

        {newQuestion.type === "multiple_choice" && (
          <div className="space-y-3">
            <p className="text-xs font-bold text-[var(--rubric-muted)]">
              Answer options
            </p>
            {Object.keys(newQuestion.options).map((key, index) => (
              <div
                key={key}
                className={`flex h-[46px] items-center gap-3 rounded-lg border px-3 ${
                  index === newQuestion.correctOption
                    ? "border-emerald-300 bg-emerald-500/15 dark:border-emerald-700 dark:bg-emerald-500/15"
                    : "border-[var(--border)] bg-[var(--surface-muted)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() =>
                    setNewQuestion((prev) => ({
                      ...prev,
                      correctOption: index,
                    }))
                  }
                  className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold ${
                    index === newQuestion.correctOption
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-[var(--border)] bg-[var(--surface)] text-[var(--rubric-muted)]"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </button>
                <input
                  type="text"
                  required
                  value={newQuestion.options[key]}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none"
                />
              </div>
            ))}
          </div>
        )}

        {newQuestion.type === "true_or_false" && (
          <DashboardField label="Correct">
            <DashboardSelect
              value={String(newQuestion.correctOption ?? 0)}
              onValueChange={(value) =>
                setNewQuestion((prev) => ({
                  ...prev,
                  correctOption: parseInt(value),
                }))
              }
              options={[
                { value: "0", label: "True" },
                { value: "1", label: "False" },
              ]}
            />
          </DashboardField>
        )}

        <div className="grid grid-cols-2 gap-3">
          <DashboardField label="Marks">
            <input
              type="number"
              min={1}
              required
              value={newQuestion.marks}
              onChange={(e) =>
                setNewQuestion((prev) => ({
                  ...prev,
                  marks: parseInt(e.target.value) || 1,
                }))
              }
              className={fieldClass}
            />
          </DashboardField>
          <DashboardField label="Correct">
            <DashboardSelect
              value={String(newQuestion.correctOption ?? 0)}
              disabled={newQuestion.type !== "multiple_choice"}
              onValueChange={(value) =>
                setNewQuestion((prev) => ({
                  ...prev,
                  correctOption: parseInt(value),
                }))
              }
              options={Object.keys(newQuestion.options).map((_, index) => ({
                value: String(index),
                label: String.fromCharCode(65 + index),
              }))}
            />
          </DashboardField>
        </div>

        <DashboardField label="Explanation">
          <textarea
            value={newQuestion.explanation ?? ""}
            onChange={(e) =>
              setNewQuestion((prev) => ({
                ...prev,
                explanation: e.target.value,
              }))
            }
            className={textareaClass}
            rows={3}
            placeholder="Optional explanation after review"
          />
        </DashboardField>
      </div>
    </ResponsiveSheet>
  );
}
