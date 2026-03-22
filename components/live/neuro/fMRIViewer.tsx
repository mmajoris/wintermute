"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { useLiveStore } from "@/lib/live-store";
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
import { BRAIN_REGIONS_3D } from "@/lib/brain-anatomy-3d";
import { BracketFrame, HudSectionTitle } from "../BracketFrame";
import ClinicalImageViewer, { ExpandButton } from "./ClinicalImageViewer";

function activationColormap(t: number): [number, number, number] {
  if (t >= 0) {
    const v = Math.min(1, t);
    if (v < 0.5) return [Math.round((v / 0.5) * 220), Math.round((v / 0.5) * 60), 0];
    const s = (v - 0.5) / 0.5;
    return [220 + Math.round(s * 35), 60 + Math.round(s * 190), Math.round(s * 60)];
  }
  const v = Math.min(1, -t);
  if (v < 0.5) return [0, Math.round((v / 0.5) * 80), Math.round((v / 0.5) * 220)];
  const s = (v - 0.5) / 0.5;
  return [Math.round(s * 60), 80 + Math.round(s * 175), 220 + Math.round(s * 35)];
}

function ellipsoidDist(
  px: number, py: number, pz: number,
  cx: number, cy: number, cz: number,
  rx: number, ry: number, rz: number,
): number {
  const dx = (px - cx) / rx;
  const dy = (py - cy) / ry;
  const dz = (pz - cz) / rz;
  return dx * dx + dy * dy + dz * dz;
}

export default function FMRIViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [plane, setPlane] = useState<SlicePlane>("axial");
  const [sliceIdx, setSliceIdx] = useState<number | null>(null);
  const [threshold, setThreshold] = useState(0.2);
  const [loading, setLoading] = useState(true);
  const [clinicalOpen, setClinicalOpen] = useState(false);

  const metaRef = useRef<AtlasMeta | null>(null);
  const t1Ref = useRef<LoadedVolume | null>(null);
  const maskRef = useRef<LoadedVolume | null>(null);

  const regionActivity = useLiveStore((s) => s.regionActivity);
  const connected = useLiveStore((s) => s.mollyAwake);

  useEffect(() => {
    setLoading(true);
    Promise.all([loadAtlasMeta(), loadVolume("t1"), loadVolume("mask")])
      .then(([meta, t1, mask]) => {
        metaRef.current = meta;
        t1Ref.current = t1;
        maskRef.current = mask;
        setLoading(false);
        setSliceIdx((prev) => prev ?? getSliceRange(meta, plane).default);
      });
  }, [plane]);

  useEffect(() => {
    if (metaRef.current) setSliceIdx(getSliceRange(metaRef.current, plane).default);
  }, [plane]);

  const renderSlice = useCallback(() => {
    const canvas = canvasRef.current;
    const t1 = t1Ref.current;
    const mask = maskRef.current;
    const meta = metaRef.current;
    if (!canvas || !t1 || !mask || !meta || sliceIdx === null) return;

    const t1Slice = extractSlice(t1, plane, sliceIdx);
    const maskSlice = extractSlice(mask, plane, sliceIdx);
    const { width, height } = t1Slice;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgData = ctx.createImageData(width, height);
    const activityRegions = BRAIN_REGIONS_3D.filter((r) => r.storeId);

    for (let py = 0; py < height; py++) {
      for (let px = 0; px < width; px++) {
        const i = px + py * width;
        const bgV = t1Slice.pixels[i] * 0.45;
        const inBrain = maskSlice.pixels[i] > 128;

        let boldSignal = 0;
        if (inBrain && connected) {
          // Convert pixel to MNI coordinates
          let vx: number, vy: number, vz: number;
          switch (plane) {
            case "axial":
              vx = px; vy = height - 1 - py; vz = sliceIdx; break;
            case "sagittal":
              vx = sliceIdx; vy = px; vz = height - 1 - py; break;
            case "coronal":
              vx = px; vy = sliceIdx; vz = height - 1 - py; break;
          }
          const [mx, my, mz] = voxelToMni(vx, vy, vz, meta);

          // Map MNI coords to brain model coords (~1:10 scale, offset)
          const bx = mx / 12;
          const by = my / 12 + 11;
          const bz = mz / 12 - 0.5;

          for (const region of activityRegions) {
            const d = ellipsoidDist(
              bx, by, bz,
              region.center[0], region.center[1], region.center[2],
              region.radii[0] * 1.5, region.radii[1] * 1.5, region.radii[2] * 1.5,
            );
            if (d < 1 && region.storeId) {
              const activity = regionActivity.get(region.storeId);
              if (activity) boldSignal += activity.intensity * (1 - d);
            }
          }
        }

        let r = bgV, g = bgV, b = bgV;
        const absBold = Math.abs(boldSignal);
        if (absBold > threshold && inBrain) {
          const norm = Math.min(1, (absBold - threshold) / (1 - threshold));
          const signed = boldSignal > 0 ? norm : -norm;
          const [ar, ag, ab] = activationColormap(signed);
          const alpha = Math.min(0.85, norm);
          r = bgV * (1 - alpha) + ar * alpha;
          g = bgV * (1 - alpha) + ag * alpha;
          b = bgV * (1 - alpha) + ab * alpha;
        }

        const idx = i * 4;
        imgData.data[idx] = Math.round(Math.max(0, Math.min(255, r)));
        imgData.data[idx + 1] = Math.round(Math.max(0, Math.min(255, g)));
        imgData.data[idx + 2] = Math.round(Math.max(0, Math.min(255, b)));
        imgData.data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }, [plane, sliceIdx, threshold, regionActivity, connected]);

  useEffect(() => {
    if (!loading) renderSlice();
  }, [loading, renderSlice]);

  const meta = metaRef.current;
  const range = meta ? getSliceRange(meta, plane) : { min: 0, max: 192, default: 96 };
  const currentSlice = sliceIdx ?? range.default;

  const activeCount = connected
    ? Array.from(regionActivity.values()).filter((a) => a.intensity > threshold).length
    : 0;

  return (
    <BracketFrame variant="detail-5" className="p-3 flex flex-col overflow-hidden">
      <HudSectionTitle>
        fMRI — BOLD Activation
        <span className="ml-auto flex items-center gap-2">
          <span className="text-[7px] font-normal" style={{ color: connected ? "#34d399" : "#525252" }}>{connected ? `${activeCount} active` : "OFFLINE"}</span>
          <ExpandButton onClick={() => setClinicalOpen(true)} />
        </span>
      </HudSectionTitle>
      <ClinicalImageViewer open={clinicalOpen} onClose={() => setClinicalOpen(false)} initialModality="fMRI" />

      <div className="flex items-center gap-1.5 mt-2 mb-1">
        {(["axial", "sagittal", "coronal"] as const).map((p) => (
          <button key={p} onClick={() => setPlane(p)}
            className="text-[8px] uppercase px-1.5 py-0.5 rounded transition-colors"
            style={{ color: plane === p ? "#ef4444" : "#525252", background: plane === p ? "#ef444415" : "transparent" }}>
            {p}
          </button>
        ))}
      </div>

      <div className="relative flex-1 flex items-center justify-center bg-black rounded overflow-hidden"
        style={{ minHeight: 260 }}>
        {loading ? (
          <div className="text-[10px] text-neutral-600 animate-pulse">Loading atlas...</div>
        ) : (
          <canvas ref={canvasRef} className="max-w-full max-h-full"
            style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        )}
        {!loading && (
          <>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: "#ffffff08" }} />
              <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: "#ffffff08" }} />
            </div>
            <div className="absolute right-2 top-2 bottom-8 w-3 rounded overflow-hidden flex flex-col">
              {Array.from({ length: 20 }, (_, i) => {
                const [r, g, b] = activationColormap(1 - (i / 19) * 2);
                return <div key={i} className="flex-1" style={{ background: `rgb(${r},${g},${b})` }} />;
              })}
            </div>
            <span className="absolute right-6 top-1 text-[5px] font-mono" style={{ color: "#ef444488" }}>+BOLD</span>
            <span className="absolute right-6 bottom-7 text-[5px] font-mono" style={{ color: "#3b82f688" }}>−BOLD</span>
          </>
        )}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-[7px] text-neutral-600 w-8">{range.min}</span>
        <input type="range" min={range.min} max={range.max} step={1} value={currentSlice}
          onChange={(e) => setSliceIdx(parseInt(e.target.value))}
          className="flex-1 h-1 appearance-none bg-neutral-800 rounded-full cursor-pointer accent-red-500" />
        <span className="text-[7px] text-neutral-600 w-8 text-right">{range.max}</span>
      </div>

      <div className="mt-1 flex items-center gap-2">
        <span className="text-[7px] text-neutral-600 w-14">Threshold</span>
        <input type="range" min={0} max={0.8} step={0.05} value={threshold}
          onChange={(e) => setThreshold(parseFloat(e.target.value))}
          className="flex-1 h-1 appearance-none bg-neutral-800 rounded-full cursor-pointer accent-red-500" />
        <span className="text-[7px] text-neutral-600 w-8 text-right">{threshold.toFixed(2)}</span>
      </div>
    </BracketFrame>
  );
}
