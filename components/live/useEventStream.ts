"use client";

import { useEffect, useRef } from "react";
import { useLiveStore } from "@/lib/live-store";
import type { BrainEventEnvelope } from "@/lib/brain-events";

interface StreamMessage {
  type: "brain_event" | "history";
  data: BrainEventEnvelope | BrainEventEnvelope[];
}

export function useEventStream() {
  const { setConnected, processEvent, processHistory, setEventsPerSecond } =
    useLiveStore();
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const eventCountRef = useRef(0);
  const lastCountTimeRef = useRef(Date.now());

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

    const rateInterval = setInterval(() => {
      const now = Date.now();
      const elapsed = (now - lastCountTimeRef.current) / 1000;
      if (elapsed > 0) {
        setEventsPerSecond(eventCountRef.current / elapsed);
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
    };
  }, [setConnected, processEvent, processHistory, setEventsPerSecond]);
}
