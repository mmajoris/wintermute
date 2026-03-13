"use client";

import React from "react";
import HudBarChart, { BarData } from "@/components/ui/HudBarChart";
import { useHudColor } from "@/components/ui/hud-theme";

const systemMetrics: BarData[] = [
  { label: "CPU Load", value: 78 },
  { label: "Memory", value: 64 },
  { label: "Network I/O", value: 45 },
  { label: "Disk Usage", value: 82 },
  { label: "GPU Util", value: 91 },
  { label: "Threads", value: 56 },
];

const neuralRegions: BarData[] = [
  { label: "Prefrontal Cortex", value: 0.89 },
  { label: "Hippocampus", value: 0.72 },
  { label: "Amygdala", value: 0.34 },
  { label: "Thalamus", value: 0.61 },
  { label: "Cerebellum", value: 0.45 },
  { label: "Brain Stem", value: 0.28 },
  { label: "Basal Ganglia", value: 0.53 },
  { label: "Occipital Lobe", value: 0.67 },
];

const signalStrength: BarData[] = [
  { label: "Alpha", value: 12.4 },
  { label: "Beta", value: 8.7 },
  { label: "Gamma", value: 3.2 },
  { label: "Delta", value: 18.9 },
  { label: "Theta", value: 6.1 },
];

const processLoad: BarData[] = [
  { label: "wintermute.core", value: 234 },
  { label: "neural.sync", value: 189 },
  { label: "mem.allocator", value: 156 },
  { label: "io.stream", value: 98 },
  { label: "render.pipe", value: 267 },
  { label: "data.cache", value: 145 },
  { label: "net.handler", value: 78 },
  { label: "log.daemon", value: 34 },
  { label: "task.scheduler", value: 201 },
  { label: "gc.sweep", value: 112 },
];

const connectionLatency: BarData[] = [
  { label: "Node A", value: 12 },
  { label: "Node B", value: 8 },
  { label: "Node C", value: 23 },
  { label: "Node D", value: 5 },
  { label: "Node E", value: 31 },
  { label: "Node F", value: 14 },
  { label: "Node G", value: 9 },
];

const memoryAllocation: BarData[] = [
  { label: "Heap", value: 2048 },
  { label: "Stack", value: 512 },
  { label: "Static", value: 256 },
  { label: "Shared", value: 1024 },
  { label: "Cache L1", value: 64 },
  { label: "Cache L2", value: 256 },
  { label: "Cache L3", value: 1536 },
  { label: "Virtual", value: 4096 },
  { label: "Mapped", value: 768 },
  { label: "Reserved", value: 2560 },
  { label: "Committed", value: 3200 },
  { label: "Available", value: 1280 },
];

const synapticDensity: BarData[] = [
  { label: "Layer I", value: 0.12 },
  { label: "Layer II", value: 0.34 },
  { label: "Layer III", value: 0.67 },
  { label: "Layer IV", value: 0.89 },
  { label: "Layer V", value: 0.78 },
  { label: "Layer VI", value: 0.45 },
  { label: "White Matter", value: 0.23 },
  { label: "Dendrites", value: 0.91 },
  { label: "Axons", value: 0.56 },
  { label: "Soma", value: 0.38 },
  { label: "Synaptic Cleft", value: 0.82 },
  { label: "Vesicles", value: 0.64 },
  { label: "Receptors", value: 0.73 },
  { label: "Ion Channels", value: 0.95 },
  { label: "Mitochondria", value: 0.41 },
  { label: "Ribosomes", value: 0.29 },
  { label: "Golgi", value: 0.18 },
  { label: "ER", value: 0.52 },
];

const networkThroughput: BarData[] = [
  { label: "eth0", value: 847 },
  { label: "eth1", value: 234 },
  { label: "lo", value: 1200 },
  { label: "wlan0", value: 156 },
  { label: "docker0", value: 89 },
  { label: "br-net", value: 445 },
  { label: "veth0", value: 312 },
  { label: "tun0", value: 67 },
];

const corticalActivity: BarData[] = [
  { label: "Frontal", value: 0.82 },
  { label: "Parietal", value: 0.67 },
  { label: "Temporal", value: 0.91 },
  { label: "Occipital", value: 0.45 },
  { label: "Insular", value: 0.38 },
  { label: "Limbic", value: 0.73 },
  { label: "Motor", value: 0.56 },
  { label: "Sensory", value: 0.84 },
  { label: "Association", value: 0.62 },
  { label: "Prefrontal", value: 0.95 },
  { label: "Cingulate", value: 0.41 },
  { label: "Entorhinal", value: 0.29 },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  const c = useHudColor();
  return (
    <div className="text-[10px] uppercase tracking-wide mb-3" style={{ color: c(0.4) }}>
      {children}
    </div>
  );
}

export default function BarChartExamples() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 gap-10">
        <div>
          <SectionLabel>System Metrics</SectionLabel>
          <HudBarChart data={systemMetrics} showValues barHeight={14} barGap={8} />
        </div>

        <div>
          <SectionLabel>Neural Region Activity</SectionLabel>
          <HudBarChart data={neuralRegions} barHeight={10} barGap={5} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-10">
        <div>
          <SectionLabel>Signal Strength (μV)</SectionLabel>
          <HudBarChart data={signalStrength} showValues barHeight={16} barGap={10} />
        </div>

        <div>
          <SectionLabel>Process Load (ms)</SectionLabel>
          <HudBarChart data={processLoad} barHeight={8} barGap={4} />
        </div>

        <div>
          <SectionLabel>Connection Latency (ms)</SectionLabel>
          <HudBarChart data={connectionLatency} showValues barHeight={12} barGap={6} />
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-white/5">
        <div className="text-[11px] uppercase tracking-widest mb-6" style={{ color: "rgba(0, 200, 220, 0.5)" }}>
          Extended Bar Chart Examples
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div>
            <SectionLabel>Memory Allocation (MB)</SectionLabel>
            <HudBarChart
              data={memoryAllocation}
              showValues
              barHeight={10}
              barGap={3}
              showGridLines
              gridLineCount={5}
            />
          </div>

          <div>
            <SectionLabel>Synaptic Density Distribution</SectionLabel>
            <HudBarChart
              data={synapticDensity}
              barHeight={8}
              barGap={2}
              showGridLines
              gridLineCount={4}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 mt-10">
          <div>
            <SectionLabel>Network Throughput (Mbps)</SectionLabel>
            <HudBarChart
              data={networkThroughput}
              showValues
              barHeight={14}
              barGap={6}
              showGridLines
              gridLineCount={6}
            />
          </div>

          <div>
            <SectionLabel>Cortical Activity Index</SectionLabel>
            <HudBarChart
              data={corticalActivity}
              barHeight={9}
              barGap={3}
              showGridLines
              gridLineCount={5}
            />
          </div>
        </div>

        <div className="mt-10">
          <SectionLabel>Combined System Overview</SectionLabel>
          <HudBarChart
            data={[
              ...processLoad.slice(0, 5),
              ...memoryAllocation.slice(0, 5).map(d => ({ ...d, value: d.value / 40 })),
            ]}
            showValues
            barHeight={11}
            barGap={4}
            showGridLines
            gridLineCount={8}
          />
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-white/5">
        <div className="text-[11px] uppercase tracking-widest mb-6" style={{ color: "rgba(0, 200, 220, 0.5)" }}>
          Glitch / Artifact Styles
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div>
            <SectionLabel>Noise Artifacts</SectionLabel>
            <HudBarChart
              data={synapticDensity}
              barHeight={9}
              barGap={3}
              glitch="noise"
              glitchIntensity={0.7}
            />
          </div>

          <div>
            <SectionLabel>Segmented / Broken</SectionLabel>
            <HudBarChart
              data={processLoad}
              barHeight={10}
              barGap={4}
              glitch="segments"
              glitchIntensity={0.8}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 mt-10">
          <div>
            <SectionLabel>Interference Lines</SectionLabel>
            <HudBarChart
              data={memoryAllocation}
              barHeight={8}
              barGap={2}
              glitch="interference"
              glitchIntensity={0.6}
            />
          </div>

          <div>
            <SectionLabel>Corrupt Data</SectionLabel>
            <HudBarChart
              data={corticalActivity}
              barHeight={10}
              barGap={3}
              glitch="corrupt"
              glitchIntensity={0.9}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-10 mt-10">
          <div>
            <SectionLabel>Light Noise</SectionLabel>
            <HudBarChart
              data={signalStrength}
              barHeight={14}
              barGap={6}
              glitch="noise"
              glitchIntensity={0.3}
              showValues
            />
          </div>

          <div>
            <SectionLabel>Heavy Segments</SectionLabel>
            <HudBarChart
              data={connectionLatency}
              barHeight={12}
              barGap={5}
              glitch="segments"
              glitchIntensity={1.0}
            />
          </div>

          <div>
            <SectionLabel>Mixed Corrupt</SectionLabel>
            <HudBarChart
              data={networkThroughput}
              barHeight={11}
              barGap={4}
              glitch="corrupt"
              glitchIntensity={0.5}
              showGridLines
              gridLineCount={4}
            />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="text-[11px] uppercase tracking-widest mb-6" style={{ color: "rgba(255, 80, 80, 0.5)" }}>
            Critical System Failure — Data Corruption Detected
          </div>

          <div className="grid grid-cols-3 gap-10">
            <div>
              <SectionLabel>Memory Fault</SectionLabel>
              <HudBarChart
                data={memoryAllocation}
                barHeight={10}
                barGap={2}
                glitch="corrupt"
                glitchIntensity={1.5}
              />
            </div>

            <div>
              <SectionLabel>Signal Degradation</SectionLabel>
              <HudBarChart
                data={synapticDensity}
                barHeight={8}
                barGap={2}
                glitch="noise"
                glitchIntensity={1.8}
              />
            </div>

            <div>
              <SectionLabel>Sector Damage</SectionLabel>
              <HudBarChart
                data={processLoad}
                barHeight={9}
                barGap={3}
                glitch="catastrophic"
                glitchIntensity={3.0}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 mt-10">
            <div>
              <SectionLabel>Cascade Failure</SectionLabel>
              <HudBarChart
                data={corticalActivity}
                barHeight={11}
                barGap={3}
                glitch="interference"
                glitchIntensity={2.5}
              />
            </div>

            <div>
              <SectionLabel>Total System Collapse</SectionLabel>
              <HudBarChart
                data={[
                  ...networkThroughput,
                  ...connectionLatency,
                ]}
                barHeight={9}
                barGap={2}
                glitch="corrupt"
                glitchIntensity={3.0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
