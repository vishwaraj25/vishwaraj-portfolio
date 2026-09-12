"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import s from "@/app/case-studies/epf-claims/epf.module.css";

function useMotionReady() {
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  return ready && !reduced;
}

/* Deterministic so the server and client markup agree.
   (7i + 3) mod 9 < 2 selects 2 of every 9 tiles, about 22%, which is the
   FY2024-25 rejection share. The pattern is arithmetic, not random. */
const TILES = 112;
function isRejected(index: number) {
  return (index * 7 + 3) % 9 < 2;
}

function ClaimTile({ index, progress, active }: { index: number; progress: MotionValue<number>; active: boolean }) {
  const rejected = isRejected(index);
  const depth = rejected ? 26 : (index % 4) * 5;
  const z = useTransform(progress, [0, 1], [depth, rejected ? 78 : -30]);
  const opacity = useTransform(progress, [0, 1], [1, rejected ? 1 : 0.45]);
  return (
    <motion.div
      className={`${s.claimTile} ${rejected ? s.rejected : s.settled}`}
      style={{ z: active ? z : depth, opacity: active ? opacity : 1 }}
    />
  );
}

export function ClaimField() {
  const active = useMotionReady();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end start"] });
  const lift = useTransform(scrollYProgress, [0, 1], [0, -55]);
  const tilt = useTransform(scrollYProgress, [0, 1], [0, 7]);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 80, damping: 25 });
  const rotateY = useSpring(x, { stiffness: 80, damping: 25 });

  return (
    <div
      ref={ref}
      className={s.claimField}
      role="img"
      aria-label="A field of provident fund claims. Roughly one in five is marked rejected and pushed forward, while settled claims recede."
      onPointerMove={event => {
        if (!active || event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set(((event.clientX - bounds.left) / bounds.width) * 5 - 2.5);
        y.set(2.5 - ((event.clientY - bounds.top) / bounds.height) * 5);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      <motion.div className={s.claimScene} style={{ y: active ? lift : 0, rotateX: active ? tilt : 0 }}>
        <motion.div className={s.claimScene} style={{ rotateX: active ? rotateX : 0, rotateY: active ? rotateY : 0 }}>
          <div className={s.claimGrid} aria-hidden="true">
            {Array.from({ length: TILES }, (_, i) => (
              <ClaimTile key={i} index={i} progress={scrollYProgress} active={active} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* Only years with a published claims-filed and claims-rejected pair are shown.
   FY2022-23 is omitted rather than interpolated. */
const years = [
  { year: "FY2021-22", rate: 29, label: "~29%", note: "reported rejection rate" },
  { year: "FY2023-24", rate: 26, label: "~26%", note: "160 lakh of 623 lakh claims" },
  { year: "FY2024-25", rate: 22, label: "~22%", note: "174 lakh of 796 lakh claims" },
];

function TrendRow({ item, index, progress, active }: { item: typeof years[number]; index: number; progress: MotionValue<number>; active: boolean }) {
  const start = 0.05 + index * 0.16;
  const scaleX = useTransform(progress, [start, start + 0.3], [0, item.rate / 29]);
  return (
    <div className={s.trendRow}>
      <span>{item.year}</span>
      <div className={s.trendTrack}>
        <motion.div className={s.trendFill} style={{ scaleX: active ? scaleX : item.rate / 29 }} />
      </div>
      <b>{item.label}</b>
    </div>
  );
}

export function RejectionTrend() {
  const active = useMotionReady();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end center"] });
  return (
    <div ref={ref} className={s.trendStory}>
      <div role="table" aria-label="EPFO claim rejection rate by financial year">
        {years.map((item, index) => (
          <TrendRow key={item.year} item={item} index={index} progress={scrollYProgress} active={active} />
        ))}
      </div>
      <p className={s.trendNote}>
        Bars are scaled against the FY2021-22 peak. The rate is improving, but on a larger base:
        FY2024-25 saw more claims filed and more claims rejected in absolute terms than FY2023-24.
      </p>
      <p className={s.source}>
        EPFO Annual Report figures as reported. FY2024-25 and FY2023-24 percentages are calculated
        from the published claims-filed and claims-rejected counts. FY2022-23 is omitted because a
        comparable pair was not available.
      </p>
    </div>
  );
}
