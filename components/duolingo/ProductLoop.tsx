"use client";

import React, { useState } from "react";
import { BookOpen, MessagesSquare, Gauge, Repeat, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Phase {
  id: string;
  step: string;
  title: string;
  icon: React.ElementType;
  today: string;
  realWorld: string;
  signal: string;
}

const PHASES: Phase[] = [
  {
    id: "learn",
    step: "01",
    title: "Learn",
    icon: BookOpen,
    today: "Structured lesson: vocabulary, translation, multiple choice, a scripted dialogue.",
    realWorld:
      "Unchanged. The existing path still teaches the language in a controlled, gamified way.",
    signal: "Course progress, vocabulary learned, grammar concepts introduced.",
  },
  {
    id: "apply",
    step: "02",
    title: "Apply",
    icon: MessagesSquare,
    today: "The learner earns XP and moves to the next lesson. Knowledge is never stress-tested.",
    realWorld:
      "A personalised AI mission drops the learner into a realistic situation — order breakfast, check into a hotel, where they have to produce language rather than pick an option.",
    signal: "Which scenarios attempted, hint usage, words actually spoken.",
  },
  {
    id: "evaluate",
    step: "03",
    title: "Evaluate",
    icon: Gauge,
    today: "Right / wrong on a single answer. No view of whether the learner can hold a conversation.",
    realWorld:
      "The mission is scored on four things: did they understand, did they respond, was the language ok, and could they recover if it broke down.",
    signal: "Per-skill scores feeding the learner profile.",
  },
  {
    id: "reinforce",
    step: "04",
    title: "Reinforce",
    icon: Repeat,
    today: "Spaced repetition on isolated words, disconnected from real use.",
    realWorld:
      "The Weak Spot Engine detects patterns (\"struggled with fast speech in 4 conversations\") and schedules short targeted practice, then re-tests the concept in a new scenario days later.",
    signal: "Delayed recall of targeted concepts; weakness closed or persisting.",
  },
  {
    id: "again",
    step: "05",
    title: "Apply again",
    icon: RotateCcw,
    today: "Not part of the current loop.",
    realWorld:
      "A different scene works the same weak spot in a context the learner has not seen. What matters is whether it transfers, not one correct answer.",
    signal: "How the readiness score moves across scenes over time.",
  },
];

export function ProductLoop() {
  const [active, setActive] = useState<Phase>(PHASES[1]);

  return (
    <div className="rounded-2xl border border-[var(--page-border)] bg-[var(--page-surface)] p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-6 border-b border-[var(--page-border)]">
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.14em] text-[var(--page-fg-muted)]">
            Interactive: the loop, reframed
          </div>
          <h3 className="text-xl sm:text-2xl font-editorial mt-1">
            Learn → Apply → Evaluate → Reinforce → Apply again
          </h3>
        </div>
        <div className="text-xs font-mono text-[var(--page-fg-muted)]">
          Today: <span className="text-[var(--page-fg)]">Learn → Earn XP → Continue</span>
        </div>
      </div>

      {/* Phase rail */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-6">
        {PHASES.map((p) => {
          const Icon = p.icon;
          const on = active.id === p.id;
          return (
            <motion.button
              key={p.id}
              type="button"
              onClick={() => setActive(p)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`p-3.5 rounded-xl text-left border transition-colors ${
                on
                  ? "bg-[var(--page-accent)] text-[var(--page-accent-fg)] border-[var(--page-accent)]"
                  : "bg-transparent border-[var(--page-border)] text-[var(--page-fg)] hover:bg-[var(--page-bg-alt)]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono opacity-70">{p.step}</span>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="text-sm font-bold mt-2">{p.title}</div>
            </motion.button>
          );
        })}
      </div>

      {/* Detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="p-4 rounded-xl border border-[var(--page-border)] bg-[var(--page-bg-alt)]">
            <div className="text-[10px] font-mono uppercase tracking-wide text-[var(--page-fg-muted)] mb-1.5">
              Today
            </div>
            <p className="text-sm leading-relaxed text-[var(--page-fg-muted)]">{active.today}</p>
          </div>
          <div className="p-4 rounded-xl border border-[var(--page-accent)]/40 bg-[var(--page-accent)]/10">
            <div className="text-[10px] font-mono uppercase tracking-wide text-[var(--page-highlight)] mb-1.5">
              With Real World
            </div>
            <p className="text-sm leading-relaxed text-[var(--page-fg)]">{active.realWorld}</p>
          </div>
          <div className="md:col-span-2 text-xs font-mono text-[var(--page-fg-muted)] pt-1">
            <span className="text-[var(--page-fg)]">Signal captured:</span> {active.signal}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
