"use client";

import dynamic from "next/dynamic";

const LiveBrainMonitor = dynamic(
  () => import("@/components/live/LiveBrainMonitor"),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen w-screen flex items-center justify-center" style={{ background: "#030406" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          <span className="text-sm text-neutral-500">Initializing Live View...</span>
        </div>
      </div>
    ),
  }
);

export default function LivePage() {
  return <LiveBrainMonitor />;
}
