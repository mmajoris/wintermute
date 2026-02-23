/**
 * SSE Client Manager
 * 
 * Manages Server-Sent Events clients for broadcasting brain events.
 */

import type { BrainEventEnvelope } from "./brain-events";

type SSEClient = {
  id: string;
  controller: ReadableStreamDefaultController;
  encoder: TextEncoder;
};

const clients = new Map<string, SSEClient>();
let clientCounter = 0;

export function addSSEClient(
  controller: ReadableStreamDefaultController,
  encoder: TextEncoder
): string {
  const id = `sse_${Date.now()}_${++clientCounter}`;
  clients.set(id, { id, controller, encoder });
  return id;
}

export function removeSSEClient(id: string): void {
  clients.delete(id);
}

export function broadcastToSSEClients(envelope: BrainEventEnvelope): void {
  const message = `data: ${JSON.stringify({ type: "brain_event", data: envelope })}\n\n`;

  const deadClients: string[] = [];

  for (const [id, client] of clients) {
    try {
      client.controller.enqueue(client.encoder.encode(message));
    } catch {
      deadClients.push(id);
    }
  }

  for (const id of deadClients) {
    clients.delete(id);
  }
}

export function getSSEClientCount(): number {
  return clients.size;
}
