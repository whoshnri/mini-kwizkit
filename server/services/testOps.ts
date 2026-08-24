import prisma from "@/server/lib/prisma";
import { $Enums } from "@prisma/client";

//create the ops for the test

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

function randomSlugSegment() {
  return Math.random().toString(36).slice(2, 9);
}

async function buildTestSlug({
  createdById,
  testName,
}: {
  createdById: string;
  testName: string;
}) {
  const user = await prisma.user.findUnique({
    where: { id: createdById },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      uniqueId: true,
    },
  });

  const userName =
    user?.uniqueId ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.email?.split("@")[0] ||
    createdById;

  const baseSlug = slugify(`${userName} ${testName}`) || "test";

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const slug = `${baseSlug}-${randomSlugSegment()}`;
    const existing = await prisma.test.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!existing) return slug;
  }

  return `${baseSlug}-${Date.now().toString(36)}`;
}

export async function createTest(data: {
  name: string;
  description: string | null;
  subject: string;
  difficulty: $Enums.Difficulty;
  visibility: boolean;
  createdById: string;
  settings: Record<string, unknown>;
}) {
  try {
    const slug = await buildTestSlug({
      createdById: data.createdById,
      testName: data.name,
    });

    const settingsObject =
      data.settings && typeof data.settings === "object" && !Array.isArray(data.settings)
        ? (data.settings as Record<string, unknown>)
        : {};
    const general =
      settingsObject.general && typeof settingsObject.general === "object"
        ? (settingsObject.general as Record<string, unknown>)
        : {};
    const allowRetake = Boolean(general.allowRetake);
    const showResults = Boolean(general.showResults);
    const duration = Math.max(0, Number(settingsObject.testTime ?? 0));

    const test = await prisma.test.create({
      data: {
        id: `kk-test-${data.createdById}-${Date.now()}`,
        name: data.name,
        description: data.description,
        subjectName: data.subject || "",
        difficulty: data.difficulty,
        slug,
        visibility: data.visibility,
        duration: duration > 0 ? duration : null,
        settings: JSON.stringify(data.settings ?? {}),
        allowRetake,
        showResults,
        createdById: data.createdById,
      },
    });
    return {
      message: "Test created successfully",
      status: 201,
      metadata: test.id,
    };
  } catch (error: unknown) {
    console.error("Error creating test:", error);
    return {
      message: "Failed to create test",
      status: 500,
      metadata: "Network error",
    };
  }
}

export async function deleteTest(testId: string) {
  try {
    await prisma.test.delete({
      where: { id: testId },
    });
    return {
      message: "Test deleted successfully",
      status: 200,
      metadata: null,
    };
  } catch (error: unknown) {
    return {
      message: "Failed to delete test",
      status: 500,
      metadata: "Network error",
    };
  }
}

export async function fetchTestForDash(testId: string) {
  try {
    const test = await prisma.test.findUnique({
      where: {
        id: testId,
      },
      include: {
        questions: true,
        liveAttempts: {
          include: {
            student: true,
          },
          orderBy: {
            startedAt: "desc",
          },
        },
      },
    });
    if (test) {
      return test;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export async function fetchTestForDashBySlug(slug: string) {
  try {
    const test = await prisma.test.findUnique({
      where: {
        slug,
      },
      include: {
        questions: true,
        liveAttempts: {
          include: {
            student: true,
          },
          orderBy: {
            startedAt: "desc",
          },
        },
      },
    });

    return test ?? null;
  } catch (error) {
    return null;
  }
}

export async function updateTestDetails(
  testId: string,
    data: {
 name: string;
 description: string | null;
 subject: string;
 difficulty: $Enums.Difficulty;
 visibility: boolean;
 duration?: number;
 }
) {
  try {
    const test = await prisma.test.update({
      where: { id: testId },
      data: {
        name: data.name,
        description: data.description,
        subjectName: data.subject || "",
        difficulty: data.difficulty,
        visibility: data.visibility,
        duration: data.duration,
      },
    });
    return {
      message: "Test details updated successfully",
      status: 200,
      metadata: test.id,
    };
  } catch (error: unknown) {
    return {
      message: "Failed to update test details",
      status: 500,
      metadata: "Network error",
    };
  }
}


export async function updateTestQuestions(
  testId: string,
  name: string,
  totalMarks: number,
  numberOfQuestions: number,
  subject : string,
  difficulty: $Enums.Difficulty,
  description: string,
  questions: {
    text: string;
    marks: number;
    type: $Enums.QuestionType;
    options: Record<string, string>;
    correctOption: number | null | undefined;
    correctAnswer?: string | null;
    explanation?: string | null;
  }[]
) {
  try {
    const test = await prisma.test.update({
      where: { id: testId },
      data: { 
        name,
        totalMarks,
        numberOfQuestions,
        subjectName: subject || undefined,
        difficulty,
        description,
        questions : {
          deleteMany: {},
          create: questions.map((question, index) => ({
            ...question,
            options: JSON.stringify(question.options ?? {}),
            order: index + 1,
          })),
        }
      },
    });
    return {
      message: "Test questions updated successfully",
      status: 200,
      metadata: null,
    };
  } 
  catch (error: unknown) {
    return {
      message: "Failed to update test questions",
      status: 500,
      metadata: "Network error",
    };
  } 
}
