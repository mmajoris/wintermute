"use client";

import { useEffect, useRef } from "react";
import { useLiveStore } from "@/lib/live-store";
import type { BrainEventEnvelope } from "@/lib/brain-events";

interface StreamMessage {
  type: "brain_event" | "history";
  data: BrainEventEnvelope | BrainEventEnvelope[];
}

export function useEventStream() {
  const { setConnected, processEvent, processHistory, setEventsPerSecond, startBaselineActivity, stopBaselineActivity } =
    useLiveStore();
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const disconnectDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const eventCountRef = useRef(0);
  const lastCountTimeRef = useRef(Date.now());
  const smoothedRateRef = useRef(0);

  useEffect(() => {
    let mounted = true;

    function connect() {
      if (!mounted) return;

      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      const eventSource = new EventSource("/api/brain-events/stream");
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        if (!mounted) return;
        if (disconnectDebounceRef.current) {
          clearTimeout(disconnectDebounceRef.current);
          disconnectDebounceRef.current = null;
        }
        setConnected(true);
        startBaselineActivity();
        console.log("[live] Connected to event stream");
      };

      eventSource.onmessage = (event) => {
        if (!mounted) return;

        try {
          const message: StreamMessage = JSON.parse(event.data);

          if (message.type === "history") {
            processHistory(message.data as BrainEventEnvelope[]);
          } else if (message.type === "brain_event") {
            processEvent(message.data as BrainEventEnvelope);
            eventCountRef.current++;
          }
        } catch (err) {
          console.error("[live] Failed to parse event:", err);
        }
      };

      eventSource.onerror = () => {
        if (!mounted) return;
        eventSource.close();

        // Debounce the disconnect — don't flash offline for momentary hiccups.
        // Only mark disconnected if we can't reconnect within 5 seconds.
        if (!disconnectDebounceRef.current) {
          disconnectDebounceRef.current = setTimeout(() => {
            if (mounted) {
              setConnected(false, "Connection lost");
              stopBaselineActivity();
            }
            disconnectDebounceRef.current = null;
          }, 5000);
        }

        reconnectTimeoutRef.current = setTimeout(() => {
          if (mounted) {
            console.log("[live] Reconnecting...");
            connect();
          }
        }, 3000);
      };
    }

    connect();

    const EMA_ALPHA = 0.3;
    const rateInterval = setInterval(() => {
      const now = Date.now();
      const elapsed = (now - lastCountTimeRef.current) / 1000;
      if (elapsed > 0) {
        const raw = eventCountRef.current / elapsed;
        let smoothed: number;
        if (raw === 0) {
          smoothed = smoothedRateRef.current * 0.3;
        } else {
          smoothed = smoothedRateRef.current * (1 - EMA_ALPHA) + raw * EMA_ALPHA;
        }
        smoothedRateRef.current = smoothed < 0.05 ? 0 : smoothed;
        setEventsPerSecond(smoothedRateRef.current);
        eventCountRef.current = 0;
        lastCountTimeRef.current = now;
      }
    }, 1000);

    return () => {
      mounted = false;
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (disconnectDebounceRef.current) {
        clearTimeout(disconnectDebounceRef.current);
      }
      clearInterval(rateInterval);
      stopBaselineActivity();
    };
  }, [setConnected, processEvent, processHistory, setEventsPerSecond, startBaselineActivity, stopBaselineActivity]);
}
