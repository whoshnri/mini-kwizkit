"use client";

let worker: Worker | null = null;
let readyPromise: Promise<void> | null = null;

export function getSharedProctoringWorker(): Worker {
  if (typeof window === "undefined") {
    throw new Error("Proctoring worker is browser-only");
  }

  if (!worker) {
    worker = new Worker(new URL("../../workers/proctoring.worker.ts", import.meta.url), {
      type: "module",
    });
  }

  return worker;
}

export function warmupSharedProctoringWorker(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  const shared = getSharedProctoringWorker();
  if (readyPromise) return readyPromise;

  readyPromise = new Promise<void>((resolve, reject) => {
    const onMessage = (event: MessageEvent) => {
      const type = event.data?.type;
      if (type === "READY") {
        shared.removeEventListener("message", onMessage);
        resolve();
        return;
      }

      if (type === "ERROR" || type === "INIT_ERROR") {
        shared.removeEventListener("message", onMessage);
        readyPromise = null;
        reject(new Error(String(event.data?.error ?? "AI monitoring failed to start")));
      }
    };

    shared.addEventListener("message", onMessage);
    shared.postMessage({ type: "INIT", origin: window.location.origin });
  });

  return readyPromise;
}
