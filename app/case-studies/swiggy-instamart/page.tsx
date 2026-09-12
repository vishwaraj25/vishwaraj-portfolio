"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertOctagon,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Share2,
  Calendar,
  Layers,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { motion } from "framer-motion";
import { ReliabilitySimulator } from "@/components/swiggy/ReliabilitySimulator";
import { DarkStoreFunnel } from "@/components/swiggy/DarkStoreFunnel";
import { TradeoffMatrix } from "@/components/swiggy/TradeoffMatrix";
import { CollapsibleEvidence } from "@/components/ui/CollapsibleEvidence";

export default function SwiggyInstamartPage() {
  return (
    <article className="theme-swiggy min-h-screen bg-[var(--page-bg)] text-white pb-24 overflow-hidden">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-white/20 bg-[var(--page-bg)]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between text-xs font-mono">
          <Link
            href="/#work"
            className="text-white/80 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Work</span>
          </Link>
          <div className="flex items-center gap-3 text-white/80">
            <span>Case Study 01</span>
            <span>/</span>
            <span className="font-bold text-white">Quick Commerce</span>
          </div>
        </div>
      </div>

      {/* Hero Header Section */}
      <header className="pt-16 sm:pt-24 pb-16 px-6 sm:px-8 border-b border-white/20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-5xl mx-auto space-y-6"
        >
          {/* Metadata pill tags */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-white text-[var(--page-accent-fg)] text-xs font-mono uppercase tracking-wider font-bold shadow-md flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5" />
              Consumer Product
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-mono uppercase tracking-wider font-semibold border border-white/30">
              Logistics & Systems Design
            </span>
            <span className="text-xs font-mono text-white/80">
              8 min read • By Vishwaraj Saxena
            </span>
          </div>

          {/* Central Question / Header */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-editorial tracking-tight text-white font-normal leading-[1.08]">
              Reliability Isn’t Just Speed: The Mathematics of Quick-Commerce Trust
            </h1>
            <p className="text-2xl sm:text-3xl font-editorial italic text-white/95 max-w-3xl">
              “Is delivery speed actually the right measure of reliability?”
            </p>
          </div>

          <p className="text-base sm:text-lg text-white/90 font-sans leading-relaxed max-w-3xl pt-2">
            Quick-commerce platforms anchored their marketing on sub-15-minute delivery. But
            queuing theory and basic retention logic point the other way: people do not churn over
            an 18-minute delivery. They churn when a promised 10-minute delivery quietly slips to
            26 with no heads-up.
          </p>

          {/* Scope note */}
          <div className="p-4 rounded-2xl bg-black/20 border border-white/20 text-xs font-sans text-white/90 max-w-3xl">
            <span className="font-bold text-white">Scope.</span> Independent analysis using public
            information only: the consumer app, press coverage, and published research. No
            affiliation with Swiggy and no access to internal data. The figures below come from a
            simple queuing model built for this piece, not from Swiggy. They are illustrative.
          </div>

          {/* Key Metric Strip */}
          <div className="pt-6">
            <div className="p-6 rounded-3xl bg-white/10 border border-white/25 shadow-xl backdrop-blur-md">
              <div className="text-[11px] font-mono uppercase text-white/80 tracking-wider font-bold mb-4">
                Modeled outcomes · illustrative, not Swiggy data
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-xs text-white/70 font-mono">P95 SLA Adherence</div>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-white mt-1">
                    96.4%
                  </div>
                  <div className="text-xs text-white/80 mt-0.5">Buffer model (vs 72% aggressive)</div>
                </div>

                <div>
                  <div className="text-xs text-white/70 font-mono">Variance Spread (σ)</div>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-white mt-1">
                    ±2.4m
                  </div>
                  <div className="text-xs text-white/80 mt-0.5">Controlled tail risk</div>
                </div>

                <div>
                  <div className="text-xs text-white/70 font-mono">Repeat Retention</div>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-white mt-1">
                    +23%
                  </div>
                  <div className="text-xs text-white/80 mt-0.5">On predictable windows</div>
                </div>

                <div>
                  <div className="text-xs text-white/70 font-mono">Rider Attrition</div>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-white mt-1">
                    -31%
                  </div>
                  <div className="text-xs text-white/80 mt-0.5">Speed penalty removed</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-5xl mx-auto px-6 sm:px-8 pt-16 space-y-20">
        {/* Section 1: Executive Framing */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold">
            01 / Executive Problem Framing
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-white">
            The Illusion of 10-Minute Speed
          </h2>

          <div className="text-white/90 font-sans leading-relaxed space-y-4 text-base sm:text-lg">
            <p>
              In the early gold rush of quick commerce, venture-backed platforms engaged in an
              escalating marketing race. 30 minutes became 15 minutes; 15 minutes became 10
              minutes. Billboards turned speed into the sole competitive battleground.
            </p>
            <p>
              However, as quick commerce matured from an emergency novelty into a habitual grocery
              channel, this aggressive positioning created an acute structural failure:{" "}
              <strong className="text-white font-semibold">
                speed is an acquisition hook, but predictability is the retention engine.
              </strong>
            </p>
            <p>
              When an app promises delivery in 11 minutes, the customer immediately plans their
              immediate schedule around that number. If the order arrives in 19 minutes, the
              customer does not celebrate the 19 minutes—they experience a broken contract, a feeling
              of deceit, and the frustration of watching the ETA tick up 3 times.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Behavioral Economics Thesis
            </div>
            <p className="text-base sm:text-lg text-white font-editorial italic">
              “Customers do not evaluate logistics linearly. Under Daniel Kahneman’s Prospect
              Theory, the psychological pain of a 10-minute delay is roughly 2.5× greater than the
              satisfaction of receiving an order 10 minutes early.”
            </p>
          </div>
        </motion.section>

        {/* Section 2: Interactive Simulator */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold">
            02 / Interactive Proof & Simulation
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-white">
            Comparing the Two Operating Distributions
          </h2>
          <p className="text-base text-white/90 font-sans">
            Use the interactive model below to see why average delivery time alone is a misleading
            operational metric. Toggle between the Aggressive Speed model and the Dynamic Buffer
            model under peak loads and weather shocks.
          </p>

          <ReliabilitySimulator />

          <div className="p-6 rounded-2xl bg-black/20 border border-white/20 text-xs font-mono text-white/90 space-y-2">
            <div className="text-white font-bold uppercase">Mathematical Formulation:</div>
            <p>
              In classical queuing theory (M/M/c and M/G/c models), total delivery duration T is the
              sum of independent random variables:
            </p>
            <div className="p-3 bg-white/10 rounded-xl text-white font-bold">
              {"T_total = T_picking + T_bagging + T_staging + T_transit + T_doorstep"}
            </div>
            <p>
              Even if the mean {"E[T]"} is kept low, variance {"Var(T)"} expands quadratically during
              peak loads, causing severe tail-end SLA breaches.
            </p>
          </div>
        </motion.section>

        {/* Section 3: Dark Store Funnel */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold">
            03 / Supply Chain Anatomy
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-white">
            Where Does Delivery Variance Actually Compound?
          </h2>
          <p className="text-base text-white/90 font-sans">
            To solve variance, a Product Manager must examine the physical human checkpoints.
            Below is the operational anatomy of an order from basket checkout to doorstep handoff.
          </p>

          <DarkStoreFunnel />
        </motion.section>

        {/* Section 4: Trade-offs */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold">
            04 / Trade-off Evaluation
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-white">
            Unit Economics & Strategic Realities
          </h2>
          <p className="text-base text-white/90 font-sans">
            Every product decision in quick-commerce is constrained by physical inventory, real estate
            costs, and rider safety.
          </p>

          <TradeoffMatrix />
        </motion.section>

        {/* Section 5: Recommendations */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold">
            05 / Product Recommendations
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-white">
            How Swiggy Instamart Can Redefine Quick-Commerce Reliability
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-6 rounded-3xl bg-white/10 border border-white/25 backdrop-blur-md space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-white text-[var(--page-accent-fg)] flex items-center justify-center font-bold">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-editorial font-bold text-white">
                1. Re-anchor to P95 SLA Predictability
              </h3>
              <p className="text-sm text-white/85 font-sans leading-relaxed">
                Retire internal North Star metrics that reward low average delivery times at the
                cost of high tail failures. Replace with an internal P95 SLA Predictability Index.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/10 border border-white/25 backdrop-blur-md space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-white text-[var(--page-accent-fg)] flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-editorial font-bold text-white">
                2. Progressive Confidence Windows
              </h3>
              <p className="text-sm text-white/85 font-sans leading-relaxed">
                Replace deterministic static countdowns (“Arriving in 11m”) with honest confidence
                intervals (“Arriving 7:42 – 7:48 PM”). Tighten the window as the rider scans the
                package at dispatch.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/10 border border-white/25 backdrop-blur-md space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-white text-[var(--page-accent-fg)] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-editorial font-bold text-white">
                3. Ethical Dispatch Incentives
              </h3>
              <p className="text-sm text-white/85 font-sans leading-relaxed">
                Completely decouple rider dispatch bonuses from sub-10-minute deliveries. Compensate
                riders on adherence to safety guidelines and first-attempt drop-off success.
              </p>
            </div>
          </div>
        </motion.section>

      </main>
    </article>
  );
}
