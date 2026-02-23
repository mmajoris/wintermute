"use client";

import dynamic from "next/dynamic";

const BrainExplorer = dynamic(() => import("@/components/explorer/BrainExplorer"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen flex items-center justify-center bg-[#060609]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-neutral-500 text-sm tracking-wide">Initializing neural atlas...</p>
      </div>
    </div>
  ),
});

export default function ExplorerPage() {
  return <BrainExplorer />;
}
