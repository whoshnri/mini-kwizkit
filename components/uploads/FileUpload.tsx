"use client";

import { useId, useRef, useState } from "react";
import { Camera, FileUp, Loader2, Trash2, Upload, X } from "lucide-react";
import { toast } from "react-hot-toast";
import { uploadObject, deleteUploadedObject } from "@/app/actions/upload";
import { cn } from "@/lib/utils";
import { browserFileSrc, type StorageFolder, type UploadedObject } from "@/lib/upload";
import { publicErrorMessage } from "@/lib/public-error";

type FileUploadVariant = "avatar" | "dropzone" | "compact";

export type FileUploadProps = {
  value?: string | null;
  onChange?: (url: string) => void | Promise<void>;
  onUploaded?: (file: UploadedObject) => void;
  onClear?: () => void;
  accept?: string;
  maxSizeMB?: number;
  folder?: StorageFolder;
  variant?: FileUploadVariant;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
  hint?: string;
  initials?: string;
  name?: string;
  showMeta?: boolean;
};

function matchesAccept(file: File, accept: string) {
  if (!accept.trim()) return true;

  return accept.split(",").some((raw) => {
    const rule = raw.trim().toLowerCase();
    if (!rule) return false;
    if (rule === file.type.toLowerCase()) return true;
    if (rule.endsWith("/*")) {
      return file.type.toLowerCase().startsWith(`${rule.slice(0, -1)}`);
    }
    if (rule.startsWith(".")) {
      return file.name.toLowerCase().endsWith(rule);
    }
    return false;
  });
}

function isImageFile(file: File) {
  return file.type.startsWith("image/");
}

export function FileUpload({
  value,
  onChange,
  onUploaded,
  onClear,
  accept = "*/*",
  maxSizeMB = 10,
  folder = "uploads",
  variant = "dropzone",
  multiple = false,
  disabled = false,
  className,
  label,
  hint,
  initials = "R",
  name = "file",
  showMeta = true,
}: FileUploadProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [localName, setLocalName] = useState("");
  const [preview, setPreview] = useState("");

  const displayUrl = preview || browserFileSrc(value);

  async function handleFiles(fileList: FileList | null) {
    const files = Array.from(fileList ?? []);
    if (!files.length || disabled || busy) return;

    const selected = multiple ? files : files.slice(0, 1);
    const maxBytes = maxSizeMB * 1024 * 1024;

    setBusy(true);
    try {
      for (const file of selected) {
        if (!matchesAccept(file, accept)) {
          toast.error("That file type is not allowed.");
          continue;
        }
        if (file.size > maxBytes) {
          toast.error(`File is too large. Maximum size is ${maxSizeMB}MB.`);
          continue;
        }

        if (isImageFile(file)) {
          const nextPreview = URL.createObjectURL(file);
          setPreview((previous) => {
            if (previous) URL.revokeObjectURL(previous);
            return nextPreview;
          });
        }

        setLocalName(file.name);

        const formData = new FormData();
        formData.set("file", file);
        formData.set("folder", folder);
        if (value) formData.set("replace", value);

        const result = await uploadObject(formData);
        if (!result.ok || !result.file) {
          toast.error(
            publicErrorMessage(result.error, "Failed to upload the file.")
          );
          continue;
        }

        setLocalName(result.file.name);
        await onChange?.(result.file.url);
        onUploaded?.(result.file);
      }
    } catch (error) {
      toast.error(publicErrorMessage(error, "Failed to upload the file."));
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function openPicker() {
    if (!disabled && !busy) inputRef.current?.click();
  }

  async function clear(event?: React.MouseEvent) {
    event?.stopPropagation();
    const previous = value || "";
    if (preview) URL.revokeObjectURL(preview);
    setPreview("");
    setLocalName("");
    await onChange?.("");
    onClear?.();
    if (previous) {
      try {
        await deleteUploadedObject(previous);
      } catch {
        // Keep photo removal local even if storage cleanup fails.
      }
    }
    if (inputRef.current) inputRef.current.value = "";
  }

  const input = (
    <input
      id={inputId}
      ref={inputRef}
      type="file"
      name={name}
      accept={accept}
      multiple={multiple}
      disabled={disabled || busy}
      className="sr-only"
      onChange={(event) => void handleFiles(event.target.files)}
    />
  );

  if (variant === "avatar") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        {input}
        <button
          type="button"
          onClick={openPicker}
          disabled={disabled || busy}
          aria-label={label || "Upload profile photo"}
          className="relative size-16 shrink-0 disabled:cursor-not-allowed"
        >
          <span className="flex size-16 items-center justify-center overflow-hidden rounded-full bg-[var(--foreground)] text-lg font-semibold text-[var(--background)]">
            {displayUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={displayUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              initials.slice(0, 2)
            )}
            {busy && (
              <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/45 text-white">
                <Loader2 className="size-4 animate-spin" />
              </span>
            )}
          </span>
          <span className="absolute -bottom-0.5 -right-0.5 flex size-6 items-center justify-center rounded-full border-2 border-[var(--surface)] bg-[var(--foreground)] text-[var(--background)]">
            <Camera className="size-3" />
          </span>
        </button>
        {showMeta && (
          <div className="min-w-0">
            {label && (
              <p className="truncate text-sm font-semibold text-[var(--foreground)]">
                {label}
              </p>
            )}
            <p className="truncate text-sm text-[var(--muted)]">
              {busy ? "Uploading photo…" : hint || "JPG, PNG, or WebP up to 5MB"}
            </p>
            <button
              type="button"
              onClick={value || preview ? clear : openPicker}
              disabled={disabled || busy}
              className="mt-1 text-xs font-medium text-[var(--foreground)] underline underline-offset-4 disabled:opacity-50"
            >
              {value || preview ? "Remove photo" : "Add photo"}
            </button>
          </div>
        )}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {input}
        <button
          type="button"
          onClick={openPicker}
          disabled={disabled || busy}
          className="theme-button-secondary h-10 px-4 text-sm"
        >
          {busy ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Upload className="size-4" />
          )}
          {label || (value ? "Replace file" : "Upload file")}
        </button>
        {(localName || value) && (
          <button
            type="button"
            onClick={clear}
            disabled={disabled || busy}
            aria-label="Remove file"
            className="flex size-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            <Trash2 className="size-4" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={cn("grid gap-2", className)}>
      {label && showMeta && (
        <span className="px-1 text-sm font-medium text-[var(--foreground)]">
          {label}
        </span>
      )}
      {input}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={openPicker}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openPicker();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled && !busy) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragOver(false);
          void handleFiles(event.dataTransfer.files);
        }}
        className={cn(
          "relative flex min-h-[132px] w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-4 py-5 text-center outline-none transition",
          dragOver
            ? "border-[var(--foreground)] bg-[var(--surface-muted)]"
            : "border-[var(--border)] bg-[var(--surface-muted)] hover:border-[var(--muted)]",
          (disabled || busy) && "cursor-not-allowed opacity-70"
        )}
      >
        {busy ? (
          <Loader2 className="size-5 animate-spin text-[var(--muted)]" />
        ) : displayUrl && (preview || value)?.match(/^https?:|^blob:|^data:|\.(png|jpe?g|gif|webp)/i) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={displayUrl}
            alt=""
            className="mb-2 h-16 w-16 rounded-xl object-cover"
          />
        ) : (
          <FileUp className="size-5 text-[var(--muted)]" />
        )}
        <p className="mt-2 text-sm font-medium text-[var(--foreground)]">
          {busy ? "Uploading…" : localName || "Drop a file here, or click to browse"}
        </p>
        <p className="mt-1 text-xs text-[var(--muted)]">
          {hint || `Up to ${maxSizeMB}MB`}
        </p>
        {(value || preview) && !busy && (
          <button
            type="button"
            onClick={clear}
            className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)]"
            aria-label="Remove file"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
