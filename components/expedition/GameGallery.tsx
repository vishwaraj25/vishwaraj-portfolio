"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface GameScreenshot {
  id: string;
  title: string;
  src: string;
  category: "Combat HUD" | "World & Art" | "Boss Encounter" | "Party Dynamics";
  caption: string;
  designAnalysis: string;
}

const SCREENSHOTS: GameScreenshot[] = [
  {
    id: "screen-1",
    title: "Real-Time Combat & Free Aim HUD",
    src: "/images/expedition33/screenshot_1.jpg",
    category: "Combat HUD",
    caption:
      "Expeditioners engaging a colossal mechanical enemy. Note the real-time targeting and timing arcs.",
    designAnalysis:
      "The UI layers real-time reticle aiming and action command prompts directly over traditional turn-based positioning, establishing immediate tactile immersion.",
  },
  {
    id: "screen-2",
    title: "Lumière & Belle Époque Architecture",
    src: "/images/expedition33/screenshot_2.jpg",
    category: "World & Art",
    caption:
      "Surreal ruins of Belle Époque Paris rendered in Unreal Engine 5 with dynamic volumetric lighting.",
    designAnalysis:
      "Sandfall chose a linear, high-fidelity path rather than a sprawling empty open world—concentrating their UE5 rendering budget into breathtaking, handcrafted vistas.",
  },
  {
    id: "screen-3",
    title: "Boss Encounter & Telegraphed Windups",
    src: "/images/expedition33/screenshot_3.jpg",
    category: "Boss Encounter",
    caption:
      "Gustave and party facing a formidable world boss. The enemy's visual silhouette cues the upcoming strike.",
    designAnalysis:
      "Enemy attacks are explicitly telegraphed through silhouette posture changes, sound design cues, and particle wind-ups so players can predict the parry window.",
  },
  {
    id: "screen-4",
    title: "Tactical Execution & Rhythm Stagger",
    src: "/images/expedition33/screenshot_4.jpg",
    category: "Combat HUD",
    caption:
      "Precision attack combo execution building up the enemy stagger gauge.",
    designAnalysis:
      "Attack inputs require rhythm precision. Hitting the rhythm threshold rewards the party with bonus Action Points and critical damage multipliers.",
  },
  {
    id: "screen-5",
    title: "Surreal Biomes of Lumière",
    src: "/images/expedition33/screenshot_5.jpg",
    category: "World & Art",
    caption:
      "Expeditioners traversing dreamlike oceanic and forest landscapes on the journey to the Paintress.",
    designAnalysis:
      "Art direction balances French classical impressionism with dark surreal fantasy, creating high visual differentiation against standard medieval RPG tropes.",
  },
  {
    id: "screen-6",
    title: "Lethal Enemy Strike Telegraph",
    src: "/images/expedition33/screenshot_6.jpg",
    category: "Combat HUD",
    caption:
      "A massive enemy prepares an overhead cleave, testing player defensive reflexes in real time.",
    designAnalysis:
      "This is where turn-based passive downtime is eradicated: looking down at a phone results in taking full unmitigated lethal damage.",
  },
];

export function GameGallery() {
  const [selectedImage, setSelectedImage] = useState<GameScreenshot>(SCREENSHOTS[0]);

  return (
    <div className="rounded-3xl border border-white/30 bg-black/25 backdrop-blur-xl p-6 sm:p-9 text-white shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/20">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Official Shipped Visual Assets • Sandfall Interactive
          </span>
          <h3 className="text-2xl sm:text-4xl font-editorial text-white font-normal mt-1">
            In-Game Visual & Combat System Showcase
          </h3>
          <p className="text-sm text-white/85 mt-1 font-sans">
            High-resolution screenshots illustrating the combat HUD, enemy wind-up telegraphs, and
            Unreal Engine 5 art direction.
          </p>
        </div>

        <div className="text-xs font-mono bg-white/15 px-3.5 py-1.5 rounded-full border border-white/30 shrink-0">
          Unreal Engine 5 • 4K Captures
        </div>
      </div>

      {/* Main Spotlight Image */}
      <div className="rounded-2xl overflow-hidden border border-white/30 bg-black/50 shadow-2xl relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-full"
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full aspect-video object-cover"
            />
            {/* Overlay Caption Bar */}
            <div className="bg-black/30 p-4 sm:p-6 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono uppercase font-bold px-2.5 py-0.5 rounded-full bg-white text-[var(--page-accent-fg)]">
                  {selectedImage.category}
                </span>
                <span className="text-xs font-mono text-white/80">• {selectedImage.title}</span>
              </div>
              <p className="text-sm sm:text-base font-sans text-white/95 leading-relaxed max-w-3xl">
                {selectedImage.caption}
              </p>
              <div className="text-xs font-sans text-white/80 pt-1 border-t border-white/20">
                <strong className="text-white font-mono">Product Design Note:</strong>{" "}
                {selectedImage.designAnalysis}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2">
        {SCREENSHOTS.map((shot) => {
          const isSelected = selectedImage.id === shot.id;
          return (
            <motion.button
              key={shot.id}
              type="button"
              aria-pressed={isSelected}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedImage(shot)}
              className={`rounded-xl overflow-hidden border transition-all relative aspect-video bg-black/40 text-left ${
                isSelected
                  ? "ring-2 ring-white border-white shadow-xl scale-[1.03]"
                  : "border-white/25 opacity-75 hover:opacity-100"
              }`}
            >
              <img src={shot.src} alt={shot.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors" />
              <div className="absolute bottom-1 left-1.5 right-1.5 text-[9px] font-mono text-white truncate bg-black/60 px-1 py-0.5 rounded">
                {shot.category}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
