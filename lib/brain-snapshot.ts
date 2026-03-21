/**
 * Brain State Snapshot — captures Molly's complete brain telemetry at a moment in time.
 *
 * This is the equivalent of "taking a scan" — every neurochemical level, every regional
 * activation, every affect circuit reading gets frozen into a serializable object.
 * ~3-5KB per snapshot, stored in IndexedDB alongside study metadata.
 */

import { useLiveStore } from "./live-store";
import type {
  NeurochemistryStateEvent,
  AffectCircuitsEvent,
  DopamineStateEvent,
  HpaAxisStateEvent,
  EndorphinDynamicsEvent,
  CircadianStateEvent,
  CorticalModulationStateEvent,
  OscillationStateEvent,
  HomeostasisStateEvent,
  DriveStatesEvent,
  MoodSnapshotEvent,
  ConsolidationStatsEvent,
  EmotionalStateEvent,
} from "./brain-events";

export interface RegionActivitySnapshot {
  regionId: string;
  intensity: number;
}

export interface BrainSnapshot {
  capturedAt: string;

  neurochemistry: NeurochemistryStateEvent | null;
  affectCircuits: AffectCircuitsEvent | null;
  dopamineState: DopamineStateEvent | null;
  hpaAxisState: HpaAxisStateEvent | null;
  endorphinDynamics: EndorphinDynamicsEvent | null;
  circadianState: CircadianStateEvent | null;
  corticalModulation: CorticalModulationStateEvent | null;
  oscillationState: OscillationStateEvent | null;
  homeostasisState: HomeostasisStateEvent | null;
  driveStates: DriveStatesEvent | null;
  moodSnapshot: MoodSnapshotEvent | null;
  consolidationStats: ConsolidationStatsEvent | null;
  emotionalState: EmotionalStateEvent | null;
  dopamineLevel: number;

  regionActivity: RegionActivitySnapshot[];
  moodHistory: Array<{ timestamp: string; valence: number; arousal: number; dominance: number }>;
}

/**
 * Reads the current LiveStore state and produces a JSON-serializable snapshot.
 * Maps and Sets are converted to arrays for IndexedDB compatibility.
 */
export function captureBrainSnapshot(): BrainSnapshot {
  const s = useLiveStore.getState();

  const regionActivity: RegionActivitySnapshot[] = [];
  for (const [, activity] of s.regionActivity) {
    regionActivity.push({ regionId: activity.regionId, intensity: activity.intensity });
  }

  return {
    capturedAt: new Date().toISOString(),
    neurochemistry: s.neurochemistryState,
    affectCircuits: s.affectCircuits,
    dopamineState: s.dopamineState,
    hpaAxisState: s.hpaAxisState,
    endorphinDynamics: s.endorphinDynamics,
    circadianState: s.circadianState,
    corticalModulation: s.corticalModulation,
    oscillationState: s.oscillationState,
    homeostasisState: s.homeostasisState,
    driveStates: s.driveStates,
    moodSnapshot: s.moodSnapshot,
    consolidationStats: s.consolidationStats,
    emotionalState: s.emotionalState,
    dopamineLevel: s.dopamineLevel,
    regionActivity,
    moodHistory: [...s.moodHistory],
  };
}

/**
 * Quick summary of a snapshot for display in the study browser.
 */
export function snapshotSummary(snap: BrainSnapshot): Record<string, string> {
  const summary: Record<string, string> = {};

  if (snap.emotionalState) {
    summary["Mood"] = snap.emotionalState.mood;
    summary["Valence"] = snap.emotionalState.valence.toFixed(2);
  }
  summary["Dopamine"] = `${(snap.dopamineLevel * 100).toFixed(0)}%`;

  if (snap.hpaAxisState) {
    summary["Cortisol"] = `${(snap.hpaAxisState.cortisol * 100).toFixed(0)}%`;
    summary["Chronic Load"] = `${(snap.hpaAxisState.chronic_load * 100).toFixed(0)}%`;
  }
  if (snap.homeostasisState) {
    summary["Mode"] = snap.homeostasisState.operating_mode;
  }
  if (snap.circadianState) {
    summary["Alertness"] = `${(snap.circadianState.alertness * 100).toFixed(0)}%`;
  }

  const activeRegions = snap.regionActivity.filter((r) => r.intensity > 0.2).length;
  summary["Active Regions"] = String(activeRegions);

  return summary;
}
