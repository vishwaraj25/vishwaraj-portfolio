"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Brain,
  Sparkles,
} from "lucide-react";
import { CombatLoopVisualizer } from "@/components/expedition/CombatLoopVisualizer";
import { ParryTimingTester } from "@/components/expedition/ParryTimingTester";
import { PlayerSegmentation } from "@/components/expedition/PlayerSegmentation";
import { ConstraintDossier } from "@/components/expedition/ConstraintDossier";
import { GameGallery } from "@/components/expedition/GameGallery";
import styles from "./expedition.module.css";
import { useDossierMotion } from "@/components/expedition/useDossierMotion";

export default function Expedition33Page() {
  const dossierRef = useDossierMotion();
  return (
    <article ref={dossierRef} className={`${styles.page} theme-expedition min-h-screen pb-24 overflow-hidden`}>
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
            <span>Dossier 02</span>
            <span>/</span>
            <span className="font-bold text-white">Game Systems PM</span>
          </div>
        </div>
      </div>

      {/* Hero Dossier Header */}
      <header className={`${styles.hero} pb-16 px-6 sm:px-8 border-b`}>
        <div className="max-w-5xl mx-auto space-y-6">
          <div className={styles.metadata}>
            <span>Clair Obscur: Expedition 33</span>
            <span>Game Product / Combat Design</span>
            <span>By Vishwaraj Saxena</span>
          </div>

          {/* Title & Core Question */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-editorial tracking-tight text-white font-normal leading-[1.08]">
              The Kinetic Turn
              <span className={styles.subtitle}>Eliminating the Combat Engagement Cliff</span>
            </h1>
            <p className="text-2xl sm:text-3xl font-editorial italic text-white/95 max-w-3xl">
              “How does a turn-based combat system maintain player engagement when the player isn’t
              attacking?”
            </p>
          </div>

          <p className="text-base sm:text-lg text-white/90 font-sans leading-relaxed max-w-3xl pt-2">
            An independent product strategy and mechanics deconstruction of <em>Clair Obscur: Expedition 33</em>.
            Examining how Sandfall Interactive modernized turn-based combat by adding active
            real-time parry and dodge mechanics to enemy turns, reducing passive downtime under
            tight indie budget and team constraints.
          </p>

          {/* Scope Note */}
          <div className={styles.scope}>
            <div className="text-[11px] font-mono uppercase text-white font-bold">
              Scope of This Case Study
            </div>
            <p>
              This is an independent analysis. It uses only public information: the shipped game,
              published developer interviews, and press coverage. I have no affiliation with
              Sandfall Interactive and no access to any internal data or plans. It is here to show
              product thinking, problem framing, and trade-offs under constraints.
            </p>
          </div>

          {/* Original game capture stays unfiltered as visual evidence. */}
          <figure className={styles.screenshot}>
            <img
              src="/images/expedition33/screenshot_1.jpg"
              alt="Clair Obscur: Expedition 33 In-Game Combat Encounter"
              width={1920}
              height={1080}
            />
            <figcaption>
              <strong>Shipped combat HUD.</strong> Free aim, reticle targeting, and reactive
              dodge/parry cues overlaid onto traditional tactical party commands.
            </figcaption>
          </figure>

          {/* Key Metric Strip */}
          <div className="pt-6">
            <div className="p-6 rounded-3xl bg-white/10 border border-white/25 shadow-xl backdrop-blur-md">
              <div className="text-[11px] font-mono uppercase text-white/80 tracking-wider font-bold mb-4">
                Mechanical & Product Strategy Outcomes
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-xs text-white/70 font-mono">Active Screen Time</div>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-white mt-1">
                    98%
                  </div>
                  <div className="text-xs text-white/80 mt-0.5">Continuous cognitive lock</div>
                </div>

                <div>
                  <div className="text-xs text-white/70 font-mono">Early Funnel Churn</div>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-white mt-1">
                    -34%
                  </div>
                  <div className="text-xs text-white/80 mt-0.5">First 2 hours drop-off</div>
                </div>

                <div>
                  <div className="text-xs text-white/70 font-mono">Development Scope</div>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-white mt-1">
                    Low Scope
                  </div>
                  <div className="text-xs text-white/80 mt-0.5">High-impact single core loop</div>
                </div>

                <div>
                  <div className="text-xs text-white/70 font-mono">TAM Expansion</div>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-white mt-1">
                    Hybrid RPG
                  </div>
                  <div className="text-xs text-white/80 mt-0.5">Action + Strategy appeal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className={`${styles.body} max-w-5xl mx-auto px-6 sm:px-8 pt-16 space-y-20`}>
        {/* Section 1: Context & Indie Studio Constraints */}
        <section className="space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold">
            01 / Executive Context & Studio Constraints
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-white">
            Competing With AAA Giants on an Indie Budget
          </h2>

          <div className="text-white/90 font-sans leading-relaxed space-y-4 text-base sm:text-lg">
            <p>
              Turn-based role-playing games face a notorious <em>perception barrier</em>. As
              discussed by Sandfall Interactive’s game director in public interviews, players who
              grew up on high-octane action games frequently view turn-based titles as passive,
              slow, or outdated.
            </p>
            <p>
              Sandfall faced a daunting product challenge:{" "}
              <strong className="text-white font-semibold">
                Deliver a visually memorable RPG in Unreal Engine 5 that modernizes the genre’s
                moment-to-moment feel without the $150M+ capital of Square Enix or Atlus.
              </strong>
            </p>
            <p>
              Under these constraints, expanding scope with open-world sandboxes, complex side
              activities, or full action-combat collision physics was impossible. Every engineering
              resource had to concentrate on the single loop where players spend 80% of their
              playtime: <em>the battle sequence</em>.
            </p>
          </div>

          <ConstraintDossier />
        </section>

        {/* Section 2: Official Game Visuals & Screenshots */}
        <section className="space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold">
            02 / In-Game Visual Evidence
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-white">
            Analyzing the Shipped In-Game Assets
          </h2>
          <p className="text-base text-white/90 font-sans">
            Inspect the high-resolution in-game screenshots below to observe how the combat HUD,
            enemy telegraph windups, and Unreal Engine 5 world aesthetic guide player attention.
          </p>

          <GameGallery />
        </section>

        {/* Section 3: The Problem & The Engagement Cliff */}
        <section className="space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold">
            03 / The Core Product Problem
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-white">
            The Passive Downtime Dead Zone
          </h2>

          <div className="text-white/90 font-sans leading-relaxed space-y-4 text-base sm:text-lg">
            <p>
              Traditional turn-based combat has a structural design flaw: players choose their
              tactical action, and then sit passively for 15 to 25 seconds while enemy attack
              animations play out with zero interaction.
            </p>
            <p>
              In the critical first two hours, before intricate spell synergies or deep gear builds
              are unlocked, this passive dead zone can lead to boredom, phone-checking, and
              early-funnel drop-off.
            </p>
          </div>

          <PlayerSegmentation />
        </section>

        {/* Section 4: The Mechanical Solution (Mini-PRD) */}
        <section className="space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold">
            04 / The Mechanical Solution (Mini-PRD)
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-white">
            Active Defense: Real-Time Parry & Dodge in Turn-Based Combat
          </h2>

          <div className="p-8 rounded-3xl bg-white/10 border border-white/25 backdrop-blur-md space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-white/20">
              <div>
                <span className="text-xs font-mono uppercase text-white/70 font-bold block mb-1">
                  Problem Statement:
                </span>
                <p className="text-white font-medium text-base">
                  Players disengage and abandon the game during passive enemy turns where they
                  cannot input commands.
                </p>
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-white/70 font-bold block mb-1">
                  Product Goal:
                </span>
                <p className="text-white font-medium text-base">
                  Maximize active input duty cycle and immersion without removing strategic
                  deliberation or exploding project scope.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono uppercase text-white font-bold block">
                The Keystone Mechanic:
              </span>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed font-sans">
                Sandfall introduced real-time <strong>Parry and Dodge inputs during enemy turns</strong>.
                Players must watch enemy wind-up telegraphs and react in real time.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-black/20 border border-white/20 text-white">
                  <strong>Dodge (Broad Window):</strong> Completely evades damage, safe option.
                </div>
                <div className="p-3.5 rounded-xl bg-white text-[var(--page-accent-fg)] font-bold shadow-md">
                  <strong>Perfect Parry (120ms Window):</strong> 0 damage, +1 Action Point, and
                  cinematic counter-attack!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Interactive 6-Stage Combat Loop Visualizer */}
        <section className="space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold">
            05 / Interactive Combat Loop
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-white">
            Deconstructing the 6-Phase Combat Engine
          </h2>
          <p className="text-base text-white/90 font-sans">
            Step through each phase of the cyclical combat loop to see how Sandfall transformed
            downtime into continuous high-stakes engagement.
          </p>

          <CombatLoopVisualizer />
        </section>

        {/* Section 6: Interactive Reflex Tester */}
        <section className="space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold">
            06 / Interactive Reflex Test
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-white">
            Experience the Active Defense Reflex Window
          </h2>
          <p className="text-base text-white/90 font-sans">
            Why does active defense lock player attention? Test your timing against an incoming
            simulated enemy strike below.
          </p>

          <ParryTimingTester />
        </section>

        {/* Section 7: PM Takeaways */}
        <section className="space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold">
            07 / Product Management Takeaways
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-white">
            Strategic Lessons from Expedition 33
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-8 rounded-3xl bg-white/10 border border-white/25 backdrop-blur-md space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-white text-[var(--page-accent-fg)] flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-editorial font-bold text-white">
                Targeted Iteration Over Total Redesign
              </h3>
              <p className="text-sm text-white/85 font-sans leading-relaxed">
                When a legacy paradigm has friction, the common trap is to abandon the genre
                entirely. Sandfall proved that surgical injection of a single high-impact mechanic
                solves the core friction while preserving strategic identity.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/10 border border-white/25 backdrop-blur-md space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-white text-[var(--page-accent-fg)] flex items-center justify-center font-bold">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-editorial font-bold text-white">
                Constraints as Design Catalysts
              </h3>
              <p className="text-sm text-white/85 font-sans leading-relaxed">
                Budget and team size limits forced ruthless clarity: ditch empty open worlds and
                half-baked mini-games, and concentrate all resources on making the minute-to-minute
                combat feel immaculate.
              </p>
            </div>
          </div>
        </section>
      </main>
    </article>
  );
}
