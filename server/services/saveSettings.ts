import prisma from "@/server/lib/prisma";
import { Settings } from "@/server/lib/setting";

export async function saveSettings(testId: string, settings: Settings) {
  try {
    const test = await prisma.test.findUnique({
      where: { id: testId },
    });

    if (!test) {
      return { error: "Test not found" };
    }

    const allowRetake = Boolean(settings.general?.allowRetake);
    const showResults = Boolean(settings.general?.showResults);
    const duration = Math.max(0, Number(settings.testTime ?? 0));

    const serializedSettings = JSON.stringify({
      ...settings,
      general: {
        ...settings.general,
        allowRetake,
        showResults,
      },
      testTime: duration,
    });

    await prisma.test.update({
      where: { id: testId },
      data: {
        settings: serializedSettings,
        allowRetake,
        showResults,
        duration: duration > 0 ? duration : null,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("[SAVE_SETTINGS_ERROR]", error);
    return { error: "Failed to save settings" };
  }
}
