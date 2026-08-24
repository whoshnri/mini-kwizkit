import { readLocalUpload } from "@/server/lib/local-storage";

export const runtime = "nodejs";

const MIME: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  pdf: "application/pdf",
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ key: string[] }> }
) {
  const { key } = await context.params;
  const stored = await readLocalUpload(key);
  if (!stored) {
    return new Response(null, { status: 404 });
  }

  const ext = stored.key.split(".").pop()?.toLowerCase() ?? "";
  return new Response(stored.data, {
    headers: {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Cache-Control": "private, max-age=3600",
    },
  });
}
