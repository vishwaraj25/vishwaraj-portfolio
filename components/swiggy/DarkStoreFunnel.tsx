"use client";

import React, { useState } from "react";
import { Barcode, Package, Bike, MapPin, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FunnelStage {
  id: string;
  step: string;
  name: string;
  icon: React.ElementType;
  targetTime: string;
  varianceRange: string;
  riskFactor: string;
  description: string;
  bottlenecks: string[];
  pmMetric: string;
}

const STAGES: FunnelStage[] = [
  {
    id: "picking",
    step: "Stage 01",
    name: "Dark Store Picking",
    icon: Barcode,
    targetTime: "2.5 mins",
    varianceRange: "1.8 – 6.5 mins",
    riskFactor: "High Variance",
    description:
      "Pickers receive batch manifests on handheld terminals (HHT). High SKU density and illogical aisle layout create immediate friction.",
    bottlenecks: [
      "Inventory sync lag (app says in stock, bin is empty)",
      "Picker path optimization failures during store peak traffic",
      "Manual replacement confirmation dialogue with user",
    ],
    pmMetric: "Pick Time per SKU (Target: <22s)",
  },
  {
    id: "bagging",
    step: "Stage 02",
    name: "Bagging & Staging",
    icon: Package,
    targetTime: "1.2 mins",
    varianceRange: "0.8 – 3.0 mins",
    riskFactor: "Low-Med Variance",
    description:
      "Weight checks to prevent missing items, temperature separation (chilled dairy vs hot items), sealing tamper-proof bags.",
    bottlenecks: [
      "Weight mismatch trigger requiring manual supervisor override",
      "Staging rack congestion during sudden 7 PM surge",
    ],
    pmMetric: "Barcode Scan-to-Bag Latency",
  },
  {
    id: "dispatch",
    step: "Stage 03",
    name: "Rider Batching & Handoff",
    icon: Bike,
    targetTime: "2.0 mins",
    varianceRange: "1.0 – 8.0 mins",
    riskFactor: "Extreme Tail Risk",
    description:
      "Algorithmic dispatch assigns an arriving delivery partner. If order clustering fails or rider is stuck at traffic light, order sits idle at dock.",
    bottlenecks: [
      "Dark store parking gridlock during peak shift changeovers",
      "Rider reject loops (riders declining multi-order batching)",
      "Unpredictable arrival latency of incoming supply",
    ],
    pmMetric: "Dispatch Handoff Dwell Time",
  },
  {
    id: "transit",
    step: "Stage 04",
    name: "Last-Mile Transit",
    icon: MapPin,
    targetTime: "6.5 mins",
    varianceRange: "4.5 – 18.0 mins",
    riskFactor: "Environmental Friction",
    description:
      "Rider navigates within a 1.8km hyper-local geofence. The last 200 meters (society gate entry, elevator wait, OTP verification) consume up to 40% of transit time.",
    bottlenecks: [
      "Society gate security protocols and intercom confirmation delays",
      "High-rise elevator transit times (up to 4.5 mins in towers)",
      "Monsoon waterlogging & sudden road closures",
    ],
    pmMetric: "First-Attempt Delivery Success (FADS)",
  },
];

export function DarkStoreFunnel() {
  const [activeStage, setActiveStage] = useState<FunnelStage>(STAGES[0]);

  return (
    <div className="rounded-3xl border border-white/30 bg-black/25 backdrop-blur-xl p-6 sm:p-9 text-white shadow-2xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/20">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold">
            Operational Anatomy
          </span>
          <h3 className="text-2xl sm:text-4xl font-editorial text-white font-normal mt-1">
            Where Does Delivery Variance Actually Compound?
          </h3>
          <p className="text-sm text-white/85 mt-1 max-w-2xl font-sans">
            Quick-commerce is not a software game—it is physical inventory moving through tight
            human bottlenecks. Select each stage to inspect variance drivers.
          </p>
        </div>

        <div className="text-xs font-mono text-white bg-white/15 px-4 py-2 rounded-full border border-white/30 shrink-0">
          Target: <strong className="text-white">12.2m</strong> | P90:{" "}
          <strong className="text-white">24.5m</strong>
        </div>
      </div>

      {/* 4 Pipeline Stages */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
        {STAGES.map((stage) => {
          const Icon = stage.icon;
          const isSelected = activeStage.id === stage.id;

          return (
            <motion.button
              key={stage.id}
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveStage(stage)}
              className={`p-4 rounded-2xl text-left transition-all border relative overflow-hidden ${
                isSelected
                  ? "bg-white text-[var(--page-accent-fg)] border-white shadow-xl shadow-black/15 scale-[1.02]"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/15"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono mb-2 opacity-80">
                <span>{stage.step}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-black/20 text-white">
                  {stage.riskFactor}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <Icon className="w-4 h-4" />
                <h4 className="text-sm font-bold truncate">
                  {stage.name}
                </h4>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs font-mono pt-2 border-t border-current/20 opacity-85">
                <span>Target:</span>
                <span className="font-bold">{stage.targetTime}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Stage Detail Drawer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="p-6 sm:p-8 rounded-2xl bg-white/15 border border-white/25 backdrop-blur-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="font-bold text-white uppercase tracking-wider">
                  {activeStage.step} Breakdown
                </span>
                <span className="opacity-60">•</span>
                <span className="text-white/80">
                  Variance: <strong className="text-white">{activeStage.varianceRange}</strong>
                </span>
              </div>

              <h4 className="text-2xl font-editorial font-bold text-white">
                {activeStage.name} Mechanics
              </h4>
              <p className="text-sm text-white/90 leading-relaxed font-sans">
                {activeStage.description}
              </p>

              <div className="pt-2">
                <div className="text-xs font-mono uppercase text-white font-bold mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-white" />
                  <span>Primary Variance Drivers:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-white/85 font-sans">
                  {activeStage.bottlenecks.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-mono text-white font-bold shrink-0">0{idx + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col justify-between p-5 rounded-2xl bg-black/30 border border-white/20 space-y-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-white/70 font-bold">
                  Core PM Optimization Metric
                </div>
                <div className="text-lg font-mono font-bold text-white mt-1">
                  {activeStage.pmMetric}
                </div>
              </div>

              <div className="pt-3 border-t border-white/15 text-xs text-white/80 font-sans">
                <span className="text-white font-bold">Operational Rule:</span> When this stage
                exceeds target by &gt;90 seconds, downstream batching algorithms suffer
                fragmentation, compounding delivery delays across the entire cluster.
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
