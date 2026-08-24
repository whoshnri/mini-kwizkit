import { FaceDetector, FilesetResolver, ObjectDetector } from "@mediapipe/tasks-vision";
import { FACE_MODEL_PATH, MEDIAPIPE_WASM_PATH, OBJECT_MODEL_PATH } from "../lib/mediapipe/assets";

const ctx: Worker = self as any;

let faceDetector: FaceDetector | null = null;
let objectDetector: ObjectDetector | null = null;
let isInitializing = false;
let isReady = false;
let lastTimestamp = 0;

async function closeDetectors() {
  try {
    faceDetector?.close();
  } catch {
    /* ignore */
  }
  try {
    objectDetector?.close();
  } catch {
    /* ignore */
  }
  faceDetector = null;
  objectDetector = null;
  isReady = false;
  lastTimestamp = 0;
}

async function createDetector<T>(factory: (delegate: "GPU" | "CPU") => Promise<T>): Promise<T> {
  // Dedicated workers have no stable WebGL context. GPU init can succeed
  // then crash on detectForVideo (inference_calculator_ml_drift_webgl).
  return factory("CPU");
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function initDetectors(origin: string) {
  if (isReady) {
    ctx.postMessage({ type: "READY" });
    return;
  }

  if (isInitializing) {
    while (isInitializing) {
      await wait(25);
    }
    ctx.postMessage({
      type: isReady ? "READY" : "ERROR",
      error: isReady ? undefined : "Detector init failed",
    });
    return;
  }

  isInitializing = true;

  try {
    await closeDetectors();
    const vision = await FilesetResolver.forVisionTasks(`${origin}${MEDIAPIPE_WASM_PATH}`);

    const [fd, od] = await Promise.all([
      createDetector((delegate) =>
        FaceDetector.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `${origin}${FACE_MODEL_PATH}`,
            delegate,
          },
          runningMode: "VIDEO",
        })
      ),
      createDetector((delegate) =>
        ObjectDetector.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `${origin}${OBJECT_MODEL_PATH}`,
            delegate,
          },
          scoreThreshold: 0.45,
          runningMode: "VIDEO",
          maxResults: 12,
        })
      ),
    ]);

    faceDetector = fd;
    objectDetector = od;
    isReady = true;
    lastTimestamp = 0;
    ctx.postMessage({ type: "READY" });
  } catch (error) {
    ctx.postMessage({ type: "ERROR", error: String(error) });
  } finally {
    isInitializing = false;
  }
}

ctx.addEventListener("message", async (event: MessageEvent) => {
  const { type, origin, imageBitmap1, imageBitmap2, timestamp } = event.data;

  if (type === "INIT") {
    await initDetectors(origin);
    return;
  }

  if (type !== "PROCESS_FRAME") return;

  if (!isReady || !faceDetector || !objectDetector) {
    imageBitmap1?.close();
    imageBitmap2?.close();
    return;
  }

  try {
    const width = imageBitmap1?.width ?? 0;
    const height = imageBitmap1?.height ?? 0;
    if (!width || !height) {
      imageBitmap1?.close();
      imageBitmap2?.close();
      return;
    }

    // VIDEO mode requires strictly increasing timestamps.
    const nextTimestamp = Math.max(Number(timestamp) || 0, lastTimestamp + 1);
    lastTimestamp = nextTimestamp;

    const faceResult = faceDetector.detectForVideo(imageBitmap1, nextTimestamp);
    const objectResult = objectDetector.detectForVideo(imageBitmap2, nextTimestamp);

    const faces = faceResult.detections
      .map((d) => {
        const score = d.categories && d.categories.length > 0 ? d.categories[0].score : 0.9;
        return { score };
      })
      .filter((f) => f.score >= 0.45);

    const objects = objectResult.detections
      .filter((d) => d.categories && d.categories.length > 0 && d.categories[0].score >= 0.45)
      .map((d) => ({
        categoryName: d.categories[0].categoryName,
        score: d.categories[0].score,
      }));

    ctx.postMessage({
      type: "DETECTION_RESULT",
      faces,
      objects,
      timestamp: nextTimestamp,
    });
  } catch (err) {
    ctx.postMessage({
      type: "DETECTION_ERROR",
      error: String(err),
    });
  } finally {
    imageBitmap1?.close();
    imageBitmap2?.close();
  }
});
