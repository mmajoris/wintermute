"use client";

import { useLiveStore } from "@/lib/live-store";
import { useHudColor } from "@/components/ui/hud-theme";
import { BracketFrame, HudSectionTitle } from "../BracketFrame";

interface CascadeBarProps {
  label: string;
  abbr: string;
  value: number;
  color: string;
  unit: string;
  refRange: string;
}

function CascadeBar({ label, abbr, value, color, unit, refRange }: CascadeBarProps) {
  const c = useHudColor();
  const pct = Math.min(value * 100, 100);
  const isHigh = value > 0.7;
  const isLow = value < 0.15;

  return (
    <div className="flex items-center gap-2 py-1">
      <div className="w-9 shrink-0 text-right">
        <div className="text-[9px] font-bold" style={{ color }}>{abbr}</div>
        <div className="text-[6px]" style={{ color: `${color}66` }}>{label}</div>
      </div>
      <div className="flex-1 h-3 rounded-sm overflow-hidden relative" style={{ background: c(0.05) }}>
        <div
          className="h-full rounded-sm transition-all duration-1000"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}40, ${color}cc)`,
            boxShadow: isHigh ? `0 0 8px ${color}60` : "none",
          }}
        />
        {/* Reference range markers */}
        <div className="absolute top-0 bottom-0 w-px opacity-30" style={{ left: "15%", background: "#ffffff" }} />
        <div className="absolute top-0 bottom-0 w-px opacity-30" style={{ left: "70%", background: "#ffffff" }} />
      </div>
      <div className="w-12 shrink-0 text-right">
        <span className="text-[9px] font-mono" style={{ color: isHigh ? "#ef4444" : isLow ? "#3b82f6" : `${color}aa` }}>
          {(value * 100).toFixed(0)}
        </span>
        <span className="text-[7px] ml-0.5" style={{ color: "#ffffff25" }}>{unit}</span>
      </div>
      <div className="w-14 shrink-0">
        <span className="text-[6px]" style={{ color: "#ffffff20" }}>{refRange}</span>
      </div>
    </div>
  );
}

function ReceptorGauge({ label, value, color }: { label: string; value: number; color: string }) {
  const pct = Math.min(value * 100, 100);
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[7px] w-6 text-right" style={{ color: `${color}88` }}>{label}</span>
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#ffffff08" }}>
        <div className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-[7px] font-mono w-6" style={{ color: `${color}aa` }}>{pct.toFixed(0)}%</span>
    </div>
  );
}

export default function HPAAxisPanel() {
  const hpa = useLiveStore((s) => s.hpaAxisState);
  const endorphin = useLiveStore((s) => s.endorphinDynamics);
  const connected = useLiveStore((s) => s.eventsPerSecond > 0);

  const online = connected && (hpa !== null || endorphin !== null);

  return (
    <BracketFrame variant="detail-3" className="p-3 flex flex-col overflow-hidden">
      <HudSectionTitle>HPA Axis & Stress Panel</HudSectionTitle>

      {!online ? (
        <div className="mt-3 text-[10px] text-neutral-600">
          {connected ? "Awaiting HPA data..." : "Offline"}
        </div>
      ) : (
        <div className="mt-2 space-y-1">
          {/* Cascade flow indicator */}
          <div className="flex items-center gap-1 mb-2">
            <svg width="100%" height="24" viewBox="0 0 280 24">
              <defs>
                <marker id="fb-arrow" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                  <path d="M 0 0 L 4 2 L 0 4 Z" fill="#ef4444" opacity="0.5" />
                </marker>
              </defs>
              {/* Flow: Hypothalamus → Pituitary → Adrenal */}
              <rect x="4" y="4" width="70" height="16" rx="2" fill="#6366f115" stroke="#6366f140" strokeWidth="0.5" />
              <text x="39" y="14" textAnchor="middle" fill="#6366f1cc" fontSize="6" fontWeight="bold"
                fontFamily="'IBM Plex Mono', monospace">HYPOTHALAMUS</text>

              <line x1="76" y1="12" x2="98" y2="12" stroke="#ffffff20" strokeWidth="0.8" markerEnd="url(#fb-arrow)" />
              <text x="87" y="8" textAnchor="middle" fill="#ffffff30" fontSize="4.5"
                fontFamily="'IBM Plex Mono', monospace">CRH</text>

              <rect x="100" y="4" width="60" height="16" rx="2" fill="#ec489915" stroke="#ec489940" strokeWidth="0.5" />
              <text x="130" y="14" textAnchor="middle" fill="#ec4899cc" fontSize="6" fontWeight="bold"
                fontFamily="'IBM Plex Mono', monospace">PITUITARY</text>

              <line x1="162" y1="12" x2="184" y2="12" stroke="#ffffff20" strokeWidth="0.8" markerEnd="url(#fb-arrow)" />
              <text x="173" y="8" textAnchor="middle" fill="#ffffff30" fontSize="4.5"
                fontFamily="'IBM Plex Mono', monospace">ACTH</text>

              <rect x="186" y="4" width="56" height="16" rx="2" fill="#ef444415" stroke="#ef444440" strokeWidth="0.5" />
              <text x="214" y="14" textAnchor="middle" fill="#ef4444cc" fontSize="6" fontWeight="bold"
                fontFamily="'IBM Plex Mono', monospace">ADRENAL</text>

              {/* Feedback arrow */}
              <path d="M 214 22 Q 214 30, 130 30 Q 39 30, 39 22" fill="none" stroke="#ef444440"
                strokeWidth="0.6" strokeDasharray="1.5,2" />
              <text x="130" y="34" textAnchor="middle" fill="#ef444455" fontSize="4"
                fontFamily="'IBM Plex Mono', monospace">negative feedback</text>
            </svg>
          </div>

          {/* Hormone levels */}
          <CascadeBar label="CRH" abbr="CRH" value={hpa?.crh ?? 0} color="#6366f1"
            unit="%" refRange="15-70%" />
          <CascadeBar label="ACTH" abbr="ACTH" value={hpa?.acth ?? 0} color="#ec4899"
            unit="%" refRange="10-60%" />
          <CascadeBar label="Cortisol" abbr="CORT" value={hpa?.cortisol ?? 0} color="#ef4444"
            unit="%" refRange="15-70%" />
          <CascadeBar label="NPY" abbr="NPY" value={hpa?.npy ?? 0} color="#22c55e"
            unit="%" refRange="20-60%" />

          {/* Receptor Occupancy */}
          <div className="mt-2 pt-2" style={{ borderTop: "1px solid #ffffff08" }}>
            <div className="text-[8px] uppercase tracking-wider mb-1.5" style={{ color: "#ffffff30" }}>
              Receptor Occupancy
            </div>
            <ReceptorGauge label="MR" value={hpa?.mr_occupancy ?? 0} color="#3b82f6" />
            <ReceptorGauge label="GR" value={hpa?.gr_occupancy ?? 0} color="#8b5cf6" />
          </div>

          {/* Feedback & Chronic Load */}
          <div className="mt-2 pt-2 flex gap-3" style={{ borderTop: "1px solid #ffffff08" }}>
            <div className="flex-1">
              <div className="text-[7px] uppercase tracking-wider" style={{ color: "#ffffff25" }}>Feedback Gain</div>
              <div className="text-[11px] font-mono mt-0.5" style={{
                color: (hpa?.feedback_gain ?? 1) < 0.5 ? "#ef4444" : (hpa?.feedback_gain ?? 1) > 1.5 ? "#fbbf24" : "#34d399"
              }}>
                {(hpa?.feedback_gain ?? 1).toFixed(2)}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-[7px] uppercase tracking-wider" style={{ color: "#ffffff25" }}>Chronic Load</div>
              <div className="text-[11px] font-mono mt-0.5" style={{
                color: (hpa?.chronic_load ?? 0) > 0.7 ? "#ef4444" : (hpa?.chronic_load ?? 0) > 0.4 ? "#fbbf24" : "#34d399"
              }}>
                {((hpa?.chronic_load ?? 0) * 100).toFixed(0)}%
              </div>
            </div>
          </div>

          {/* Endorphin Dynamics */}
          {endorphin && (
            <div className="mt-2 pt-2" style={{ borderTop: "1px solid #ffffff08" }}>
              <div className="text-[8px] uppercase tracking-wider mb-1.5" style={{ color: "#f59e0b60" }}>
                PAG Endorphin System
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <div className="text-[7px] uppercase" style={{ color: "#ffffff20" }}>Level</div>
                  <div className="h-2 mt-0.5 rounded-full overflow-hidden" style={{ background: "#ffffff08" }}>
                    <div className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${endorphin.level * 100}%`, background: "#f59e0b" }} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-[7px] uppercase" style={{ color: "#ffffff20" }}>Effort</div>
                  <div className="h-2 mt-0.5 rounded-full overflow-hidden" style={{ background: "#ffffff08" }}>
                    <div className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${endorphin.effort * 100}%`, background: "#fb923c" }} />
                  </div>
                </div>
                <div className="w-16 text-center">
                  <div className="text-[7px] uppercase" style={{ color: "#ffffff20" }}>Refractory</div>
                  <div className="text-[10px] font-mono mt-0.5" style={{
                    color: endorphin.refractory > 0.5 ? "#ef4444aa" : "#34d399aa"
                  }}>
                    {endorphin.refractory > 0.5 ? "REFRAC" : "READY"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </BracketFrame>
  );
}
