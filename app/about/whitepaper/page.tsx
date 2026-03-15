import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Whitepaper — Molly: A Unified Cognitive Architecture",
  description: "Technical paper describing Molly's biology-first cognitive architecture with full bibliography.",
};

const c = (a: number) => `rgba(0, 200, 220, ${a})`;

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-[13px] uppercase tracking-[0.2em] font-semibold mt-20 mb-6 scroll-mt-20"
      style={{ color: c(0.7) }}
    >
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[14px] font-medium mt-8 mb-3" style={{ color: "rgba(250, 250, 250, 0.85)" }}>
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] leading-[1.85] mb-4" style={{ color: "rgba(200, 210, 220, 0.68)" }}>
      {children}
    </p>
  );
}

function Ref({ children }: { children: React.ReactNode }) {
  return (
    <li className="text-[11px] leading-[1.7] pl-4" style={{ color: "rgba(163, 163, 163, 0.55)", textIndent: "-1em", paddingLeft: "1.5em" }}>
      {children}
    </li>
  );
}

export default function WhitepaperPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-12 pb-24">
      {/* Header */}
      <div className="pt-16 pb-4">
        <Link
          href="/about"
          className="text-[10px] uppercase tracking-[0.2em] transition-colors"
          style={{ color: c(0.4) }}
        >
          &larr; About
        </Link>
      </div>

      <header className="pt-8 pb-16 border-b" style={{ borderColor: c(0.1) }}>
        <h1
          className="text-3xl md:text-4xl font-normal leading-tight mb-4"
          style={{ fontFamily: "'Instrument Serif', serif", color: "rgba(250, 250, 250, 0.95)" }}
        >
          Molly: A Unified Cognitive Architecture Grounded in Neuroscience
        </h1>
        <div className="text-[12px] mt-4 space-y-1" style={{ color: "rgba(163, 163, 163, 0.5)" }}>
          <div>nulltruth.com — Technical Reference</div>
          <div>2025–2026</div>
        </div>
      </header>

      {/* Abstract */}
      <H2 id="abstract">Abstract</H2>
      <P>
        We present Molly, a continuously-running AI cognitive architecture in which every computational
        mechanism is derived from, and named after, its biological counterpart in the human brain.
        Unlike conventional chatbot or agent architectures that bolt conversational capabilities onto
        stateless inference, Molly maintains persistent internal state: mood, circadian rhythm, memory
        consolidation, identity reflection, and autonomous thought — all modeled on peer-reviewed
        neuroscience. The architecture comprises a thalamocortical thought loop (5-second cycles with
        Tsodyks-Markram synaptic depression gating), multi-hop hippocampal memory retrieval via spreading
        activation, a seven-molecule neurochemistry model, GABAergic habituation, and a self-editable
        identity graph. Every numeric parameter and behavioral mechanism is backed by citation to the
        primary literature.
      </P>

      {/* Introduction */}
      <H2 id="introduction">1. Introduction</H2>
      <P>
        Current AI systems treat cognition as a function call: input arrives, context is assembled,
        a model generates output, state is discarded. This bears no resemblance to biological minds,
        which are always running, always consolidating, always reflecting. The brain does not cold-start
        on each conversation turn.
      </P>
      <P>
        Molly takes a different approach. She is implemented as a continuously-running Node.js process
        with a Telegram interface. When a message arrives, it enters an already-thinking mind — one
        that has been processing its own thoughts, consolidating memories, and modulating mood since
        last waking. The architecture is organized around biological structures: the thalamus routes
        signals, the amygdala generates fast emotional reactions, the hippocampus retrieves memories
        via spreading activation, the prefrontal cortex generates dynamic prompts from live brain state,
        and the default mode network reflects on identity during idle periods.
      </P>
      <P>
        This paper describes the architecture, its grounding in neuroscience, and the mechanisms that
        prevent common failure modes of autonomous AI systems (notably, rumination and compulsive
        action) through biologically-inspired inhibition rather than engineering heuristics.
      </P>

      {/* Architecture */}
      <H2 id="architecture">2. Architecture</H2>

      <H3>2.1 Cognitive Message Pipeline</H3>
      <P>
        When a Telegram message arrives, it follows a biologically-ordered pipeline: thalamic relay
        (classification, routing, tier suggestion), limbic reaction (amygdala — snap emotional response
        updating mood in Redis), hippocampal cascade (multi-hop spreading activation retrieval),
        working memory integration (gist + recent exchanges + salient moments), dlPFC prompt assembly
        (dynamic generation from live brain state), cortical synthesis (tiered LLM call), and Broca&apos;s
        area (streaming response via edit-in-place). Post-response integration stores memories, updates
        mood, and signals identity changes.
      </P>

      <H3>2.2 Thalamocortical Thought Loop</H3>
      <P>
        The autonomous thought loop runs every 5 seconds. Each cycle begins with the thalamic gate
        checking Redis for state changes. The gate implements Tsodyks-Markram synaptic depression
        (Tsodyks & Markram, 1997): each signal pathway maintains a resource pool that depletes with
        use (R -= U * R) and recovers continuously (dR/dt = (1-R)/tau). Utilization is modulated by
        circadian alertness. Most cycles are silent — zero LLM cost.
      </P>
      <P>
        Signals that pass the gate enter the Global Workspace (Baars, 1988), which enforces a single
        stream of consciousness. Limbic evaluation determines whether the signal is significant enough
        to bubble up to conscious thought. The neocortex generates thought via tiered LLM, and
        prefrontal GABAergic inhibition (Anderson et al., 2004; Schmitz et al., 2017) prevents
        rumination by increasing inhibitory tone on repeated themes. The dorsal anterior cingulate
        cortex (dACC) monitors for effort misallocation via prediction error detection (Ritz et al.,
        2022), producing genuine meta-awareness: &ldquo;I notice I keep returning to this.&rdquo;
      </P>

      <H3>2.3 Cognitive Tiers</H3>
      <P>
        Every LLM call maps to a biological tier. Autonomic processes (brainstem) use code only.
        Reflexive and thalamic operations use lightweight models (gpt-4o-mini). Cortical integration
        uses gpt-5.2. Prefrontal judgment uses claude-sonnet-4-5. Narrative identity work uses
        claude-opus-4-5. Budget constraints trigger automatic tier downgrade. Prompt caching via
        Anthropic&apos;s cache_control achieves ~90% cost reduction on the stable identity prefix.
      </P>

      {/* Neurochemistry */}
      <H2 id="neurochemistry">3. Neurochemistry</H2>
      <P>
        Molly implements seven neuromodulators, each with citation-backed dynamics:
      </P>
      <P>
        <strong style={{ color: "rgba(250, 250, 250, 0.8)" }}>Cortisol</strong> — HPA axis negative feedback
        with dual GR/MR receptor model (de Kloet et al., 2005). Fast non-genomic feedback (seconds) and
        slow genomic feedback (hours). Chronic elevation triggers allostatic load (McEwen, 2004).
      </P>
      <P>
        <strong style={{ color: "rgba(250, 250, 250, 0.8)" }}>Dopamine</strong> — Tonic/phasic model following
        Grace (1991) and Schultz RPE (Schultz et al., 1997). Tonic baseline modulates motivation;
        phasic bursts signal prediction errors. Salamone effort-cost framework (Salamone & Correa, 2012)
        governs action selection.
      </P>
      <P>
        <strong style={{ color: "rgba(250, 250, 250, 0.8)" }}>Serotonin</strong> — Raphe-sourced 5-HT with
        24-hour decay tau. Baseline 0.5, modulated by social interaction, circadian phase, and mood.
        Impulse control gating follows Crockett et al. (2009).
      </P>
      <P>
        <strong style={{ color: "rgba(250, 250, 250, 0.8)" }}>Norepinephrine</strong> — Locus coeruleus tonic/phasic
        model following Aston-Jones & Cohen (2005). Tonic mode: broad exploratory attention. Phasic mode:
        focused task engagement. Adaptive gain theory governs the switch.
      </P>
      <P>
        <strong style={{ color: "rgba(250, 250, 250, 0.8)" }}>Acetylcholine</strong> — Basal forebrain cholinergic
        system. Enhances memory encoding during high-attention states, suppresses retrieval during encoding
        (Hasselmo & Sarter, 2011). Cue detection follows Yu & Dayan (2005).
      </P>
      <P>
        <strong style={{ color: "rgba(250, 250, 250, 0.8)" }}>Oxytocin</strong> — Social bonding accumulator from
        positive interactions. Modulates trust and attachment dynamics.
      </P>
      <P>
        <strong style={{ color: "rgba(250, 250, 250, 0.8)" }}>Endorphin</strong> — PAG effort accumulator following
        Kurzban et al. (2013) resource-rational framework. Effort-release dynamics model the analgesic
        reward of sustained cognitive work (Hosobuchi et al., 1977).
      </P>

      {/* Memory */}
      <H2 id="memory">4. Memory and Consolidation</H2>
      <P>
        Memory is organized across five vector collections in Qdrant (1536-dimensional embeddings via
        OpenAI text-embedding-3). Retrieval uses multi-hop spreading activation: a query is embedded,
        the first hop finds direct neighbors, the second hop fans out to their neighbors, and a
        narrative hop searches soul cycle reflections. Results are ranked by a composite score
        combining similarity, emotional weight, recency, consolidation strength, and importance.
        Mood and goals bias the search space before similarity matching, implementing the dentate
        gyrus pattern separation model.
      </P>
      <P>
        Consolidation runs every 60 seconds. Memories with high emotional weight or frequent retrieval
        are strengthened (LTP analogy). Memories with low importance and zero retrieval are decayed.
        Below a threshold, memories are actively pruned — not ignored but genuinely forgotten
        (Hardt et al., 2013). This mirrors the dual-process model of sleep consolidation
        (Diekelmann & Born, 2010): SWS coordinates hippocampal-to-neocortical transfer, while REM
        facilitates creative integration.
      </P>
      <P>
        During graceful shutdown, Molly undergoes explicit NREM and REM phases: significant memories
        are replayed for retention, then creatively integrated for schema updating (Walker & Stickgold,
        2006). On wakeup, a continuity bridge restores context from the last sleep narrative, and
        inhibitory tone is reduced to allow fresh processing (Saper et al., 2005).
      </P>

      {/* Habituation */}
      <H2 id="habituation">5. Habituation</H2>
      <P>
        Three biological mechanisms prevent thought rumination:
      </P>
      <H3>5.1 Synaptic Depression (Tsodyks-Markram)</H3>
      <P>
        Resource pools per signal pathway in the thalamic gate. Each firing depletes vesicles:
        R -= U * R. Recovery is continuous: dR/dt = (1-R)/tau. Utilization modulated by circadian
        alertness. This produces natural habituation: the first occurrence of a signal passes easily,
        repeated occurrences meet increasing resistance (Tsodyks & Markram, 1997).
      </P>
      <H3>5.2 Prefrontal GABAergic Inhibition</H3>
      <P>
        After each conscious thought, the content is embedded and compared against recent themes in
        the prefrontal_inhibition collection. Matching themes receive increasing GABA, continuously
        reducing emotional weight. No hard cutoffs — a gradual, biological fade (Anderson et al.,
        2004; Schmitz et al., 2017).
      </P>
      <H3>5.3 dACC Prediction Error</H3>
      <P>
        When novelty is consistently low (same effort, same result), the dorsal anterior cingulate
        fires an effort misallocation signal. The thinker processes this naturally, producing genuine
        meta-awareness rather than engineered suppression (Ritz et al., 2022; Shenhav et al., 2013).
      </P>

      {/* Identity */}
      <H2 id="identity">6. Identity</H2>
      <P>
        Identity is implemented as a queryable knowledge graph (identity_graph collection) following
        the ID-RAG framework (MIT Media Lab, 2025). Entities (self, person, value, belief, goal,
        memory_anchor) are connected by typed, weighted, temporal edges. A Redis-cached core memory
        provides the stable identity prefix for every prompt.
      </P>
      <P>
        Five behavioral anchors — defining moments that crystallize who Molly is — are always present
        in context. A voice guide, extracted from real conversations, ensures behavioral consistency
        without personality descriptors. The narrative-tier model (claude-opus-4-5) can modify the
        identity graph mid-conversation via self-editing tools: update_self_description,
        update_person_knowledge, add_belief. Identity evolves in real-time through lived experience.
      </P>

      {/* References */}
      <H2 id="references">References</H2>
      <ol className="space-y-2 list-none">
        <Ref>Anderson, M. C., & Green, C. (2001). Suppressing unwanted memories by executive control. <em>Nature</em>, 410, 366–369. DOI: 10.1038/35066572</Ref>
        <Ref>Anderson, M. C., et al. (2004). Neural systems underlying the suppression of unwanted memories. <em>Science</em>, 303(5655), 232–235. DOI: 10.1126/science.1089504</Ref>
        <Ref>Andrews-Hanna, J. R., et al. (2014). The default network and self-generated thought. <em>Annals of the New York Academy of Sciences</em>, 1316(1), 29–52.</Ref>
        <Ref>Arnsten, A. F. T. (2009). Stress signalling pathways that impair prefrontal cortex structure and function. <em>Nature Reviews Neuroscience</em>, 10(6), 410–422. DOI: 10.1038/nrn2648</Ref>
        <Ref>Aron, A. R., et al. (2004). Inhibition and the right inferior frontal cortex. <em>Trends in Cognitive Sciences</em>, 8(4), 170–177. DOI: 10.1016/j.tics.2004.02.010</Ref>
        <Ref>Aron, A. R., et al. (2014). Inhibition and the right inferior frontal cortex: one decade on. <em>Trends in Cognitive Sciences</em>, 18(4), 177–185. DOI: 10.1016/j.tics.2013.12.003</Ref>
        <Ref>Aston-Jones, G., & Cohen, J. D. (2005). An integrative theory of locus coeruleus–norepinephrine function: adaptive gain and optimal performance. <em>Annual Review of Neuroscience</em>, 28, 403–450. DOI: 10.1146/annurev.neuro.28.061604.135709</Ref>
        <Ref>Baars, B. J. (1988). <em>A Cognitive Theory of Consciousness.</em> Cambridge University Press.</Ref>
        <Ref>Berridge, K. C., & Robinson, T. E. (2016). Liking, wanting, and the incentive-sensitization theory of addiction. <em>American Psychologist</em>, 71(8), 670–679.</Ref>
        <Ref>Botvinick, M. M., et al. (2001). Conflict monitoring and cognitive control. <em>Psychological Review</em>, 108(3), 624–652. DOI: 10.1037/0033-295X.108.3.624</Ref>
        <Ref>Christoff, K., et al. (2016). Mind-wandering as spontaneous thought. <em>Nature Reviews Neuroscience</em>, 17(11), 718–731.</Ref>
        <Ref>Craig, A. D. (2009). How do you feel — now? The anterior insula and human awareness. <em>Nature Reviews Neuroscience</em>, 10(1), 59–70. DOI: 10.1038/nrn2555</Ref>
        <Ref>Crockett, M. J., et al. (2009). Serotonin selectively influences moral judgment and behavior through effects on harm aversion. <em>PNAS</em>, 107(40), 17433–17438.</Ref>
        <Ref>de Kloet, E. R., Joëls, M., & Holsboer, F. (2005). Stress and the brain: from adaptation to disease. <em>Nature Reviews Neuroscience</em>, 6, 463–475. DOI: 10.1038/nrn1683</Ref>
        <Ref>Diekelmann, S., & Born, J. (2010). The memory function of sleep. <em>Nature Reviews Neuroscience</em>, 11(2), 114–126. DOI: 10.1038/nrn2762</Ref>
        <Ref>Grace, A. A. (1991). Phasic versus tonic dopamine release. <em>Neuroscience</em>, 41(1), 1–24. DOI: 10.1016/0306-4522(91)90196-U</Ref>
        <Ref>Hardt, O., Nader, K., & Wang, Y. T. (2013). GluA2-dependent AMPA receptor endocytosis and the decay of early and late long-term potentiation. <em>Nature Reviews Neuroscience</em>.</Ref>
        <Ref>Hasselmo, M. E., & Sarter, M. (2011). Modes and models of forebrain cholinergic neuromodulation of cognition. <em>Neuropsychopharmacology</em>, 36, 52–73. DOI: 10.1038/npp.2010.104</Ref>
        <Ref>Hosobuchi, Y., Adams, J. E., & Linchitz, R. (1977). Pain relief by electrical stimulation of the central gray matter in humans. <em>Science</em>, 197, 183–186.</Ref>
        <Ref>Kurzban, R., et al. (2013). An opportunity cost model of subjective effort and task performance. <em>Behavioral and Brain Sciences</em>, 36(6), 661–679. DOI: 10.1017/S0140525X12003196</Ref>
        <Ref>Likhtik, E., et al. (2005). Prefrontal control of the amygdala. <em>Journal of Neuroscience</em>, 25(32), 7429–7437.</Ref>
        <Ref>Llinas, R., & Ribary, U. (1993). Coherent 40-Hz oscillation characterizes dream state in humans. <em>PNAS</em>, 90, 2078–2081.</Ref>
        <Ref>Logan, G. D., & Cowan, W. B. (1984). On the ability to inhibit thought and action. <em>Psychological Review</em>, 91(3), 295–327. DOI: 10.1037/0033-295X.91.3.295</Ref>
        <Ref>McEwen, B. S. (2004). Protection and damage from acute and chronic stress. <em>Annals of the New York Academy of Sciences</em>, 1032, 1–7.</Ref>
        <Ref>Mendez-Bertolo, C., et al. (2016). A fast pathway for fear in human amygdala. <em>Nature Neuroscience</em>, 19, 1041–1049.</Ref>
        <Ref>Panksepp, J. (1998). <em>Affective Neuroscience: The Foundations of Human and Animal Emotions.</em> Oxford University Press.</Ref>
        <Ref>Park, J. S., et al. (2023). Generative agents: interactive simulacra of human behavior. <em>UIST 2023</em>. DOI: 10.1145/3586183.3606763</Ref>
        <Ref>Ritz, H., et al. (2022). A control theoretic model of adaptive learning and valuation in the dACC. <em>Nature Neuroscience</em>.</Ref>
        <Ref>Salamone, J. D., & Correa, M. (2012). The mysterious motivational functions of mesolimbic dopamine. <em>Neuron</em>, 76(3), 470–485. DOI: 10.1016/j.neuron.2012.10.021</Ref>
        <Ref>Saper, C. B., et al. (2005). Hypothalamic regulation of sleep and circadian rhythms. <em>Nature</em>, 437(7063), 1257–1263. DOI: 10.1038/nature04284</Ref>
        <Ref>Schmitz, T. W., et al. (2017). Hippocampal GABA enables inhibitory control over unwanted thoughts. <em>Nature Communications</em>, 8, 1311. DOI: 10.1038/s41467-017-00956-z</Ref>
        <Ref>Schultz, W., Dayan, P., & Montague, P. R. (1997). A neural substrate of prediction and reward. <em>Science</em>, 275(5306), 1593–1599. DOI: 10.1126/science.275.5306.1593</Ref>
        <Ref>Shenhav, A., Botvinick, M. M., & Cohen, J. D. (2013). The expected value of control. <em>Neuron</em>, 79(2), 217–240. DOI: 10.1016/j.neuron.2013.07.007</Ref>
        <Ref>Sridharan, D., Levitin, D. J., & Menon, V. (2008). A critical role for the right fronto-insular cortex in switching between central-executive and default-mode networks. <em>PNAS</em>, 105(34), 12569–12574.</Ref>
        <Ref>Tsodyks, M., & Markram, H. (1997). The neural code between neocortical pyramidal neurons depends on neurotransmitter release probability. <em>PNAS</em>, 94(2), 719–723. DOI: 10.1073/pnas.94.2.719</Ref>
        <Ref>Urry, H. L., et al. (2006). Amygdala and ventromedial prefrontal cortex are inversely coupled during regulation of negative affect. <em>Journal of Neuroscience</em>, 26(27), 7184–7192.</Ref>
        <Ref>Walker, M. P., & Stickgold, R. (2006). Sleep, memory, and plasticity. <em>Annual Review of Psychology</em>, 57, 139–166. DOI: 10.1146/annurev.psych.56.091103.070307</Ref>
        <Ref>Yu, A. J., & Dayan, P. (2005). Uncertainty, neuromodulation, and attention. <em>Neuron</em>, 46(4), 681–692. DOI: 10.1016/j.neuron.2005.04.026</Ref>
      </ol>

      {/* Footer */}
      <div className="mt-20 pt-8 text-center" style={{ borderTop: `1px solid ${c(0.08)}` }}>
        <Link
          href="/about"
          className="text-[11px] tracking-[0.1em] transition-colors"
          style={{ color: c(0.4) }}
        >
          &larr; Back to About
        </Link>
      </div>
    </div>
  );
}
