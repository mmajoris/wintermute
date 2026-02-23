/**
 * Circular Event Buffer
 * 
 * In-memory buffer for storing recent brain events.
 * Used by the API endpoint to store events and by WebSocket to send history.
 */

import type { BrainEvent, BrainEventEnvelope } from "./brain-events";

export class EventBuffer {
  private buffer: BrainEventEnvelope[] = [];
  private maxSize: number;
  private eventCounter = 0;

  constructor(maxSize = 1000) {
    this.maxSize = maxSize;
  }

  push(event: BrainEvent): BrainEventEnvelope {
    const envelope: BrainEventEnvelope = {
      id: `evt_${Date.now()}_${++this.eventCounter}`,
      event,
      received_at: new Date().toISOString(),
    };

    this.buffer.push(envelope);

    if (this.buffer.length > this.maxSize) {
      this.buffer.shift();
    }

    return envelope;
  }

  getRecent(count = 100): BrainEventEnvelope[] {
    return this.buffer.slice(-count);
  }

  getAll(): BrainEventEnvelope[] {
    return [...this.buffer];
  }

  getByType(type: BrainEvent["type"], count = 50): BrainEventEnvelope[] {
    return this.buffer
      .filter((e) => e.event.type === type)
      .slice(-count);
  }

  getSince(timestamp: string): BrainEventEnvelope[] {
    const since = new Date(timestamp).getTime();
    return this.buffer.filter(
      (e) => new Date(e.received_at).getTime() > since
    );
  }

  clear(): void {
    this.buffer = [];
  }

  get size(): number {
    return this.buffer.length;
  }

  get eventsPerSecond(): number {
    if (this.buffer.length < 2) return 0;
    
    const recent = this.buffer.slice(-100);
    if (recent.length < 2) return 0;

    const first = new Date(recent[0].received_at).getTime();
    const last = new Date(recent[recent.length - 1].received_at).getTime();
    const durationSeconds = (last - first) / 1000;

    if (durationSeconds <= 0) return 0;
    return recent.length / durationSeconds;
  }
}

let globalBuffer: EventBuffer | null = null;

export function getGlobalEventBuffer(): EventBuffer {
  if (!globalBuffer) {
    globalBuffer = new EventBuffer(1000);
  }
  return globalBuffer;
}
