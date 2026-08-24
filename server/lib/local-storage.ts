import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { STORAGE_FOLDERS, type StorageFolder, type UploadedObject } from "@/lib/upload";

const ROOT = path.join(process.cwd(), "storage");

function sanitizeFolder(value: string | null | undefined): StorageFolder {
  const folder = (value?.trim() || "uploads") as StorageFolder;
  return STORAGE_FOLDERS.includes(folder) ? folder : "uploads";
}

function sanitizeFileName(name: string) {
  const base = name.split(/[/\\]/).pop()?.trim() || "file";
  const cleaned = base.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
  return cleaned.slice(0, 120) || "file";
}

export async function saveLocalUpload(folder: string, file: File): Promise<UploadedObject> {
  const dir = sanitizeFolder(folder);
  const key = `${dir}/${crypto.randomUUID()}-${sanitizeFileName(file.name)}`;
  const dest = path.join(ROOT, key);
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, Buffer.from(await file.arrayBuffer()));
  return {
    url: `/api/files/${key.split("/").map(encodeURIComponent).join("/")}`,
    key,
    name: file.name,
    size: file.size,
    mimeType: file.type || "application/octet-stream",
  };
}

export async function readLocalUpload(keyParts: string[]) {
  const key = keyParts.map((part) => decodeURIComponent(part)).join("/");
  if (!key || key.includes("..")) return null;
  try {
    const filePath = path.join(ROOT, key);
    const data = await readFile(filePath);
    return { data, key };
  } catch {
    return null;
  }
}

export async function deleteLocalUpload(url: string) {
  const match = url.match(/\/api\/files\/(.+)$/);
  if (!match?.[1]) return;
  const key = match[1]
    .split("/")
    .map((part) => decodeURIComponent(part))
    .join("/");
  if (!key || key.includes("..")) return;
  await unlink(path.join(ROOT, key)).catch(() => null);
}
