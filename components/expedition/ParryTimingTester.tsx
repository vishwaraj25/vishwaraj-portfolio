"use client";

import React, { useState, useEffect, useRef } from "react";
import { Shield, AlertTriangle, Play, RefreshCw, Trophy } from "lucide-react";


export function ParryTimingTester() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<"idle" | "perfect" | "dodge" | "miss" | "early">("idle");
  const [stats, setStats] = useState({ perfectCount: 0, dodgeCount: 0, missCount: 0 });
  const [reactionMs, setReactionMs] = useState<number | null>(null);

  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const isActionTakenRef = useRef<boolean>(false);

  const startSimulation = () => {
    if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current);
    setIsPlaying(true);
    setProgress(0);
    setResult("idle");
    setReactionMs(null);
    isActionTakenRef.current = false;
    startTimeRef.current = performance.now();

    const attackDuration = 1600;

    const step = (timestamp: number) => {
      const elapsed = timestamp - startTimeRef.current;
      const currentProgress = Math.min(100, (elapsed / attackDuration) * 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        if (!isActionTakenRef.current) {
          setResult("miss");
          setStats((prev) => ({ ...prev, missCount: prev.missCount + 1 }));
        }
        animFrameRef.current = null;
        setIsPlaying(false);
      } else {
        animFrameRef.current = requestAnimationFrame(step);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  };

  const handleInput = () => {
    if (!isPlaying || isActionTakenRef.current) return;
    isActionTakenRef.current = true;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setIsPlaying(false);

    const elapsed = performance.now() - startTimeRef.current;
    setReactionMs(Math.round(elapsed));
    const inputProgress = Math.min(100, elapsed / 1600 * 100);
    setProgress(inputProgress);
    animFrameRef.current = null;

    if (inputProgress < 66) {
      setResult("early");
      setStats((prev) => ({ ...prev, missCount: prev.missCount + 1 }));
    } else if (inputProgress >= 78 && inputProgress <= 88) {
      setResult("perfect");
      setStats((prev) => ({ ...prev, perfectCount: prev.perfectCount + 1 }));
    } else if (inputProgress >= 66 && inputProgress <= 94) {
      setResult("dodge");
      setStats((prev) => ({ ...prev, dodgeCount: prev.dodgeCount + 1 }));
    } else {
      setResult("miss");
      setStats((prev) => ({ ...prev, missCount: prev.missCount + 1 }));
    }
  };

  useEffect(() => () => {
    if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current);
  }, []);

  return (
    <div className="rounded-3xl border border-white/30 bg-black/25 backdrop-blur-xl p-6 sm:p-9 text-white shadow-2xl space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-5 border-b border-white/20">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold">
            Interactive Mechanic Simulator
          </span>
          <h3 className="text-2xl sm:text-3xl font-editorial text-white font-normal mt-1">
            Test the Active Defense Reaction Window
          </h3>
          <p className="text-sm text-white/85 mt-1 font-sans max-w-xl">
            Start an attack, then press the same button when the marker reaches the gold
            zone. You can also use Space while the button is focused. This is an illustrative
            timing exercise, not a measurement of the game’s exact timing windows.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2.5 text-xs font-mono">
          <div className="text-center px-3 py-1.5 rounded-xl bg-white/15 border border-white/30">
            <div className="text-[10px] text-white/70 uppercase">Perfect</div>
            <div className="text-white font-bold text-sm">{stats.perfectCount}</div>
          </div>
          <div className="text-center px-3 py-1.5 rounded-xl bg-white/15 border border-white/30">
            <div className="text-[10px] text-white/70 uppercase">Dodge</div>
            <div className="text-white font-bold text-sm">{stats.dodgeCount}</div>
          </div>
          <div className="text-center px-3 py-1.5 rounded-xl bg-white/15 border border-white/30">
            <div className="text-[10px] text-white/70 uppercase">Miss</div>
            <div className="text-[#e8b04b] font-bold text-sm">{stats.missCount}</div>
          </div>
        </div>
      </div>

      {/* Timing Track */}
      <div className="py-4 space-y-3">
        <div className="flex items-center justify-between gap-4 text-xs font-mono text-white/80">
          <span>Enemy windup</span>
          <span>Impact</span>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-white/85">
          <span className="flex items-center gap-2"><span aria-hidden="true" className="h-3 w-3 border border-white/50 bg-white/15" />Dodge: 66–94%</span>
          <span className="flex items-center gap-2"><span aria-hidden="true" className="h-3 w-3 bg-[#d2b98a]" />Perfect parry: 78–88%</span>
        </div>

        {/* Track Bar */}
        <div className="relative h-14 w-full rounded-2xl bg-black/40 border border-white/30 overflow-hidden p-1 flex items-center shadow-inner">
          {/* Broad Dodge Window */}
          <div
            className="absolute top-1 bottom-1 bg-white/15 border-l border-r border-white/40 rounded-lg flex items-center justify-center text-[10px] font-mono text-white/80"
            style={{ left: "66%", width: "28%" }}
          >

          </div>

          {/* Tight Parry Window */}
          <div
            className="absolute top-1 bottom-1 bg-[#d2b98a] border-l-2 border-r-2 border-[#ead3a8] rounded-lg flex items-center justify-center text-[10px] font-mono font-bold text-[var(--page-accent-fg)] shadow-lg"
            style={{ left: "78%", width: "10%" }}
          >

          </div>

          {/* Indicator */}
          <div
            className="absolute top-1 bottom-1 w-1 rounded-full bg-white shadow-lg shadow-black transform -translate-x-1/2"
            style={{ left: `clamp(2px, ${progress}%, calc(100% - 2px))` }}
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={isPlaying ? handleInput : startSimulation}
              onKeyDown={(event) => { if (event.repeat) event.preventDefault(); }}
              className="min-h-12 w-full sm:w-64 px-5 py-3 rounded-2xl bg-[#d2b98a] text-[#171a19] font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2"
            >
              {isPlaying ? <Shield className="w-4 h-4 shrink-0" /> : <Play className="w-4 h-4 shrink-0" />}
              <span>{isPlaying ? "Parry / Dodge" : "Start enemy attack"}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current);
                animFrameRef.current = null;
                isActionTakenRef.current = true;
                setReactionMs(null);
                setStats({ perfectCount: 0, dodgeCount: 0, missCount: 0 });
                setProgress(0);
                setResult("idle");
                setIsPlaying(false);
              }}
              className="p-3.5 rounded-2xl bg-white/15 border border-white/25 text-white hover:bg-white/25 transition-colors"
              aria-label="Reset simulator"
              title="Reset simulator"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs font-mono text-white/80">
            {isPlaying ? (
              <span className="font-bold text-white">
                Wait for the gold zone
              </span>
            ) : (
              <span>Focus the attack button to use Space</span>
            )}
          </div>
        </div>
      </div>

      {/* Outcome result card */}
      {result !== "idle" && (
        <div
          role="status"
          className="p-5 rounded-2xl border border-white/30 bg-white/15 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white"
        >
          <div className="flex items-center gap-3">
            {result === "perfect" && <Trophy className="w-6 h-6 text-white shrink-0" />}
            {result === "dodge" && <Shield className="w-6 h-6 text-white shrink-0" />}
            {(result === "miss" || result === "early") && (
              <AlertTriangle className="w-6 h-6 text-[#e8b04b] shrink-0" />
            )}
            <div>
              <div className="font-editorial font-bold text-base tracking-wide">
                {result === "perfect" && "Perfect parry. Right inside the gold zone."}
                {result === "dodge" && "Clean dodge. Inside the wider safe zone."}
                {result === "early" && "Too early. Try waiting for the highlighted zone."}
                {result === "miss" && "Missed the window. Try again."}
              </div>
              <div className="text-xs text-white/80 mt-0.5 font-sans">
                {result === "perfect" &&
                  "Your input landed between 78% and 88% of this simulated attack."}
                {result === "dodge" &&
                  "Your input landed in the wider dodge zone, outside the perfect parry zone."}
                {result === "early" &&
                  "Your input arrived before the dodge zone began."}
                {result === "miss" &&
                  "The attack passed the safe zone before a successful input."}
              </div>
            </div>
          </div>

          {reactionMs !== null && (
            <div className="text-right shrink-0 font-mono text-xs border-t sm:border-t-0 sm:border-l border-white/20 pt-2 sm:pt-0 sm:pl-4">
              <span className="text-white/70">Time since attack:</span>
              <div className="text-base font-bold text-white">{reactionMs} ms</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
