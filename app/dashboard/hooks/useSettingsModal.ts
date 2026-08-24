"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { cloneDeep, isEqual } from "lodash";
import { fetchSettings } from "@/app/actions/fetchSettings";
import { saveSettings } from "@/app/actions/saveSettings";
import {
  DEFAULT_SETTINGS,
  normalizeSettings,
  sanitizeInvitees,
  type Settings,
  type TestInvitee,
} from "@/lib/setting";

export function useSettingsModal({
  testId,
  onClose,
}: {
  testId: string;
  onClose?: () => void;
}) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [baseline, setBaseline] = useState<Settings>(DEFAULT_SETTINGS);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const isDirty = !isEqual(settings, baseline);

  useEffect(() => {
    let active = true;

    async function loadSettings() {
      if (!testId) {
        setLoading(false);
        return;
      }

      try {
        const bundle = await fetchSettings(testId);
        if (!active) return;

        if ("settings" in bundle && bundle.settings) {
          const next = normalizeSettings(bundle.settings as unknown as Settings);
          setSettings(cloneDeep(next));
          setBaseline(cloneDeep(next));
        }
      } catch (error) {
        console.error("Failed to fetch settings", error);
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadSettings();

    return () => {
      active = false;
    };
  }, [testId]);

  function updateGeneralSetting<K extends keyof Settings["general"]>(
    key: K,
    value: Settings["general"][K]
  ) {
    setSaveSuccess(false);
    setSettings((previous) => ({
      ...previous,
      general: { ...previous.general, [key]: value },
    }));
  }

  function updateSecuritySetting<K extends keyof Settings["security"]>(
    key: K,
    value: Settings["security"][K]
  ) {
    setSaveSuccess(false);
    setSettings((previous) => ({
      ...previous,
      security: { ...previous.security, [key]: value },
    }));
  }

  function updateInvitees(invitees: TestInvitee[]) {
    setSaveSuccess(false);
    const next = sanitizeInvitees(invitees);
    setSettings((previous) => ({
      ...previous,
      users: {
        usersAdded: next.length > 0,
        invitees,
      },
    }));
  }

  function updateTestTime(timeInMinutes: number) {
    setSaveSuccess(false);
    setSettings((previous) => ({
      ...previous,
      testTime: Math.max(0, timeInMinutes),
    }));
  }

  const discard = useCallback(() => {
    setSaveSuccess(false);
    setSaveError(null);
    setSettings(cloneDeep(baseline));
  }, [baseline]);

  const save = useCallback(async (): Promise<boolean> => {
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    const payload = {
      ...settings,
      users: {
        usersAdded: sanitizeInvitees(settings.users.invitees).length > 0,
        invitees: sanitizeInvitees(settings.users.invitees),
      },
    };

    try {
      const result = await saveSettings(testId, payload);
      if ("error" in result) {
        console.error("Failed to save settings:", result.error);
        setSaveError(result.error ?? "Failed to save settings");
        return false;
      }
      setSettings(cloneDeep(payload));
      setBaseline(cloneDeep(payload));
      setSaveSuccess(true);
      return true;
    } catch (error) {
      console.error(
        "Unexpected error:",
        error instanceof Error ? error.message : error
      );
      setSaveError(error instanceof Error ? error.message : "Unexpected error");
      return false;
    } finally {
      setSaving(false);
    }
  }, [settings, testId]);

  async function handleSubmit(event?: FormEvent) {
    event?.preventDefault();
    const ok = await save();
    if (ok) onClose?.();
  }

  return {
    settings,
    saving,
    loading,
    saveError,
    saveSuccess,
    isDirty,
    updateGeneralSetting,
    updateSecuritySetting,
    updateInvitees,
    updateTestTime,
    handleSubmit,
    save,
    discard,
  };
}
