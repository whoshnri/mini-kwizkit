import { FACE_MODEL_PATH, MEDIAPIPE_WASM_PATH, OBJECT_MODEL_PATH } from "./assets";

async function prefetchProctoringAssets() {
  if (typeof window === "undefined") return;

  await Promise.all([
    fetch(`${MEDIAPIPE_WASM_PATH}/vision_wasm_internal.js`, { cache: "force-cache" }),
    fetch(FACE_MODEL_PATH, { cache: "force-cache" }),
    fetch(OBJECT_MODEL_PATH, { cache: "force-cache" }),
  ]);
}

export async function preloadMediaPipeModels() {
  await prefetchProctoringAssets().catch(() => undefined);
  const { warmupSharedProctoringWorker } = await import("./proctoring-worker");
  await warmupSharedProctoringWorker();
}
