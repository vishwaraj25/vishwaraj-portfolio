"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin accent-coloured reading-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.3,
  });

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden />;
}
