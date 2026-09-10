"use client";

import React, { useState, useEffect, useRef } from "react";
import { Shield, Zap, AlertTriangle, Play, RefreshCw, Trophy } from "lucide-react";
import { motion } from "framer-motion";

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

    if (progress < 66) {
      setResult("early");
      setStats((prev) => ({ ...prev, missCount: prev.missCount + 1 }));
    } else if (progress >= 78 && progress <= 88) {
      setResult("perfect");
      setStats((prev) => ({ ...prev, perfectCount: prev.perfectCount + 1 }));
    } else if (progress >= 66 && progress <= 94) {
      setResult("dodge");
      setStats((prev) => ({ ...prev, dodgeCount: prev.dodgeCount + 1 }));
    } else {
      setResult("miss");
      setStats((prev) => ({ ...prev, missCount: prev.missCount + 1 }));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (isPlaying) {
          handleInput();
        } else {
          startSimulation();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, progress]);

  return (
    <div className="rounded-3xl border border-white/30 bg-black/25 backdrop-blur-xl p-6 sm:p-9 text-white shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/20">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold">
            Interactive Mechanic Simulator
          </span>
          <h3 className="text-2xl sm:text-3xl font-editorial text-white font-normal mt-1">
            Test the Active Defense Reaction Window
          </h3>
          <p className="text-sm text-white/85 mt-1 font-sans max-w-xl">
            Experience why real-time defense eliminates passive downtime. Hit{" "}
            <strong className="text-white underline">SPACE</strong> or click the trigger when the
            indicator enters the golden parry window.
          </p>
        </div>

        <div className="flex items-center gap-2.5 text-xs font-mono">
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
        <div className="flex items-center justify-between text-xs font-mono text-white/80">
          <span>Enemy Telegraph Windup</span>
          <span className="font-bold text-white bg-white/20 px-2.5 py-0.5 rounded-full">
            Target: 78% – 88% Window
          </span>
          <span>Impact Moment</span>
        </div>

        {/* Track Bar */}
        <div className="relative h-14 w-full rounded-2xl bg-black/40 border border-white/30 overflow-hidden p-1 flex items-center shadow-inner">
          {/* Broad Dodge Window */}
          <div
            className="absolute top-1 bottom-1 bg-white/15 border-l border-r border-white/40 rounded-lg flex items-center justify-center text-[10px] font-mono text-white/80"
            style={{ left: "66%", width: "28%" }}
          >
            <span className="hidden sm:inline font-bold">Dodge Window</span>
          </div>

          {/* Tight Parry Window */}
          <div
            className="absolute top-1 bottom-1 bg-white border-l-2 border-r-2 border-white rounded-lg flex items-center justify-center text-[10px] font-mono font-bold text-[var(--page-accent-fg)] shadow-lg"
            style={{ left: "78%", width: "10%" }}
          >
            <span>PARRY</span>
          </div>

          {/* Indicator */}
          <div
            className="absolute top-1 bottom-1 w-3 rounded-full bg-white shadow-lg shadow-white transition-all duration-75 transform -translate-x-1/2"
            style={{ left: `${progress}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {!isPlaying ? (
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={startSimulation}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white text-[var(--page-accent-fg)] font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-xl transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>Trigger Enemy Attack</span>
              </motion.button>
            ) : (
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={handleInput}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white text-[var(--page-accent-fg)] font-mono text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 shadow-2xl transition-transform animate-pulse"
              >
                <Shield className="w-4 h-4" />
                <span>PARRY / DODGE NOW! [SPACE]</span>
              </motion.button>
            )}

            <button
              type="button"
              onClick={() => {
                setProgress(0);
                setResult("idle");
                setIsPlaying(false);
              }}
              className="p-3.5 rounded-2xl bg-white/15 border border-white/25 text-white hover:bg-white/25 transition-colors"
              title="Reset"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs font-mono text-white/80">
            {isPlaying ? (
              <span className="font-bold text-white animate-pulse">
                ENEMY ATTACKING... REACT TO CUE
              </span>
            ) : (
              <span>Tip: Hit [Space] or click to trigger</span>
            )}
          </div>
        </div>
      </div>

      {/* Outcome result card */}
      {result !== "idle" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
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
                {result === "perfect" && "PERFECT PARRY! (+1 AP, Counter-Attack Armed)"}
                {result === "dodge" && "CLEAN DODGE (Damage Evaded, Neutral Reset)"}
                {result === "early" && "TOO EARLY! Character in Recovery Lag (-420 HP)"}
                {result === "miss" && "TOO LATE! DIRECT HIT TAKEN (-520 HP)"}
              </div>
              <div className="text-xs text-white/80 mt-0.5 font-sans">
                {result === "perfect" &&
                  "Player mastery rewarded: 0 damage taken, enemy staggered, camera snaps to counter."}
                {result === "dodge" &&
                  "Accessible safety baseline: low-risk defense suitable for hybrid players."}
                {result === "early" &&
                  "Timing mismatch: pressing before apex leaves player completely exposed."}
                {result === "miss" &&
                  "Downtime penalty: looking away during enemy turn results in heavy loss."}
              </div>
            </div>
          </div>

          {reactionMs && (
            <div className="text-right shrink-0 font-mono text-xs border-t sm:border-t-0 sm:border-l border-white/20 pt-2 sm:pt-0 sm:pl-4">
              <span className="text-white/70">Elapsed Reaction:</span>
              <div className="text-base font-bold text-white">{reactionMs} ms</div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
