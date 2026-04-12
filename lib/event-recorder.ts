/**
 * Brain Event Recorder
 *
 * Append-only JSONL writer that persists every brain event Wintermute receives.
 *
 * Why it exists:
 *   The EventBuffer is in-memory and circular (max 1000). When the server
 *   restarts or events overflow, history is lost. The recorder taps the same
 *   event flow at the POST handler and writes every envelope to disk in
 *   newline-delimited JSON, with daily file rotation. The persisted stream
 *   becomes the source of (text, brain_state) paired training data for
 *   Molly's substrate-cortex training pipeline.
 *
 * Behavior:
 *   - Writes one JSON object per line (each line is a BrainEventEnvelope).
 *   - Rotates daily (UTC) so individual files stay manageable.
 *   - Uses Node fs.WriteStream in append mode, which buffers via OS pipe and
 *     does not block the request handler beyond the synchronous write call.
 *   - On any write error, increments error counters and logs but does not
 *     throw — the goal is to never break the live event flow.
 *   - Survives Next.js dev hot-reload via globalThis singleton.
 *
 * Configuration:
 *   - WINTERMUTE_RECORDING=false           disables recording entirely
 *   - WINTERMUTE_RECORDING_DIR=/path/to    overrides default directory
 *   - Default directory: $HOME/.wintermute/events
 *
 * This module requires the Node.js runtime (fs API). API routes that wire
 * the recorder must NOT opt into the edge runtime.
 */

import * as fs from "fs";
import * as path from "path";
import type { BrainEventEnvelope } from "./brain-events";

const RECORDING_ENABLED = process.env.WINTERMUTE_RECORDING !== "false";

const DEFAULT_RECORDING_DIR =
  process.env.WINTERMUTE_RECORDING_DIR ??
  path.join(process.env.HOME ?? "/tmp", ".wintermute", "events");

export interface EventRecorderStatus {
  enabled: boolean;
  directory?: string;
  currentPath?: string | null;
  currentDateKey?: string | null;
  writtenCount?: number;
  errorCount?: number;
  lastError?: string | null;
}

class EventRecorder {
  private writeStream: fs.WriteStream | null = null;
  private currentDateKey: string | null = null;
  private currentPath: string | null = null;
  private writtenCount = 0;
  private errorCount = 0;
  private lastError: Error | null = null;
  private readonly directory: string;

  constructor(directory: string) {
    this.directory = directory;
  }

  private dateKey(date: Date = new Date()): string {
    // YYYY-MM-DD in UTC so daily rotation is timezone-stable
    return date.toISOString().slice(0, 10);
  }

  private filePathFor(dateKey: string): string {
    return path.join(this.directory, `${dateKey}.jsonl`);
  }

  private ensureStream(): fs.WriteStream | null {
    const dateKey = this.dateKey();

    if (this.writeStream && this.currentDateKey === dateKey) {
      return this.writeStream;
    }

    // Day rolled over (or first write of process lifetime). Rotate.
    if (this.writeStream) {
      const previous = this.writeStream;
      this.writeStream = null;
      try {
        previous.end();
      } catch (err) {
        console.warn("[event-recorder] error closing previous stream:", err);
      }
    }

    try {
      fs.mkdirSync(this.directory, { recursive: true });
    } catch (err) {
      this.errorCount++;
      this.lastError = err as Error;
      console.error("[event-recorder] mkdir failed:", err);
      return null;
    }

    const filePath = this.filePathFor(dateKey);
    try {
      const stream = fs.createWriteStream(filePath, { flags: "a" });
      stream.on("error", (err) => {
        this.errorCount++;
        this.lastError = err;
        console.error("[event-recorder] stream error:", err);
      });
      this.writeStream = stream;
      this.currentDateKey = dateKey;
      this.currentPath = filePath;
      console.log(`[event-recorder] writing to ${filePath}`);
    } catch (err) {
      this.errorCount++;
      this.lastError = err as Error;
      console.error("[event-recorder] open failed:", err);
      return null;
    }

    return this.writeStream;
  }

  record(envelope: BrainEventEnvelope): void {
    const stream = this.ensureStream();
    if (!stream) return;

    try {
      // Synchronous-looking write returns immediately; OS handles buffering.
      // Failure path is the stream's "error" event handler above.
      stream.write(JSON.stringify(envelope) + "\n");
      this.writtenCount++;
    } catch (err) {
      this.errorCount++;
      this.lastError = err as Error;
      console.error("[event-recorder] write failed:", err);
    }
  }

  status(): EventRecorderStatus {
    return {
      enabled: true,
      directory: this.directory,
      currentPath: this.currentPath,
      currentDateKey: this.currentDateKey,
      writtenCount: this.writtenCount,
      errorCount: this.errorCount,
      lastError: this.lastError?.message ?? null,
    };
  }

  shutdown(): void {
    if (this.writeStream) {
      const stream = this.writeStream;
      this.writeStream = null;
      try {
        stream.end();
      } catch (err) {
        console.warn("[event-recorder] error during shutdown:", err);
      }
    }
  }
}

// Survive Next.js dev hot-reload via globalThis
type GlobalWithRecorder = typeof globalThis & {
  __wintermuteEventRecorder?: EventRecorder | null;
  __wintermuteRecorderShutdownRegistered?: boolean;
};

const globalRef = globalThis as GlobalWithRecorder;

function ensureShutdownHandlers(recorder: EventRecorder): void {
  if (globalRef.__wintermuteRecorderShutdownRegistered) return;
  globalRef.__wintermuteRecorderShutdownRegistered = true;

  const shutdown = () => {
    recorder.shutdown();
  };

  process.on("beforeExit", shutdown);
  process.on("SIGINT", () => {
    shutdown();
    process.exit(130);
  });
  process.on("SIGTERM", () => {
    shutdown();
    process.exit(143);
  });
}

export function getGlobalEventRecorder(): EventRecorder | null {
  if (!RECORDING_ENABLED) return null;
  if (!globalRef.__wintermuteEventRecorder) {
    const recorder = new EventRecorder(DEFAULT_RECORDING_DIR);
    globalRef.__wintermuteEventRecorder = recorder;
    ensureShutdownHandlers(recorder);
  }
  return globalRef.__wintermuteEventRecorder;
}

export function recordEvent(envelope: BrainEventEnvelope): void {
  const recorder = getGlobalEventRecorder();
  if (recorder) {
    recorder.record(envelope);
  }
}

export function getRecorderStatus(): EventRecorderStatus {
  if (!RECORDING_ENABLED) {
    return { enabled: false };
  }
  const recorder = getGlobalEventRecorder();
  if (!recorder) {
    return { enabled: false };
  }
  return recorder.status();
}
