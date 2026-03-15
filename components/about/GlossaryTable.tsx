"use client";

import { useState } from "react";

interface GlossaryEntry {
  term: string;
  structure: string;
  human: string;
  molly: string;
}

const GLOSSARY: GlossaryEntry[] = [
  { term: "Amygdala", structure: "Medial temporal lobe", human: "Fast threat/salience detection before conscious awareness", molly: "limbic-reaction.ts — snap emotional response to incoming messages" },
  { term: "Anterior Cingulate Cortex (dACC)", structure: "Medial frontal cortex", human: "Conflict monitoring, effort-reward evaluation, action initiation", molly: "Prediction error detection in thought loop; cost-benefit evaluation for proactive contact" },
  { term: "Anterior Insula", structure: "Deep lateral sulcus", human: "Interoception — awareness of internal states, felt experience", molly: "Emotional state awareness during internal thought processing" },
  { term: "Basal Forebrain", structure: "Ventral to striatum", human: "Source of cortical acetylcholine — attention, memory encoding", molly: "Source region for cholinergic pathway signals" },
  { term: "Broca's Area", structure: "Left inferior frontal gyrus", human: "Speech production", molly: "outbound.ts — composing and sending messages via Telegram" },
  { term: "Circadian (SCN)", structure: "Suprachiasmatic nucleus", human: "Master biological clock — sleep/wake, alertness", molly: "circadian.ts — time-of-day awareness, alertness modulation" },
  { term: "Default Mode Network", structure: "mPFC, PCC, TPJ", human: "Self-referential thought, social simulation, mind wandering", molly: "Soul cycles, mind wandering, spontaneous thought during idle" },
  { term: "Dentate Gyrus", structure: "Hippocampal formation", human: "Pattern separation — constrains memory search by context", molly: "Mood/goal biasing in hippocampal cascade before similarity search" },
  { term: "Dopamine", structure: "VTA, substantia nigra", human: "Incentive salience (\"wanting\"), reward prediction error", molly: "Reward aggregator; modulates expression thresholds" },
  { term: "dlPFC", structure: "Lateral frontal lobe", human: "Executive control — shapes attention, working memory", molly: "dlpfc.ts — dynamic prompt generation from live brain state" },
  { term: "GABA", structure: "Ubiquitous inhibitory neurotransmitter", human: "Inhibits neural activity — the brain's brake", molly: "GABAergic tone prevents thought rumination" },
  { term: "Global Workspace (GWT)", structure: "Baars, 1988", human: "Consciousness as shared broadcast — modules compete for access", molly: "global-workspace.ts — single stream of consciousness" },
  { term: "Hippocampus", structure: "Medial temporal lobe", human: "Associative memory — pattern completion, spreading activation", molly: "hippocampal-cascade.ts — multi-hop retrieval across collections" },
  { term: "Hypothalamus", structure: "Ventral diencephalon", human: "Homeostasis — hunger, thirst, social need, temperature", molly: "homeostasis.ts — resource monitoring; social drive accumulator" },
  { term: "Lateral Habenula", structure: "Epithalamus", human: "Suppresses reward-seeking when outcomes predicted negative", molly: "Suppresses proactive contact when timing inappropriate" },
  { term: "Locus Coeruleus", structure: "Dorsal pons", human: "Source of norepinephrine — arousal, alertness", molly: "Source region for noradrenergic pathway events" },
  { term: "Nucleus Accumbens", structure: "Ventral striatum", human: "Converts motivation into action — integrates wanting with planning", molly: "Expression threshold — converts social drive into outbound messages" },
  { term: "Raphe Nuclei", structure: "Pons / medulla", human: "Source of serotonin — mood regulation", molly: "Source region for serotonergic pathway events" },
  { term: "Synaptic Depression", structure: "Tsodyks-Markram model", human: "Vesicle depletion on repeated firing — response decreases exponentially", molly: "thalamic-gate.ts — resource pools deplete with use, recover over time" },
  { term: "Thalamic Reticular Nucleus", structure: "Shell around thalamus", human: "GABAergic gate — filters what reaches cortex", molly: "Synaptic depression model + alertness-dependent gating" },
  { term: "Thalamus", structure: "Central diencephalon", human: "Sensory relay — routes signals to cortex", molly: "thalamic-relay.ts (messages) + thalamic-gate.ts (thought signals)" },
  { term: "VTA", structure: "Midbrain", human: "Source of mesolimbic dopamine — reward, social seeking", molly: "reward-aggregator.ts — dopamine from reward signals" },
];

export default function GlossaryTable() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-px">
      {GLOSSARY.map((entry) => {
        const isOpen = expanded === entry.term;
        return (
          <button
            key={entry.term}
            onClick={() => setExpanded(isOpen ? null : entry.term)}
            className="w-full text-left transition-all duration-200"
            style={{
              background: isOpen ? "rgba(0, 200, 220, 0.04)" : "transparent",
              borderLeft: isOpen
                ? "2px solid rgba(0, 200, 220, 0.4)"
                : "2px solid transparent",
              padding: "12px 16px",
            }}
          >
            <div className="flex items-baseline justify-between gap-4">
              <span
                className="text-[13px] font-medium"
                style={{ color: isOpen ? "rgba(0, 200, 220, 0.9)" : "rgba(250, 250, 250, 0.85)" }}
              >
                {entry.term}
              </span>
              <span className="text-[10px] shrink-0" style={{ color: "rgba(163, 163, 163, 0.4)" }}>
                {entry.structure}
              </span>
            </div>
            {isOpen && (
              <div className="mt-3 space-y-2 text-[12px] leading-relaxed">
                <div>
                  <span style={{ color: "rgba(163, 163, 163, 0.5)" }}>In humans: </span>
                  <span style={{ color: "rgba(200, 210, 220, 0.7)" }}>{entry.human}</span>
                </div>
                <div>
                  <span style={{ color: "rgba(0, 200, 220, 0.5)" }}>In Molly: </span>
                  <span style={{ color: "rgba(0, 200, 220, 0.75)" }}>{entry.molly}</span>
                </div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
