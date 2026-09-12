"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Eye, Heart, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import { coverFor, discoveryGames, type Session, type Gameplay, type Mood, type DiscoveryGame } from "./catalogue";
import s from "@/app/case-studies/steam-discovery/steam.module.css";

type Reaction = "Interested" | "Already know it" | "Not for me";
type Choice = { id: string; reaction: Reaction };

export function TasteDiscoveryDemo() {
  const [preview, setPreview] = useState<"desktop" | "phone">("desktop");
  const [session, setSession] = useState<Session>("An evening");
  const [gameplay, setGameplay] = useState<Gameplay>("Exploration");
  const [mood, setMood] = useState<Mood>("Atmospheric");
  const [stage, setStage] = useState<"preferences" | "deck" | "summary">("preferences");
  const [history, setHistory] = useState<Choice[]>([]);
  const reduced = useReducedMotion();
  const heading = useRef<HTMLHeadingElement>(null);

  const affinities = history.reduce<Record<string, number>>((profile, choice) => {
    const game = discoveryGames.find(item => item.id === choice.id)!;
    if (choice.reaction !== "Already know it") {
      const adjustment = choice.reaction === "Interested" ? 1 : -1;
      for (const tag of [game.gameplay, game.mood]) profile[tag] = (profile[tag] || 0) + adjustment;
    }
    return profile;
  }, {});

  function score(game: DiscoveryGame) {
    return (game.sessions.includes(session) ? 3 : 0) + (game.gameplay === gameplay ? 4 : 0) + (game.mood === mood ? 3 : 0)
      + (affinities[game.gameplay] || 0) * 4 + (affinities[game.mood] || 0) * 3;
  }

  const queue = discoveryGames.filter(game => !history.some(choice => choice.id === game.id)).sort((a, b) => score(b) - score(a));
  const current = queue[0];
  const interested = history.filter(choice => choice.reaction === "Interested").map(choice => discoveryGames.find(game => game.id === choice.id)!);
  const last = history.at(-1);

  function respond(reaction: Reaction) {
    if (!current) return;
    const next = [...history, { id: current.id, reaction }];
    setHistory(next);
    if (next.length >= 5 || queue.length === 1) setStage("summary");
    requestAnimationFrame(() => heading.current?.focus());
  }

  function reset() {
    setHistory([]);
    setStage("preferences");
    requestAnimationFrame(() => heading.current?.focus());
  }

  function goBack() {
    if (stage === "summary") {
      if (history.length >= 5 || !current) setHistory(history.slice(0, -1));
      setStage("deck");
    } else if (history.length) {
      setHistory(history.slice(0, -1));
    } else {
      setStage("preferences");
    }
    requestAnimationFrame(() => heading.current?.focus());
  }

  return <>
    <div className={s.previewToolbar} role="group" aria-label="Preview device">
      <span>Preview the solution</span>
      <button type="button" aria-pressed={preview === "desktop"} onClick={() => setPreview("desktop")}>Desktop</button>
      <button type="button" aria-pressed={preview === "phone"} onClick={() => setPreview("phone")}>Phone</button>
    </div>
    <div className={preview === "phone" ? s.phonePreview : s.desktopPreview}>
    <div className={s.prototype} id="taste-discovery">
    <div className={s.productBar}><span>STEAM <span className={s.productDivider}>/</span> Taste Discovery</span><span>Interactive concept</span></div>
    <p className={s.demoNote}>Curated sample, local feedback only. Matches are illustrative, not live Steam recommendations.</p>
    {stage === "preferences"
      ? <a className={s.demoBack} href="#experience-title"><ArrowLeft size={16} aria-hidden="true" />Back to Store</a>
      : <button type="button" className={s.demoBack} onClick={goBack}><ArrowLeft size={16} aria-hidden="true" />Back</button>}
    {stage === "preferences" ? <div className={s.preferenceLayout}>
      <div><p className={s.eyebrow}>Tonight&apos;s queue</p><h3 ref={heading} tabIndex={-1}>What are you in the mood for?</h3><p className={s.body}>Start with what you want to play. Give unfamiliar games a reason to enter your queue.</p><div className={s.preferenceArt} aria-hidden="true">{["367520", "1145360", "413150"].map(id => <div key={id} style={{ backgroundImage: `url(${coverFor(id)})` }} />)}</div></div>
      <form className={s.preferenceForm} onSubmit={event => { event.preventDefault(); setHistory([]); setStage("deck"); requestAnimationFrame(() => heading.current?.focus()); }}>
        <fieldset><legend>Session length</legend><div className={s.options}>{(["Short session", "An evening", "Time to explore"] as Session[]).map(value => <label key={value}><input type="radio" name="session" value={value} checked={session === value} onChange={() => setSession(value)} />{value}</label>)}</div></fieldset>
        <fieldset><legend>Gameplay</legend><div className={s.options}>{(["Action", "Exploration", "Story", "Strategy"] as Gameplay[]).map(value => <label key={value}><input type="radio" name="gameplay" value={value} checked={gameplay === value} onChange={() => setGameplay(value)} />{value}</label>)}</div></fieldset>
        <fieldset><legend>Mood</legend><div className={s.options}>{(["Atmospheric", "Relaxed", "Intense"] as Mood[]).map(value => <label key={value}><input type="radio" name="mood" value={value} checked={mood === value} onChange={() => setMood(value)} />{value}</label>)}</div></fieldset>
        <button className={s.primaryButton} type="submit">Build my queue <ArrowRight size={17} /></button>
      </form>
    </div> : stage === "deck" && current ? <div className={s.deckLayout}>
      <div className={s.deckColumn}>
        <div className={s.deckToolbar}><span>Discovery queue · {history.length + 1} / 5</span><button type="button" onClick={reset} aria-label="Change preferences" title="Change preferences"><SlidersHorizontal size={18} /></button></div>
        <div className={s.recommendation}>
          <motion.div key={current.id} className={s.recommendationArt} initial={false} animate={reduced ? { x: 0, rotateY: 0, scale: 1 } : { x: [last?.reaction === "Not for me" ? -18 : 18, 0], rotateY: [-4, 0], scale: [.97, 1] }} transition={{ duration: .32, ease: [.22, 1, .36, 1] }} style={{ backgroundImage: `url(${coverFor(current.id)})` }} role="img" aria-label={`${current.title} cover`} />
          <div className={s.recommendationText}><p className={s.eyebrow}>A game to consider</p><h3 ref={heading} tabIndex={-1}>{current.title}</h3><p className={s.tags}>{current.tags.join(" · ")}</p><p>{current.description}</p><h4>Why it entered your queue</h4><ul className={s.matchReasons}>
            {current.sessions.includes(session) && <li><Check size={15} />Fits your selected session</li>}
            {current.gameplay === gameplay && <li><Check size={15} />Matches your interest in {gameplay.toLowerCase()}</li>}
            {current.mood === mood && <li><Check size={15} />An {mood.toLowerCase()} pick</li>}
            {(affinities[current.gameplay] || 0) > 0 && <li><Check size={15} />More {current.gameplay.toLowerCase()} after your feedback</li>}
            <li><Eye size={15} />Not yet reviewed in this session</li>
          </ul><a href={`https://store.steampowered.com/app/${current.id}`} target="_blank" rel="noreferrer">View on Steam ↗</a></div>
        </div>
        <div className={s.feedbackButtons}><button onClick={() => respond("Not for me")}><X size={17} />Not for me</button><button onClick={() => respond("Already know it")}><Eye size={17} />Already know it</button><button className={s.primaryButton} onClick={() => respond("Interested")}><Heart size={17} />Interested</button></div>
        <button className={s.textButton} onClick={() => { setStage("summary"); requestAnimationFrame(() => heading.current?.focus()); }}>Finish session</button>
      </div>
      <aside className={s.tasteProfile}><p className={s.eyebrow}>Learning from this session</p><h3>Your taste profile</h3><p>{session} · {gameplay} · {mood}</p><div className={s.affinities}>{Object.keys(affinities).length ? Object.entries(affinities).filter(([, value]) => value !== 0).map(([tag, value]) => <p key={tag}><span>{value > 0 ? "+" : "−"}</span>{value > 0 ? "More" : "Less"} {tag.toLowerCase()}</p>) : <p>Your choices will refine the queue.</p>}</div><p className={s.feedbackStatus} role="status">{last ? `${discoveryGames.find(game => game.id === last.id)!.title}: ${last.reaction}. ${last.reaction === "Already know it" ? "Removed from this session; no taste penalty." : "The remaining queue has been reranked."}` : "Your preferences set the first recommendation."}</p><p className={s.source}>Knowing a game is different from disliking it. Neither is shown again in this session.</p></aside>
    </div> : <div className={s.sessionSummary}>
      <p className={s.eyebrow}>Session complete</p><h3 ref={heading} tabIndex={-1}>Your discovery shortlist</h3><p>{history.length} reviewed · {interested.length} interested · {history.filter(choice => choice.reaction === "Already know it").length} already known</p>
      {interested.length ? <div className={s.shortlist}>{interested.map(game => <a href={`https://store.steampowered.com/app/${game.id}`} key={game.id} target="_blank" rel="noreferrer"><div style={{ backgroundImage: `url(${coverFor(game.id)})` }} /><span>{game.title} ↗</span></a>)}</div> : <p className={s.body}>Nothing caught your interest yet. Try a different mood or gameplay preference.</p>}
      <p className={s.source}>This shortlist is local to this demo. Nothing was added to your Steam wishlist.</p><button className={s.primaryButton} onClick={reset}><RotateCcw size={17} />Start a new session</button>
    </div>}
  </div></div></>;
}
