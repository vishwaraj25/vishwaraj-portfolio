"use client";

import React, { useState } from "react";
import { RotateCcw, Coffee, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * A scripted walk-through of one "Real World" mission. It is not a real
 * speech engine. It shows the interaction model: the learner has to
 * produce language, the conversation branches on one unscripted turn, and
 * the mission ends on a per-skill read rather than pass/fail.
 */

type NodeId = "start" | "ordered" | "clarify" | "recovered" | "done";

interface Choice {
  label: string;
  to: NodeId;
  note?: string;
}

interface Node {
  speaker: string;
  line: string;
  sub?: string;
  choices: Choice[];
}

const SCRIPT: Record<Exclude<NodeId, "done">, Node> = {
  start: {
    speaker: "Barista",
    line: "¡Buenos días! ¿Qué quieres tomar?",
    sub: "Good morning! What would you like?",
    choices: [
      { label: "“Quiero un café con leche.”", to: "ordered", note: "Retrieved from memory, not picked from a list." },
    ],
  },
  ordered: {
    speaker: "Barista",
    line: "Claro. ¿Lo quieres para aquí o para llevar?",
    sub: "An unscripted turn. This phrasing was never taught directly.",
    choices: [
      { label: "“Para llevar, por favor.”", to: "recovered", note: "Understood and answered under uncertainty." },
      { label: "“Perdona, ¿puedes repetir?”", to: "clarify", note: "Chose to repair instead of guessing." },
    ],
  },
  clarify: {
    speaker: "Barista",
    line: "Sí, ¿para tomar aquí... o para llevar?",
    sub: "Slower and simpler. Difficulty drops after the learner asks for a repeat.",
    choices: [
      { label: "“Para llevar.”", to: "recovered", note: "Recovered the exchange after a breakdown." },
    ],
  },
  recovered: {
    speaker: "Barista",
    line: "Perfecto. Son tres euros con cincuenta.",
    sub: "¿Algo más? Closing the interaction.",
    choices: [
      { label: "“No, gracias. Aquí tienes.”", to: "done", note: "Task completed: coffee ordered, paid, closed." },
    ],
  },
};

const RESULT = {
  score: 82,
  dims: [
    { k: "Speaking", v: 86 },
    { k: "Comprehension", v: 71 },
    { k: "Vocabulary", v: 89 },
    { k: "Recovery", v: 64 },
  ],
  ready: ["Café conversations", "Basic shopping"],
  next: ["Fast speech", "Asking for clarification"],
};

export function MissionSimulator() {
  const [node, setNode] = useState<NodeId>("start");
  const [trail, setTrail] = useState<string[]>([]);

  const reset = () => {
    setNode("start");
    setTrail([]);
  };

  const choose = (c: Choice) => {
    setTrail((t) => [...t, c.note ?? c.label]);
    setNode(c.to);
  };

  return (
    <div className="rounded-2xl border border-[var(--page-border)] bg-[var(--page-surface)] p-6 sm:p-8">
      <div className="flex items-center justify-between pb-5 border-b border-[var(--page-border)]">
        <div className="flex items-center gap-2 text-sm font-bold">
          <Coffee className="w-4 h-4 text-[var(--page-accent)]" />
          Mission: breakfast in Madrid
        </div>
        <button
          type="button"
          onClick={reset}
          className="text-xs font-mono text-[var(--page-fg-muted)] hover:text-[var(--page-fg)] flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Restart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        {/* Conversation */}
        <div className="lg:col-span-7 space-y-4 min-h-[220px]">
          <AnimatePresence mode="wait">
            {node !== "done" ? (
              <motion.div
                key={node}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="text-[10px] font-mono uppercase tracking-wide text-[var(--page-fg-muted)]">
                  {SCRIPT[node].speaker}
                </div>
                <p className="text-lg sm:text-xl font-editorial leading-snug">
                  “{SCRIPT[node].line}”
                </p>
                {SCRIPT[node].sub && (
                  <p className="text-xs text-[var(--page-fg-muted)] font-sans">{SCRIPT[node].sub}</p>
                )}
                <div className="space-y-2 pt-2">
                  {SCRIPT[node].choices.map((c) => (
                    <button
                      key={c.label}
                      type="button"
                      onClick={() => choose(c)}
                      className="w-full text-left px-4 py-3 rounded-xl border border-[var(--page-border)] hover:border-[var(--page-accent)] hover:bg-[var(--page-accent)]/10 transition-colors flex items-center gap-3"
                    >
                      <Mic className="w-3.5 h-3.5 text-[var(--page-accent)] shrink-0" />
                      <span className="text-sm">{c.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border border-[var(--page-accent)]/40 bg-[var(--page-accent)]/10 p-5 space-y-4"
              >
                <div className="flex items-baseline justify-between">
                  <div className="text-sm font-bold">Mission complete</div>
                  <div className="font-editorial text-2xl">
                    {RESULT.score}
                    <span className="text-sm text-[var(--page-fg-muted)]">/100</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  {RESULT.dims.map((d) => (
                    <div key={d.k}>
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-[var(--page-fg-muted)]">{d.k}</span>
                        <span>{d.v}</span>
                      </div>
                      <div className="h-1.5 mt-1 rounded-full bg-[var(--page-bg-alt)] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[var(--page-accent)]"
                          style={{ width: `${d.v}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-xs font-sans text-[var(--page-fg-muted)] pt-1 border-t border-[var(--page-border)]">
                  <span className="text-[var(--page-fg)] font-semibold">Ready for:</span>{" "}
                  {RESULT.ready.join(" · ")}
                  <br />
                  <span className="text-[var(--page-fg)] font-semibold">Practice next:</span>{" "}
                  {RESULT.next.join(" · ")}. The low recovery score sends the learner into targeted practice.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* What just got measured */}
        <div className="lg:col-span-5">
          <div className="text-[10px] font-mono uppercase tracking-wide text-[var(--page-fg-muted)] mb-2">
            What the mission is measuring
          </div>
          <ol className="space-y-2">
            {trail.length === 0 && (
              <li className="text-xs text-[var(--page-fg-muted)] font-sans">
                Make a choice on the left. Each turn writes a signal to the learner model.
              </li>
            )}
            {trail.map((t, i) => (
              <li key={i} className="text-xs font-sans flex gap-2">
                <span className="font-mono text-[var(--page-accent)] shrink-0">{i + 1}.</span>
                <span className="text-[var(--page-fg-muted)]">{t}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
