"use client";

/*
  The homepage masthead backdrop.

  LightCurtain is loaded on demand rather than in the initial bundle: it is a
  decorative layer, and the name and the links above it must render without
  waiting on a shader.

  Under prefers-reduced-motion nothing is loaded at all. The band's whole
  reason to exist is that it drifts and reacts, and a frozen still of it adds
  nothing over the flat ground colour it would sit on.
*/

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LightCurtain = dynamic(() => import("@/components/ui/LightCurtain"), {
  ssr: false,
  loading: () => null,
});

export default function HeroCurtain() {
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
    <LightCurtain
      style={{
        position: "absolute",
        /* The band always renders through the middle of its own canvas, so the
           canvas is pushed to the lower half of the masthead. That keeps the
           light under the name rather than behind it, where it would fight the
           cream type for contrast. */
        top: "56%",
        left: 0,
        right: 0,
        bottom: 0,
        /* Feather both edges into the flat ground. Since the canvas paints the
           same olive as the section, the seam disappears entirely.
           The opaque region starts at 40%, not 30%: the hero descriptor wraps
           to two lines once it carries the current role, and at 30% it cleared
           the lit band by only 2px — close enough that a different wrap or a
           fallback font would have put text on glow. */
        maskImage: "linear-gradient(to bottom, transparent, #000 40%, #000 84%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 40%, #000 84%, transparent)",
      }}
      /* The canvas is opaque (alpha: false), so its ground has to be the same
         deep olive the section paints — otherwise it punches a black hole
         through the masthead while it loads or if WebGL is unavailable. */
      background="#1b2016"
      baseColor="#5c6b3e"   /* olive, the portfolio primary */
      accentColor="#a08a52" /* warm brass, bridging olive to sand */
      highlight="#e6d6ae"   /* pale sand, the brightest filaments */
      /* Measured, not guessed: at curtainWidth 120 the band lit 86% of the
         frame edge to edge. At 30 it lights ~27% and keeps dark margins above
         and below, which is what makes it read as a band rather than a wash. */
      curtainWidth={30}
      density={70}
      striation={40}
      spread={45}
      speed={32}
      hover={110}
      reach={38}
    />
  );
}
