"use client";

import { useState, useEffect, useCallback } from "react";
import { listScanStudies, deleteScanStudy, type ScanStudy } from "@/lib/scan-store";
import { snapshotSummary } from "@/lib/brain-snapshot";
import { BracketFrame, HudSectionTitle } from "../BracketFrame";

interface StudyBrowserPanelProps {
  onSelectStudy?: (study: ScanStudy) => void;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" });
}

const MODALITY_COLORS: Record<string, string> = {
  MRI: "#06b6d4",
  CT: "#f59e0b",
  PET: "#f97316",
  fMRI: "#ef4444",
  "Full Protocol": "#8b5cf6",
};

export default function StudyBrowserPanel({ onSelectStudy }: StudyBrowserPanelProps) {
  const [studies, setStudies] = useState<ScanStudy[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const list = await listScanStudies();
    setStudies(list);
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const handleDelete = useCallback(async (id: string) => {
    await deleteScanStudy(id);
    refresh();
  }, [refresh]);

  return (
    <BracketFrame variant="detail-5" className="p-3 flex flex-col overflow-hidden" style={{ minHeight: 200 }}>
      <HudSectionTitle>
        Scan Studies
        <span className="ml-auto text-[8px] font-normal" style={{ color: "#ffffff40" }}>
          {studies.length} {studies.length === 1 ? "study" : "studies"}
        </span>
      </HudSectionTitle>

      {loading ? (
        <div className="mt-4 text-[10px] text-neutral-600 animate-pulse">Loading studies...</div>
      ) : studies.length === 0 ? (
        <div className="mt-4 text-[10px] text-neutral-600">
          No scan studies yet. Open the clinical viewer and click &quot;Acquire&quot; to capture Molly&apos;s brain state.
        </div>
      ) : (
        <div className="mt-2 space-y-2 overflow-y-auto hud-scrollbar flex-1">
          {studies.map((study) => {
            const summary = snapshotSummary(study.snapshot);
            const color = MODALITY_COLORS[study.modality] ?? "#666";
            return (
              <div key={study.id} className="rounded p-2 transition-colors hover:bg-white/3"
                style={{ border: "1px solid #ffffff08" }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[8px] font-bold px-1.5 py-0.5 rounded"
                    style={{ color, background: `${color}15`, border: `1px solid ${color}25` }}>
                    {study.modality}
                  </span>
                  <span className="text-[9px] text-neutral-500">{formatDate(study.createdAt)}</span>
                  <span className="text-[8px] text-neutral-600">{formatTime(study.createdAt)}</span>
                </div>

                {study.indication && (
                  <div className="text-[9px] text-neutral-400 mb-1.5 italic">{study.indication}</div>
                )}

                {/* Thumbnails */}
                <div className="flex gap-1 mb-1.5">
                  {study.thumbnails.axial.slice(0, 3).map((src, i) => (
                    <img key={i} src={src} alt={`Axial ${i}`}
                      className="h-12 rounded-sm opacity-80" style={{ objectFit: "contain", background: "#000" }} />
                  ))}
                </div>

                {/* Summary metrics */}
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[8px]">
                  {Object.entries(summary).slice(0, 4).map(([k, v]) => (
                    <span key={k} className="text-neutral-500">
                      {k}: <span className="text-neutral-400">{v}</span>
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-2">
                  {onSelectStudy && (
                    <button onClick={() => onSelectStudy(study)}
                      className="text-[8px] px-2 py-0.5 rounded transition-colors"
                      style={{ color: "#06b6d4", background: "#06b6d410" }}>
                      Review
                    </button>
                  )}
                  <button onClick={() => handleDelete(study.id)}
                    className="text-[8px] px-2 py-0.5 rounded text-neutral-600 hover:text-red-500 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </BracketFrame>
  );
}

/**
 * Fullscreen study browser overlay (used inside ClinicalImageViewer).
 */
export function StudyBrowserOverlay({
  open,
  onClose,
  onSelectStudy,
}: {
  open: boolean;
  onClose: () => void;
  onSelectStudy: (study: ScanStudy) => void;
}) {
  const [studies, setStudies] = useState<ScanStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;
    listScanStudies().then((list) => { setStudies(list); setLoading(false); });
  }, [open]);

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-[#0a0a0a] border border-[#222] rounded-lg w-[500px] max-h-[80vh] flex flex-col overflow-hidden"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        <div className="px-4 py-3 border-b border-[#1a1a1a] flex items-center justify-between">
          <span className="text-[12px] font-bold" style={{ color: "#00c8dc" }}>Scan Studies ({studies.length})</span>
          <button onClick={onClose} className="text-[10px] text-[#555] hover:text-white">Close</button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {loading ? (
            <div className="text-[10px] text-[#333] animate-pulse py-8 text-center">Loading...</div>
          ) : studies.length === 0 ? (
            <div className="text-[10px] text-[#444] py-8 text-center">No studies yet</div>
          ) : (
            studies.map((study) => {
              const summary = snapshotSummary(study.snapshot);
              const color = MODALITY_COLORS[study.modality] ?? "#666";
              return (
                <button key={study.id}
                  onClick={() => { onSelectStudy(study); onClose(); }}
                  className="w-full text-left rounded p-3 transition-colors hover:bg-[#111] border border-[#1a1a1a]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded"
                      style={{ color, background: `${color}15` }}>
                      {study.modality}
                    </span>
                    <span className="text-[10px] text-[#888]">{formatDate(study.createdAt)} {formatTime(study.createdAt)}</span>
                  </div>
                  {study.indication && (
                    <div className="text-[10px] text-[#666] mb-2">{study.indication}</div>
                  )}
                  <div className="flex gap-1 mb-2">
                    {study.thumbnails.axial.slice(0, 4).map((src, i) => (
                      <img key={i} src={src} alt="" className="h-14 rounded-sm" style={{ objectFit: "contain", background: "#000" }} />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-x-3 text-[8px] text-[#555]">
                    {Object.entries(summary).map(([k, v]) => (
                      <span key={k}>{k}: <span className="text-[#777]">{v}</span></span>
                    ))}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
