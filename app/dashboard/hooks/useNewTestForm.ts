"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { createTest } from "@/app/actions/testOps";
import { useSession } from "@/app/SessionContext";
import { DEFAULT_SETTINGS, type Settings } from "@/lib/setting";

const initialFormState = {
  name: "",
  subject: "",
  difficulty: "easy",
  visibility: false,
  description: "",
  duration: 0,
  allowRetake: false,
  showResults: false,
  invitees: [] as Array<{ name: string; email: string }>,
};

export function useNewTestForm({ onCreated }: { onCreated: () => void }) {
  const { session } = useSession();
  const [form, setForm] = useState(initialFormState);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = event.target;
    const resolvedValue =
      type === "checkbox" ? (event.target as HTMLInputElement).checked : value;
    setForm((previous) => ({ ...previous, [name]: resolvedValue }));
  }

  function updateField(
    name: keyof typeof initialFormState,
    value: string | boolean | number | Array<{ name: string; email: string }>
  ) {
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!form.name.trim() || !form.subject.trim()) {
      setError("Test Name and Subject are required.");
      return;
    }

    if (!session?.id) {
      setError("Authentication error. Please sign in again.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const customSettings: Settings = {
        ...DEFAULT_SETTINGS,
        general: {
          ...DEFAULT_SETTINGS.general,
          allowRetake: form.allowRetake,
          showResults: form.showResults,
        },
        users: {
          usersAdded: form.invitees.length > 0,
          invitees: form.invitees,
        },
        testTime: Number(form.duration) || 0,
      };

      const response = await createTest({
        name: form.name,
        description: form.description || null,
        subject: form.subject,
        difficulty: form.difficulty as "easy" | "medium" | "hard",
        visibility: form.visibility,
        createdById: session.id,
        settings: customSettings as unknown as Record<string, unknown>,
      });

      if (!response.status || response.status !== 201) {
        toast.error(response.message || "An unexpected error occurred while creating the test.");
        return;
      }

      toast.success(response.message || "Test created successfully.");
      onCreated();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to create test.");
    } finally {
      setLoading(false);
    }
  }

  return {
    form,
    isLoading,
    error,
    handleChange,
    updateField,
    handleSubmit,
  };
}
