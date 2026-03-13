"use client";

import React, { useState, useEffect } from "react";
import { useHudColor } from "@/components/ui/hud-theme";
import HudCircularGauge from "@/components/ui/HudCircularGauge";
import HudRingGauge from "@/components/ui/HudRingGauge";
import HudLinearGauge from "@/components/ui/HudLinearGauge";
import HudVerticalBars from "@/components/ui/HudVerticalBars";
import HudStatDisplay from "@/components/ui/HudStatDisplay";
import HudWaveform from "@/components/ui/HudWaveform";
import HudDotMatrix from "@/components/ui/HudDotMatrix";
import HudTargetReticle from "@/components/ui/HudTargetReticle";

function SectionLabel({ children }: { children: React.ReactNode }) {
  const c = useHudColor();
  return (
    <div className="text-[10px] uppercase tracking-wide mb-4" style={{ color: c(0.4) }}>
      {children}
    </div>
  );
}

function SectionDivider({ title }: { title: string }) {
  const c = useHudColor();
  return (
    <div className="mt-12 pt-8 border-t border-white/5">
      <div className="text-[11px] uppercase tracking-widest mb-6" style={{ color: c(0.5) }}>
        {title}
      </div>
    </div>
  );
}

export default function HudComponentExamples() {
  const c = useHudColor();
  
  const [values, setValues] = useState({
    gauge1: 279,
    gauge2: 168,
    gauge3: 946,
    ring1: 75,
    ring2: 45,
    ring3: 88,
    linear1: 67,
    linear2: 82,
    bars: [65, 42, 78, 91, 55, 38, 72, 85],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setValues(prev => ({
        gauge1: Math.max(0, Math.min(999, prev.gauge1 + (Math.random() - 0.5) * 50)),
        gauge2: Math.max(0, Math.min(999, prev.gauge2 + (Math.random() - 0.5) * 40)),
        gauge3: Math.max(0, Math.min(999, prev.gauge3 + (Math.random() - 0.5) * 60)),
        ring1: Math.max(0, Math.min(100, prev.ring1 + (Math.random() - 0.5) * 10)),
        ring2: Math.max(0, Math.min(100, prev.ring2 + (Math.random() - 0.5) * 15)),
        ring3: Math.max(0, Math.min(100, prev.ring3 + (Math.random() - 0.5) * 8)),
        linear1: Math.max(0, Math.min(100, prev.linear1 + (Math.random() - 0.5) * 12)),
        linear2: Math.max(0, Math.min(100, prev.linear2 + (Math.random() - 0.5) * 10)),
        bars: prev.bars.map(v => Math.max(10, Math.min(100, v + (Math.random() - 0.5) * 20))),
      }));
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-10">
      {/* Circular Gauges */}
      <div>
        <SectionLabel>Circular Gauges — Primary Metrics</SectionLabel>
        <div className="flex items-end gap-8 flex-wrap">
          <HudCircularGauge value={values.gauge1} max={999} size={140} label="HEART" />
          <HudCircularGauge value={values.gauge2} max={999} size={120} label="RESP" strokeWidth={3} />
          <HudCircularGauge value={values.gauge3} max={999} size={160} label="NEURAL" strokeWidth={5} tickCount={32} />
          <HudCircularGauge value={56} max={100} size={100} label="O2 SAT" showTicks={false} />
        </div>
      </div>

      {/* Ring Gauges */}
      <div>
        <SectionLabel>Ring Gauges — Secondary Indicators</SectionLabel>
        <div className="flex items-end gap-6 flex-wrap">
          <HudRingGauge value={values.ring1} size={90} label="CPU" showValue />
          <HudRingGauge value={values.ring2} size={90} label="MEM" showValue variant="three-quarter" />
          <HudRingGauge value={values.ring3} size={90} label="NET" showPercentage />
          <div className="flex gap-3">
            <HudRingGauge value={62} size={50} strokeWidth={2} />
            <HudRingGauge value={78} size={50} strokeWidth={2} />
            <HudRingGauge value={45} size={50} strokeWidth={2} />
          </div>
          <div className="flex flex-col gap-2">
            <HudRingGauge value={85} size={40} strokeWidth={2} variant="half" />
            <HudRingGauge value={42} size={40} strokeWidth={2} variant="half" />
          </div>
        </div>
      </div>

      <SectionDivider title="Linear Gauges & Progress Bars" />

      {/* Linear Gauges */}
      <div className="grid grid-cols-2 gap-10">
        <div>
          <SectionLabel>Solid Linear Gauges</SectionLabel>
          <div className="space-y-4">
            <HudLinearGauge value={values.linear1} label="Alpha" width={250} height={10} />
            <HudLinearGauge value={values.linear2} label="Beta" width={250} height={10} />
            <HudLinearGauge value={45} label="Gamma" width={250} height={10} />
            <HudLinearGauge value={78} label="Delta" width={250} height={10} />
          </div>
        </div>

        <div>
          <SectionLabel>Segmented & Gradient Variants</SectionLabel>
          <div className="space-y-4">
            <HudLinearGauge value={72} label="Segments" width={250} height={12} variant="segmented" />
            <HudLinearGauge value={58} label="Gradient" width={250} height={12} variant="gradient" />
            <HudLinearGauge value={85} label="With Ticks" width={250} height={10} showTicks tickCount={10} />
            <HudLinearGauge value={33} label="Minimal" width={250} height={6} showValue={false} />
          </div>
        </div>
      </div>

      <SectionDivider title="Vertical Bar Charts" />

      {/* Vertical Bars */}
      <div className="grid grid-cols-3 gap-10">
        <div>
          <SectionLabel>Standard Bars</SectionLabel>
          <HudVerticalBars values={values.bars} height={100} barWidth={8} gap={4} />
        </div>

        <div>
          <SectionLabel>Compact Bars</SectionLabel>
          <HudVerticalBars values={[45, 72, 38, 91, 55, 68, 82, 47, 63, 75, 58, 84]} height={80} barWidth={5} gap={2} />
        </div>

        <div>
          <SectionLabel>With Labels</SectionLabel>
          <HudVerticalBars
            values={[753, 724, 651, 540]}
            max={1000}
            height={90}
            barWidth={12}
            gap={6}
            showLabels
            labels={["A", "B", "C", "D"]}
          />
        </div>
      </div>

      <SectionDivider title="Stat Displays" />

      {/* Stat Displays */}
      <div className="grid grid-cols-4 gap-8">
        <HudStatDisplay value={753} label="Total Events" sublabel="Last 24h" size="lg" />
        <HudStatDisplay value={724} label="Active" showIndicator indicatorColor="#22c55e" />
        <HudStatDisplay value={651} label="Pending" trend="up" trendValue={12} />
        <HudStatDisplay value="78.6" label="Efficiency" unit="%" trend="down" trendValue={3} />
      </div>

      <div className="grid grid-cols-6 gap-6 mt-6">
        <HudStatDisplay value={279} size="sm" label="HR" />
        <HudStatDisplay value={752} size="sm" label="BP" />
        <HudStatDisplay value={74} size="sm" label="Temp" unit="°" />
        <HudStatDisplay value={28} size="sm" label="RR" />
        <HudStatDisplay value={104} size="sm" label="SpO2" unit="%" />
        <HudStatDisplay value={142} size="sm" label="Glu" />
      </div>

      <SectionDivider title="Waveforms & Signal Displays" />

      {/* Waveforms */}
      <div className="grid grid-cols-2 gap-10">
        <div>
          <SectionLabel>Line Waveform</SectionLabel>
          <HudWaveform width={350} height={60} variant="line" frequency={3} amplitude={0.35} />
        </div>

        <div>
          <SectionLabel>Filled Waveform</SectionLabel>
          <HudWaveform width={350} height={60} variant="filled" frequency={2} amplitude={0.4} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-10 mt-6">
        <div>
          <SectionLabel>Bar Waveform</SectionLabel>
          <HudWaveform width={200} height={50} variant="bars" frequency={4} amplitude={0.3} />
        </div>

        <div>
          <SectionLabel>High Frequency</SectionLabel>
          <HudWaveform width={200} height={50} variant="line" frequency={6} amplitude={0.25} />
        </div>

        <div>
          <SectionLabel>Low Amplitude</SectionLabel>
          <HudWaveform width={200} height={50} variant="filled" frequency={2} amplitude={0.15} />
        </div>
      </div>

      <SectionDivider title="Dot Matrix Displays" />

      {/* Dot Matrix */}
      <div className="grid grid-cols-3 gap-10">
        <div>
          <SectionLabel>Wave Pattern</SectionLabel>
          <HudDotMatrix rows={8} cols={20} dotSize={5} gap={2} pattern="wave" />
        </div>

        <div>
          <SectionLabel>Pulse Pattern</SectionLabel>
          <HudDotMatrix rows={10} cols={10} dotSize={6} gap={3} pattern="pulse" />
        </div>

        <div>
          <SectionLabel>Random Pattern</SectionLabel>
          <HudDotMatrix rows={6} cols={24} dotSize={4} gap={2} pattern="random" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10 mt-6">
        <div>
          <SectionLabel>Large Matrix</SectionLabel>
          <HudDotMatrix rows={12} cols={32} dotSize={4} gap={1} pattern="wave" intensity={0.8} />
        </div>

        <div>
          <SectionLabel>Static Display</SectionLabel>
          <HudDotMatrix rows={8} cols={16} dotSize={6} gap={2} pattern="static" animated={false} />
        </div>
      </div>

      <SectionDivider title="Target Reticles & Indicators" />

      {/* Target Reticles */}
      <div className="flex items-start gap-10 flex-wrap">
        <div className="text-center">
          <SectionLabel>Crosshair</SectionLabel>
          <HudTargetReticle size={120} variant="crosshair" label="Target A" value={279} />
        </div>

        <div className="text-center">
          <SectionLabel>Bracket</SectionLabel>
          <HudTargetReticle size={120} variant="bracket" label="Target B" value={168} />
        </div>

        <div className="text-center">
          <SectionLabel>Circle</SectionLabel>
          <HudTargetReticle size={120} variant="circle" label="Target C" value={946} />
        </div>

        <div className="text-center">
          <SectionLabel>Diamond</SectionLabel>
          <HudTargetReticle size={120} variant="diamond" label="Target D" value={67} />
        </div>
      </div>

      <div className="flex items-start gap-6 mt-6 flex-wrap">
        <HudTargetReticle size={80} variant="crosshair" showCorners={false} />
        <HudTargetReticle size={80} variant="bracket" />
        <HudTargetReticle size={80} variant="circle" showCenter={false} />
        <HudTargetReticle size={80} variant="diamond" />
        <HudTargetReticle size={60} variant="crosshair" />
        <HudTargetReticle size={60} variant="bracket" />
      </div>

      <SectionDivider title="Combined Dashboard Layout" />

      {/* Combined Dashboard */}
      <div className="p-6 rounded-lg" style={{ background: "rgba(0, 200, 220, 0.02)", border: `1px solid ${c(0.1)}` }}>
        <div className="grid grid-cols-12 gap-6">
          {/* Left column - main gauges */}
          <div className="col-span-3 flex flex-col items-center gap-4">
            <HudCircularGauge value={values.gauge1} max={999} size={130} label="PRIMARY" />
            <div className="flex gap-3">
              <HudRingGauge value={values.ring1} size={60} strokeWidth={2} />
              <HudRingGauge value={values.ring2} size={60} strokeWidth={2} />
            </div>
            <HudVerticalBars values={values.bars.slice(0, 4)} height={60} barWidth={10} gap={4} />
          </div>

          {/* Center - stats and waveforms */}
          <div className="col-span-6 space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <HudStatDisplay value={753} size="sm" label="Events" />
              <HudStatDisplay value={724} size="sm" label="Active" showIndicator indicatorColor="#22c55e" />
              <HudStatDisplay value={651} size="sm" label="Queue" />
              <HudStatDisplay value="98.2" size="sm" label="Uptime" unit="%" />
            </div>
            
            <HudWaveform width={500} height={50} variant="filled" frequency={3} amplitude={0.3} />
            
            <div className="grid grid-cols-2 gap-4">
              <HudLinearGauge value={values.linear1} label="Channel A" width={220} height={8} />
              <HudLinearGauge value={values.linear2} label="Channel B" width={220} height={8} />
            </div>
            
            <HudDotMatrix rows={6} cols={40} dotSize={4} gap={1} pattern="wave" />
          </div>

          {/* Right column - secondary displays */}
          <div className="col-span-3 flex flex-col items-center gap-4">
            <HudTargetReticle size={100} variant="bracket" value={values.gauge3.toFixed(0)} />
            <div className="flex gap-2">
              <HudRingGauge value={62} size={45} strokeWidth={2} variant="three-quarter" />
              <HudRingGauge value={78} size={45} strokeWidth={2} variant="three-quarter" />
              <HudRingGauge value={45} size={45} strokeWidth={2} variant="three-quarter" />
            </div>
            <HudLinearGauge value={72} width={150} height={10} variant="segmented" showValue={false} />
            <HudWaveform width={150} height={40} variant="bars" frequency={4} amplitude={0.35} />
          </div>
        </div>
      </div>
    </div>
  );
}
