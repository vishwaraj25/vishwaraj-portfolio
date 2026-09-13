"use client";

/*
  Leaf drift over the Expedition 33 hero key art.

  Transparent overlay, not a background: the hero already paints the shipped
  game screenshot and two gradient scrims, and covering that would trade real
  evidence for decoration.

  Tuned deliberately slow. The defaults from the source are a dense autumn
  gale — roughly 1400 leaves at full tumble — which would compete with a
  headline for attention and make the page feel busy rather than atmospheric.
*/

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LeafDrift = dynamic(() => import("@/components/ui/LeafDrift"), {
  ssr: false,
  loading: () => null,
});

export default function HeroLeaves() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const sync = () => setAnimate(q.matches);
    sync();
    q.addEventListener("change", sync);
    return () => q.removeEventListener("change", sync);
  }, []);

  if (!animate) return null;

  return (
    <LeafDrift
      transparent
      style={{ position: "absolute", inset: 0 }}
      /* Rust through to the warm sand already in --page-accent, so the leaves
         read as part of the Expedition palette rather than a bolted-on effect. */
      baseColor="#8f3f2a"
      accentColor="#d2b98a"
      /* direction 0 falls straight down; 18° gives a gentle down-and-right
         drift, which matches the light coming from the right of the key art. */
      direction={18}
      /* Slow and sparse by request: 4-5 leaves in frame at once, drifting
         gently rather than falling as weather. speed and spin are both cut
         hard from the 130-leaf pass so a single leaf reads as peaceful, not
         just less crowded.

         Density is 10, not 4-5: leaves seed across the whole hero column,
         which on this page runs roughly twice the height of one viewport
         (key art + copy + screenshot figure + metric strip). At density 5,
         only half that total is ever in a given fold at once, so most scroll
         positions showed 1-2 leaves rather than the requested 4-5. 10 total
         puts 4-5 in view at a typical fold; it is still a small fraction of
         the source default of 1400. */
      speed={7}
      density={10}
      leafSize={20}
      spin={10}
      sway={40}
      spread={110}
      scatter={14}
      turbulence={6}
      /* Cursor still disturbs them, but as a nudge rather than a shove. */
      push={70}
      reach={45}
      opacity={0.7}
    />
  );
}
