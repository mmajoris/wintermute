"use client";

import { useCallback, useMemo, useRef, useEffect } from "react";
import { useLiveStore, getFilteredEvents } from "@/lib/live-store";
import { BRAIN_MODEL_REGISTRY } from "@/lib/brain-model-loader";
import type { BrainEvent } from "@/lib/brain-events";
import { BracketFrame, HudDivider, HudSectionTitle } from "./BracketFrame";
import LiveStatsPanel from "./LiveStatsPanel";
import NeuralActivityRenderer from "@/components/examples/NeuralActivityRenderer";
import { RadialPanel, TracesPanel } from "./NeurotransmitterPanels";
import NeurochemistryPanel from "./NeurochemistryPanel";
import EEGDisplay from "./neuro/EEGDisplay";
import BrainTopography from "./neuro/BrainTopography";
import HPAAxisPanel from "./neuro/HPAAxisPanel";
import AffectCircuitsPanel from "./neuro/AffectCircuitsPanel";
import DopaminePanel from "./neuro/DopaminePanel";
import CircadianPanel from "./neuro/CircadianPanel";
import CognitivePanel from "./neuro/CognitivePanel";
import MRIViewer from "./neuro/MRIViewer";
import CTScanViewer from "./neuro/CTScanViewer";
import PETScanViewer from "./neuro/PETScanViewer";
import FMRIViewer from "./neuro/fMRIViewer";
import StudyBrowserPanel from "./neuro/StudyBrowser";
import GlobalWorkspacePanel from "./neuro/GlobalWorkspacePanel";
import ExecutiveControlPanel from "./neuro/ExecutiveControlPanel";
import DecisionStrategyPanel from "./neuro/DecisionStrategyPanel";
import SocialBrainPanel from "./neuro/SocialBrainPanel";
import CerebellarSystemPanel from "./neuro/CerebellarPanel";

// ── Individual panel components ────────────────────────────────────────────

function CognitiveStatePanel() {
  const { activeProcesses, lastThalamicGate, lastCascade } = useLiveStore();
  return (
    <BracketFrame variant="detail-3" className="p-4 overflow-hidden shrink-0 flex flex-col">
      <HudSectionTitle>Cognitive State</HudSectionTitle>
      <div className="mt-2 space-y-1.5">
        {activeProcesses.length === 0 && !lastThalamicGate && !lastCascade && (
          <div className="text-[11px] text-neutral-600">No active processes</div>
        )}
        {activeProcesses.map((proc) => (
          <div key={proc.name} className="flex items-center gap-2 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-300">{proc.name}</span>
            {proc.tier && <span className="text-neutral-600 text-[10px] ml-auto">{proc.tier}</span>}
          </div>
        ))}
        {lastThalamicGate && (
          <div className="flex items-center gap-2 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: lastThalamicGate.gate_open ? "#22c55e" : "#525252" }} />
            <span className="text-neutral-400">Thalamic gate</span>
            <span className={lastThalamicGate.gate_open ? "text-emerald-400 ml-auto" : "text-neutral-600 ml-auto"}>
              {lastThalamicGate.gate_open ? "open" : "closed"}
            </span>
          </div>
        )}
        {lastCascade && (
          <div className="flex items-center gap-2 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span className="text-neutral-400">Hippocampal cascade</span>
            <span className="text-teal-400 ml-auto">{lastCascade.total_activated}</span>
          </div>
        )}
      </div>
    </BracketFrame>
  );
}

const MONITORED_REGIONS = [
  "thalamus", "hippocampus", "amygdala", "hypothalamus",
  "caudate-nucleus", "putamen", "nucleus-accumbens", "substantia-nigra",
  "midbrain", "pons", "medulla",
  "cerebellum", "left-hemisphere", "right-hemisphere",
];

function RegionsPanel() {
  const { regionActivity, selectRegion, selectedRegionId } = useLiveStore();
  return (
    <BracketFrame variant="combo-d" className="p-4 overflow-hidden flex-1 min-h-32 flex flex-col">
      <HudSectionTitle>Neural Regions</HudSectionTitle>
      <div className="mt-2 flex-1 min-h-0 overflow-y-auto hud-scrollbar space-y-0.5">
        {MONITORED_REGIONS.map((regionId) => {
          const region = BRAIN_MODEL_REGISTRY.find((r) => r.id === regionId);
          if (!region) return null;
          const activity = regionActivity.get(regionId);
          const intensity = activity?.intensity ?? 0;
          const isActive = intensity > 0.05;
          const isSelected = selectedRegionId === regionId;
          return (
            <button key={regionId}
              onClick={() => selectRegion(isSelected ? null : regionId)}
              className="w-full flex items-center gap-2 text-[11px] rounded px-1 py-0.5 transition-colors"
              style={{
                backgroundColor: isSelected ? `${region.color}15` : undefined,
                boxShadow: isSelected ? `inset 2px 0 0 ${region.color}` : undefined,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-500"
                style={{
                  backgroundColor: isSelected ? region.color : isActive ? region.color : `${region.color}30`,
                  boxShadow: isSelected || isActive ? `0 0 6px ${region.color}80` : "none",
                }}
              />
              <span className="truncate transition-colors duration-500"
                style={{ color: isSelected ? "#ffffff" : isActive ? "#d4d4d4" : "#525252" }}
              >
                {region.name}
              </span>
              <div className="ml-auto w-10 h-1 rounded-full overflow-hidden shrink-0"
                style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
              >
                <div className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.max(intensity * 100, 0)}%`,
                    backgroundColor: region.color,
                    opacity: isActive ? 1 : 0,
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </BracketFrame>
  );
}

function SynapticActivityPanel() {
  const subscribeFire = useCallback((fire: () => void) => {
    let prev = useLiveStore.getState().totalEventCount;
    return useLiveStore.subscribe((state) => {
      const curr = state.totalEventCount;
      if (curr !== prev) {
        const diff = curr - prev;
        prev = curr;
        for (let i = 0; i < diff; i++) fire();
      }
    });
  }, []);

  return (
    <BracketFrame variant="detail-3" className="px-4 py-4 overflow-hidden shrink-0 flex flex-col" style={{ height: 220 }}>
      <HudSectionTitle>Synaptic Activity</HudSectionTitle>
      <div className="relative -mx-4 flex-1 flex items-center justify-center">
        <NeuralActivityRenderer onSubscribe={subscribeFire} />
      </div>
    </BracketFrame>
  );
}

function formatTimestamp(ts: string): string {
  return new Date(ts).toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function formatDuration(ms: number): string {
  return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
}

function EventIcon({ type }: { type: BrainEvent["type"] }) {
  const icons: Partial<Record<BrainEvent["type"], { icon: string; color: string }>> = {
    thought_loop_tick: { icon: "\u25C9", color: "#818cf8" },
    collection_activity: { icon: "\u25C6", color: "#22c55e" },
    worker_activity: { icon: "\u2699", color: "#f59e0b" },
    queue_metrics: { icon: "\u25A4", color: "#06b6d4" },
    emotional_state: { icon: "\u2665", color: "#ec4899" },
    soul_cycle: { icon: "\u2727", color: "#a78bfa" },
    action_dispatch: { icon: "\u2192", color: "#fb923c" },
    action_monitoring: { icon: "\u2316", color: "#fb923c" },
    system_vitals: { icon: "\u2661", color: "#ef4444" },
    budget_status: { icon: "$", color: "#eab308" },
    memory_event: { icon: "\u25C7", color: "#14b8a6" },
    reward_signal: { icon: "\u2605", color: "#f472b6" },
    error_correction: { icon: "\u27F3", color: "#8b5cf6" },
    thalamic_gate: { icon: "\u2299", color: "#f97316" },
    hippocampal_cascade: { icon: "\u25CE", color: "#14b8a6" },
    dentate_gyrus_neurogenesis: { icon: "\u2740", color: "#14b8a6" },
    directed_forgetting: { icon: "\u2298", color: "#ef4444" },
    source_monitoring: { icon: "\u2370", color: "#8b5cf6" },
    metamemory: { icon: "\u25C7", color: "#a78bfa" },
    metacognition: { icon: "\u25A3", color: "#a78bfa" },
    theory_of_mind: { icon: "\u263B", color: "#ec4899" },
    self_presentation: { icon: "\u2606", color: "#ec4899" },
    cognitive_empathy: { icon: "\u2661", color: "#ec4899" },
    social_learning: { icon: "\u2194", color: "#f472b6" },
    sense_of_agency: { icon: "\u27A1", color: "#818cf8" },
    llm_call: { icon: "\u29EB", color: "#60a5fa" },
    tool_execution: { icon: "\u2692", color: "#60a5fa" },
    neurochemistry_state: { icon: "\u2B21", color: "#34d399" },
    pfc_regulation: { icon: "\u25A8", color: "#8b5cf6" },
    bnst_state: { icon: "\u25A9", color: "#ef4444" },
    acc_state: { icon: "\u25A5", color: "#f59e0b" },
    salience_evaluation: { icon: "\u25C9", color: "#f97316" },
    time_perception: { icon: "\u231A", color: "#06b6d4" },
    vigilance: { icon: "\u25CE", color: "#fbbf24" },
    cognitive_fatigue: { icon: "\u25CF", color: "#ef4444" },
    autonomic_balance: { icon: "\u2194", color: "#22c55e" },
    network_switch: { icon: "\u21C4", color: "#818cf8" },
    expression_inhibition: { icon: "\u2718", color: "#ef4444" },
    interoception_signal: { icon: "\u25D0", color: "#f59e0b" },
    telegram_message: { icon: "\u2709", color: "#60a5fa" },
    basal_ganglia_strategy: { icon: "\u2699", color: "#f472b6" },
    value_comparison: { icon: "\u2696", color: "#fbbf24" },
    moral_reasoning: { icon: "\u2696", color: "#a78bfa" },
    cognitive_flexibility: { icon: "\u21BB", color: "#06b6d4" },
    cerebellar_prediction: { icon: "\u25C8", color: "#34d399" },
    statistical_learning: { icon: "\u2211", color: "#14b8a6" },
    prospective_memory: { icon: "\u25B7", color: "#06b6d4" },
    goal_plan: { icon: "\u2690", color: "#22c55e" },
    phenomenal_binding: { icon: "\u2A00", color: "#818cf8" },
    affect_circuits: { icon: "\u2665", color: "#f59e0b" },
    dopamine_state: { icon: "\u25C8", color: "#6366f1" },
    hpa_axis_state: { icon: "\u2318", color: "#ef4444" },
    endorphin_dynamics: { icon: "\u2736", color: "#f59e0b" },
    circadian_state: { icon: "\u25D4", color: "#06b6d4" },
    cortical_modulation_state: { icon: "\u25A3", color: "#8b5cf6" },
    oscillation_state: { icon: "\u223F", color: "#34d399" },
    homeostasis_state: { icon: "\u2261", color: "#22c55e" },
    drive_states: { icon: "\u27A4", color: "#ec4899" },
    mood_snapshot: { icon: "\u263A", color: "#fbbf24" },
    consolidation_stats: { icon: "\u29C9", color: "#14b8a6" },
    system_status: { icon: "\u23FB", color: "#22c55e" },
  };
  const { icon, color } = icons[type] ?? { icon: "\u2022", color: "#666" };
  return <span className="text-xs" style={{ color }}>{icon}</span>;
}

function EventSummary({ event }: { event: BrainEvent }) {
  switch (event.type) {
    case "thought_loop_tick": return <span>Thought tick {event.impulse && <span className="text-indigo-400">(impulse)</span>}</span>;
    case "collection_activity": return <span><span className="text-cyan-400 font-mono">{event.collection}</span> <span className="text-neutral-500">{event.operation}</span> <span className="text-neutral-400">&times;{event.count}</span></span>;
    case "worker_activity": return <span><span className="text-amber-400">{event.worker}</span> <span className={event.status === "completed" ? "text-emerald-500" : event.status === "failed" ? "text-red-500" : "text-neutral-500"}>{event.status}</span>{event.duration_ms && <span className="text-neutral-600 ml-1">{formatDuration(event.duration_ms)}</span>}</span>;
    case "queue_metrics": return <span><span className="text-cyan-400 font-mono">{event.queue}</span> <span className="text-neutral-500">{event.pending}p / {event.active}a</span></span>;
    case "emotional_state": return <span>Mood: <span className={event.valence > 0.3 ? "text-emerald-400" : event.valence < -0.3 ? "text-red-400" : "text-amber-400"}>{event.mood}</span></span>;
    case "soul_cycle": return <span>Soul cycle <span className="text-purple-400">{event.tier}</span> <span className="text-neutral-500">{event.status}</span></span>;
    case "action_dispatch": return <span>Action: <span className="text-orange-400">{event.action}</span> <span className="text-neutral-500">&rarr; {event.target}</span></span>;
    case "system_vitals": return <span>Vitals: CPU {event.cpu_percent.toFixed(0)}% / Mem {event.memory_percent.toFixed(0)}%</span>;
    case "memory_event": return <span>Memory <span className="text-teal-400">{event.operation}</span></span>;
    case "reward_signal": return <span>Reward: <span className={event.prediction_error > 0 ? "text-emerald-400" : "text-red-400"}>{event.prediction_error > 0 ? "+" : ""}{event.prediction_error.toFixed(2)}</span></span>;
    case "error_correction": return <span>Error correction: <span className="text-purple-400">{event.source}</span></span>;
    case "affect_circuits": return <span>Affect V:<span className={event.valence > 0.3 ? "text-emerald-400" : event.valence < -0.3 ? "text-red-400" : "text-amber-400"}>{event.valence.toFixed(2)}</span> A:{event.arousal.toFixed(2)}</span>;
    case "dopamine_state": return <span>DA tonic:{event.tonic.toFixed(2)} RPE:<span className={event.last_prediction_error > 0 ? "text-emerald-400" : "text-red-400"}>{event.last_prediction_error > 0 ? "+" : ""}{event.last_prediction_error.toFixed(3)}</span></span>;
    case "hpa_axis_state": return <span>HPA CORT:<span className={event.cortisol > 0.7 ? "text-red-400" : "text-amber-400"}>{(event.cortisol * 100).toFixed(0)}%</span> load:{(event.chronic_exposure * 100).toFixed(0)}%</span>;
    case "endorphin_dynamics": return <span>Endorphin: {(event.endorphin * 100).toFixed(0)}% {event.refractory_active ? <span className="text-red-400">refrac</span> : <span className="text-emerald-400">ready</span>}</span>;
    case "circadian_state": return <span>CT:{event.circadian_time_hours.toFixed(1)}h alert:{(event.alertness * 100).toFixed(0)}%</span>;
    case "cortical_modulation_state": return <span>PFC:{(event.prefrontal_contribution * 100).toFixed(0)}% err:{(event.error_rate * 100).toFixed(0)}%</span>;
    case "oscillation_state": return <span>EEG {event.populations.length}ch update</span>;
    case "homeostasis_state": return <span>Mode: <span className={event.mode === "homeostatic" ? "text-emerald-400" : event.mode === "allostatic_overload" ? "text-red-400" : "text-amber-400"}>{event.mode}</span></span>;
    case "drive_states": return <span>Drives seek:{(event.seeking_drive * 100).toFixed(0)}% social:{(event.social_drive * 100).toFixed(0)}%</span>;
    case "mood_snapshot": return <span>Mood V:{event.valence.toFixed(2)} A:{event.arousal.toFixed(2)} D:{event.dominance.toFixed(2)}</span>;
    case "consolidation_stats": return <span>Memory +{event.consolidated} -{event.forgotten} replay:{event.replay_boosted}</span>;
    case "system_status": return <span>System: <span className={event.status === "awake" ? "text-emerald-400" : "text-blue-400"}>{event.status}</span></span>;
    case "thalamic_gate": return <span>Thalamic gate: <span className={event.gate_open ? "text-emerald-400" : "text-neutral-500"}>{event.gate_open ? "open" : "closed"}</span></span>;
    case "hippocampal_cascade": return <span>Cascade: <span className="text-teal-400">{event.total_activated}</span> activated</span>;
    case "budget_status": return <span>Budget: <span className="text-amber-400">${(event.daily_limit - event.today_spend).toFixed(2)}</span> left</span>;
    case "llm_call": return <span>LLM <span className="text-blue-400">{event.tier}</span> <span className={event.status === "completed" ? "text-emerald-500" : event.status === "failed" ? "text-red-500" : "text-neutral-500"}>{event.status}</span>{event.duration_ms != null && <span className="text-neutral-600 ml-1">{formatDuration(event.duration_ms)}</span>}</span>;
    case "neurochemistry_state": return <span>Neuro DA:{((event.dopamine_tonic ?? 0) * 100).toFixed(0)}% 5HT:{((event.serotonin ?? 0) * 100).toFixed(0)}% NE:{event.norepinephrine_mode ?? "?"}</span>;
    case "action_monitoring": return <span>Action <span className={event.outcome === "match" ? "text-emerald-400" : "text-red-400"}>{event.outcome}</span>{event.mismatch_magnitude > 0.3 && <span className="text-amber-400"> Δ{event.mismatch_magnitude.toFixed(2)}</span>}</span>;
    case "cerebellar_prediction": return <span>CB <span className="text-teal-400">{event.phase}</span> conf:{(event.aggregate_confidence * 100).toFixed(0)}% @{event.tick_hz}Hz</span>;
    case "phenomenal_binding": return <span>GW <span className="text-indigo-400">{event.workspace_mode}</span> {event.content_admitted ? <span className="text-emerald-400">admitted</span> : <span className="text-neutral-500">filtered</span>}</span>;
    case "network_switch": return <span>Net <span className="text-indigo-400">{event.from_network}</span>&rarr;<span className="text-indigo-400">{event.to_network}</span> r:{event.anti_correlation_strength.toFixed(2)}</span>;
    case "salience_evaluation": return <span>Salience:<span className={event.salience_score > 0.5 ? "text-amber-400" : "text-neutral-400"}>{(event.salience_score * 100).toFixed(0)}%</span> {event.outcome === "pass" ? <span className="text-emerald-400">pass</span> : <span className="text-neutral-500">filter</span>}</span>;
    case "acc_state": return <span>ACC <span className="text-amber-400">{event.subdivision}</span> conflict:{(event.conflict_level * 100).toFixed(0)}% &rarr; {event.outcome}</span>;
    case "pfc_regulation": return <span>PFC cap:{(event.regulation_capacity * 100).toFixed(0)}% dep:{(event.depletion_level * 100).toFixed(0)}% <span className={event.outcome === "applied" ? "text-emerald-400" : "text-amber-400"}>{event.outcome}</span></span>;
    case "metacognition": return <span>Meta: <span className="text-purple-400">{event.feeling}</span> clarity:{(event.clarity * 100).toFixed(0)}%</span>;
    case "expression_inhibition": return <span>Expr <span className={event.outcome === "expressed" ? "text-emerald-400" : "text-red-400"}>{event.outcome}</span> go:{event.go_strength.toFixed(2)}/stop:{event.stop_strength.toFixed(2)}</span>;
    case "cognitive_flexibility": return <span>Switch: {event.from_task_set}&rarr;{event.to_task_set} delay:{event.delay_ms}ms</span>;
    case "cognitive_fatigue": return <span>Fatigue cap:{(event.cognitive_capacity * 100).toFixed(0)}% <span className={event.state === "recovering" ? "text-emerald-400" : "text-neutral-400"}>{event.state}</span></span>;
    case "basal_ganglia_strategy": return <span>BG <span className="text-pink-400">{event.phase}</span> go:{event.go_drive.toFixed(2)}/nogo:{event.no_go_drive.toFixed(2)}</span>;
    case "value_comparison": return <span>Value <span className="text-amber-400">{event.winning_option_label}</span> conf:{(event.decision_confidence * 100).toFixed(0)}%</span>;
    case "moral_reasoning": return <span>Moral <span className="text-purple-400">{event.dominant_route}</span> conflict:{(event.moral_conflict * 100).toFixed(0)}%</span>;
    case "theory_of_mind": return <span>ToM <span className="text-pink-400">{event.person}</span> <span className="text-neutral-500">{event.phase}</span></span>;
    case "self_presentation": return <span>Self <span className="text-pink-400">{event.trait}</span> fav:{(event.favorability * 100).toFixed(0)}%</span>;
    case "cognitive_empathy": return <span>Empathy <span className="text-pink-400">{event.person}</span> {event.dominant_circuit} conf:{(event.confidence * 100).toFixed(0)}%</span>;
    case "social_learning": return <span>SocLearn <span className="text-pink-400">{event.phase}</span> {event.strategy_label} conf:{(event.confidence * 100).toFixed(0)}%</span>;
    case "sense_of_agency": return <span>Agency <span className={event.attribution === "self_caused" ? "text-emerald-400" : "text-amber-400"}>{event.attribution}</span> level:{(event.agency_level * 100).toFixed(0)}%</span>;
    case "time_perception": return <span>Time rate:{event.subjective_rate.toFixed(2)} <span className="text-cyan-400">{event.feeling}</span></span>;
    case "vigilance": return <span>Vigilance cap:{(event.vigilance_capacity * 100).toFixed(0)}% <span className={event.state === "engaged" ? "text-emerald-400" : "text-amber-400"}>{event.state}</span></span>;
    case "autonomic_balance": return <span>ANS <span className="text-emerald-400">{event.dominant_branch}</span> vagal:{(event.vagal_tone * 100).toFixed(0)}%</span>;
    case "bnst_state": return <span>BNST anx:{(event.sustained_anxiety * 100).toFixed(0)}% CRH:{(event.crh_drive * 100).toFixed(0)}% <span className={event.outcome === "elevated" ? "text-red-400" : "text-emerald-400"}>{event.outcome}</span></span>;
    case "metamemory": return <span>Metamem <span className="text-purple-400">{event.feeling}</span> conf:{(event.confidence * 100).toFixed(0)}%</span>;
    case "source_monitoring": return <span>Source <span className={event.supported ? "text-emerald-400" : "text-red-400"}>{event.supported ? "supported" : "unsupported"}</span> conf:{(event.confidence * 100).toFixed(0)}%</span>;
    case "dentate_gyrus_neurogenesis": return <span>Neurogenesis rate:{event.neurogenesis_rate.toFixed(3)} enrich:{(event.enrichment_drive * 100).toFixed(0)}%</span>;
    case "directed_forgetting": return <span>Forget <span className="text-red-400">{event.targeted_memory_count} traces</span> supp:{(event.mean_suppression_tone * 100).toFixed(0)}%</span>;
    case "statistical_learning": return <span>StatLearn <span className="text-teal-400">{event.stream}</span> bias:{(event.top_bias_strength * 100).toFixed(0)}%</span>;
    case "prospective_memory": return <span>ProsMem <span className="text-cyan-400">{event.phase}</span> {event.trigger_type}</span>;
    case "goal_plan": return <span>Goal <span className="text-emerald-400">{event.phase}</span> {event.completed_steps}/{event.total_steps}</span>;
    case "tool_execution": return <span>Tool <span className="text-blue-400">{event.tool_name}</span> <span className={event.success ? "text-emerald-500" : "text-red-500"}>{event.success ? "ok" : "fail"}</span> {formatDuration(event.duration_ms)}</span>;
    case "telegram_message": return <span>{event.direction === "received" ? "\u2190" : "\u2192"} TG <span className="text-blue-400">{event.message_length}ch</span></span>;
    case "interoception_signal": return <span>Intero <span className="text-amber-400">{event.source_module}</span> pri:{event.priority}</span>;
    default: return <span>{(event as { type: string }).type}</span>;
  }
}

function EventStreamPanel() {
  const { recentEvents, selectedRegionId } = useLiveStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const userScrolledUp = useRef(false);

  const filteredEvents = useMemo(() => {
    return getFilteredEvents(recentEvents, selectedRegionId).slice(-80);
  }, [recentEvents, selectedRegionId]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || userScrolledUp.current) return;
    el.scrollTop = el.scrollHeight;
  }, [filteredEvents]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    userScrolledUp.current = !(el.scrollHeight - el.scrollTop - el.clientHeight < 40);
  };

  return (
    <BracketFrame variant="detail-5" className="pointer-events-auto min-h-0 overflow-hidden flex-1" style={{ maxHeight: 320 }}>
      <div className="flex flex-col h-full">
        <div className="px-3 pt-2 pb-1 shrink-0">
          <HudSectionTitle>Event Stream{selectedRegionId && <span className="text-indigo-400 ml-1">(filtered)</span>}</HudSectionTitle>
          <HudDivider />
        </div>
        <div ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-y-auto px-2 pb-2 space-y-0.5" style={{ scrollbarWidth: "thin" }}>
          {filteredEvents.length === 0 ? (
            <div className="text-center py-4 text-neutral-600 text-xs">Waiting for events...</div>
          ) : (
            filteredEvents.map((envelope) => (
              <div key={envelope.id} className="flex items-start gap-2 px-2 py-0.5 rounded hover:bg-white/3 transition-colors">
                <EventIcon type={envelope.event.type} />
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-neutral-300 truncate"><EventSummary event={envelope.event} /></div>
                </div>
                <span className="text-[9px] text-neutral-600 font-mono shrink-0">{formatTimestamp(envelope.received_at)}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </BracketFrame>
  );
}

// ── Panel Map ──────────────────────────────────────────────────────────────

const PANEL_COMPONENTS: Record<string, React.ComponentType> = {
  "vitals": LiveStatsPanel,
  "synaptic-activity": SynapticActivityPanel,
  "cognitive-state": CognitiveStatePanel,
  "regions": RegionsPanel,
  "radial": RadialPanel,
  "neurochemistry": NeurochemistryPanel,
  "traces": TracesPanel,
  "events": EventStreamPanel,
  "eeg-display": EEGDisplay,
  "brain-topo": BrainTopography,
  "hpa-stress": HPAAxisPanel,
  "affect-circuits": AffectCircuitsPanel,
  "dopamine-system": DopaminePanel,
  "circadian-rhythm": CircadianPanel,
  "cortical-cognitive": CognitivePanel,
  "mri-viewer": MRIViewer,
  "ct-scan": CTScanViewer,
  "pet-scan": PETScanViewer,
  "fmri-bold": FMRIViewer,
  "study-browser": StudyBrowserPanel,
  "global-workspace": GlobalWorkspacePanel,
  "executive-control": ExecutiveControlPanel,
  "decision-strategy": DecisionStrategyPanel,
  "social-brain": SocialBrainPanel,
  "cerebellar-system": CerebellarSystemPanel,
};

// ── Renderer ───────────────────────────────────────────────────────────────

export default function PanelRenderer({ panels }: { panels: string[] }) {
  return (
    <>
      {panels.map((id) => {
        const Component = PANEL_COMPONENTS[id];
        if (!Component) return null;
        return <Component key={id} />;
      })}
    </>
  );
}
