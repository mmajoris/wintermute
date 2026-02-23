import { NextRequest } from "next/server";
import { getGlobalEventBuffer } from "@/lib/event-buffer";
import { getWSClientManager } from "@/lib/ws-clients";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const upgradeHeader = request.headers.get("upgrade");

  if (upgradeHeader !== "websocket") {
    return new Response("Expected WebSocket upgrade", { status: 426 });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { socket, response } = (Reflect.get(request, Symbol.for("socket")) || {}) as any;
    
    if (!socket) {
      return new Response(
        JSON.stringify({
          error: "WebSocket not supported in this environment",
          hint: "Use Server-Sent Events at /api/brain-events/stream instead",
        }),
        {
          status: 501,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const buffer = getGlobalEventBuffer();
    const wsManager = getWSClientManager();

    socket.on("open", () => {
      const clientId = wsManager.addClient(socket);
      console.log(`[ws] Client connected: ${clientId}`);

      const history = buffer.getRecent(100);
      socket.send(JSON.stringify({
        type: "history",
        data: history,
      }));
    });

    socket.on("close", () => {
      console.log("[ws] Client disconnected");
    });

    socket.on("error", (err: Error) => {
      console.error("[ws] Socket error:", err);
    });

    return response;
  } catch {
    return new Response(
      JSON.stringify({
        error: "WebSocket upgrade failed",
        hint: "Use Server-Sent Events at /api/brain-events/stream instead",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
