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
        setConnected(false, "Connection lost");
        stopBaselineActivity();
        eventSource.close();

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
      clearInterval(rateInterval);
      stopBaselineActivity();
    };
  }, [setConnected, processEvent, processHistory, setEventsPerSecond, startBaselineActivity, stopBaselineActivity]);
}
