export type UploadedObject = {
  url: string;
  key: string;
  name: string;
  size: number;
  mimeType: string;
};

export type UploadResult = {
  ok: boolean;
  file?: UploadedObject;
  error?: string;
};

export const STORAGE_FOLDERS = [
  "avatars",
  "student-headshot",
  "school-brand",
  "materials",
  "documents",
  "uploads",
] as const;

export type StorageFolder = (typeof STORAGE_FOLDERS)[number];

const STORAGE_FOLDER_SET = new Set<string>(STORAGE_FOLDERS);

export function browserFileSrc(url: string | null | undefined) {
  if (!url) return "";
  if (
    url.startsWith("blob:") ||
    url.startsWith("data:") ||
    url.startsWith("/api/files/")
  ) {
    return url;
  }

  try {
    const parsed = new URL(url, "http://local.invalid");
    const parts = parsed.pathname.replace(/^\//, "").split("/").filter(Boolean);
    const fromFiles = parts[0] === "api" && parts[1] === "files" ? parts.slice(2) : parts;
    const keyParts = fromFiles[0] === "rubric" ? fromFiles.slice(1) : fromFiles;
    const host = parsed.hostname.toLowerCase();
    const privateHost =
      host.endsWith(".r2.cloudflarestorage.com") ||
      host === "r2.cloudflarestorage.com" ||
      host === "local.invalid";

    if (privateHost && STORAGE_FOLDER_SET.has(keyParts[0] ?? "")) {
      return `/api/files/${keyParts.map((part) => encodeURIComponent(part)).join("/")}`;
    }
  } catch {
    return url;
  }

  return url;
}
