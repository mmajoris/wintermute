"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface SplitPanelProps {
  left: React.ReactNode;
  right: React.ReactNode;
  defaultSplit?: number;
  minLeft?: number;
  minRight?: number;
}

export default function SplitPanel({
  left,
  right,
  defaultSplit = 50,
  minLeft = 25,
  minRight = 25,
}: SplitPanelProps) {
  const [split, setSplit] = useState(defaultSplit);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseDown = useCallback(() => {
    dragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setSplit(Math.max(minLeft, Math.min(100 - minRight, pct)));
    };

    const onMouseUp = () => {
      dragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [minLeft, minRight]);

  return (
    <div ref={containerRef} className="flex h-full w-full relative">
      <div style={{ width: `${split}%` }} className="h-full overflow-hidden">
        {left}
      </div>
      <div
        onMouseDown={onMouseDown}
        className="w-1 h-full bg-[var(--color-border)] hover:bg-[var(--color-accent-blue)] cursor-col-resize transition-colors flex-shrink-0 relative z-10"
      />
      <div
        style={{ width: `${100 - split}%` }}
        className="h-full overflow-hidden"
      >
        {right}
      </div>
    </div>
  );
}
