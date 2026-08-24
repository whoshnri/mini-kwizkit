import type { MonitorSSEEnvelope } from "@/server/types/monitor-events";

type SSEWriter = {
  id: string;
  write: (payload: MonitorSSEEnvelope) => Promise<void>;
  close: () => void;
};

export function createSseResponse(
  request: Request,
  subscribe: (writer: SSEWriter) => () => void
) {
  const encoder = new TextEncoder();
  let closed = false;

  const stream = new ReadableStream({
    start(controller) {
      const writeLine = (event: string, data: unknown) => {
        if (closed) return;
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
      };

      const writer: SSEWriter = {
        id: crypto.randomUUID(),
        write: async (payload) => {
          writeLine(payload.channel, payload.event);
        },
        close: () => {
          closed = true;
          try {
            controller.close();
          } catch {
            /* already closed */
          }
        },
      };

      const unsubscribe = subscribe(writer);
      writeLine("ping", { type: "ping" });

      const keepalive = setInterval(() => {
        writeLine("ping", { type: "ping" });
      }, 8_000);

      const shutdown = () => {
        if (closed) return;
        closed = true;
        clearInterval(keepalive);
        unsubscribe();
        try {
          controller.close();
        } catch {
          /* already closed */
        }
      };

      if (request.signal.aborted) {
        shutdown();
        return;
      }

      request.signal.addEventListener("abort", shutdown, { once: true });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
