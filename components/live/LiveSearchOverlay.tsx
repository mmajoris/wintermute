"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useLiveStore } from "@/lib/live-store";
import { searchNodes } from "@/data/mappings";
import { CATEGORY_COLORS } from "@/lib/constants";
import { useHudColor } from "@/components/ui/hud-theme";
import type { BiologicalNode } from "@/lib/types";

export default function LiveSearchOverlay({ onClose }: { onClose: () => void }) {
  const c = useHudColor();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BiologicalNode[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { selectRegion } = useLiveStore();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (value.length < 2) { setResults([]); return; }
    setResults(searchNodes(value).slice(0, 15));
  }, []);

  const handleSelect = useCallback((node: BiologicalNode) => {
    selectRegion(node.id);
    onClose();
  }, [selectRegion, onClose]);

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center pt-[15vh]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-lg mx-4 overflow-hidden"
        style={{
          background: "rgba(2, 4, 8, 0.95)",
          backdropFilter: "blur(16px)",
          border: `1px solid ${c(0.15)}`,
        }}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 p-4" style={{ borderBottom: `1px solid ${c(0.1)}` }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c(0.4)} strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search brain regions, schema collections..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-600 outline-none"
          />
          <kbd className="text-[9px] px-1.5 py-0.5" style={{ background: c(0.05), border: `1px solid ${c(0.1)}`, color: c(0.4) }}>ESC</kbd>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="max-h-72 overflow-y-auto hud-scrollbar p-2">
            {results.map((node) => {
              const color = CATEGORY_COLORS[node.category] ?? "#6366f1";
              return (
                <button
                  key={node.id}
                  onClick={() => handleSelect(node)}
                  className="w-full flex items-start gap-3 p-3 hover:bg-white/4 transition-colors text-left"
                >
                  <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: color }} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white truncate">{node.name}</span>
                      <span className="text-[9px] capitalize" style={{ color: c(0.3) }}>{node.category}</span>
                    </div>
                    <p className="text-[10px] truncate mt-0.5" style={{ color: c(0.35) }}>{node.description}</p>
                    {node.schemaMapping && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <code className="text-[9px] font-mono" style={{ color: c(0.7) }}>{node.schemaMapping.collection}</code>
                        <span className="text-[8px]" style={{ color: c(0.2) }}>→</span>
                        <span className="text-[9px] text-purple-400">{node.schemaMapping.role}</span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {query.length >= 2 && results.length === 0 && (
          <div className="p-8 text-center text-xs" style={{ color: c(0.3) }}>No results for &quot;{query}&quot;</div>
        )}
        {query.length < 2 && (
          <div className="p-6 text-center text-xs" style={{ color: c(0.3) }}>Type at least 2 characters</div>
        )}
      </div>
    </div>
  );
}
