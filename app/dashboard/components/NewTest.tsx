"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  DashboardButton,
  DashboardField,
  fieldClass,
  ResponsiveSheet,
  textareaClass,
} from "./primitives";
import { DashboardSelect } from "./DashboardDropdown";
import { createTest } from "@/app/actions/testOps";
import { useSession } from "@/app/SessionContext";
import { toast } from "react-hot-toast";
import { DEFAULT_SETTINGS, parseInviteeLines, sanitizeInvitees } from "@/lib/setting";
import { InviteesList } from "./TestSettingsFields";

const newTestSchema = z.object({
  name: z.string().min(2, "Test name must be at least 2 characters"),
  subject: z.string().min(1, "Subject is required"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  description: z.string().optional(),
});

type NewTestFormValues = z.infer<typeof newTestSchema>;

type NewTestProps = {
  setNewTest: (isOpen: boolean) => void;
  onCreated?: () => void;
};

export default function NewTest({ setNewTest, onCreated }: NewTestProps) {
  const { session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invitees, setInvitees] = useState<{ name: string; email: string }[]>([]);
  const [invitePaste, setInvitePaste] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewTestFormValues>({
    resolver: zodResolver(newTestSchema),
    defaultValues: {
      name: "",
      subject: "",
      difficulty: "medium",
      description: "",
    },
  });

  const onSubmit = async (data: NewTestFormValues) => {
    if (!session?.id) return;
    setIsSubmitting(true);
    try {
      const mergedInvitees = sanitizeInvitees([
        ...invitees,
        ...parseInviteeLines(invitePaste),
      ]);

      const response = await createTest({
        name: data.name,
        description: data.description || null,
        subject: data.subject,
        difficulty: data.difficulty,
        visibility: false,
        createdById: session.id,
        settings: {
          ...DEFAULT_SETTINGS,
          users: {
            usersAdded: mergedInvitees.length > 0,
            invitees: mergedInvitees,
          },
        } as Record<string, unknown>,
      });

      if (response.status === 201) {
        toast.success("Test created successfully!");
        onCreated?.();
        setNewTest(false);
      } else {
        toast.error(response.message || "Failed to create test");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ResponsiveSheet
      title="Create New Test"
      onClose={() => setNewTest(false)}
      className="md:max-w-[440px]"
      footer={
        <div className="flex justify-end gap-3">
          <DashboardButton
            type="button"
            variant="secondary"
            onClick={() => setNewTest(false)}
            disabled={isSubmitting}
          >
            Cancel
          </DashboardButton>
          <DashboardButton type="submit" form="new-test-form" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Test"}
          </DashboardButton>
        </div>
      }
    >
      <form id="new-test-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <DashboardField label="Test Name">
          <input
            {...register("name")}
            placeholder="e.g., Chapter 5: Algebra Basics"
            className={fieldClass}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-rose-500">{errors.name.message}</p>
          )}
        </DashboardField>

        <DashboardField label="Subject">
          <input
            {...register("subject")}
            placeholder="e.g., Biology"
            className={fieldClass}
          />
          {errors.subject && (
            <p className="mt-1 text-xs text-rose-500">{errors.subject.message}</p>
          )}
        </DashboardField>

        <DashboardField label="Difficulty">
          <Controller
            name="difficulty"
            control={control}
            render={({ field }) => (
              <DashboardSelect
                value={field.value}
                onValueChange={field.onChange}
                options={[
                  { value: "easy", label: "Easy" },
                  { value: "medium", label: "Medium" },
                  { value: "hard", label: "Hard" },
                ]}
              />
            )}
          />
        </DashboardField>

        <DashboardField label="Description">
          <textarea
            {...register("description")}
            placeholder="A brief summary of what this test covers"
            rows={3}
            className={textareaClass}
          />
        </DashboardField>

        <InviteesList
          invitees={invitees}
          onChange={setInvitees}
          pasteValue={invitePaste}
          onPasteChange={setInvitePaste}
        />
      </form>
    </ResponsiveSheet>
  );
}
