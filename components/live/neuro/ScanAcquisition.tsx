"use client";

import { useState, useCallback } from "react";
import { captureBrainSnapshot, snapshotSummary } from "@/lib/brain-snapshot";
import { saveScanStudy, generateStudyId, type ScanModality, type ScanStudy } from "@/lib/scan-store";
import { loadVolume, extractSlice, type LoadedVolume } from "@/lib/volume-atlas";

interface ScanAcquisitionProps {
  open: boolean;
  onClose: () => void;
  onAcquired: (study: ScanStudy) => void;
}

const KEY_AXIAL_SLICES = [50, 80, 96, 110, 140];
const KEY_SAGITTAL_SLICES = [96];
const KEY_CORONAL_SLICES = [114];

async function renderThumbnail(vol: LoadedVolume, plane: "axial" | "sagittal" | "coronal", sliceIdx: number): Promise<string> {
  const { pixels, width, height } = extractSlice(vol, plane, sliceIdx);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
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
  return canvas.toDataURL("image/jpeg", 0.7);
}

export default function ScanAcquisition({ open, onClose, onAcquired }: ScanAcquisitionProps) {
  const [modality, setModality] = useState<ScanModality>("MRI");
  const [indication, setIndication] = useState("");
  const [acquiring, setAcquiring] = useState(false);

  const handleAcquire = useCallback(async () => {
    setAcquiring(true);
    try {
      const snapshot = captureBrainSnapshot();
      const t1 = await loadVolume("t1");

      const axialThumbs = await Promise.all(
        KEY_AXIAL_SLICES.map((s) => renderThumbnail(t1, "axial", s))
      );
      const sagittalThumbs = await Promise.all(
        KEY_SAGITTAL_SLICES.map((s) => renderThumbnail(t1, "sagittal", s))
      );
      const coronalThumbs = await Promise.all(
        KEY_CORONAL_SLICES.map((s) => renderThumbnail(t1, "coronal", s))
      );

      const study: ScanStudy = {
        id: generateStudyId(),
        createdAt: snapshot.capturedAt,
        modality,
        indication: indication.trim(),
        snapshot,
        thumbnails: {
          axial: axialThumbs,
          sagittal: sagittalThumbs,
          coronal: coronalThumbs,
        },
      };

      await saveScanStudy(study);
      onAcquired(study);
      setIndication("");
      onClose();
    } catch (err) {
      console.error("Scan acquisition failed:", err);
    } finally {
      setAcquiring(false);
    }
  }, [modality, indication, onClose, onAcquired]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-10000 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-[#0c0c0c] border border-[#222] rounded-lg p-6 w-[380px]"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        <h3 className="text-[13px] font-bold mb-4" style={{ color: "#00c8dc" }}>Acquire Brain Scan</h3>

        <div className="space-y-4">
          <div>
            <label className="text-[9px] uppercase tracking-wider block mb-1.5" style={{ color: "#555" }}>Modality</label>
            <div className="flex gap-1">
              {(["MRI", "CT", "PET", "fMRI", "Full Protocol"] as ScanModality[]).map((m) => (
                <button key={m} onClick={() => setModality(m)}
                  className="text-[10px] px-2.5 py-1 rounded transition-colors"
                  style={{
                    color: modality === m ? "#00c8dc" : "#444",
                    background: modality === m ? "#00c8dc15" : "#111",
                    border: `1px solid ${modality === m ? "#00c8dc30" : "#1a1a1a"}`,
                  }}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[9px] uppercase tracking-wider block mb-1.5" style={{ color: "#555" }}>
              Clinical Indication (optional)
            </label>
            <input
              type="text"
              value={indication}
              onChange={(e) => setIndication(e.target.value)}
              placeholder="e.g., Routine monitoring, Elevated cortisol observed"
              className="w-full bg-[#111] border border-[#222] rounded px-3 py-2 text-[11px] text-[#aaa] placeholder-[#333] focus:outline-none focus:border-[#00c8dc30]"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button onClick={onClose}
              className="text-[10px] px-4 py-1.5 rounded text-[#555] hover:text-white transition-colors">
              Cancel
            </button>
            <button onClick={handleAcquire} disabled={acquiring}
              className="text-[10px] px-5 py-1.5 rounded font-bold transition-colors disabled:opacity-50"
              style={{ color: "#000", background: "#00c8dc" }}>
              {acquiring ? "Acquiring..." : "Acquire Scan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
