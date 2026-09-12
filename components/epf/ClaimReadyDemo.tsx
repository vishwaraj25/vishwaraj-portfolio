"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, RotateCcw, ShieldAlert, X } from "lucide-react";
import s from "@/app/case-studies/epf-claims/epf.module.css";

type Status = "pass" | "fail";

interface CheckItem {
  id: string;
  label: string;
  /** What the member's records actually hold, shown side by side. */
  onFile: string;
  onAadhaar: string;
  status: Status;
  /** Plain-language consequence, not a rejection code. */
  consequence: string;
  /** The specific action that clears it, and who has to take it. */
  fix: string;
  owner: "You" | "Employer";
}

const CHECKS: CheckItem[] = [
  {
    id: "name",
    label: "Name",
    onFile: "Vishwaraj Saxena",
    onAadhaar: "Vishwaraj A Saxena",
    status: "fail",
    consequence: "A middle initial present on one record and absent on the other is treated as a mismatch.",
    fix: "File a joint declaration with your employer to align the name on the EPF record.",
    owner: "You",
  },
  {
    id: "dob",
    label: "Date of birth",
    onFile: "14 Aug 1998",
    onAadhaar: "14 Aug 1998",
    status: "pass",
    consequence: "Matches across records.",
    fix: "No action needed.",
    owner: "You",
  },
  {
    id: "bank",
    label: "Bank account",
    onFile: "Verified · ****4417",
    onAadhaar: "Seeded",
    status: "pass",
    consequence: "Account is verified and seeded.",
    fix: "No action needed.",
    owner: "You",
  },
  {
    id: "uan",
    label: "UAN",
    onFile: "Single, activated",
    onAadhaar: "Linked",
    status: "pass",
    consequence: "One active UAN with Aadhaar linked.",
    fix: "No action needed.",
    owner: "You",
  },
  {
    id: "exit",
    label: "Date of exit",
    onFile: "Not updated",
    onAadhaar: "Required",
    status: "fail",
    consequence: "A final settlement cannot be processed until your previous employer marks your exit date.",
    fix: "Request the exit-date update from your previous employer, or raise it yourself after two months.",
    owner: "Employer",
  },
];

const BLOCKERS = CHECKS.filter(c => c.status === "fail").map(c => c.id);

type Phase = "idle" | "scanning" | "results";

export function ClaimReadyDemo() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [scanned, setScanned] = useState(0);
  const [resolved, setResolved] = useState<string[]>([]);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(t => window.clearTimeout(t));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const run = () => {
    clearTimers();
    setResolved([]);
    setScanned(0);
    if (reduced) {
      setPhase("results");
      setScanned(CHECKS.length);
      return;
    }
    setPhase("scanning");
    CHECKS.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setScanned(i + 1), 260 * (i + 1)));
    });
    timers.current.push(window.setTimeout(() => setPhase("results"), 260 * CHECKS.length + 240));
  };

  const reset = () => {
    clearTimers();
    setPhase("idle");
    setScanned(0);
    setResolved([]);
  };

  const allClear = BLOCKERS.every(id => resolved.includes(id));
  const ready = phase === "results" && allClear;
  const openCount = BLOCKERS.length - resolved.length;

  return (
    <div className={s.prototype}>
      <div className={s.prototypeHead}>
        <p className={s.eyebrow}>Concept prototype · Claim Ready</p>
        {phase !== "idle" && (
          <button type="button" onClick={reset} className={s.resetButton}>
            <RotateCcw size={13} aria-hidden="true" /> Reset
          </button>
        )}
      </div>

      <div className={s.prototypeLayout}>
        {/* Device */}
        <div className={s.phone}>
          <div className={s.phoneScreen}>
            <div className={s.statusBar}>
              <span>9:41</span>
              <span className={s.statusIcons}><b /><b /><i /></span>
            </div>
            <div className={s.appBar}>
              <span className={s.appMark} aria-hidden="true" />
              <span>Claim Ready</span>
            </div>
            <div className={s.appBody}>
              <AnimatePresence mode="wait">
                {phase === "idle" && (
                  <motion.div key="idle" className={s.appStack}
                    initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <span className={s.appLabel}>FINAL SETTLEMENT</span>
                    <div className={s.appCard}>
                      <h4>Form 19 · Final PF settlement</h4>
                      <p>We will check your records against the conditions that cause most rejections before you file.</p>
                    </div>
                    <div className={s.appAmountBlock}>
                      <span className={s.appLabel}>ESTIMATED BALANCE</span>
                      <span className={s.appAmount}>₹4,86,200</span>
                    </div>
                    <div className={s.appButton}>Check my claim</div>
                  </motion.div>
                )}

                {phase === "scanning" && (
                  <motion.div key="scanning" className={s.appStack}
                    initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <span className={s.appLabel}>CHECKING RECORDS</span>
                    {CHECKS.map((check, i) => (
                      <div key={check.id} className={`${s.scanRow} ${i < scanned ? s.scanRowDone : ""}`}>
                        <span>{check.label}</span>
                        {i < scanned
                          ? check.status === "pass"
                            ? <Check size={13} className={s.jade} aria-hidden="true" />
                            : <X size={13} className={s.coral} aria-hidden="true" />
                          : <i className={s.scanDot} aria-hidden="true" />}
                      </div>
                    ))}
                  </motion.div>
                )}

                {phase === "results" && (
                  <motion.div key="results" className={s.appStack}
                    initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.24 }}>
                    <span className={`${s.statusPill} ${ready ? s.pillPass : s.pillFail}`}>
                      {ready ? "READY TO FILE" : `${openCount} BLOCKER${openCount === 1 ? "" : "S"}`}
                    </span>
                    <div className={`${s.appCard} ${ready ? s.appPass : s.appFail}`}>
                      <h4>{ready ? "Your claim should clear on first pass" : "Two things would fail this claim"}</h4>
                      <p>
                        {ready
                          ? "Every condition that commonly causes a rejection now matches. You can file."
                          : "Fix these before filing rather than waiting weeks to be told."}
                      </p>
                    </div>
                    {CHECKS.filter(c => c.status === "fail").map(check => (
                      <div key={check.id} className={s.fixRow}>
                        <i className={resolved.includes(check.id) ? s.fixDone : s.fixOpen} aria-hidden="true" />
                        <span>
                          <b>{check.label}</b> · {resolved.includes(check.id) ? "resolved" : check.owner === "Employer" ? "needs your employer" : "needs you"}
                        </span>
                      </div>
                    ))}
                    <div className={`${s.appButton} ${ready ? "" : s.appButtonMuted}`}>
                      {ready ? "File claim" : "Resolve blockers first"}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Panel */}
        <div className={s.checkPanel}>
          {phase === "idle" && (
            <>
              <h3>Check the record before the claim, not after.</h3>
              <p className={s.body}>
                Today a member files and waits. The conditions that decide the outcome are knowable
                at the moment of filing. Run the check to see the same record read back as a list of
                actions.
              </p>
              <button type="button" onClick={run} className={s.primaryButton}>Run readiness check</button>
            </>
          )}

          {phase === "scanning" && (
            <>
              <h3>Reading the record…</h3>
              <p className={s.body}>Comparing the EPF record against Aadhaar, the bank mandate, the UAN, and the employer&apos;s service history.</p>
            </>
          )}

          {phase === "results" && (
            <>
              <h3>{ready ? "Nothing left that would reject this." : "Three conditions match. Two do not."}</h3>
              <ul className={s.checkList}>
                {CHECKS.map(check => {
                  const done = check.status === "pass" || resolved.includes(check.id);
                  return (
                    <li key={check.id} className={done ? s.checkDone : s.checkOpen}>
                      <div className={s.checkTop}>
                        <span className={s.checkMark} aria-hidden="true">
                          {done ? <Check size={12} /> : <ShieldAlert size={12} />}
                        </span>
                        <div>
                          <strong>{check.label}</strong>
                          <span className={s.checkValues}>
                            EPF record <em>{check.onFile}</em> · Aadhaar <em>{check.onAadhaar}</em>
                          </span>
                        </div>
                      </div>
                      {check.status === "fail" && (
                        <div className={s.checkAction}>
                          <p>{resolved.includes(check.id) ? "Cleared in this walkthrough." : check.consequence}</p>
                          <p className={s.checkFix}><b>Fix:</b> {check.fix}</p>
                          {!resolved.includes(check.id) && (
                            <button type="button" className={s.fixButton} onClick={() => setResolved(r => [...r, check.id])}>
                              Mark as resolved
                            </button>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
              <p className={s.source}>
                Walkthrough with illustrative record values. Marking an item resolved simulates the
                outcome of the real correction; it does not perform one. Field names reflect the
                conditions EPFO has publicly identified as frequent rejection causes.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
