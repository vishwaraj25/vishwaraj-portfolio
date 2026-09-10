"use client";

import React, { useState } from "react";
import {
  Brain,
  Sword,
  Eye,
  ShieldAlert,
  Zap,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CombatStage {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  agencyType: "Active Agency" | "Kinetic Execution" | "Anticipatory Focus" | "Reactive Reflex" | "State Feedback";
  durationEst: string;
  cognitiveFocus: string;
  classicRpgFlaw: string;
  expeditionSolution: string;
  gameplayConsequence: string;
  productMetricImpact: string;
}

const COMBAT_STAGES: CombatStage[] = [
  {
    id: "decision",
    stepNumber: "01",
    title: "Player Strategic Decision",
    subtitle: "Tactical Planning & Resource Allocation",
    icon: Brain,
    agencyType: "Active Agency",
    durationEst: "2 – 6 seconds",
    cognitiveFocus: "Tactical Evaluation & Resource Optimization",
    classicRpgFlaw:
      "Can degenerate into repetitive 'Attack' spam or looking up dominant build cheat-sheets once party synergies are solved.",
    expeditionSolution:
      "Keeps turn-based depth intact. Players allocate Action Points (AP), select elemental weaknesses, or deploy crowd-control skills without twitch pressure.",
    gameplayConsequence:
      "Strategic agency is fully preserved; players feel intelligent rather than hurried.",
    productMetricImpact: "Preserves the core fantasy for Traditional Turn-Based strategists.",
  },
  {
    id: "action",
    stepNumber: "02",
    title: "Player Action Execution",
    subtitle: "Skill Deployment & Kinetic Rhythm",
    icon: Sword,
    agencyType: "Kinetic Execution",
    durationEst: "1.5 – 3 seconds",
    cognitiveFocus: "Execution Precision & Rhythm Windows",
    classicRpgFlaw:
      "Once chosen, the attack animation plays passively with no player interaction required.",
    expeditionSolution:
      "Incorporates precision timing inputs during critical attack combos to maximize critical strike damage or stagger buildup.",
    gameplayConsequence:
      "Turns simple button clicks into kinetic execution; bridges the gap to action games.",
    productMetricImpact: "Increases session engagement and moment-to-moment immersion.",
  },
  {
    id: "telegraph",
    stepNumber: "03",
    title: "Enemy Response & Telegraph",
    subtitle: "Threat Identification & Visual Cue Parsing",
    icon: Eye,
    agencyType: "Anticipatory Focus",
    durationEst: "1.2 – 2.5 seconds",
    cognitiveFocus: "Pattern Recognition & Cue Anticipation",
    classicRpgFlaw:
      "The 'Downtime Dead Zone'. Enemy raises weapon; player looks down at phone or looks away from screen.",
    expeditionSolution:
      "Enemy wind-up animations are calibrated as explicit readable telegraphs. Sound design, particle buildup, and weapon silhouettes signal the impending strike window.",
    gameplayConsequence:
      "Transforms enemy turn from 'boring wait' into tense visual study and anticipation.",
    productMetricImpact: "Locks player visual attention to screen 100% of the battle loop.",
  },
  {
    id: "defense",
    stepNumber: "04",
    title: "Defensive Interaction (Parry / Dodge)",
    subtitle: "The Keystone Active Defense Window",
    icon: ShieldAlert,
    agencyType: "Reactive Reflex",
    durationEst: "0.2 – 0.6 seconds",
    cognitiveFocus: "Microsecond Timing & Reflex Decision",
    classicRpgFlaw:
      "Defense was historically passive: a math formula (Defense Stat - Enemy Attack). Player had zero control over whether they took 400 HP damage.",
    expeditionSolution:
      "Real-time reflex inputs: Dodge (wide window, complete evasion) vs. Perfect Parry (tight 120ms window, builds Action Points & triggers immediate counter-attack).",
    gameplayConsequence:
      "Player skill can nullify damage regardless of stat deficiencies; converts enemy turn into a player counter-attack opportunity.",
    productMetricImpact:
      "Directly solves early-game churn for Action-Oriented and Hybrid RPG cohorts.",
  },
  {
    id: "feedback",
    stepNumber: "05",
    title: "Feedback & Consequence",
    subtitle: "Sensory Payoff & State Transition",
    icon: Zap,
    agencyType: "State Feedback",
    durationEst: "0.8 – 1.5 seconds",
    cognitiveFocus: "Dopamine Response & Battle Re-evaluation",
    classicRpgFlaw:
      "Passive HP number drops on screen. Minimal emotional delta.",
    expeditionSolution:
      "High-impact audiovisual resonance: time-dilation freeze frame on perfect parry, metallic clash sound, immediate camera refocus on party counter.",
    gameplayConsequence:
      "Dopaminergic reinforcement loop: players feel triumphant mastery on successful defense.",
    productMetricImpact: "Creates memorable highlight clips and high organic word-of-mouth.",
  },
  {
    id: "reset",
    stepNumber: "06",
    title: "Battlefield Recalibration",
    subtitle: "New Turn State & Strategic Adaptation",
    icon: RotateCcw,
    agencyType: "Active Agency",
    durationEst: "1 – 3 seconds",
    cognitiveFocus: "Tactical Synthesis of New Battlefield State",
    classicRpgFlaw:
      "Static progression where enemy turns merely shaved off health without changing the tactical equation.",
    expeditionSolution:
      "Counter-attacks generate bonus Action Points and stagger gauge thresholds, dynamically giving the player unexpected tactical options on the subsequent turn.",
    gameplayConsequence:
      "Defense directly fuels offense. Good defense accelerates player offensive momentum.",
    productMetricImpact: "Keeps combat encounters compact, dynamic, and free of spongy grinding.",
  },
];

export function CombatLoopVisualizer() {
  const [selectedStage, setSelectedStage] = useState<CombatStage>(COMBAT_STAGES[3]);

  return (
    <div className="rounded-3xl border border-white/30 bg-black/25 backdrop-blur-xl p-6 sm:p-9 text-white shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold">
              Interactive Systems Dossier
            </span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-editorial text-white font-normal mt-1">
            The 6-Phase Kinetic Combat Loop
          </h3>
          <p className="text-sm text-white/85 mt-1 max-w-2xl font-sans leading-relaxed">
            Click each phase to inspect cognitive demands, mechanical changes, and product metrics.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full border border-white/30 text-xs font-mono text-white shrink-0">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Active Duty Cycle: 98%</span>
        </div>
      </div>

      {/* 6 Stage Buttons */}
      <div className="pt-6">
        <div className="text-[11px] font-mono uppercase tracking-widest text-white/70 font-semibold mb-3">
          Select Phase in the Battle Loop:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {COMBAT_STAGES.map((stage) => {
            const Icon = stage.icon;
            const isSelected = selectedStage.id === stage.id;

            return (
              <motion.button
                key={stage.id}
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedStage(stage)}
                className={`p-4 rounded-2xl text-left transition-all border relative flex flex-col justify-between min-h-[120px] ${
                  isSelected
                    ? "bg-white text-[var(--page-accent-fg)] border-white shadow-xl shadow-black/15 scale-[1.02]"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/15"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5 opacity-80">
                    <span>{stage.stepNumber}</span>
                    {stage.id === "defense" && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/20 text-white">
                        CORE
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-editorial font-bold line-clamp-2 leading-snug">
                    {stage.title}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-current/20 mt-2 text-[10px] font-mono opacity-80">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{stage.durationEst}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Card with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedStage.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-8 rounded-2xl bg-white/15 border border-white/25 p-6 sm:p-8 backdrop-blur-md"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="font-bold text-white uppercase tracking-wider">
                  Phase {selectedStage.stepNumber} of 06
                </span>
                <span className="opacity-60">•</span>
                <span className="px-2.5 py-0.5 rounded-full bg-white text-[var(--page-accent-fg)] font-bold uppercase text-[10px]">
                  {selectedStage.agencyType}
                </span>
                <span className="opacity-60">•</span>
                <span className="text-white/80">Window: {selectedStage.durationEst}</span>
              </div>

              <div>
                <h4 className="text-2xl sm:text-3xl font-editorial font-bold text-white">
                  {selectedStage.title}
                </h4>
                <p className="text-xs font-mono text-white/80 mt-1">
                  {selectedStage.subtitle}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/20 border border-white/15 text-xs">
                <span className="font-mono text-white/80 uppercase tracking-wider text-[10px] block mb-1">
                  Player Cognitive Focus:
                </span>
                <p className="text-white font-sans text-sm">
                  {selectedStage.cognitiveFocus}
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                  Sandfall Interactive Mechanic Solution:
                </div>
                <p className="text-sm text-white/90 leading-relaxed font-sans">
                  {selectedStage.expeditionSolution}
                </p>
              </div>

              <div className="text-xs text-white/80 font-sans pt-2 border-t border-white/15">
                <strong className="text-white">Moment-to-Moment Consequence:</strong>{" "}
                {selectedStage.gameplayConsequence}
              </div>
            </div>

            {/* Right */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-black/30 border border-white/20">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#e8b04b] font-bold mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#e8b04b]" />
                  The Classic Genre Flaw
                </div>
                <p className="text-xs text-white/85 leading-relaxed font-sans">
                  {selectedStage.classicRpgFlaw}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/20 border border-white/30">
                <div className="text-[10px] font-mono uppercase tracking-wider text-white font-bold mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  Product Strategy Impact
                </div>
                <p className="text-xs text-white font-sans leading-relaxed">
                  {selectedStage.productMetricImpact}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
