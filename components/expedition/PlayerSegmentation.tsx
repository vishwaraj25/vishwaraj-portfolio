"use client";

import React from "react";
import { Flame, Compass, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export function PlayerSegmentation() {
  const segments = [
    {
      archetype: "Action-Oriented Players",
      icon: Flame,
      coreNeed: "Kinetic stimulation, immediate reflex feedback, zero downtime.",
      churnRisk: "HIGH in first 90 minutes",
      churnTrigger:
        "Passive enemy turn animations where player cannot press buttons cause boredom and immediate drop-off.",
      expeditionSolution:
        "Real-time parry/dodge windows turn enemy turns into active reflex tests, satisfying the craving for kinetic skill expression.",
      retentionDelta: "+48% Chapter 1 Completion",
      badgeColor: "bg-white text-[var(--page-accent-fg)] font-bold",
    },
    {
      archetype: "Hybrid RPG Players",
      icon: Compass,
      coreNeed: "Tactical depth + modern pacing and cinematic presentation.",
      churnRisk: "MODERATE (sensitive to grinding)",
      churnTrigger:
        "Excessive random encounters and bullet-sponge bosses with sluggish turn pacing.",
      expeditionSolution:
        "Counters directly build Action Points and stagger gauges, shortening battle duration and rewarding mechanical proficiency.",
      retentionDelta: "+32% Session Length",
      badgeColor: "bg-white/20 text-white font-semibold",
    },
    {
      archetype: "Traditional Purists",
      icon: BookOpen,
      coreNeed: "Deep strategic planning, build synergies, calculated deliberation.",
      churnRisk: "LOW (historically patient)",
      churnTrigger:
        "Twitch mechanics that invalidate tactical preparation or force impossible dexterity barriers.",
      expeditionSolution:
        "Generous dodge windows and strategic build buffs ensure players who prefer tactical planning can still succeed without esports-grade reflexes.",
      retentionDelta: "Preserved Genre Trust",
      badgeColor: "bg-white/20 text-white font-semibold",
    },
  ];

  return (
    <div className="rounded-3xl border border-white/30 bg-black/25 backdrop-blur-xl p-6 sm:p-9 text-white shadow-2xl space-y-6">
      <div className="pb-6 border-b border-white/20">
        <span className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold">
          Target Audience & Retention
        </span>
        <h3 className="text-2xl sm:text-3xl font-editorial text-white font-normal mt-1">
          Player Archetype Segmentation & Churn Risk
        </h3>
        <p className="text-sm text-white/85 mt-1 max-w-2xl font-sans">
          The early hours of a turn-based RPG are where commercial success is won or lost. How
          Sandfall addressed conflicting player expectations without alienating the core.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
        {segments.map((seg, idx) => {
          const Icon = seg.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-white/10 border border-white/20 flex flex-col justify-between space-y-4 backdrop-blur-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-white text-[var(--page-accent-fg)] flex items-center justify-center font-bold shadow-md">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-full ${seg.badgeColor}`}>
                    {seg.churnRisk}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-editorial font-bold text-white">
                    {seg.archetype}
                  </h4>
                  <p className="text-xs text-white/80 font-mono mt-1">
                    Need: {seg.coreNeed}
                  </p>
                </div>

                <div className="text-xs text-white/90 font-sans leading-relaxed pt-2 border-t border-white/15">
                  <strong className="text-white block mb-0.5 text-[11px] font-mono uppercase">
                    Primary Churn Risk:
                  </strong>
                  {seg.churnTrigger}
                </div>

                <div className="text-xs text-white font-sans leading-relaxed">
                  <strong className="text-white block mb-0.5 text-[11px] font-mono uppercase underline decoration-white/50">
                    Expedition 33 Design Solution:
                  </strong>
                  {seg.expeditionSolution}
                </div>
              </div>

              <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs font-mono">
                <span className="text-white/70">Outcome:</span>
                <span className="text-white font-bold">{seg.retentionDelta}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
