"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import s from "@/app/case-studies/steam-discovery/steam.module.css";
import { coverFor, discoveryGames } from "./catalogue";

const covers = ["413150", "1086940", "620", "1245620", "1145360", "1091500", "730", "1174180", "105600", "108600", "1817070", "367520"];
const years = [
  { year: "2024", count: 18468, label: "18,468", note: "releases" },
  { year: "2025", count: 21308, label: "21,308", note: "releases" },
  { year: "2026", count: 18135, label: "18,135", note: "year to date" },
];

function useMotionReady() {
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  return ready && !reduced;
}

function LibraryCover({ index, pointerX, pointerY, progress, active }: { index: number; pointerX: MotionValue<number>; pointerY: MotionValue<number>; progress: MotionValue<number>; active: boolean }) {
  const attended = [17, 22, 26].includes(index);
  const depth = attended ? 52 : (index % 4) * 7;
  const x = useTransform(pointerX, value => value * (attended ? 3 : 1));
  const y = useTransform(pointerY, value => value * (attended ? -2 : -.7));
  const z = useTransform(progress, [0, 1], [depth, attended ? 70 : -22]);
  return <motion.div className={`${s.cover} ${attended ? s.attended : ""}`}
    style={{ backgroundImage: `url(/images/steam-discovery/cover-${covers[index % covers.length]}.jpg)`, x: active ? x : 0, y: active ? y : 0, z: active ? z : depth }} />;
}

export function GameLibrary() {
  const active = useMotionReady();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end start"] });
  const retreat = useTransform(scrollYProgress, [0, 1], [0, -65]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, .94]);
  const tilt = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 80, damping: 25 });
  const rotateY = useSpring(x, { stiffness: 80, damping: 25 });

  return (
    <div ref={ref} className={s.library} role="img" aria-label="A perspective library of game covers. A few stand forward while most remain deeper in the shelf."
      onPointerMove={event => {
        if (!active || event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - bounds.left) / bounds.width * 6 - 3);
        y.set(3 - (event.clientY - bounds.top) / bounds.height * 6);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}>
      <motion.div className={s.libraryScene} style={{ y: active ? retreat : 0, scale: active ? scale : 1, rotateX: active ? tilt : 0 }}>
        <motion.div className={s.parallax} style={{ rotateX: active ? rotateX : 0, rotateY: active ? rotateY : 0 }}>
          <div className={s.coverField} aria-hidden="true">
            {Array.from({ length: 40 }, (_, i) => <LibraryCover key={i} index={i} pointerX={rotateY} pointerY={rotateX} progress={scrollYProgress} active={active} />)}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function ReleaseTile({ index, total, column, progress, active }: { index: number; total: number; column: number; progress: MotionValue<number>; active: boolean }) {
  const start = .03 + column * .055 + (index / total) * .43;
  const y = useTransform(progress, [start, start + .18], [-24 - (index % 3) * 6, 0]);
  const opacity = useTransform(progress, [start, start + .14], [0, 1]);
  const rotateX = useTransform(progress, [start, start + .18], [38, 0]);
  return <motion.i style={{ backgroundColor: ["#34516c", "#506c80", "#667972", "#3b657e", "#798189"][index % 5], y: active ? y : 0, opacity: active ? opacity : 1, rotateX: active ? rotateX : 0 }} />;
}

function YearShelf({ year, index, progress }: { year: typeof years[number]; index: number; progress: MotionValue<number> }) {
  const active = useMotionReady();
  const total = Math.ceil(year.count / 200);
  return <div className={s.yearShelf}>
    <div className={s.yearHeading}><span>{year.year}</span><strong>{year.label}</strong><small>{year.note}</small></div>
    <div className={s.releaseTiles} aria-hidden="true">
      {Array.from({ length: total }, (_, i) => <ReleaseTile key={i} index={i} total={total} column={index} progress={progress} active={active} />)}
    </div>
  </div>;
}

export function ReleaseStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end center"] });
  return <div ref={ref} className={s.releaseStory}>
    <div className={s.releaseYears}>{years.map((year, index) => <YearShelf key={year.year} year={year} index={index} progress={scrollYProgress} />)}</div>
    <p className={s.source}>SteamDB · Tile density is proportional to annual releases. Each tile represents a group of games. 2026 is incomplete.</p>
  </div>;
}

function stablePercent(value: number) {
  return `${value.toFixed(4)}%`;
}

// Deterministic positions keep the server and client renders identical.
function position(index: number, total: number) {
  const angle = index * 2.399963;
  const radius = Math.sqrt((index + .5) / total);
  return {
    left: stablePercent(50 + Math.cos(angle) * radius * 47),
    top: stablePercent(50 + Math.sin(angle) * radius * 43),
  };
}

export function ConcentrationStory() {
  const scene = useRef<HTMLDivElement>(null);
  const active = useMotionReady();
  const { scrollYProgress } = useScroll({ target: scene, offset: ["start end", "end center"] });
  const frontY = useTransform(scrollYProgress, [.2, .85], [0, -45]);
  const frontTilt = useTransform(scrollYProgress, [.2, .85], [52, 25]);
  const backY = useTransform(scrollYProgress, [.2, .85], [0, 20]);
  const backTilt = useTransform(scrollYProgress, [.2, .85], [52, 64]);
  const backOpacity = useTransform(scrollYProgress, [.2, .85], [1, .35]);
  const frontZ = useTransform(scrollYProgress, [.2, .85], [0, 75]);
  const backZ = useTransform(scrollYProgress, [.2, .85], [0, -65]);
  return <div ref={scene} className={s.concentrationStory}>
    <label className={s.focusControl}><input type="checkbox" aria-controls="festival-field" />Bring the top ~4% forward</label>
    <div id="festival-field" className={s.festivalField} role="img" aria-label="4,244 dots represent tracked games. The highlighted cohort contains approximately 189 games, as reported in the supplied estimates.">
      <motion.div className={s.otherGames} style={active ? { y: backY, z: backZ, rotateX: backTilt, opacity: backOpacity } : {}} aria-hidden="true">{Array.from({ length: 4055 }, (_, i) => <i key={i} style={position(i, 4055)} />)}</motion.div>
      <motion.div className={s.topGames} style={active ? { y: frontY, z: frontZ, rotateX: frontTilt } : {}} aria-hidden="true">{Array.from({ length: 189 }, (_, i) => <i key={i} style={position(i, 189)} />)}</motion.div>
    </div>
    <div className={s.gainStory}>
      <p><strong>~189 games</strong><span>Top ~4% of the tracked population</span></p>
      <span className={s.gainArrow} aria-hidden="true">→</span>
      <p><strong className={s.blue}>~69–70%</strong><span>of estimated wishlist gains</span></p>
    </div>
    <p className={s.longTail}><b>3,573 games</b> below 1,000 wishlist gains shared only <strong>~14%</strong> of estimated gains.</p>
    <p className={s.source}>Sources: SakujoData, NextFestStats, Immutable. One dot per tracked game; spatial positions are illustrative. Cohort size and shares are approximate reported estimates.</p>
  </div>;
}

const signals = [
  { id: "ashfall", title: "Ashfall", art: "1245620", category: "Featured & Recommended", tags: "Action · Fantasy", proof: "Popular with an established audience", reviews: "Positive reviews · Large review history", price: "Paid", signal: "Popularity & social proof", explanation: "A large audience and a long review history can make the choice feel less risky. Neither tells you whether you want this kind of game tonight." },
  { id: "hollow-shore", title: "Hollow Shore", art: "367520", category: "Because you played…", tags: "Exploration · Atmospheric", proof: "Shares tags with games you know", reviews: "Positive reviews · Limited review history", price: "Paid", signal: "Familiarity & relevance", explanation: "Recognizable tags give you a reason to look closer. Familiarity can help a game feel relevant, but your current mood may be different." },
  { id: "night-signal", title: "Night Signal", art: "1091500", category: "Popular Upcoming", tags: "Story · Science fiction", proof: "An audience is already following", reviews: "Pre-release · No player reviews yet", price: "Price not announced", signal: "Anticipation & presentation", explanation: "Striking artwork and existing interest can draw attention before players can judge the experience. Attention is a starting signal, not proof of fit." },
];

export function Storefront() {
  const games = signals.map((signal, index) => ({ ...signal, ...discoveryGames[[5, 0, 6][index]], category: ["Featured & Recommended", "Because you played…", "Popular Upcoming"][index] }));
  return <div className={s.storefront}>
    <div className={s.productBar}><span>STEAM / Store</span><a href="#taste-discovery">Taste Discovery <span aria-hidden="true">→</span></a></div>
    <p className={s.storeNote}>Simplified product teardown with real titles. Placement is illustrative; live pricing and review data are not connected.</p>
    <fieldset className={s.storeChoices}>
      <legend className={s.srOnly}>Choose a game to inspect its discovery signals</legend>
      {games.map(game => <label className={s.storeGame} key={game.id}>
        <span className={s.storeCategory}>{game.category}</span>
        <input type="radio" name="store-game" value={game.id} aria-controls={`signals-${game.id}`} />
        <div className={s.storeArt} style={{ backgroundImage: `url(${coverFor(game.id)})` }} aria-hidden="true" />
        <div className={s.storeText}><h3>{game.title}</h3><p className={s.tags}>{game.tags.join(" · ")}</p><p>{indexContext(game.category)}</p><div className={s.hoverSignals}><p className={s.reviews}>Reviews: live rating and volume unavailable</p><span className={s.price}>Price: check current Steam listing</span></div></div>
      </label>)}
    </fieldset>
    <div className={s.signalArea} aria-live="polite">
      <p className={s.choicePrompt}>What catches your attention first?</p>
      {games.map(game => <div id={`signals-${game.id}`} key={game.id} className={s.signal} data-game={game.id}><p className={s.eyebrow}>You chose {game.title}</p><h3>{game.signal}</h3><p>{game.explanation}</p><p><a href={`https://store.steampowered.com/app/${game.id}`} target="_blank" rel="noreferrer">Check current reviews and pricing on Steam ↗</a></p></div>)}
    </div>
  </div>;
}

function indexContext(category: string) {
  return category === "Featured & Recommended" ? "Featured placement draws attention first." : category === "Because you played…" ? "Recommendation context suggests familiar interests." : "Upcoming shelf placement is illustrative, not a release-status claim.";
}
