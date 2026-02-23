"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useExplorerStore } from "@/lib/store";
import { searchNodes } from "@/data/mappings";
import { CATEGORY_COLORS } from "@/lib/constants";
import type { BiologicalNode } from "@/lib/types";

export default function SearchOverlay() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BiologicalNode[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { selectBioNode } = useExplorerStore();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (value.length < 2) { setResults([]); return; }
    setResults(searchNodes(value).slice(0, 15));
  }, []);

  const handleSelect = useCallback((node: BiologicalNode) => {
    selectBioNode(node.id);
    setQuery("");
    setResults([]);
  }, [selectBioNode]);

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg mx-4 backdrop-blur-2xl bg-black/70 border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-white/[0.06]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#525252" strokeWidth="2">
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
          <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-neutral-600">ESC</kbd>
        </div>

        {results.length > 0 && (
          <div className="max-h-72 overflow-y-auto p-2">
            {results.map((node) => {
              const color = CATEGORY_COLORS[node.category] ?? "#6366f1";
              return (
                <button
                  key={node.id}
                  onClick={() => handleSelect(node)}
                  className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors text-left"
                >
                  <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: color }} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white truncate">{node.name}</span>
                      <span className="text-[10px] text-neutral-600 capitalize">{node.category}</span>
                    </div>
                    <p className="text-[10px] text-neutral-500 truncate mt-0.5">{node.description}</p>
                    {node.schemaMapping && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <code className="text-[9px] font-mono text-cyan-500">{node.schemaMapping.collection}</code>
                        <span className="text-[9px] text-neutral-700">→</span>
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
          <div className="p-8 text-center text-xs text-neutral-600">No results for &quot;{query}&quot;</div>
        )}
        {query.length < 2 && (
          <div className="p-6 text-center text-xs text-neutral-600">Type at least 2 characters</div>
        )}
      </div>
    </div>
  );
}
