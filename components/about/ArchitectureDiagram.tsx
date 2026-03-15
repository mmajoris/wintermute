"use client";

interface FlowStep {
  label: string;
  sublabel: string;
  color: string;
}

function FlowDiagram({ title, steps }: { title: string; steps: FlowStep[] }) {
  return (
    <div>
      <h4
        className="text-[11px] uppercase tracking-[0.15em] mb-5"
        style={{ color: "rgba(163, 163, 163, 0.5)" }}
      >
        {title}
      </h4>
      <div className="flex flex-col gap-0">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-stretch gap-4">
            {/* Connector line */}
            <div className="flex flex-col items-center w-5 shrink-0">
              <div
                className="w-2 h-2 rounded-full shrink-0 mt-3"
                style={{
                  backgroundColor: step.color,
                  boxShadow: `0 0 8px ${step.color}60`,
                }}
              />
              {i < steps.length - 1 && (
                <div
                  className="flex-1 w-px"
                  style={{
                    background: `linear-gradient(to bottom, ${step.color}40, ${steps[i + 1].color}40)`,
                  }}
                />
              )}
            </div>
            {/* Content */}
            <div className="pb-5">
              <div className="text-[13px] font-medium" style={{ color: step.color }}>
                {step.label}
              </div>
              <div
                className="text-[11px] mt-0.5 leading-relaxed"
                style={{ color: "rgba(163, 163, 163, 0.55)" }}
              >
                {step.sublabel}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const MESSAGE_STEPS: FlowStep[] = [
  { label: "Thalamic Relay", sublabel: "Classify, route, suggest cognitive tier", color: "#f59e0b" },
  { label: "Amygdala", sublabel: "Snap emotional response — valence shift, arousal, salience", color: "#ef4444" },
  { label: "Hippocampal Cascade", sublabel: "Spreading activation — multi-hop associative retrieval", color: "#a855f7" },
  { label: "Working Memory", sublabel: "Gist + recent exchanges + salient moments", color: "#6366f1" },
  { label: "dlPFC", sublabel: "Dynamic prompt generation from live brain state", color: "#3b82f6" },
  { label: "Cortical Synthesis", sublabel: "Tiered LLM call — integration and reasoning", color: "#06b6d4" },
  { label: "Broca's Area", sublabel: "Stream response via Telegram edit-in-place", color: "#22c55e" },
  { label: "Post-Response", sublabel: "Memory storage, mood shift, identity update", color: "#14b8a6" },
];

const THOUGHT_STEPS: FlowStep[] = [
  { label: "Thalamic Gate", sublabel: "Check Redis for state changes — synaptic depression filtering", color: "#f59e0b" },
  { label: "Global Workspace", sublabel: "Is consciousness idle? (Baars GWT — single stream)", color: "#6366f1" },
  { label: "Limbic Evaluation", sublabel: "Signal significant enough to bubble up?", color: "#ef4444" },
  { label: "Neocortex", sublabel: "Conscious thought generation via tiered LLM", color: "#06b6d4" },
  { label: "Prefrontal GABA", sublabel: "Novel or repetitive? Increasing inhibition on familiar themes", color: "#a855f7" },
  { label: "dACC", sublabel: "Prediction error — effort misallocated? Meta-awareness signal", color: "#ec4899" },
];

export default function ArchitectureDiagram() {
  return (
    <div className="grid md:grid-cols-2 gap-12">
      <FlowDiagram title="How a message reaches consciousness" steps={MESSAGE_STEPS} />
      <FlowDiagram title="How the mind thinks autonomously (every 5s)" steps={THOUGHT_STEPS} />
    </div>
  );
}
