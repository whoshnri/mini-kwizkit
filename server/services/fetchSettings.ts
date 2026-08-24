import prisma from "@/server/lib/prisma";
import { parseTestSettings } from "@/server/lib/parseTestSettings";

export async function fetchSettings(testId: string) {
  try {
    const test = await prisma.test.findUnique({
      where: { id: testId },
      select: {
        settings: true,
        allowRetake: true,
        showResults: true,
        duration: true,
      },
    });

    if (!test) {
      return { error: "Test not found or has no settings." };
    }

    return {
      settings: parseTestSettings(test.settings, {
        allowRetake: test.allowRetake,
        showResults: test.showResults,
        duration: test.duration,
      }),
    };
  } catch (error) {
    console.error("[FETCH_SETTINGS_ERROR]", error);
    return { error: "Failed to fetch settings" };
  }
}
