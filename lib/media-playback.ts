export function isMediaAbortError(error: unknown) {
 return error instanceof DOMException && error.name ==="AbortError";
}

export async function safeVideoPlay(video: HTMLVideoElement | null | undefined) {
 if (!video) return;

 try {
 await video.play();
 } catch (error) {
 if (!isMediaAbortError(error)) {
 console.warn("[media] video.play() failed:", error);
 }
 }
}
