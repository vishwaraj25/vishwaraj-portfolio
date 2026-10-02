"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Download, FileText, Gauge, ShieldCheck, Trophy } from "lucide-react";
import s from "./study.module.css";

const archiveItems = [
  { id: "garage", title: "Garage index", detail: "A text record of collected cars and progression.", icon: Gauge },
  { id: "career", title: "Career record", detail: "Completed series, race history and milestones.", icon: FileText },
  { id: "achievements", title: "Achievements", detail: "A portable summary of earned accomplishments.", icon: Trophy },
];

export function LegacyGarage() {
  const [selected, setSelected] = useState<string[]>(["garage", "career"]);
  const [exported, setExported] = useState(false);
  const reduce = useReducedMotion();
  const progress = selected.length / archiveItems.length;
  const summary = useMemo(() => archiveItems.filter((item) => selected.includes(item.id)), [selected]);

  function toggle(id: string) {
    setExported(false);
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <div className={s.demo}>
      <div className={s.demoTop}><div><span>Legacy Garage</span><small>Preservation concept / not an EA product</small></div><div className={s.status}><ShieldCheck size={16} /> Archive available</div></div>
      <div className={s.demoGrid}>
        <div className={s.archivePicker}>
          <p className={s.demoStep}>01 / Choose your record</p>
          <h3>What should leave the service with you?</h3>
          <div className={s.archiveItems}>
            {archiveItems.map((item) => {
              const Icon = item.icon;
              const active = selected.includes(item.id);
              return <button key={item.id} aria-pressed={active} onClick={() => toggle(item.id)}><Icon size={22} /><span><strong>{item.title}</strong><small>{item.detail}</small></span><i>{active && <Check size={16} />}</i></button>;
            })}
          </div>
        </div>
        <div className={s.archivePreview}>
          <p className={s.demoStep}>02 / Review archive</p>
          <div className={s.archiveSheet}>
            <div><span>RR3</span><small>Driver archive</small></div>
            <h3>Your racing history</h3>
            <ul>{summary.length ? summary.map((item) => <li key={item.id}><Check size={15} /> {item.title}</li>) : <li>No records selected</li>}</ul>
            <div className={s.readiness}><span>Archive readiness</span><strong>{selected.length} of {archiveItems.length}</strong><i><motion.b initial={false} animate={{ scaleX: progress }} transition={{ duration: reduce ? 0 : 0.32, ease: "easeOut" }} /></i></div>
          </div>
          <button className={s.exportButton} disabled={!selected.length} onClick={() => setExported(true)}><Download size={18} /> Prepare local archive</button>
          <p className={s.exportFeedback} aria-live="polite">{exported ? <><Check size={16} /> Concept complete. In a real flow, format, rights and privacy would be confirmed before download.</> : "No files are created by this portfolio demonstration."}</p>
        </div>
      </div>
    </div>
  );
}
