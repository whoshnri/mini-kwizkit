"use client";

import { useState } from "react";
import { PiPlus, PiTrash } from "react-icons/pi";
import { DashboardField, DashboardSwitch, fieldClass, textareaClass } from "./primitives";
import type { Settings, TestInvitee } from "@/lib/setting";
import { parseInviteeLines, sanitizeInvitees } from "@/lib/setting";

type TestSettingsFieldsProps = {
  settings: Settings;
  updateGeneralSetting: <K extends keyof Settings["general"]>(
    key: K,
    value: Settings["general"][K]
  ) => void;
  updateSecuritySetting: <K extends keyof Settings["security"]>(
    key: K,
    value: Settings["security"][K]
  ) => void;
  updateTestTime: (timeInMinutes: number) => void;
  updateInvitees?: (invitees: TestInvitee[]) => void;
  formId?: string;
  onSubmit?: (event: React.FormEvent) => void;
};

export function InviteesList({
  invitees,
  onChange,
  pasteValue,
  onPasteChange,
}: {
  invitees: TestInvitee[];
  onChange: (next: TestInvitee[]) => void;
  pasteValue?: string;
  onPasteChange?: (value: string) => void;
}) {
  const [internalPaste, setInternalPaste] = useState("");
  const paste = pasteValue ?? internalPaste;
  const setPaste = onPasteChange ?? setInternalPaste;

  function updateRow(index: number, patch: Partial<TestInvitee>) {
    onChange(invitees.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function applyPaste() {
    const parsed = parseInviteeLines(paste);
    if (!parsed.length) return;
    onChange(sanitizeInvitees([...invitees, ...parsed]));
    setPaste("");
  }

  return (
    <section className="space-y-3">
      <div>
        <h3 className="text-[15px] font-semibold text-[var(--foreground)]">Participants</h3>
        <p className="mt-1 text-xs text-[var(--rubric-muted)]">
          Leave empty so anyone with the link can join. Add name and email to limit access.
        </p>
      </div>

      <DashboardField label="Paste emails">
        <textarea
          value={paste}
          onChange={(event) => setPaste(event.target.value)}
          placeholder={"jane@school.edu\nQuinn Murphy <john@school.edu>"}
          rows={3}
          className={textareaClass}
        />
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={applyPaste}
            disabled={!paste.trim()}
            className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] disabled:opacity-50"
          >
            Add pasted emails
          </button>
        </div>
      </DashboardField>

      <div className="space-y-2">
        {invitees.map((invitee, index) => (
          <div key={`${invitee.email}-${index}`} className="grid grid-cols-[1fr_1fr_auto] gap-2">
            <input
              value={invitee.name}
              onChange={(event) => updateRow(index, { name: event.target.value })}
              placeholder="Name"
              className={fieldClass}
            />
            <input
              type="email"
              value={invitee.email}
              onChange={(event) => updateRow(index, { email: event.target.value })}
              placeholder="email@example.com"
              className={fieldClass}
            />
            <button
              type="button"
              onClick={() => onChange(invitees.filter((_, i) => i !== index))}
              className="flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-[var(--border)] text-[var(--rubric-danger)]"
              aria-label="Remove invitee"
            >
              <PiTrash className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onChange([...invitees, { name: "", email: "" }])}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--foreground)]"
      >
        <PiPlus className="h-4 w-4" />
        Add invitee
      </button>
    </section>
  );
}

export function TestSettingsFields({
  settings,
  updateGeneralSetting,
  updateSecuritySetting,
  updateTestTime,
  updateInvitees,
  formId = "settings-form",
  onSubmit,
}: TestSettingsFieldsProps) {
  return (
    <form onSubmit={onSubmit} id={formId} className="space-y-6">
      <section className="space-y-4">
        <h3 className="border-b border-[var(--border)] pb-2 text-[15px] font-semibold text-[var(--foreground)]">
          General & Grading
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <DashboardField label="Time Limit (Minutes)">
            <input
              type="number"
              min="0"
              placeholder="0 for untimed"
              value={settings.testTime || 0}
              onChange={(e) => updateTestTime(Number(e.target.value))}
              className={fieldClass}
            />
          </DashboardField>
          <DashboardField label="Pass Percentage (%)">
            <input
              type="number"
              min="0"
              max="100"
              value={settings.general.passPercentage ?? 50}
              onChange={(e) =>
                updateGeneralSetting("passPercentage", Number(e.target.value))
              }
              className={fieldClass}
            />
          </DashboardField>
        </div>

        <div className="space-y-3">
          <div className="flex h-[42px] items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--foreground)]">Allow Retakes</p>
              <p className="text-xs text-[var(--rubric-muted)]">Students can retake this test</p>
            </div>
            <DashboardSwitch
              checked={settings.general.allowRetake}
              onChange={(checked) => updateGeneralSetting("allowRetake", checked)}
            />
          </div>

          <div className="flex h-[42px] items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--foreground)]">Show Results</p>
              <p className="text-xs text-[var(--rubric-muted)]">
                Display scores & answers after submission
              </p>
            </div>
            <DashboardSwitch
              checked={settings.general.showResults}
              onChange={(checked) => updateGeneralSetting("showResults", checked)}
            />
          </div>

          <div className="flex h-[42px] items-center justify-between">
            <span className="text-sm font-medium text-[var(--foreground)]">
              Shuffle Questions
            </span>
            <DashboardSwitch
              checked={settings.general.shuffleQuestions}
              onChange={(checked) => updateGeneralSetting("shuffleQuestions", checked)}
            />
          </div>

          <div className="flex h-[42px] items-center justify-between">
            <span className="text-sm font-medium text-[var(--foreground)]">
              Shuffle Options
            </span>
            <DashboardSwitch
              checked={settings.general.shuffleOptions}
              onChange={(checked) => updateGeneralSetting("shuffleOptions", checked)}
            />
          </div>
        </div>
      </section>

      {updateInvitees && (
        <InviteesList
          invitees={settings.users?.invitees ?? []}
          onChange={updateInvitees}
        />
      )}

      <section className="space-y-4">
        <h3 className="border-b border-[var(--border)] pb-2 text-[15px] font-semibold text-[var(--foreground)]">
          Security & Proctoring
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <DashboardField label="Tab Switch Limit">
            <input
              type="number"
              min="0"
              value={settings.security.tabSwitchLimit ?? 3}
              onChange={(e) =>
                updateSecuritySetting("tabSwitchLimit", Number(e.target.value))
              }
              className={fieldClass}
              disabled={!settings.security.enableTabSwitching}
            />
          </DashboardField>
          <DashboardField label="Access Password (PIN)">
            <input
              type="text"
              placeholder="Optional password"
              value={settings.security.accessPassword || ""}
              onChange={(e) => updateSecuritySetting("accessPassword", e.target.value)}
              className={fieldClass}
            />
          </DashboardField>
        </div>

        <div className="space-y-3">
          <div className="flex h-[42px] items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--foreground)]">
                Enable Tab Switching
              </p>
              <p className="text-xs text-[var(--rubric-muted)]">
                Track & limit tab switches during test
              </p>
            </div>
            <DashboardSwitch
              checked={settings.security.enableTabSwitching}
              onChange={(checked) =>
                updateSecuritySetting("enableTabSwitching", checked)
              }
            />
          </div>

          <div className="flex h-[42px] items-center justify-between">
            <span className="text-sm font-medium text-[var(--foreground)]">
              Disable Copy / Paste
            </span>
            <DashboardSwitch
              checked={settings.security.disableCopyPaste}
              onChange={(checked) =>
                updateSecuritySetting("disableCopyPaste", checked)
              }
            />
          </div>

          <div className="flex h-[42px] items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--foreground)]">
                Require Webcam Proctoring
              </p>
              <p className="text-xs text-[var(--rubric-muted)]">
                Monitor student video stream
              </p>
            </div>
            <DashboardSwitch
              checked={settings.security.requireWebcam}
              onChange={(checked) => updateSecuritySetting("requireWebcam", checked)}
            />
          </div>

          <div className="flex h-[42px] items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--foreground)]">
                Require Microphone
              </p>
              <p className="text-xs text-[var(--rubric-muted)]">
                Monitor ambient audio during test
              </p>
            </div>
            <DashboardSwitch
              checked={settings.security.requireMic}
              onChange={(checked) => updateSecuritySetting("requireMic", checked)}
            />
          </div>
        </div>
      </section>
    </form>
  );
}
