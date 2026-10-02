import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUpRight } from "lucide-react";
import { LegacyGarage } from "./legacy-garage";
import s from "./study.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Real Racing 3: The Last Lap | Vishwaraj Saxena",
  description: "An independent product study of how a long-running live-service game can preserve player identity when the service ends.",
};

const sources = [
  {
    value: "500M+",
    label: "downloads since 2013",
    note: "Reported by Formula E in February 2025.",
    href: "https://www.fiaformulae.com/en/news/culture/formula-e-returns-to-real-racing-3",
  },
  {
    value: "13 years",
    label: "from launch to shutdown",
    note: "Launched 28 February 2013; service ended 20 March 2026.",
    href: "https://news.ea.com/press-releases/press-releases-details/2013/EA-Announces-Real-Racing-3-is-Now-Available-Across-Mobile-Platforms/default.aspx",
  },
  {
    value: "20 Mar 2026",
    label: "online-service shutdown",
    note: "EA's published service-update date.",
    href: "https://www.ea.com/legal/service-updates/r-z",
  },
];

export default function RealRacingLegacyStudy() {
  return (
    <article className={s.page}>
      <nav className={s.nav} aria-label="Case study navigation">
        <Link href="/#work"><ArrowLeft size={17} /> Back to Work</Link>
        <span>Independent product study</span>
        <a href="#evidence">Evidence <ArrowDown size={15} /></a>
      </nav>

      <header className={s.hero}>
        <Image
          className={s.heroImage}
          src={`${basePath}/rr3/legacy-garage-hero.png`}
          alt="A dark archival garage with a long collection of performance cars"
          fill
          priority
          sizes="100vw"
        />
        <div className={s.heroScrim} />
        <div className={s.heroContent}>
          <p className={s.kicker}>Real Racing 3 / Live-service sunset</p>
          <h1><span>500 million downloads.</span><br />What survives the finish line?</h1>
          <p className={s.heroCopy}>A product study about preserving thirteen years of player identity when a mobile live service shuts down.</p>
          <a className={s.heroLink} href="#problem">Read the case <ArrowDown size={18} /></a>
        </div>
        <div className={s.shutdownStamp}><span>Service status</span><strong>Offline</strong><time dateTime="2026-03-20">20.03.2026</time></div>
      </header>

      <section id="problem" className={s.section}>
        <div className={s.sectionIndex}>01</div>
        <div className={s.editorialGrid}>
          <div><p className={s.label}>The product problem</p><h2>A shutdown ends the service. It does not erase the investment.</h2></div>
          <div className={s.prose}>
            <p>For thirteen years, players did more than complete races. They assembled garages, earned cars, spent currency and built a record of participation.</p>
            <p>When the servers went offline, that accumulated identity became inaccessible with the product. The central question is not whether every live service must run forever. It is what a responsible ending should preserve.</p>
            <p className={s.scope}>This is an independent concept. It does not have access to EA telemetry, licensing contracts, player inventories or shutdown economics.</p>
          </div>
        </div>
      </section>

      <section id="evidence" className={`${s.section} ${s.evidence}`}>
        <div className={s.sectionIndex}>02</div>
        <p className={s.label}>What the public record establishes</p>
        <h2 className={s.evidenceTitle}>The scale is real.<br />The loss is structural.</h2>
        <div className={s.statRun}>
          {sources.map((source, index) => (
            <a href={source.href} target="_blank" rel="noreferrer" key={source.value} className={s.stat}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{source.value}</strong>
              <h3>{source.label}</h3>
              <p>{source.note}</p>
              <ArrowUpRight size={18} />
            </a>
          ))}
        </div>
        <p className={s.evidenceBoundary}>These figures establish the product&apos;s reach and lifecycle. They do not reveal active-player count, purchase value lost, or sentiment at shutdown.</p>
      </section>

      <section className={`${s.section} ${s.timelineSection}`}>
        <div className={s.sectionIndex}>03</div>
        <div className={s.editorialGrid}>
          <div><p className={s.label}>The final lap</p><h2>The closure happened in two irreversible steps.</h2></div>
          <p className={s.proseLead}>Players first lost acquisition and spending access. Three months later, they lost the service itself.</p>
        </div>
        <ol className={s.timeline}>
          <li><time dateTime="2013-02-28">28 Feb 2013</time><strong>Launch</strong><p>Real Racing 3 launches as a free-to-play mobile racing game.</p></li>
          <li><time dateTime="2025-12-18">18 Dec 2025</time><strong>Delisting</strong><p>New downloads and in-app purchases stop. Existing currency remains spendable during the closing window.</p></li>
          <li><time dateTime="2026-03-20">20 Mar 2026</time><strong>Shutdown</strong><p>EA lists the online-service shutdown. The playable service and server-backed progression end.</p></li>
        </ol>
      </section>

      <section className={`${s.section} ${s.lossSection}`}>
        <div className={s.sectionIndex}>04</div>
        <p className={s.label}>The player consequence</p>
        <div className={s.lossHeadline}><h2>A garage is not only inventory.</h2><p>It is a record of taste, effort, mastery and time. A sunset plan should distinguish the costly service from the player history that can remain.</p></div>
        <div className={s.lossTrack}>
          <div><span>Service layer</span><strong>Events</strong><strong>Commerce</strong><strong>Leaderboards</strong><small>May require active servers, operations and licenses.</small></div>
          <div><span>Identity layer</span><strong>Garage</strong><strong>Career record</strong><strong>Achievements</strong><small>Can be evaluated for local preservation or export.</small></div>
        </div>
      </section>

      <section className={`${s.section} ${s.opportunity}`}>
        <div className={s.sectionIndex}>05</div>
        <p className={s.label}>Product judgment</p>
        <h2>End the service.<br />Preserve the driver.</h2>
        <p className={s.opportunityCopy}>How might EA give players a durable record of their Real Racing 3 history without promising continued live operations or access to licensed gameplay?</p>
        <div className={s.principles}>
          <div><span>01</span><h3>Separate service from memory</h3><p>Be explicit about what must close and what can remain as a record.</p></div>
          <div><span>02</span><h3>Prepare before the deadline</h3><p>Give every returning player a readiness check and a clear preservation window.</p></div>
          <div><span>03</span><h3>Never imply ownership EA cannot grant</h3><p>Label exported data, imagery and licensed content according to confirmed rights.</p></div>
        </div>
      </section>

      <section className={`${s.section} ${s.concept}`}>
        <div className={s.sectionIndex}>06</div>
        <p className={s.label}>Proposed experience</p>
        <h2>Legacy Garage</h2>
        <p className={s.conceptIntro}>A pre-shutdown flow that lets a player review what can be preserved, create a local archive and understand what will not continue. Try the concept below.</p>
        <LegacyGarage />
      </section>

      <section className={`${s.section} ${s.validation}`}>
        <div className={s.sectionIndex}>07</div>
        <div className={s.editorialGrid}>
          <div><p className={s.label}>Hypothesis and evaluation</p><h2>Clarity before closure can protect trust after access ends.</h2></div>
          <div className={s.prose}>
            <p><strong>Hypothesis:</strong> If players can preserve a legible record of their history and understand exactly what will disappear, they will leave with greater confidence that their investment was acknowledged.</p>
            <p>This does not assume that an archive prevents dissatisfaction or compensates for lost access. It tests whether preparation and preservation improve comprehension and perceived fairness.</p>
          </div>
        </div>
        <dl className={s.measureRows}>
          <div><dt>Primary measure</dt><dd>Preservation completion among eligible active and returning players.</dd></div>
          <div><dt>Understanding</dt><dd>Correctly identifying what remains available and what ends after shutdown.</dd></div>
          <div><dt>Trust signals</dt><dd>Support-contact themes, archive satisfaction and willingness to engage with a future EA racing title.</dd></div>
          <div><dt>Guardrails</dt><dd>Export failures, privacy incidents, incorrect entitlement display and licensing-policy violations.</dd></div>
        </dl>
        <p className={s.scope}>Proposed measures only. No experiment has been run and no outcome is claimed.</p>
      </section>

      <section className={s.takeaway}>
        <p className={s.label}>The takeaway</p>
        <h2>A live service can finish<br />without treating its history as disposable.</h2>
        <Link href="/#work">Explore more work <ArrowUpRight size={19} /></Link>
      </section>

      <aside className={s.credits}>
        <p>Independent concept by Vishwaraj Saxena. Not affiliated with Electronic Arts, Firemonkeys or Slingshot Studios.</p>
        <p>Hero artwork is an original generated concept and does not depict licensed Real Racing 3 vehicles.</p>
        <a href="https://www.ea.com/legal/service-updates/r-z" target="_blank" rel="noreferrer">EA service updates <ArrowUpRight size={14} /></a>
      </aside>
    </article>
  );
}
