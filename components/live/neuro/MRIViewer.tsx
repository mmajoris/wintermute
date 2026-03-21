"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import {
  loadVolume,
  loadAtlasMeta,
  extractSlice,
  getSliceRange,
  voxelToMni,
  type SlicePlane,
  type AtlasMeta,
  type LoadedVolume,
} from "@/lib/volume-atlas";
import { BracketFrame, HudSectionTitle } from "../BracketFrame";
import ClinicalImageViewer, { ExpandButton } from "./ClinicalImageViewer";

type Weighting = "T1" | "T2";

export default function MRIViewer() {
  const [clinicalOpen, setClinicalOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [plane, setPlane] = useState<SlicePlane>("axial");
  const [sliceIdx, setSliceIdx] = useState<number | null>(null);
  const [weighting, setWeighting] = useState<Weighting>("T1");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const metaRef = useRef<AtlasMeta | null>(null);
  const volRef = useRef<LoadedVolume | null>(null);
  const currentKeyRef = useRef<string>("");

  const volumeKey = weighting === "T1" ? "t1" : "t2";

  // Load volume data
  useEffect(() => {
    const key = volumeKey;
    if (currentKeyRef.current === key && volRef.current) return;

    setLoading(true);
    setError(null);

    Promise.all([loadAtlasMeta(), loadVolume(key)])
      .then(([meta, vol]) => {
        metaRef.current = meta;
        volRef.current = vol;
        currentKeyRef.current = key;
        setLoading(false);
        // Set default slice if not set
        setSliceIdx((prev) => prev ?? getSliceRange(meta, plane).default);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load atlas");
        setLoading(false);
      });
  }, [volumeKey, plane]);

  // Update default slice when plane changes
  useEffect(() => {
    if (metaRef.current) {
      setSliceIdx(getSliceRange(metaRef.current, plane).default);
    }
  }, [plane]);

  // Render slice
  const renderSlice = useCallback(() => {
    const canvas = canvasRef.current;
    const vol = volRef.current;
    if (!canvas || !vol || sliceIdx === null) return;

    const { pixels, width, height } = extractSlice(vol, plane, sliceIdx);

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgData = ctx.createImageData(width, height);
    for (let i = 0; i < pixels.length; i++) {
      const v = pixels[i];
      const idx = i * 4;
      imgData.data[idx] = v;
      imgData.data[idx + 1] = v;
      imgData.data[idx + 2] = v;
      imgData.data[idx + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
  }, [plane, sliceIdx]);

  useEffect(() => {
    if (!loading) renderSlice();
  }, [loading, renderSlice]);

  const meta = metaRef.current;
  const range = meta ? getSliceRange(meta, plane) : { min: 0, max: 192, default: 96 };
  const currentSlice = sliceIdx ?? range.default;

  // MNI coordinate display
  let mniLabel = "";
  if (meta && sliceIdx !== null) {
    const [mx, my, mz] = (() => {
      switch (plane) {
        case "axial": return voxelToMni(96, 114, sliceIdx, meta);
        case "sagittal": return voxelToMni(sliceIdx, 114, 96, meta);
        case "coronal": return voxelToMni(96, sliceIdx, 96, meta);
      }
    })();
    const coord = plane === "axial" ? `Z=${mz.toFixed(0)}` : plane === "sagittal" ? `X=${mx.toFixed(0)}` : `Y=${my.toFixed(0)}`;
    mniLabel = `MNI ${coord}mm`;
  }

  return (
    <BracketFrame variant="detail-5" className="p-3 flex flex-col overflow-hidden">
      <HudSectionTitle>
        MRI — {weighting}-Weighted
        <span className="ml-auto flex items-center gap-2">
          <span className="text-[7px] font-normal" style={{ color: "#ffffff40" }}>{plane.toUpperCase()} · {mniLabel}</span>
          <ExpandButton onClick={() => setClinicalOpen(true)} />
        </span>
      </HudSectionTitle>
      <ClinicalImageViewer open={clinicalOpen} onClose={() => setClinicalOpen(false)} initialModality="MRI" />

      <div className="flex items-center gap-2 mt-2 mb-1">
        {(["axial", "sagittal", "coronal"] as const).map((p) => (
          <button key={p} onClick={() => setPlane(p)}
            className="text-[8px] uppercase px-2 py-0.5 rounded transition-colors"
            style={{
              color: plane === p ? "#06b6d4" : "#525252",
              background: plane === p ? "#06b6d415" : "transparent",
            }}>
            {p}
          </button>
        ))}
        <div className="w-px h-3 bg-white/8" />
        {(["T1", "T2"] as const).map((w) => (
          <button key={w} onClick={() => setWeighting(w)}
            className="text-[8px] font-bold px-2 py-0.5 rounded transition-colors"
            style={{
              color: weighting === w ? "#f59e0b" : "#525252",
              background: weighting === w ? "#f59e0b15" : "transparent",
            }}>
            {w}
          </button>
        ))}
      </div>

      <div className="relative flex-1 flex items-center justify-center bg-black rounded overflow-hidden mt-1"
        style={{ minHeight: 260 }}>
        {loading ? (
          <div className="text-[10px] text-neutral-600 animate-pulse">Loading ICBM-152 atlas...</div>
        ) : error ? (
          <div className="text-[10px] text-red-500">{error}</div>
        ) : (
          <canvas
            ref={canvasRef}
            className="max-w-full max-h-full"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        )}

        {!loading && !error && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: "#06b6d410" }} />
            <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: "#06b6d410" }} />
            <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[7px] font-mono" style={{ color: "#ffffff25" }}>
              {plane === "axial" ? "A" : "S"}
            </span>
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[7px] font-mono" style={{ color: "#ffffff25" }}>
              {plane === "axial" ? "P" : "I"}
            </span>
            <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[7px] font-mono" style={{ color: "#ffffff25" }}>
              {plane === "sagittal" ? "P" : "R"}
            </span>
            <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[7px] font-mono" style={{ color: "#ffffff25" }}>
              {plane === "sagittal" ? "A" : "L"}
            </span>
          </div>
        )}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-[7px] text-neutral-600 w-8">{range.min}</span>
        <input type="range" min={range.min} max={range.max} step={1} value={currentSlice}
          onChange={(e) => setSliceIdx(parseInt(e.target.value))}
          className="flex-1 h-1 appearance-none bg-neutral-800 rounded-full cursor-pointer accent-cyan-600"
        />
        <span className="text-[7px] text-neutral-600 w-8 text-right">{range.max}</span>
      </div>
      <div className="text-[6px] text-center mt-0.5" style={{ color: "#ffffff15" }}>
        ICBM-152 2009c · Fonov et al.
      </div>
    </BracketFrame>
  );
}
