import { getRubricApiUrl } from"@/lib/rubric-api-url";

export async function proxyEventStream(
 upstreamUrl: string,
 init: RequestInit,
 signal: AbortSignal
) {
 const response = await fetch(upstreamUrl, {
 ...init,
 signal,
 cache:"no-store",
 });

 if (!response.ok || !response.body) {
 return new Response(await response.text(), {
 status: response.status,
 headers: {"Content-Type":"text/plain"},
 });
 }

 const upstream = response.body;
 const reader = upstream.getReader();

 const stream = new ReadableStream({
 async start(controller) {
 try {
 while (true) {
 const { done, value } = await reader.read();
 if (done) {
 controller.close();
 break;
 }
 controller.enqueue(value);
 }
 } catch (error) {
 if (!signal.aborted) {
 controller.error(error);
 } else {
 controller.close();
 }
 } finally {
 reader.releaseLock();
 }
 },
 cancel() {
 reader.cancel().catch(() => undefined);
 },
 });

 return new Response(stream, {
 status: response.status,
 headers: {
"Content-Type":"text/event-stream",
"Cache-Control":"no-cache, no-transform",
 Connection:"keep-alive",
"X-Accel-Buffering":"no",
 },
 });
}

export function rubricApiStreamUrl(path: string) {
 return`${getRubricApiUrl()}${path}`;
}
