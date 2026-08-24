import prisma from "@/server/lib/prisma";

export async function fetchTests(userId: string) {
  try {
    const tests = await prisma.test.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdById: userId },
      include: {
        questions: true,
      },
    });

    return {
      tests: tests.map((test) => ({
        ...test,
        subjectName: test.subjectName,
        subject: test.subjectName,
      })),
    };
  } catch (error) {
    console.error("[GET_TESTS_ERROR]", error);
    return { error: "Failed to fetch tests" };
  }
}
