/**
 * WebSocket Client Manager
 * 
 * Manages connected WebSocket clients for broadcasting brain events.
 * Since Next.js API routes are stateless, we use a global singleton.
 */

import type { BrainEventEnvelope } from "./brain-events";

type WebSocketClient = {
  id: string;
  send: (data: string) => void;
  readyState: number;
};

class WSClientManager {
  private clients: Map<string, WebSocketClient> = new Map();
  private clientCounter = 0;

  addClient(ws: { send: (data: string) => void; readyState: number }): string {
    const id = `ws_${Date.now()}_${++this.clientCounter}`;
    this.clients.set(id, { id, send: ws.send.bind(ws), readyState: ws.readyState });
    return id;
  }

  removeClient(id: string): void {
    this.clients.delete(id);
  }

  updateClient(id: string, ws: { send: (data: string) => void; readyState: number }): void {
    const existing = this.clients.get(id);
    if (existing) {
      existing.send = ws.send.bind(ws);
      existing.readyState = ws.readyState;
    }
  }

  broadcast(envelope: BrainEventEnvelope): void {
    const message = JSON.stringify({
      type: "brain_event",
      data: envelope,
    });

    const deadClients: string[] = [];

    for (const [id, client] of this.clients) {
      try {
        if (client.readyState === 1) { // WebSocket.OPEN
          client.send(message);
        } else {
          deadClients.push(id);
        }
      } catch {
        deadClients.push(id);
      }
    }

    for (const id of deadClients) {
      this.clients.delete(id);
    }
  }

  get clientCount(): number {
    return this.clients.size;
  }

  getClientIds(): string[] {
    return Array.from(this.clients.keys());
  }
}

let globalManager: WSClientManager | null = null;

export function getWSClientManager(): WSClientManager {
  if (!globalManager) {
    globalManager = new WSClientManager();
  }
  return globalManager;
}
