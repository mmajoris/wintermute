import { NextRequest } from "next/server";
import { getGlobalEventBuffer } from "@/lib/event-buffer";
import { addSSEClient, removeSSEClient } from "@/lib/sse-clients";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const buffer = getGlobalEventBuffer();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const clientId = addSSEClient(controller, encoder);

      const history = buffer.getRecent(100);
      const historyMessage = `data: ${JSON.stringify({ type: "history", data: history })}\n\n`;
      controller.enqueue(encoder.encode(historyMessage));

      const keepalive = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`: keepalive\n\n`));
        } catch {
          clearInterval(keepalive);
        }
      }, 30000);

      request.signal.addEventListener("abort", () => {
        clearInterval(keepalive);
        removeSSEClient(clientId);
        try {
          controller.close();
        } catch {
          // Already closed
        }
      });
    },
    cancel() {
      // Client disconnected
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
