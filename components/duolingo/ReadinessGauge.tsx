"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

interface Dim {
  k: string;
  v: number;
}

const DIMS: Dim[] = [
  { k: "Vocabulary", v: 84 },
  { k: "Listening", v: 68 },
  { k: "Speaking", v: 73 },
  { k: "Grammar", v: 81 },
  { k: "Recovery", v: 59 },
];

const OVERALL = 72;

/**
 * Real-World Readiness — a radial gauge for the overall score plus animated
 * per-dimension bars. Everything fills once when scrolled into view.
 */
export function ReadinessGauge() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, OVERALL, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setScore(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView]);

  const R = 52;
  const C = 2 * Math.PI * R;
  const pct = score / 100;

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-[var(--page-border)] bg-[var(--page-surface)] p-6 sm:p-7 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-7 items-center"
    >
      {/* Radial */}
      <div className="relative w-[140px] h-[140px] mx-auto">
        <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
          <circle
            cx="70"
            cy="70"
            r={R}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeWidth="10"
          />
          <circle
            cx="70"
            cy="70"
            r={R}
            fill="none"
            stroke="var(--page-accent)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - pct)}
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="font-editorial text-4xl leading-none">{score}</div>
            <div className="text-[9px] font-mono uppercase tracking-wide text-[var(--page-fg-muted)] mt-1">
              / 100
            </div>
          </div>
        </div>
      </div>

      {/* Bars */}
      <div className="space-y-2.5 font-mono text-xs w-full">
        <div className="text-[10px] uppercase tracking-wide text-[var(--page-fg-muted)] mb-1">
          Real-World Readiness — Spanish
        </div>
        {DIMS.map((d, i) => (
          <div key={d.k} className="flex items-center gap-3">
            <span className="w-20 text-[var(--page-fg-muted)] shrink-0">{d.k}</span>
            <div className="flex-1 h-2 rounded-full bg-[var(--page-bg-alt)] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-[var(--page-accent)]"
                initial={{ width: 0 }}
                animate={inView ? { width: `${d.v}%` } : {}}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <span className="w-6 text-right">{d.v}</span>
          </div>
        ))}
        <p className="text-[10px] text-[var(--page-fg-muted)] pt-1 leading-relaxed normal-case">
          Never “72% fluent” — “across the scenarios you’ve practised, you’re performing at this
          level.”
        </p>
      </div>
    </div>
  );
}
