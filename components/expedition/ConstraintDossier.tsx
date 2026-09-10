"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

export function ConstraintDossier() {
  const tradeOffs = [
    {
      decision: "Active Defense in Turn-Based vs Real-Time Action",
      selected: "Active Defense in Turn-Based",
      rejected: "Full Real-Time Action / Souls-like",
      rationale:
        "Switching to real-time action introduces severe physics, hit-box networking, and high asset animation overhead. By keeping a turn-based grid, Sandfall achieved AAA kinetic feel with 1/5th the programming overhead.",
      pmLesson: "Solve the emotional feeling of action without incurring full real-time technical debt.",
    },
    {
      decision: "Linear Crafted World vs Open-World Sandbox",
      selected: "High-Fidelity Linear Path",
      rejected: "Sprawling Open World",
      rationale:
        "Open worlds require procedural quests, streaming optimization, mount mechanics, and huge QA teams. A tight linear path allowed them to pour their UE5 graphical budget into breathtaking visual moments.",
      pmLesson: "Ruthless scope reduction creates room for artistic perfection.",
    },
    {
      decision: "Core Combat Loop Depth vs Multiple Sub-systems",
      selected: "Mastery of Parry/Dodge & Synergies",
      rejected: "Fishing, Base Building, Crafting minigames",
      rationale:
        "Many RPGs ship superficial mini-systems that dilute player focus. Sandfall concentrated all engineering resources on making the single moment-to-moment loop feel immaculate.",
      pmLesson: "Players judge an RPG by what they do every 10 seconds, not what they do once an hour.",
    },
  ];

  return (
    <div className="rounded-3xl border border-white/30 bg-black/25 backdrop-blur-xl p-6 sm:p-9 text-white shadow-2xl space-y-6">
      <div className="pb-6 border-b border-white/20">
        <span className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold">
          Product Scoping & Engineering Under Constraints
        </span>
        <h3 className="text-2xl sm:text-3xl font-editorial text-white font-normal mt-1">
          The Indie Studio Trilemma: Scope, Polish, and Budget
        </h3>
        <p className="text-sm text-white/85 mt-1 max-w-2xl font-sans">
          Sandfall Interactive is a small independent studio. They had to deliver a game that
          could compete with $100M+ AAA titles on a fraction of the budget.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-2">
        {tradeOffs.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl bg-white/10 border border-white/20 flex flex-col justify-between space-y-4 backdrop-blur-md"
          >
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase text-white/70 tracking-wider">
                Decision 0{idx + 1}
              </div>
              <h4 className="text-base font-editorial font-bold text-white leading-snug">
                {item.decision}
              </h4>

              {/* Chosen vs Rejected */}
              <div className="space-y-2 pt-1 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-white text-[var(--page-accent-fg)] font-bold flex items-center gap-2 shadow-sm">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Chosen: {item.selected}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/30 text-white/80 border border-white/15 flex items-center gap-2">
                  <X className="w-4 h-4 shrink-0 text-white/60" />
                  <span>Rejected: {item.rejected}</span>
                </div>
              </div>

              <p className="text-xs text-white/90 font-sans leading-relaxed pt-2">
                {item.rationale}
              </p>
            </div>

            <div className="pt-3 border-t border-white/15 text-xs font-sans text-white bg-white/10 p-3 rounded-xl">
              <strong>Product Insight:</strong> {item.pmLesson}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
