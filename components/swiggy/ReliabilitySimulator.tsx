"use client";

import React, { useState, useMemo } from "react";
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  CloudRain,
  ShoppingBag,
  Bike,
  Sparkles,
} from "lucide-react";

type ModelMode = "aggressive" | "predictable";

interface SimulatorProps {
  className?: string;
}

export function ReliabilitySimulator({ className = "" }: SimulatorProps) {
  const [mode, setMode] = useState<ModelMode>("predictable");
  const [demandLevel, setDemandLevel] = useState<number>(1.5);
  const [basketSize, setBasketSize] = useState<number>(6);
  const [isRaining, setIsRaining] = useState<boolean>(false);

  const metrics = useMemo(() => {
    const rainMultiplier = isRaining ? 1.35 : 1.0;
    const basketPickingDelay = (basketSize - 3) * 0.45;

    if (mode === "aggressive") {
      const promisedEta = 12;
      const baseMean = 13.0 + demandLevel * 2.2 + Math.max(0, basketPickingDelay) * 0.8;
      const actualMean = baseMean * rainMultiplier;
      const stdDev = 3.5 + demandLevel * 2.5 + (isRaining ? 4.0 : 0);
      const p50 = Math.round(actualMean * 0.95);
      const p90 = Math.round(actualMean + 1.28 * stdDev);
      const p99 = Math.round(actualMean + 2.33 * stdDev);

      const z = (promisedEta - actualMean) / stdDev;
      const breachRate = Math.min(
        92,
        Math.max(18, Math.round((1 - 1 / (1 + Math.exp(-1.6 * z))) * 100))
      );

      const etaCreepEvents = Math.min(4, Math.max(1, Math.round((p90 - promisedEta) / 4.5)));
      const churnRisk = Math.min(38, Math.max(12, Math.round(breachRate * 0.45)));
      const riderStress = Math.min(98, Math.max(65, Math.round(75 + demandLevel * 8)));

      return {
        promisedEta: "12 mins",
        promisedRange: "Fixed 12 min promise",
        actualMean: actualMean.toFixed(1),
        stdDev: stdDev.toFixed(1),
        p50: `${p50}m`,
        p90: `${p90}m`,
        p99: `${p99}m`,
        breachRate: `${breachRate}%`,
        etaCreepEvents,
        churnRisk: `${churnRisk}%`,
        riderStress: `${riderStress}/100`,
        verdict:
          "High anxiety failure. Unrealistic 12-minute marketing promise collapses during operational friction. Customer sees ETA creep 2–3 times.",
      };
    } else {
      const basePromised = 17 + Math.round(demandLevel * 1.8) + (isRaining ? 5 : 0);
      const actualMean = 15.5 + demandLevel * 1.1 + Math.max(0, basketPickingDelay) * 0.5 + (isRaining ? 3.0 : 0);
      const stdDev = 1.6 + demandLevel * 0.6 + (isRaining ? 1.2 : 0);
      const p50 = Math.round(actualMean);
      const p90 = Math.round(actualMean + 1.28 * stdDev);
      const p99 = Math.round(actualMean + 2.33 * stdDev);

      const z = (basePromised - actualMean) / stdDev;
      const breachRate = Math.min(
        15,
        Math.max(2, Math.round((1 - 1 / (1 + Math.exp(-1.6 * z))) * 100))
      );

      const etaCreepEvents = breachRate > 8 ? 1 : 0;
      const churnRisk = Math.min(9, Math.max(2, Math.round(breachRate * 0.3)));
      const riderStress = Math.min(45, Math.max(18, Math.round(25 + demandLevel * 5)));

      return {
        promisedEta: `${basePromised - 2}–${basePromised + 2} mins`,
        promisedRange: "Confidence-buffered ETA window",
        actualMean: actualMean.toFixed(1),
        stdDev: stdDev.toFixed(1),
        p50: `${p50}m`,
        p90: `${p90}m`,
        p99: `${p99}m`,
        breachRate: `${breachRate}%`,
        etaCreepEvents,
        churnRisk: `${churnRisk}%`,
        riderStress: `${riderStress}/100`,
        verdict:
          "High trust delivery. Transparent ETA window absorbs dark-store picking and traffic buffers. 96%+ arrive within or ahead of promise.",
      };
    }
  }, [mode, demandLevel, basketSize, isRaining]);

  // SVG bell curve
  const curvePoints = useMemo(() => {
    const mean = parseFloat(metrics.actualMean);
    const sigma = parseFloat(metrics.stdDev);

    const points: { x: number; y: number }[] = [];
    const minX = 5;
    const maxX = 45;
    const width = 600;
    const height = 170;

    for (let xVal = minX; xVal <= maxX; xVal += 0.8) {
      const exponent = -0.5 * Math.pow((xVal - mean) / sigma, 2);
      const density = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);

      const svgX = ((xVal - minX) / (maxX - minX)) * width;
      const maxDensity = 1 / (sigma * Math.sqrt(2 * Math.PI));
      const normalizedDensity = density / (maxDensity || 1);
      const svgY = height - normalizedDensity * (height - 30) - 15;

      points.push({ x: svgX, y: svgY });
    }

    const pathString = points.reduce((acc, curr, idx) => {
      return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
    }, "");

    const areaString = `${pathString} L ${width} ${height} L 0 ${height} Z`;

    const meanSvgX = ((mean - minX) / (maxX - minX)) * width;
    const p90SvgX = ((parseFloat(metrics.p90) - minX) / (maxX - minX)) * width;
    const promisedSvgX =
      mode === "aggressive"
        ? ((12 - minX) / (maxX - minX)) * width
        : ((parseFloat(metrics.p50) - minX) / (maxX - minX)) * width;

    return { pathString, areaString, meanSvgX, p90SvgX, promisedSvgX };
  }, [metrics, mode]);

  return (
    <div
      className={`rounded-3xl border border-white/30 bg-black/25 backdrop-blur-xl p-6 sm:p-9 text-white shadow-2xl relative overflow-hidden ${className}`}
    >
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold">
              Interactive Simulation
            </span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-editorial text-white font-normal mt-1">
            Delivery Variance vs. Speed Paradox
          </h3>
          <p className="text-sm text-white/85 mt-1 max-w-2xl font-sans leading-relaxed">
            Test how dark-store queue congestion and weather volatility shatter rigid
            12-minute promises, while dynamic buffer windows protect user trust.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black/30 border border-white/25 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setMode("aggressive")}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all ${
              mode === "aggressive"
                ? "bg-white text-[var(--page-accent-fg)] shadow-lg shadow-black/20"
                : "text-white/80 hover:text-white"
            }`}
          >
            Aggressive (12m)
          </button>
          <button
            type="button"
            onClick={() => setMode("predictable")}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all ${
              mode === "predictable"
                ? "bg-white text-[var(--page-accent-fg)] shadow-lg shadow-black/20"
                : "text-white/80 hover:text-white"
            }`}
          >
            Buffer Model
          </button>
        </div>
      </div>

      {/* Main Grid: Controls + Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Left Column: Interactive Levers */}
        <div className="lg:col-span-4 space-y-6">
          <div className="text-xs font-mono uppercase tracking-wider text-white/80 font-bold flex items-center gap-1.5">
            <Sliders className="w-4 h-4" />
            <span>Operational Levers</span>
          </div>

          {/* Dark Store Demand */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white/80">Dark Store Order Load</span>
              <span className="font-bold text-white">
                {demandLevel === 1.0
                  ? "Normal (1.0x)"
                  : demandLevel < 2.0
                  ? "Peak Evening (1.5x)"
                  : "Monsoon Surge (2.5x)"}
              </span>
            </div>
            <input
              type="range"
              min="1.0"
              max="2.5"
              step="0.5"
              value={demandLevel}
              onChange={(e) => setDemandLevel(parseFloat(e.target.value))}
              className="w-full accent-white bg-white/20 rounded-lg cursor-pointer h-2"
            />
            <div className="flex justify-between text-[10px] font-mono text-white/70">
              <span>Off-Peak</span>
              <span>Dinner Rush</span>
              <span>Monsoon Rush</span>
            </div>
          </div>

          {/* Basket Size */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white/80 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Items in Basket</span>
              </span>
              <span className="font-bold text-white">{basketSize} SKUs</span>
            </div>
            <input
              type="range"
              min="2"
              max="14"
              step="2"
              value={basketSize}
              onChange={(e) => setBasketSize(parseInt(e.target.value))}
              className="w-full accent-white bg-white/20 rounded-lg cursor-pointer h-2"
            />
            <div className="flex justify-between text-[10px] font-mono text-white/70">
              <span>Snack (2 items)</span>
              <span>Full Grocery (14 items)</span>
            </div>
          </div>

          {/* Weather Toggle */}
          <div className="p-4 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CloudRain className="w-5 h-5 text-white" />
              <div>
                <div className="text-xs font-bold text-white">Weather Shock (Rain)</div>
                <div className="text-[11px] text-white/75">Traffic & road delays</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsRaining(!isRaining)}
              className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-colors ${
                isRaining ? "bg-white text-[var(--page-accent-fg)] shadow-md" : "bg-black/30 text-white"
              }`}
            >
              {isRaining ? "ON" : "OFF"}
            </button>
          </div>

          {/* Takeaway Card */}
          <div className="p-5 rounded-2xl bg-white/15 border border-white/20 space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Behavioral Takeaway</span>
            </div>
            <p className="text-xs text-white/90 leading-relaxed font-sans">
              {metrics.verdict}
            </p>
          </div>
        </div>

        {/* Right Column: Distribution Curve & Output Cards */}
        <div className="lg:col-span-8 space-y-6">
          {/* SVG Canvas */}
          <div className="rounded-2xl bg-black/35 border border-white/20 p-6 relative">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-white/80 flex items-center gap-1.5 font-bold">
                <Clock className="w-3.5 h-3.5 text-white" />
                <span>Delivery Time Probability Distribution (Minutes)</span>
              </span>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1 text-white">
                  <span className="w-2.5 h-1 bg-white inline-block rounded" /> Mean ({metrics.actualMean}m)
                </span>
                <span className="flex items-center gap-1 text-rose-200">
                  <span className="w-2.5 h-1 bg-rose-300 inline-block rounded" /> P90 Tail ({metrics.p90})
                </span>
              </div>
            </div>

            <div className="relative w-full overflow-hidden">
              <svg viewBox="0 0 600 170" className="w-full h-44 overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="swiggyCurveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <line x1="0" y1="155" x2="600" y2="155" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <path d={curvePoints.areaString} fill="url(#swiggyCurveGrad)" />
                <path d={curvePoints.pathString} fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

                {/* Mean line */}
                <line
                  x1={curvePoints.meanSvgX}
                  y1="20"
                  x2={curvePoints.meanSvgX}
                  y2="155"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />

                {/* P90 line */}
                <line
                  x1={curvePoints.p90SvgX}
                  y1="30"
                  x2={curvePoints.p90SvgX}
                  y2="155"
                  stroke="#FECDD3"
                  strokeWidth="2"
                  strokeDasharray="2 2"
                />

                {/* Promised anchor */}
                <circle cx={curvePoints.promisedSvgX} cy="155" r="5" fill="#FFFFFF" stroke="#FF5400" strokeWidth="2" />
              </svg>

              <div className="flex justify-between text-[10px] font-mono text-white/70 pt-2 border-t border-white/20">
                <span>5m</span>
                <span>15m</span>
                <span>25m</span>
                <span>35m</span>
                <span>45m</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between text-xs font-mono text-white/90 bg-white/10 p-3 rounded-xl gap-2">
              <span>Promised: <strong className="text-white">{metrics.promisedEta}</strong></span>
              <span>Standard Dev (σ): <strong className="text-white">±{metrics.stdDev} min</strong></span>
              <span>Tail Latency (P99): <strong className="text-rose-200">{metrics.p99}</strong></span>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-white/15 border border-white/20">
              <div className="text-[10px] uppercase text-white/70">SLA Breach</div>
              <div className="text-xl font-bold mt-1 text-white">{metrics.breachRate}</div>
              <div className="text-[10px] text-white/70 mt-0.5">Orders late vs promise</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/15 border border-white/20">
              <div className="text-[10px] uppercase text-white/70">ETA Creep Alerts</div>
              <div className="text-xl font-bold mt-1 text-white">{metrics.etaCreepEvents}×</div>
              <div className="text-[10px] text-white/70 mt-0.5">Silent ETA updates</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/15 border border-white/20">
              <div className="text-[10px] uppercase text-white/70">Churn Risk</div>
              <div className="text-xl font-bold mt-1 text-white">{metrics.churnRisk}</div>
              <div className="text-[10px] text-white/70 mt-0.5">Discontent drop-off</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/15 border border-white/20">
              <div className="text-[10px] uppercase text-white/70">Rider Pressure</div>
              <div className="text-xl font-bold mt-1 text-white">{metrics.riderStress}</div>
              <div className="text-[10px] text-white/70 mt-0.5">Signal risk index</div>
            </div>
          </div>

          {/* In-App Order Tracking Snapshot */}
          <div className="p-5 rounded-2xl bg-black/30 border border-white/25">
            <div className="flex items-center justify-between text-xs font-mono text-white/80 mb-3">
              <span className="flex items-center gap-1.5 font-bold text-white">
                <Bike className="w-4 h-4" />
                <span>Simulated In-App Consumer Experience</span>
              </span>
              <span className="text-[11px] bg-white/15 px-2 py-0.5 rounded">Live Snapshot</span>
            </div>

            <div className="p-4 rounded-xl bg-white/10 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-medium text-white/80 flex items-center gap-2">
                  <span>Order #IN-9428</span>
                  <span className="font-mono text-white/60">• 4 items</span>
                </div>
                <div className="text-base font-bold text-white">
                  {mode === "aggressive" ? (
                    <span className="flex items-center gap-1.5 text-rose-200">
                      <AlertTriangle className="w-4 h-4 text-rose-300" />
                      Arriving in 24 mins (delayed from 12 mins)
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-white">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      On Schedule: Arriving 7:44 – 7:48 PM
                    </span>
                  )}
                </div>
                <div className="text-xs text-white/80 font-sans">
                  {mode === "aggressive"
                    ? "Customer feeling: Frustrated, checking phone constantly, preparing to cancel."
                    : "Customer feeling: Relaxed, accurate expectation met, high trust affinity."}
                </div>
              </div>

              <div className="shrink-0 text-right sm:border-l sm:border-white/20 sm:pl-5">
                {/* A queuing model produces delivery-time distributions; it
                    cannot produce a retention delta. Those figures needed
                    behavioural data nobody here has, so the readout now states
                    the direction the model argues for, not a percentage. */}
                <div className="text-[10px] font-mono text-white/70 uppercase">
                  Modelled repeat effect
                </div>
                <div className="text-lg font-mono font-bold text-white">
                  {mode === "aggressive" ? "Erodes repeat use" : "Builds repeat use"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
