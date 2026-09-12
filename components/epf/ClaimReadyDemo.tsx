"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Building2, Check, ShieldAlert, User, X } from "lucide-react";
import s from "@/app/case-studies/epf-claims/epf.module.css";

/* A walkthrough of the proposed flow. The member record below is fixed; what
   changes is which conditions are *required*, because that is the point: the
   same record passes or fails depending on what is being claimed. */

type ClaimType = "final" | "advance" | "pension";
type Employment = "left" | "current";
type Stage = "setup" | "checking" | "results" | "fix" | "filed";

const CLAIM_LABEL: Record<ClaimType, string> = {
  final: "Final settlement",
  advance: "Partial advance",
  pension: "Pension withdrawal",
};
const CLAIM_FORM: Record<ClaimType, string> = { final: "Form 19", advance: "Form 31", pension: "Form 10C" };

interface Condition {
  id: string;
  label: string;
  epf: string;
  other: string;
  otherSource: string;
  passes: boolean;
  owner: "member" | "employer";
  why: string;
  consequence: string;
  steps: { title: string; body: string; action: string }[];
}

const NAME: Condition = {
  id: "name",
  label: "Name",
  epf: "Vishwaraj Saxena",
  other: "Vishwaraj A Saxena",
  otherSource: "Aadhaar",
  passes: false,
  owner: "member",
  why: "Every claim is matched against Aadhaar before it is paid.",
  consequence: "A middle initial on one record and not the other is read as a mismatch, and the claim is rejected.",
  steps: [
    { title: "Which record is correct?", body: "Aadhaar is the reference for identity, so the EPF record is the one that gets corrected. You are telling the system which value to keep, not filing a dispute.", action: "Keep the Aadhaar spelling" },
    { title: "Joint declaration prepared", body: "A joint declaration is generated with the old and new value already filled in. This is the form that actually changes a name on an EPF record, and it needs your employer to countersign.", action: "Send to employer" },
    { title: "Employer countersigned", body: "Your employer confirmed the correction. The EPF record now reads the same as Aadhaar, so this condition passes on the next check.", action: "Done" },
  ],
};

const DOB: Condition = {
  id: "dob", label: "Date of birth", epf: "14 Aug 1998", other: "14 Aug 1998", otherSource: "Aadhaar",
  passes: true, owner: "member",
  why: "Checked against EPS records, where date of birth decides pension eligibility.",
  consequence: "Matches across records.", steps: [],
};

const BANK: Condition = {
  id: "bank", label: "Bank account", epf: "Verified · ****4417", other: "Seeded", otherSource: "Bank mandate",
  passes: true, owner: "member",
  why: "Payment cannot be released to an unverified account.",
  consequence: "Verified and seeded.", steps: [],
};

const UAN: Condition = {
  id: "uan", label: "UAN", epf: "Single, activated", other: "Linked", otherSource: "Aadhaar",
  passes: true, owner: "member",
  why: "More than one UAN splits your service history across accounts.",
  consequence: "One active UAN with Aadhaar linked.", steps: [],
};

const EXIT: Condition = {
  id: "exit",
  label: "Date of exit",
  epf: "Not recorded",
  other: "Required",
  otherSource: "Employer",
  passes: false,
  owner: "employer",
  why: "A settlement can only be paid once your service is formally closed.",
  consequence: "Until a previous employer marks your exit date, this claim cannot be processed at all.",
  steps: [
    { title: "Request sent to employer", body: "The exit date is the one field here you cannot edit yourself. The request goes to your previous employer with the date you actually stopped working.", action: "Notify employer" },
    { title: "No response after 60 days", body: "This is where people are stuck today, with no visible route forward. There is one: two months after leaving, a member can record their own date of exit.", action: "Mark exit date myself" },
    { title: "Exit date recorded", body: "Your service is now closed on the record. The condition that sat outside your control has been cleared without waiting on anyone.", action: "Done" },
  ],
};

/* Which conditions a claim actually depends on. */
function conditionsFor(type: ClaimType, employment: Employment): Condition[] {
  const base = [NAME, DOB, BANK, UAN];
  const needsExit = employment === "left" && (type === "final" || type === "pension");
  return needsExit ? [...base, EXIT] : base;
}

export function ClaimReadyDemo() {
  const reduced = useReducedMotion();
  const [preview, setPreview] = useState<"desktop" | "phone">("desktop");
  const [type, setType] = useState<ClaimType>("final");
  const [employment, setEmployment] = useState<Employment>("left");
  const [stage, setStage] = useState<Stage>("setup");
  const [scanned, setScanned] = useState(0);
  const [resolved, setResolved] = useState<string[]>([]);
  const [fixing, setFixing] = useState<string | null>(null);
  const [fixStep, setFixStep] = useState(0);
  const timers = useRef<number[]>([]);
  const heading = useRef<HTMLHeadingElement>(null);

  const conditions = conditionsFor(type, employment);
  const blockers = conditions.filter(c => !c.passes);
  const open = blockers.filter(c => !resolved.includes(c.id));
  const ready = open.length === 0;
  const active = fixing ? conditions.find(c => c.id === fixing) ?? null : null;

  const clearTimers = useCallback(() => {
    timers.current.forEach(t => window.clearTimeout(t));
    timers.current = [];
  }, []);
  useEffect(() => clearTimers, [clearTimers]);

  const focusHeading = () => requestAnimationFrame(() => heading.current?.focus());

  function runCheck() {
    clearTimers();
    setScanned(0);
    if (reduced) {
      setScanned(conditions.length);
      setStage("results");
      focusHeading();
      return;
    }
    setStage("checking");
    conditions.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setScanned(i + 1), 240 * (i + 1)));
    });
    timers.current.push(window.setTimeout(() => { setStage("results"); focusHeading(); }, 240 * conditions.length + 260));
  }

  function openFix(id: string) {
    setFixing(id);
    setFixStep(0);
    setStage("fix");
    focusHeading();
  }

  function advanceFix() {
    if (!active) return;
    if (fixStep < active.steps.length - 1) {
      setFixStep(fixStep + 1);
      focusHeading();
      return;
    }
    setResolved(r => (r.includes(active.id) ? r : [...r, active.id]));
    setFixing(null);
    setStage("results");
    focusHeading();
  }

  function back() {
    if (stage === "fix") { setFixing(null); setStage("results"); }
    else if (stage === "results") { setStage("setup"); setResolved([]); setScanned(0); }
    else if (stage === "filed") setStage("results");
    focusHeading();
  }

  function reset() {
    clearTimers();
    setStage("setup"); setResolved([]); setScanned(0); setFixing(null); setFixStep(0);
    focusHeading();
  }

  /* Every control lives on the screen. The panel beside it is commentary,
     never the way to drive the prototype. */
  function phoneBody() {
    if (stage === "setup") return (
      <>
        <span className={s.appLabel}>WHAT ARE YOU CLAIMING?</span>
        <div className={s.appOptions} role="radiogroup" aria-label="Claim type">
          {(Object.keys(CLAIM_LABEL) as ClaimType[]).map(v => (
            <button key={v} type="button" role="radio" aria-checked={type === v}
              className={`${s.appOption} ${type === v ? s.appOptionOn : ""}`}
              onClick={() => setType(v)}>
              <span>{CLAIM_LABEL[v]}</span>
              <em>{CLAIM_FORM[v]}</em>
            </button>
          ))}
        </div>
        <span className={s.appLabel}>YOUR EMPLOYMENT</span>
        <div className={s.appOptions} role="radiogroup" aria-label="Employment status">
          {([["left", "I have left the job"], ["current", "I am still employed"]] as [Employment, string][]).map(([v, label]) => (
            <button key={v} type="button" role="radio" aria-checked={employment === v}
              className={`${s.appOption} ${employment === v ? s.appOptionOn : ""}`}
              onClick={() => setEmployment(v)}>
              <span>{label}</span>
            </button>
          ))}
        </div>
        <div className={s.appActions}>
          <p className={s.appHint} role="status">
            {conditions.length} conditions apply{conditions.some(c => c.id === "exit") ? ", one of them your employer's" : ", none needing your employer"}
          </p>
          <button type="button" className={s.appPrimary} onClick={runCheck}>Check my claim</button>
        </div>
      </>
    );

    if (stage === "checking") return (
      <>
        <span className={s.appLabel}>CHECKING {conditions.length} CONDITIONS</span>
        {conditions.map((c, i) => (
          <div key={c.id} className={`${s.scanRow} ${i < scanned ? s.scanRowDone : ""}`}>
            <span>{c.label}</span>
            {i < scanned
              ? c.passes ? <Check size={13} aria-hidden="true" /> : <X size={13} aria-hidden="true" />
              : <i className={s.scanDot} aria-hidden="true" />}
          </div>
        ))}
      </>
    );

    if (stage === "fix" && active) return (
      <>
        <span className={`${s.statusPill} ${s.pillWait}`}>STEP {fixStep + 1} OF {active.steps.length}</span>
        <div className={s.appCard}>
          <p className={s.appCardTitle}>{active.steps[fixStep].title}</p>
          <p>{active.label} · {active.owner === "employer" ? "your employer must act" : "you can do this"}</p>
        </div>
        {active.steps.map((st, i) => (
          <div key={st.title} className={s.fixRow}>
            <i className={i < fixStep ? s.fixDone : i === fixStep ? s.fixOpen : s.fixIdle} aria-hidden="true" />
            <span>{st.title}</span>
          </div>
        ))}
        <div className={s.appActions}>
          <button type="button" className={s.appPrimary} onClick={advanceFix}>{active.steps[fixStep].action}</button>
          <button type="button" className={s.appSecondary} onClick={back}>Back to checklist</button>
        </div>
      </>
    );

    if (stage === "filed") return (
      <>
        <span className={`${s.statusPill} ${s.pillPass}`}>SETTLED</span>
        <div className={`${s.appCard} ${s.appPass}`}>
          <p className={s.appCardTitle}>₹4,86,200 credited</p>
          <p>Cleared on the first attempt. No rejection, no grievance, no refiling.</p>
        </div>
        <div className={s.appRowLine}><span>Filed</span><b>Day 0</b></div>
        <div className={s.appRowLine}><span>Settled</span><b>Day 5</b></div>
        <div className={s.appActions}>
          <button type="button" className={s.appPrimary} onClick={reset}>Start another claim</button>
        </div>
      </>
    );

    return (
      <>
        <span className={`${s.statusPill} ${ready ? s.pillPass : s.pillFail}`}>
          {ready ? "READY TO FILE" : `${open.length} BLOCKER${open.length === 1 ? "" : "S"}`}
        </span>
        <div className={`${s.appCard} ${ready ? s.appPass : s.appFail}`}>
          <p className={s.appCardTitle}>{ready ? "This claim should clear" : `${open.length} thing${open.length === 1 ? "" : "s"} would fail this claim`}</p>
          <p>{ready ? "Every condition this claim depends on now matches." : "Tap one to see how it gets fixed."}</p>
        </div>
        {conditions.map(c => {
          const done = c.passes || resolved.includes(c.id);
          if (done) return (
            <div key={c.id} className={`${s.appCondition} ${s.appConditionDone}`}>
              <Check size={13} aria-hidden="true" />
              <span>{c.label}</span>
              <em>{c.passes ? "matches" : "cleared"}</em>
            </div>
          );
          return (
            <button key={c.id} type="button" className={s.appCondition} onClick={() => openFix(c.id)}>
              <ShieldAlert size={13} aria-hidden="true" />
              <span>{c.label}</span>
              <em>{c.owner === "employer" ? "employer" : "fix"}</em>
            </button>
          );
        })}
        <div className={s.appActions}>
          <button type="button" className={s.appPrimary} disabled={!ready}
            onClick={() => { setStage("filed"); focusHeading(); }}>
            {ready ? "File claim" : "Resolve blockers first"}
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={s.previewToolbar} role="group" aria-label="Preview device">
        <span>Preview the solution</span>
        <button type="button" aria-pressed={preview === "desktop"} onClick={() => setPreview("desktop")}>Desktop</button>
        <button type="button" aria-pressed={preview === "phone"} onClick={() => setPreview("phone")}>Phone</button>
      </div>

      <div className={preview === "phone" ? s.phonePreview : s.desktopPreview}>
        <div className={`${s.prototype} ${s.glass}`} id="claim-ready">
          <div className={s.productBar}>
            <span>EPF <span className={s.productDivider}>/</span> Claim Ready</span>
            <span>Interactive concept</span>
          </div>
          <p className={s.demoNote}>
            Walkthrough with one illustrative member record. Nothing connects to EPFO systems and no
            claim is filed.
          </p>

          {stage === "setup"
            ? <a className={s.demoBack} href="#opportunity-title"><ArrowLeft size={16} aria-hidden="true" />Back to the problem</a>
            : <button type="button" className={s.demoBack} onClick={back}><ArrowLeft size={16} aria-hidden="true" />Back</button>}

          <div className={s.prototypeLayout}>
            <div className={s.phone}>
              <div className={s.phoneScreen}>
                <span className={s.island} aria-hidden="true" />
                <div className={s.statusBar}><span>9:41</span><span className={s.statusIcons}><b /><b /><i /></span></div>
                <div className={s.appBar}><span className={s.appMark} aria-hidden="true" /><span>Claim Ready</span></div>
                {/* A changing key remounts the subtree so the enter animation
                    replays per stage. Deliberately no AnimatePresence: with
                    mode="wait" the exiting child was never completing, which
                    left the phone rendering one stage behind the panel. */}
                <div className={s.appBody}>
                  <motion.div
                    key={`${stage}-${fixing ?? ""}-${fixStep}-${resolved.length}-${type}-${employment}`}
                    className={s.appStack}
                    initial={reduced ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    {phoneBody()}
                  </motion.div>
                </div>
              </div>
            </div>

            <div className={s.checkPanel}>
              {stage === "setup" && (
                <>
                  <p className={s.eyebrow}>Step 1 of 3 · What are you claiming?</p>
                  <h3 ref={heading} tabIndex={-1}>The same record passes or fails depending on what you ask for.</h3>
                  <p className={s.body}>
                    Conditions are not universal. A partial advance does not need your exit date; a
                    final settlement cannot move without it. Change the claim and watch the checklist
                    change with it.
                  </p>
                  <p className={s.setupSummary} role="status">
                    {CLAIM_FORM[type]} depends on <b>{conditions.length} conditions</b>
                    {conditions.some(c => c.id === "exit")
                      ? ", including your employer recording a date of exit."
                      : ". Your exit date is not required, so your employer is not in the way."}
                  </p>
                  <p className={s.panelCue}>Pick a claim on the phone, then tap Check my claim.</p>
                </>
              )}

              {stage === "checking" && (
                <>
                  <p className={s.eyebrow}>Step 2 of 3 · Reading the record</p>
                  <h3 ref={heading} tabIndex={-1}>Comparing {conditions.length} conditions.</h3>
                  <p className={s.body}>
                    Against Aadhaar, the bank mandate, the UAN, and your employer&apos;s service
                    history. The same comparison that happens today, run before you commit rather
                    than after.
                  </p>
                </>
              )}

              {stage === "results" && (
                <>
                  <p className={s.eyebrow}>Step 3 of 3 · {ready ? "Cleared" : "What would fail"}</p>
                  <h3 ref={heading} tabIndex={-1}>
                    {ready
                      ? "Nothing left that would reject this claim."
                      : `${conditions.length - open.length} conditions match. ${open.length} ${open.length === 1 ? "does" : "do"} not.`}
                  </h3>
                  <ul className={s.checkList}>
                    {conditions.map(c => {
                      const done = c.passes || resolved.includes(c.id);
                      return (
                        <li key={c.id} className={done ? s.checkDone : s.checkOpen}>
                          <div className={s.checkTop}>
                            <span className={s.checkMark} aria-hidden="true">{done ? <Check size={12} /> : <ShieldAlert size={12} />}</span>
                            <div>
                              <strong>{c.label}</strong>
                              <span className={s.checkValues}>EPF record <em>{c.epf}</em> · {c.otherSource} <em>{c.other}</em></span>
                            </div>
                          </div>
                          {!c.passes && (
                            <div className={s.checkAction}>
                              <p>{resolved.includes(c.id) ? "Cleared in this walkthrough." : c.consequence}</p>
                              <p className={s.checkFix}>
                                <b>{c.owner === "employer" ? <Building2 size={13} aria-hidden="true" /> : <User size={13} aria-hidden="true" />} Why it is checked:</b> {c.why}
                              </p>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  <p className={s.panelCue}>
                    {ready ? "Tap File claim on the phone." : "Tap a blocker on the phone to walk its correction path."}
                  </p>
                </>
              )}

              {stage === "fix" && active && (
                <>
                  <p className={s.eyebrow}>
                    Fixing {active.label.toLowerCase()} · {active.owner === "employer" ? "employer-owned" : "member-owned"}
                  </p>
                  <h3 ref={heading} tabIndex={-1}>{active.steps[fixStep].title}</h3>
                  <p className={s.body}>{active.steps[fixStep].body}</p>
                  <ol className={s.fixSteps}>
                    {active.steps.map((st, i) => (
                      <li key={st.title} className={i < fixStep ? s.stepDone : i === fixStep ? s.stepNow : s.stepNext}>
                        <span aria-hidden="true">{i < fixStep ? <Check size={12} /> : i + 1}</span>
                        {st.title}
                      </li>
                    ))}
                  </ol>
                  <p className={s.panelCue}>Tap {active.steps[fixStep].action} on the phone.</p>
                  {active.owner === "employer" && fixStep === 1 && (
                    <p className={s.source}>
                      EPFO allows a member to record their own date of exit two months after leaving.
                      Surfacing that route is the difference between a dead end and a next step.
                    </p>
                  )}
                </>
              )}

              {stage === "filed" && (
                <>
                  <p className={s.eyebrow}>Outcome</p>
                  <h3 ref={heading} tabIndex={-1}>Settled on the first attempt.</h3>
                  <div className={s.outcomeCompare}>
                    <div>
                      <span className={s.eyebrow}>Today</span>
                      <strong>File, wait, rejected</strong>
                      <p>&ldquo;Member data not matching.&rdquo; No field named. Then a grievance, then refile, then wait again.</p>
                    </div>
                    <div className={s.outcomeGood}>
                      <span className={s.eyebrow}>With Claim Ready</span>
                      <strong>Fix {blockers.length}, file, settled</strong>
                      <p>Blockers were named and cleared before filing, so the queue only received a claim that could actually be paid.</p>
                    </div>
                  </div>
                  <p className={s.source}>
                    The two paths illustrate sequence, not measured durations. No service level is
                    claimed.
                  </p>
                  <p className={s.panelCue}>Tap Start another claim on the phone to try a different claim type.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
