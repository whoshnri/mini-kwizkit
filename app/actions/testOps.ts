"use server";

import { Difficulty, QuestionType } from "@/lib/schemas";
import { AUTH_REQUIRED, requireActionUser } from "@/server/lib/action-session";
import {
  createTest as createTestRecord,
  deleteTest as deleteTestRecord,
  fetchTestForDash as loadTest,
  fetchTestForDashBySlug as loadTestBySlug,
  updateTestDetails as saveTestDetails,
  updateTestQuestions as saveTestQuestions,
} from "@/server/services/testOps";

export async function createTest(data: {
  name: string;
  description: string | null;
  subject: string;
  subjectId?: string;
  difficulty: Difficulty;
  visibility: boolean;
  createdById: string;
  settings: Record<string, unknown>;
}) {
  const user = await requireActionUser();
  if (!user) return AUTH_REQUIRED;

  return createTestRecord({
    name: data.name,
    description: data.description,
    subject: data.subject,
    difficulty: data.difficulty,
    visibility: data.visibility,
    createdById: user.id,
    settings: data.settings,
  });
}

export async function deleteTest(testId: string) {
  const user = await requireActionUser();
  if (!user) return AUTH_REQUIRED;

  return deleteTestRecord(testId);
}

export async function fetchTestForDash(testId: string) {
  return loadTest(testId);
}

export async function fetchTestForDashBySlug(slug: string) {
  return loadTestBySlug(slug);
}

export async function updateTestDetails(
  testId: string,
  data: {
    name: string;
    description: string | null;
    subject: string;
    subjectId?: string;
    difficulty: Difficulty;
    visibility: boolean;
    duration?: number;
  }
) {
  const user = await requireActionUser();
  if (!user) return AUTH_REQUIRED;

  return saveTestDetails(testId, {
    name: data.name,
    description: data.description,
    subject: data.subject,
    difficulty: data.difficulty,
    visibility: data.visibility,
    duration: data.duration,
  });
}

export async function updateTestQuestions(
  testId: string,
  name: string,
  totalMarks: number,
  numberOfQuestions: number,
  subject: string,
  difficulty: Difficulty,
  description: string,
  questions: {
    text: string;
    marks: number;
    type: QuestionType;
    options: Record<string, string>;
    correctOption: number | null | undefined;
    correctAnswer?: string | null;
    explanation?: string | null;
  }[]
) {
  const user = await requireActionUser();
  if (!user) return AUTH_REQUIRED;

  return saveTestQuestions(
    testId,
    name,
    totalMarks,
    numberOfQuestions,
    subject,
    difficulty,
    description,
    questions
  );
}
