"use client";

import { useCallback, useEffect, useRef } from "react";
import type { ViolationFlag, ViolationType } from "@/lib/violation";
import { getSharedProctoringWorker } from "@/lib/mediapipe/proctoring-worker";

const COOLDOWN: Record<ViolationType, number> = {
  NO_FACE: 10_000,
  MULTIPLE_FACES: 8_000,
  PHONE_DETECTED: 15_000,
  BOOK_DETECTED: 15_000,
  LAPTOP_DETECTED: 15_000,
  TABLET_DETECTED: 15_000,
  PAPER_DETECTED: 20_000,
  TAB_SWITCH: 10_000,
  UNKNOWN_OBJECT: 30_000,
};

const ALLOWED_BACKGROUND = new Set([
  "person",
  "chair",
  "couch",
  "bed",
  "dining table",
  "cup",
  "bottle",
  "clock",
  "potted plant",
  "tv",
  "monitor",
]);

const VIOLATION_OBJECT_MAP: Record<string, ViolationType> = {
  "cell phone": "PHONE_DETECTED",
  phone: "PHONE_DETECTED",
  "mobile phone": "PHONE_DETECTED",
  book: "BOOK_DETECTED",
  laptop: "LAPTOP_DETECTED",
  notebook: "BOOK_DETECTED",
  keyboard: "UNKNOWN_OBJECT",
  mouse: "UNKNOWN_OBJECT",
  remote: "UNKNOWN_OBJECT",
  scissors: "UNKNOWN_OBJECT",
};

type Options = {
  primaryVideoRef: React.RefObject<HTMLVideoElement | null>;
  fallbackVideoRef?: React.RefObject<HTMLVideoElement | null>;
  onViolation: (flag: ViolationFlag) => void;
  enabled: boolean;
};

function normalizeLabel(label: string) {
  return label.trim().toLowerCase();
}

function resolveVideo(
  primary: HTMLVideoElement | null,
  fallback: HTMLVideoElement | null | undefined
) {
  if (primary && primary.readyState >= 2 && primary.videoWidth > 0) {
    return primary;
  }
  if (fallback && fallback.readyState >= 2 && fallback.videoWidth > 0) {
    return fallback;
  }
  return null;
}

export function useAIProctoring({
  primaryVideoRef,
  fallbackVideoRef,
  onViolation,
  enabled,
}: Options) {
  const lastFlagRef = useRef<Map<ViolationType, number>>(new Map());
  const violationStartTimesRef = useRef<Map<ViolationType, number>>(new Map());
  const lastWorkerErrorAtRef = useRef(0);

  const onViolationRef = useRef(onViolation);
  onViolationRef.current = onViolation;

  const shouldEmit = useCallback((type: ViolationType) => {
    const last = lastFlagRef.current.get(type) ?? 0;
    return Date.now() - last > COOLDOWN[type];
  }, []);

  const emitFlag = useCallback((flag: ViolationFlag) => {
    lastFlagRef.current.set(flag.type, Date.now());
    onViolationRef.current(flag);
  }, []);

  const handleDetectionResult = useCallback(
    (
      faces: { score: number }[],
      objects: { categoryName: string; score: number }[]
    ) => {
      interface FrameViolationInfo {
        confidence: number;
        detail: string;
        severity: "high" | "medium" | "low";
      }

      const activeInFrame = new Map<ViolationType, FrameViolationInfo>();

      if (faces.length === 0) {
        activeInFrame.set("NO_FACE", {
          confidence: 1,
          detail: "No face detected in frame",
          severity: "high",
        });
      } else if (faces.length > 1) {
        const maxScore = Math.max(...faces.map((f) => f.score));
        activeInFrame.set("MULTIPLE_FACES", {
          confidence: maxScore,
          detail: `${faces.length} faces detected in frame`,
          severity: "high",
        });
      }

      for (const obj of objects) {
        const label = normalizeLabel(obj.categoryName);
        const mapped = VIOLATION_OBJECT_MAP[label];
        if (mapped) {
          const existing = activeInFrame.get(mapped);
          if (!existing || obj.score > existing.confidence) {
            activeInFrame.set(mapped, {
              confidence: obj.score,
              detail: `${obj.categoryName} detected — ${Math.round(obj.score * 100)}% confidence`,
              severity: mapped === "PHONE_DETECTED" ? "high" : "medium",
            });
          }
        } else if (!ALLOWED_BACKGROUND.has(label) && label !== "person") {
          const existing = activeInFrame.get("UNKNOWN_OBJECT");
          if (!existing || obj.score > existing.confidence) {
            activeInFrame.set("UNKNOWN_OBJECT", {
              confidence: obj.score,
              detail: `${obj.categoryName} detected — ${Math.round(obj.score * 100)}% confidence`,
              severity: "low",
            });
          }
        }
      }

      const allTypes: ViolationType[] = [
        "NO_FACE",
        "MULTIPLE_FACES",
        "PHONE_DETECTED",
        "BOOK_DETECTED",
        "LAPTOP_DETECTED",
        "UNKNOWN_OBJECT",
      ];

      for (const type of allTypes) {
        const info = activeInFrame.get(type);
        if (info) {
          if (!violationStartTimesRef.current.has(type)) {
            violationStartTimesRef.current.set(type, Date.now());
          } else {
            const elapsed = Date.now() - violationStartTimesRef.current.get(type)!;
            if (elapsed >= 1000) {
              if (shouldEmit(type)) {
                emitFlag({
                  id: crypto.randomUUID(),
                  timestamp: Date.now(),
                  type,
                  detail: info.detail,
                  severity: info.severity,
                  confidence: info.confidence,
                  acknowledged: false,
                });
              }
            }
          }
        } else {
          violationStartTimesRef.current.delete(type);
        }
      }
    },
    [emitFlag, shouldEmit]
  );

  const handleDetectionResultRef = useRef(handleDetectionResult);
  handleDetectionResultRef.current = handleDetectionResult;

  useEffect(() => {
    if (!enabled) return;

    let worker: Worker | null = null;
    let cancelled = false;
    let animationFrameId: number | null = null;
    let lastFrameTime = 0;
    const fpsInterval = 1000 / 5;
    let isProcessing = false;

    try {
      worker = getSharedProctoringWorker();
    } catch (e) {
      console.error("Failed to initialize AI Proctoring worker", e);
      return;
    }

    const onMessage = (event: MessageEvent) => {
      if (cancelled) return;

      const { type, faces, objects, error } = event.data;

      if (type === "READY") {
        isProcessing = false;
        if (animationFrameId == null) {
          animationFrameId = requestAnimationFrame(loop);
        }
      } else if (type === "DETECTION_RESULT") {
        isProcessing = false;
        handleDetectionResultRef.current(faces, objects);
      } else if (type === "DETECTION_ERROR" || type === "ERROR") {
        isProcessing = false;
        if (Date.now() - lastWorkerErrorAtRef.current > 8_000) {
          lastWorkerErrorAtRef.current = Date.now();
          console.warn("Proctoring detector skipped a frame:", error);
        }
      }
    };

    worker.addEventListener("message", onMessage);
    worker.postMessage({ type: "INIT", origin: window.location.origin });

    async function processFrame() {
      const video = resolveVideo(primaryVideoRef.current, fallbackVideoRef?.current);
      if (!video || document.hidden || isProcessing || !worker) return;

      try {
        isProcessing = true;
        const [imageBitmap1, imageBitmap2] = await Promise.all([
          createImageBitmap(video),
          createImageBitmap(video),
        ]);
        if (cancelled || !worker) {
          imageBitmap1.close();
          imageBitmap2.close();
          isProcessing = false;
          return;
        }
        worker.postMessage(
          {
            type: "PROCESS_FRAME",
            imageBitmap1,
            imageBitmap2,
            timestamp: performance.now(),
          },
          [imageBitmap1, imageBitmap2]
        );
      } catch {
        isProcessing = false;
      }
    }

    function loop(timestamp: number) {
      if (cancelled) return;

      if (!lastFrameTime) {
        lastFrameTime = timestamp;
      }

      const elapsed = timestamp - lastFrameTime;

      if (elapsed >= fpsInterval) {
        lastFrameTime = timestamp - (elapsed % fpsInterval);
        void processFrame();
      }

      animationFrameId = requestAnimationFrame(loop);
    }

    return () => {
      cancelled = true;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      worker?.removeEventListener("message", onMessage);
      violationStartTimesRef.current.clear();
    };
  }, [enabled, fallbackVideoRef, primaryVideoRef]);
}
