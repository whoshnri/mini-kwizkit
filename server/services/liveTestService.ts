import prisma from "@/server/lib/prisma";
import {
  buildRulesFromSettings,
  parseTestSettings,
  seededShuffle,
  toPublicLiveSettings,
  type PublicLiveSettings,
} from "@/server/lib/parseTestSettings";
import { fail, ok, type ActionResult } from "@/server/lib/response";
import { clearAttemptCache } from "./liveCacheService";

export type LiveQuestionOption = {
  key: string;
  value: string;
  /** Stable grading index before option shuffle. */
  originalIndex: number;
};

export type LiveQuestion = {
  id: string;
  text: string;
  type: "multiple_choice" | "short_answer" | "essay" | "true_or_false";
  marks: number;
  options: LiveQuestionOption[];
  order: number;
};

export type LiveTestPayload = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  subject: string;
  duration: number;
  totalMarks: number;
  numberOfQuestions: number;
  ownerName: string;
  rules: string[];
  questions: LiveQuestion[];
  allowRetake: boolean;
  showResults: boolean;
  settings: PublicLiveSettings;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function titleCase(value: string) {
  return value
    .split(/[\s._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function splitStudentName(email: string) {
  const localPart = email.split("@")[0] || "Student";
  const name = titleCase(localPart) || "Student";
  const [firstName, ...rest] = name.split(" ");

  return {
    firstName: firstName || "Student",
    lastName: rest.join(" ") || "Learner",
  };
}

function splitStoredName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] || "Student",
    lastName: parts.slice(1).join(" ") || "Learner",
  };
}

function normalizeOptions(options: unknown): LiveQuestionOption[] {
  if (!options) return [];

  const parsedOptions =
    typeof options === "string"
      ? (() => {
          try {
            return JSON.parse(options);
          } catch {
            return null;
          }
        })()
      : options;

  if (Array.isArray(parsedOptions)) {
    return parsedOptions.map((value, index) => ({
      key: String.fromCharCode(65 + index),
      value: String(value),
      originalIndex: index,
    }));
  }

  if (typeof parsedOptions === "object") {
    return Object.entries(parsedOptions as Record<string, unknown>).map(
      ([key, value], index) => ({
        key,
        value: String(value),
        originalIndex: index,
      })
    );
  }

  return [];
}

export async function getPublicLiveTest(testSlug: string): Promise<LiveTestPayload | null> {
  const test = await prisma.test.findUnique({
    where: { slug: testSlug },
    include: {
      questions: {
        orderBy: [{ order: "asc" }, { id: "asc" }],
      },
      createdBy: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });

  if (!test || !test.visibility) return null;

  const settings = parseTestSettings(test.settings, {
    allowRetake: test.allowRetake,
    showResults: test.showResults,
    duration: test.duration,
  });
  const publicSettings = toPublicLiveSettings(settings);

  const ownerName =
    [test.createdBy.firstName, test.createdBy.lastName].filter(Boolean).join(" ") ||
    test.createdBy.email ||
    "Test owner";

  let questions = test.questions.map((question, index) => {
    let options = normalizeOptions(question.options);
    if (settings.general.shuffleOptions) {
      options = seededShuffle(options, `${test.id}:options:${question.id}`);
    }

    return {
      id: question.id,
      text: question.text,
      type: question.type,
      marks: question.marks,
      options,
      order: question.order || index + 1,
    };
  });

  if (settings.general.shuffleQuestions) {
    questions = seededShuffle(questions, `${test.id}:questions`);
  }

  return {
    id: test.id,
    slug: test.slug,
    name: test.name,
    description: test.description,
    subject: test.subjectName || "General",
    duration: settings.testTime,
    totalMarks:
      test.totalMarks ?? questions.reduce((sum, question) => sum + question.marks, 0),
    numberOfQuestions: test.numberOfQuestions ?? questions.length,
    ownerName,
    rules: buildRulesFromSettings(settings),
    questions,
    allowRetake: settings.general.allowRetake,
    showResults: settings.general.showResults,
    settings: publicSettings,
  };
}

export async function requestLiveAccessOtp(
  testSlug: string,
  email: string
): Promise<ActionResult<{ email: string }>> {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || !normalizedEmail.includes("@")) {
    return fail(400, "Enter a valid email address.", { email });
  }

  const test = await prisma.test.findUnique({
    where: { slug: testSlug },
    select: {
      id: true,
      visibility: true,
      allowRetake: true,
      settings: true,
      showResults: true,
      duration: true,
    },
  });

  if (!test || !test.visibility) {
    return fail(404, "This test is not available.", { email });
  }

  const settings = parseTestSettings(test.settings, {
    allowRetake: test.allowRetake,
    showResults: test.showResults,
    duration: test.duration,
  });
  const invitees = settings.users.invitees;
  if (invitees.length > 0 && !invitees.some((entry) => entry.email === normalizedEmail)) {
    return fail(
      403,
      "You are not on the participant list for this test.",
      { email }
    );
  }

  const existingStudent = await prisma.student.findFirst({
    where: { email: normalizedEmail },
    select: { id: true },
  });

  if (existingStudent) {
    const submitted = await prisma.liveTestAttempt.findFirst({
      where: {
        testId: test.id,
        studentId: existingStudent.id,
        submittedAt: { not: null },
      },
      orderBy: { submittedAt: "desc" },
      select: { id: true },
    });

    if (submitted && !test.allowRetake) {
      return fail(
        403,
        "You have already submitted this test. Retakes are disabled. Contact your instructor if you need another attempt.",
        { email }
      );
    }
  }

  return ok("Code sent to your email.", { email: normalizedEmail });
}

export async function verifyLiveAccessOtp(
  testSlug: string,
  email: string,
  otp: string,
  accessPassword?: string
): Promise<
  ActionResult<{
    attemptId: string;
    email: string;
    studentId: string;
    studentName: string;
    resumed: boolean;
    alreadySubmitted: boolean;
  } | null>
> {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || !normalizedEmail.includes("@")) {
    return fail(400, "Enter a valid email address.");
  }

  if (!otp.trim()) {
    return fail(400, "Enter the OTP sent to your email.");
  }

  const test = await prisma.test.findUnique({
    where: { slug: testSlug },
    select: {
      id: true,
      visibility: true,
      createdById: true,
      allowRetake: true,
      showResults: true,
      duration: true,
      settings: true,
    },
  });

  if (!test || !test.visibility) {
    return fail(404, "This test is not available.");
  }

  const settings = parseTestSettings(test.settings, {
    allowRetake: test.allowRetake,
    showResults: test.showResults,
    duration: test.duration,
  });

  if (settings.security.accessPassword) {
    if ((accessPassword ?? "").trim() !== settings.security.accessPassword) {
      return fail(403, "Incorrect access password.");
    }
  }

  const invitees = settings.users.invitees;
  if (invitees.length > 0 && !invitees.some((entry) => entry.email === normalizedEmail)) {
    return fail(403, "You are not on the participant list for this test.");
  }

  const inviteeName = invitees.find((entry) => entry.email === normalizedEmail)?.name;
  const { firstName, lastName } = inviteeName
    ? splitStoredName(inviteeName)
    : splitStudentName(normalizedEmail);

  const student = await prisma.student.upsert({
    where: { email: normalizedEmail },
    update: {
      firstName: firstName || undefined,
      lastName: lastName || undefined,
    },
    create: {
      email: normalizedEmail,
      firstName,
      lastName,
      createdById: test.createdById,
    },
    select: { id: true, firstName: true, lastName: true },
  });

  const activeAttempt = await prisma.liveTestAttempt.findFirst({
    where: {
      testId: test.id,
      studentId: student.id,
      submittedAt: null,
    },
    orderBy: { startedAt: "desc" },
    select: { id: true },
  });

  if (activeAttempt) {
    return ok("Resuming your in-progress attempt.", {
      attemptId: activeAttempt.id,
      email: normalizedEmail,
      studentId: student.id,
      studentName: [student.firstName, student.lastName].filter(Boolean).join(" "),
      resumed: true,
      alreadySubmitted: false,
    });
  }

  const submittedAttempt = await prisma.liveTestAttempt.findFirst({
    where: {
      testId: test.id,
      studentId: student.id,
      submittedAt: { not: null },
    },
    orderBy: { submittedAt: "desc" },
    select: { id: true },
  });

  if (submittedAttempt && !test.allowRetake) {
    return fail(
      403,
      "You have already submitted this test. Retakes are disabled. Contact your instructor if you need another attempt."
    );
  }

  const attempt = await prisma.liveTestAttempt.create({
    data: {
      testId: test.id,
      studentId: student.id,
      passwordUsed: Boolean(settings.security.accessPassword),
    },
    select: { id: true },
  });

  return ok("Access verified.", {
    attemptId: attempt.id,
    email: normalizedEmail,
    studentId: student.id,
    studentName: [student.firstName, student.lastName].filter(Boolean).join(" "),
    resumed: false,
    alreadySubmitted: false,
  });
}

export async function completeLiveSetup(attemptId: string): Promise<ActionResult> {
  if (!attemptId) {
    return fail(400, "Missing test attempt.");
  }

  const attempt = await prisma.liveTestAttempt.findUnique({
    where: { id: attemptId },
    select: {
      id: true,
      submittedAt: true,
      test: { select: { allowRetake: true } },
    },
  });

  if (!attempt) {
    return fail(404, "Attempt not found.");
  }

  if (attempt.submittedAt && !attempt.test.allowRetake) {
    return fail(403, "This attempt has already been submitted.");
  }

  await prisma.liveTestAttempt.update({
    where: { id: attemptId },
    data: { setupCompleted: true },
  });

  return ok("Setup completed.", null);
}

export { startExamAttempt, getExamAttemptState } from "./proctoringService";

export async function submitLiveAttempt({
  attemptId,
  answers,
  flagged,
}: {
  attemptId: string;
  answers: Record<string, string | number | null>;
  flagged: string[];
}): Promise<
  ActionResult<{
    score: number;
    totalMarks: number;
    baseScore: number;
    proctorDeductions: number;
    testSlug: string;
    violationFlags: unknown;
    endReason: string | null;
    showResults: boolean;
    allowRetake: boolean;
    passed: boolean;
    passPercentage: number;
    percentage: number;
  } | null>
> {
  const attempt = await prisma.liveTestAttempt.findUnique({
    where: { id: attemptId },
    include: { test: { include: { questions: true } } },
  });

  if (!attempt) {
    return fail(404, "Attempt not found.");
  }

  if (attempt.submittedAt) {
    return fail(409, "This attempt has already been submitted.");
  }

  const settings = parseTestSettings(attempt.test.settings, {
    allowRetake: attempt.test.allowRetake,
    showResults: attempt.test.showResults,
    duration: attempt.test.duration,
  });

  const baseScore = attempt.test.questions.reduce((sum, question) => {
    const answer = answers[question.id];

    if (question.type === "multiple_choice" && typeof answer === "number") {
      return answer === question.correctOption ? sum + question.marks : sum;
    }

    if (question.type === "true_or_false") {
      const expected = String(question.correctAnswer ?? question.correctOption ?? "")
        .trim()
        .toLowerCase();
      const received = String(answer ?? "").trim().toLowerCase();
      return expected && expected === received ? sum + question.marks : sum;
    }

    return sum;
  }, 0);

  const finalScore = Math.max(0, baseScore - attempt.proctorDeductions);

  const totalMarks =
    attempt.test.totalMarks ??
    attempt.test.questions.reduce((sum, question) => sum + question.marks, 0);

  const percentage = totalMarks > 0 ? (finalScore / totalMarks) * 100 : 0;
  const passed = percentage >= settings.general.passPercentage;

  await prisma.liveTestAttempt.update({
    where: { id: attemptId },
    data: {
      answers: JSON.stringify(answers),
      flagged: JSON.stringify(flagged),
      score: finalScore,
      totalMarks,
      submittedAt: new Date(),
    },
  });

  await clearAttemptCache(attemptId);

  return ok("Test submitted.", {
    score: finalScore,
    baseScore,
    proctorDeductions: attempt.proctorDeductions,
    totalMarks,
    testSlug: attempt.test.slug,
    violationFlags: attempt.violationFlags,
    endReason: attempt.endReason,
    showResults: settings.general.showResults,
    allowRetake: settings.general.allowRetake,
    passed,
    passPercentage: settings.general.passPercentage,
    percentage: Math.round(percentage * 10) / 10,
  });
}
