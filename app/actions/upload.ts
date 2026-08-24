"use server";

import { AUTH_REQUIRED, requireActionUser } from "@/server/lib/action-session";
import { deleteLocalUpload, saveLocalUpload } from "@/server/lib/local-storage";
import type { UploadResult } from "@/lib/upload";

export async function uploadObject(formData: FormData): Promise<UploadResult> {
  const user = await requireActionUser();
  if (!user) return { ok: false, error: "Sign in required." };

  try {
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return { ok: false, error: "Choose a file to upload." };
    }

    const folder = String(formData.get("folder") ?? "uploads");
    const stored = await saveLocalUpload(folder, file);
    return { ok: true, file: stored };
  } catch (err) {
    console.error("[uploadObject]", err);
    return { ok: false, error: "Failed to upload the file." };
  }
}

export async function deleteUploadedObject(url: string) {
  if (!url.trim()) return { ok: true };

  const user = await requireActionUser();
  if (!user) return { ok: true };

  await deleteLocalUpload(url);
  return { ok: true };
}
