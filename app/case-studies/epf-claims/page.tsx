import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ClaimField, RejectionTrend } from "@/components/epf/ClaimEvidence";
import { ClaimReadyDemo } from "@/components/epf/ClaimReadyDemo";
import s from "./epf.module.css";

export const metadata: Metadata = {
  title: "EPF claims — Vishwaraj Saxena",
  description:
    "An independent product breakdown of why roughly one in five EPF withdrawal claims is rejected, and a pre-submission readiness check that would catch the causes before filing.",
};

/* Conditions EPFO has publicly identified as frequent causes of rejection.
   Presented as a list because no reliable published split by cause exists. */
const MISMATCHES = [
  { id: "name", label: "Name", state: "Aadhaar reads Vishwaraj A Saxena. The EPF record reads Vishwaraj Saxena." },
  { id: "dob", label: "Date of birth", state: "Aadhaar says 14 Aug 1998. The EPF record says 14 Aug 1997." },
  { id: "bank", label: "Bank account", state: "The account is added, but your employer has never verified it." },
  { id: "uan", label: "UAN", state: "Two UANs exist under your name and have not been merged." },
  { id: "exit", label: "Date of exit", state: "Your previous employer has not recorded the day you left." },
];

export default function EpfClaimsPage() {
  return (
    <article className={`theme-epf ${s.page}`}>
      <nav className={s.nav} aria-label="Case study">
        <Link href="/#work"><ArrowLeft size={16} aria-hidden="true" /> Back to Work</Link>
        <span>EPF Claims</span>
      </nav>

      <header className={s.hero}>
        <p className={s.eyebrow}>A product breakdown / EPF withdrawals</p>
        <h1>Roughly one in five people asking for their own money is told no.</h1>
        <p className={s.lead}>
          In FY2024-25 members filed about <b>7.96 crore</b> EPF claims. About <b>1.74 crore</b> were
          rejected. Almost none of that is a decision about whether you are owed the money.
        </p>
        <figure className={s.claimFigure}>
          <figcaption className={s.claimLegend}>
            <span><i className={s.legendRejected} aria-hidden="true" /> Rejected claim</span>
            <span><i className={s.legendSettled} aria-hidden="true" /> Settled claim</span>
          </figcaption>
          <ClaimField />
          <p className={s.claimCaption}>
            Each tile stands for a share of the 7.96 crore claims filed in FY2024-25, not a single
            claim. Two tiles in every nine are black, matching the reported rejection rate.
          </p>
        </figure>
        <div className={s.heroStat}>
          <div><strong>7.96 cr</strong><span>claims filed</span></div>
          <div><strong className={s.coral}>1.74 cr</strong><span>rejected</span></div>
          <div><strong>~22%</strong><span>rejection rate</span></div>
        </div>
        <p className={s.source}>
          EPFO Annual Report, FY2024-25, as reported. The rate is calculated from the published
          claims-filed and claims-rejected counts. Tiles are proportional, not one per claim.
        </p>
      </header>

      <section className={s.scale} aria-labelledby="scale-title">
        <div className={s.reading}>
          <p className={s.eyebrow}>The scale</p>
          <h2 id="scale-title">The rate is falling. The number of rejections is not.</h2>
          <p className={s.body}>
            EPFO has improved: the rejection rate has come down from roughly 29% in FY2021-22 to
            about 22% in FY2024-25. But claim volume grew faster than the rate fell, so more people
            were rejected last year than the year before.
          </p>
          <p className={s.body}>
            A separate November 2024 snapshot splits the outcome further: <b>7.82%</b> of claims were
            returned for correction and <b>13.77%</b> were rejected outright.
          </p>
        </div>
        <RejectionTrend />
        <div className={`${s.logic} ${s.glass} ${s.reveal}`} aria-label="The problem in one line">
          <span>Records held in four places</span><ArrowRight aria-hidden="true" />
          <span>Any one of them disagrees</span><ArrowRight aria-hidden="true" />
          <strong>The claim fails, weeks later</strong>
        </div>
      </section>

      <section className={s.cause} aria-labelledby="cause-title">
        <div className={s.causeIntro}>
          <div>
            <p className={s.eyebrow}>What actually decides the outcome</p>
            <h2 id="cause-title">These are not eligibility decisions. They are spelling.</h2>
          </div>
          <p className={s.population}><strong>1.74 cr</strong><span>rejections in one year</span></p>
        </div>

        <p className={s.body}>
          EPFO has publicly attributed a significant share of rejections to small record errors such
          as name mismatches and unlinked Aadhaar. The claim below currently has a clean record and
          would be paid. Try breaking it.
        </p>

        <div className={`${s.recordCheck} ${s.glass}`}>
          <div className={s.recordBar}>
            <span>MEMBER RECORD · FORM 19 FINAL SETTLEMENT</span>
            <b>₹4,86,200</b>
          </div>
          <p className={s.recordHint}>
            Below are five problems a real member record can have. Tick any one to apply it to this
            claim and see the outcome change. One is enough.
          </p>
          <fieldset className={s.recordGrid}>
            <legend className={s.srOnly}>Apply a record problem to this claim to see the outcome change</legend>
            {MISMATCHES.map(item => (
              <label className={s.recordRow} key={item.id}>
                <input type="checkbox" name={`mismatch-${item.id}`} />
                <span>
                  <span className={s.recordLabel}>{item.label}</span>
                  <span className={s.recordValues}>{item.state}</span>
                </span>
              </label>
            ))}
          </fieldset>

          <div className={`${s.verdict} ${s.verdictPass}`} aria-live="polite">
            <span className={s.verdictMark} aria-hidden="true">✓</span>
            <div>
              <h3>Claim would be settled</h3>
              <p>Every condition agrees across Aadhaar, the EPF record, the bank mandate and the employer&apos;s service history.</p>
            </div>
          </div>
          <div className={`${s.verdict} ${s.verdictFail}`} aria-live="polite">
            <span className={s.verdictMark} aria-hidden="true">✕</span>
            <div>
              <h3>Claim rejected · &ldquo;Member data not matching&rdquo;</h3>
              <p>
                One mismatch is enough. The member is told the data did not match, not which field
                disagreed or what to do about it. Field offices can reject on a data mismatch without
                contacting the member first.
              </p>
            </div>
          </div>
        </div>

        <div className={`${s.causeList} ${s.reveal}`}>
          {[
            ["01", "A name spelled differently across Aadhaar, PAN and the EPF record. An expanded initial or an extra middle name is enough."],
            ["02", "A date of birth that disagrees between records. This is a common cause of pension claim rejection specifically."],
            ["03", "A bank account that was added but never verified by the employer."],
            ["04", "More than one UAN, or a UAN that was never activated."],
            ["05", "A previous employer who never marked the date of exit, which blocks a final settlement outright."],
          ].map(([n, text]) => (
            <div key={n}><span>{n}</span><p>{text}</p></div>
          ))}
        </div>

        <p className={`${s.caveat} ${s.glass}`}>
          EPFO has identified these as frequent causes. I could not find a reliable published
          breakdown of rejections by cause, so no split is claimed here. The list is qualitative.
        </p>
        <p className={s.source}>
          Sources: EPFO Annual Report; EPFO statements on rejection causes; reported field-office
          practice. Record values shown are illustrative.
        </p>
      </section>

      <section className={s.journey} aria-labelledby="journey-title">
        <div className={s.reading}>
          <p className={s.eyebrow}>What the member sees</p>
          <h2 id="journey-title">You find out weeks later, and the message does not tell you what to fix.</h2>
          <p className={s.body}>
            The information needed to predict the outcome exists at the moment of filing. It is
            spent on a rejection notice instead.
          </p>
        </div>

        <div className={`${s.phoneRow} ${s.reveal}`}>
          <div className={s.phoneStep}>
            <div className={s.stepMeta}><span>01</span><strong>You file</strong></div>
            <div className={s.phone}>
              <div className={s.phoneScreen}>
              <span className={s.island} aria-hidden="true" />
                <div className={s.statusBar}><span>9:41</span><span className={s.statusIcons}><b /><b /><i /></span></div>
                <div className={s.appBar}><span className={s.appMark} aria-hidden="true" /><span>Member Portal</span></div>
                <div className={s.appBody}>
                  <span className={s.appLabel}>CLAIM TYPE</span>
                  <div className={s.appCard}>
                    <p className={s.appCardTitle}>Form 19 · Final PF settlement</p>
                    <p>Your claim will be processed by the field office handling your account.</p>
                  </div>
                  <div className={s.appRowLine}><span>Balance</span><b>₹4,86,200</b></div>
                  <div className={s.appRowLine}><span>Bank</span><b>****4417</b></div>
                  <div className={s.appButton}>Submit claim</div>
                </div>
              </div>
            </div>
            <p>Everything looks complete. Nothing on this screen indicates a problem.</p>
          </div>

          <div className={s.phoneStep}>
            <div className={s.stepMeta}><span>02</span><strong>Weeks pass, then no</strong></div>
            <div className={s.phone}>
              <div className={s.phoneScreen}>
              <span className={s.island} aria-hidden="true" />
                <div className={s.statusBar}><span>9:41</span><span className={s.statusIcons}><b /><b /><i /></span></div>
                <div className={s.appBar}><span className={s.appMark} aria-hidden="true" /><span>Member Portal</span></div>
                <div className={s.appBody}>
                  <span className={`${s.statusPill} ${s.pillFail}`}>REJECTED</span>
                  <div className={`${s.appCard} ${s.appFail}`}>
                    <p className={s.appCardTitle}>Claim rejected</p>
                    <p>Reason: Member data not matching. Please apply afresh.</p>
                  </div>
                  <div className={s.appRowLine}><span>Filed</span><b>Day 0</b></div>
                  <div className={s.appRowLine}><span>Decision</span><b>Day 20</b></div>
                  <div className={s.deadWall}>No field named. No correction path offered. No one called.</div>
                </div>
              </div>
            </div>
            <p>The notice names a category, not a field. &ldquo;Apply afresh&rdquo; means repeat the same guess.</p>
          </div>

          <div className={s.phoneStep}>
            <div className={s.stepMeta}><span>03</span><strong>The loop</strong></div>
            <div className={s.phone}>
              <div className={s.phoneScreen}>
              <span className={s.island} aria-hidden="true" />
                <div className={s.statusBar}><span>9:41</span><span className={s.statusIcons}><b /><b /><i /></span></div>
                <div className={s.appBar}><span className={s.appMark} aria-hidden="true" /><span>Grievance</span></div>
                <div className={s.appBody}>
                  <span className={`${s.statusPill} ${s.pillWait}`}>UNDER REVIEW</span>
                  <div className={s.appCard}>
                    <p className={s.appCardTitle}>Grievance registered</p>
                    <p>Typical resolution takes about 15 to 30 days.</p>
                  </div>
                  <div className={s.fixRow}><i className={s.fixOpen} aria-hidden="true" /><span>Identify which field disagreed</span></div>
                  <div className={s.fixRow}><i className={s.fixOpen} aria-hidden="true" /><span>Reach a former employer</span></div>
                  <div className={s.fixRow}><i className={s.fixOpen} aria-hidden="true" /><span>File the claim again</span></div>
                  <div className={s.deadWall}>Then wait for the same decision to be made again.</div>
                </div>
              </div>
            </div>
            <p>A second queue, on top of the first, to learn something the system already knew.</p>
          </div>
        </div>
        <p className={s.source}>
          Screens are a concept reconstruction of the member journey, not EPFO screenshots, and use
          no EPFO branding. Timings reflect reported grievance-resolution ranges.
        </p>
      </section>

      <section className={s.opportunity} aria-labelledby="opportunity-title">
        <h2 id="opportunity-title">Why it matters</h2>
        <dl className={`${s.stakeholders} ${s.reveal}`}>
          <div><dt>Member</dt><dd>Often needs the money for the reason they left the job. A rejection costs weeks and does not say what to fix.</dd></div>
          <div><dt>Employer</dt><dd>Holds a field the member cannot edit. Silence on an exit date blocks a settlement indefinitely.</dd></div>
          <div><dt>EPFO</dt><dd>Spends adjudication capacity and grievance capacity on the same avoidable errors, twice per member.</dd></div>
        </dl>
        <p className={s.hmw}>
          How might a member know a claim will fail before they file it, rather than twenty days after?
        </p>
      </section>

      <section className={s.solution} aria-labelledby="solution-title">
        <div className={s.solutionInner}>
          <div className={s.solutionIntro}>
            <p className={s.eyebrow}>A proposed step before submission</p>
            <h2 id="solution-title">Claim Ready</h2>
            <p className={s.body}>
              Move the check that currently happens after filing to before it. Read the record, name
              the exact field that disagrees, say who can fix it, and only then let the member file.
            </p>
          </div>
          <ClaimReadyDemo />
        </div>
      </section>

      <section className={s.analysis} aria-labelledby="logic-title">
        <p className={s.eyebrow}>Behind the proposed experience</p>
        <h2 id="logic-title">The same checks, run earlier and explained.</h2>
        <ol className={`${s.rankingFlow} ${s.reveal}`}>
          <li><h3>Read the record</h3><p>Pull the fields a settlement already depends on: name, date of birth, bank mandate, UAN state and employer service history.</p></li>
          <li><h3>Compare, do not judge</h3><p>Flag disagreement between sources rather than deciding eligibility. A mismatch is a data state, not a verdict on the member.</p></li>
          <li><h3>Name the field</h3><p>Return the specific field and both values. &ldquo;Member data not matching&rdquo; is replaced by &ldquo;Aadhaar has a middle initial your EPF record does not.&rdquo;</p></li>
          <li><h3>Route to an owner</h3><p>Separate what the member can fix from what only the employer can. An exit date is not a member failure and should not be presented as one.</p></li>
          <li><h3>Gate the submission</h3><p>Let the member file once the blockers clear, so the queue receives claims that can actually be settled.</p></li>
        </ol>
        <p className={s.source}>
          Conceptual flow. The prototype walks through illustrative record values and does not
          connect to EPFO systems.
        </p>
      </section>

      <section className={s.analysis} aria-labelledby="hypothesis-title">
        <h2 id="hypothesis-title">Why this may work</h2>
        <div className={`${s.analyticColumns} ${s.reveal}`}>
          <div>
            <h3>The failure is knowable before the wait.</h3>
            <p>Most of these conditions are checkable at submission time. If that is true, the rejection is a timing choice, not an information limit.</p>
          </div>
          <div>
            <h3>Naming the field changes what the member can do.</h3>
            <p>A category tells you that you failed. A field and a value tell you what to correct. The second should raise the share of second attempts that succeed.</p>
          </div>
        </div>
        <p className={s.source}>Hypotheses to test, not measured outcomes.</p>
      </section>

      <section className={s.analysis} aria-labelledby="experiment-title">
        <p className={s.eyebrow}>Experiment design</p>
        <h2 id="experiment-title">Do more claims clear on the first attempt?</h2>
        <div className={`${s.analyticColumns} ${s.reveal}`}>
          <div><h3>Control</h3><p>Current submission flow, with the outcome communicated after adjudication.</p></div>
          <div><h3>Treatment</h3><p>Readiness check before submission, with named fields and owner routing. Assignment held stable at member level.</p></div>
        </div>
        <div className={`${s.metricDefinition} ${s.glass}`}>
          <h3>Primary: First-Pass Claim Success Rate</h3>
          <p>The share of filed claims settled without a rejection, a return for correction, or a grievance, measured within a fixed window from first submission.</p>
          <p>This deliberately counts the member&apos;s experience of the whole attempt rather than the outcome of any single submission, so a flow that merely splits one rejection into two filings does not look like an improvement.</p>
        </div>
        <dl className={`${s.stakeholders} ${s.reveal}`}>
          <div><dt>Secondary metrics</dt><dd>Time from first submission to settlement, share of blockers resolved before filing, employer exit-date turnaround, and grievances filed per settled claim.</dd></div>
          <div><dt>Guardrails</dt><dd>Total settlement volume, abandonment at the new gate, time added before submission, and equity of outcomes across members who need employer action versus those who do not.</dd></div>
          <div><dt>Readout</dt><dd>Compare over a predefined window with uncertainty intervals. Split by whether a blocker was member-owned or employer-owned, since the second is outside the member&apos;s control.</dd></div>
        </dl>
      </section>

      <section className={s.analysis} aria-labelledby="tradeoffs-title">
        <h2 id="tradeoffs-title">The trade-offs are part of the product.</h2>
        <div className={`${s.analyticColumns} ${s.reveal}`}>
          <div>
            <h3>A gate can become a new wall.</h3>
            <p>Blocking submission until records agree helps only if the corrections are genuinely reachable. If an employer never responds, the member has been stopped earlier rather than helped.</p>
          </div>
          <div>
            <h3>Fewer rejections is the wrong goal.</h3>
            <p>Rejections fall if fewer people file. The metric has to be settlements members actually receive, not the rejection rate on its own.</p>
          </div>
        </div>
        <p className={s.finalTakeaway}>
          The money was never in dispute. Only the spelling was. A system that knows which field
          disagrees should say so before it takes twenty days to say no.
        </p>
        <p className={s.source}>
          Independent analysis using public information only: EPFO annual reporting, EPFO public
          statements, and press coverage. No affiliation with EPFO and no access to internal data.
        </p>
      </section>
    </article>
  );
}
