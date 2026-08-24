import { asJson, readBody } from "@/server/lib/http";
import { saveExamProgress } from "@/server/services/proctoringService";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  const { attemptId } = await params;
  const body = await readBody<{
    testSlug?: string;
    answers?: Record<string, string | number | null>;
    flagged?: string[];
    currentIndex?: number;
  }>(request);

  return asJson(
    await saveExamProgress({
      attemptId,
      testSlug: body.testSlug ?? "",
      answers: body.answers ?? {},
      flagged: body.flagged ?? [],
      currentIndex: body.currentIndex ?? 0,
    })
  );
}
