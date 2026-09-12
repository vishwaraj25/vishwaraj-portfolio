import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { GameLibrary, ReleaseStory, ConcentrationStory, Storefront } from "@/components/steam/DiscoveryEvidence";
import s from "./steam.module.css";
import { TasteDiscoveryDemo } from "@/components/steam/TasteDiscoveryDemo";

export default function SteamDiscoveryPage() {
  return (
    <article className={`theme-steam ${s.page}`}>
      <nav className={s.nav} aria-label="Case study">
        <Link href="/#work"><ArrowLeft size={16} aria-hidden="true" /> Back to Work</Link>
        <span>Steam Discovery</span>
      </nav>

      <header className={s.hero}>
        <div className={s.heroCopy}><p className={s.eyebrow}>A product breakdown / Steam discovery</p>
        <h1>Can a great game get discovered before it gets popular?</h1>
        <p className={s.lead}>21,308 releases in 2025. During Next Fest, the top ~4% captured ~70% of estimated wishlist gains.</p></div>
        <GameLibrary />
        <p className={s.source}>SteamDB · Game covers are illustrative artwork, not the research sample.</p>
      </header>

      <section className={s.supply} aria-labelledby="supply-title">
        <div className={s.reading}>
          <p className={s.eyebrow}>The attention constraint</p>
          <h2 id="supply-title">21,308 games launched on Steam in 2025.</h2>
          <p className={s.body}>Steam’s discovery challenge is not a lack of games. It is ranking an enormous catalogue into limited discovery space while keeping recommendations relevant.</p>
          <p className={s.body}>When existing traction is strongly associated with later discovery outcomes, relevant but unfamiliar games can enter the same discovery window from a much weaker starting position.</p>
        </div>
        <ReleaseStory />
        <div className={s.logic} aria-label="The discovery problem">
          <span>More games competing</span><ArrowRight aria-hidden="true" />
          <span>Limited player attention</span><ArrowRight aria-hidden="true" />
          <strong>Concentrated discovery outcomes</strong>
        </div>
      </section>

      <section className={s.attention} aria-labelledby="attention-title">
        <div className={s.attentionIntro}>
          <div><p className={s.eyebrow}>June 2026 Next Fest</p><h2 id="attention-title">The top ~4% captured most of the gains.</h2></div>
          <p className={s.population}><strong>4,244</strong><span>tracked games</span></p>
        </div>
        <ConcentrationStory />
      </section>

      <section className={s.momentum} aria-labelledby="momentum-title">
        <div className={s.reading}>
          <p className={s.eyebrow}>The starting line matters</p>
          <h2 id="momentum-title">Pre-festival audience explained ~60% of outcome variance.</h2>
          <p className={s.body}>Existing traction is strongly associated with future discovery. These illustrative scenarios compare starting conditions, not the histories of the games pictured or Steam&apos;s internal ranking logic.</p>
        </div>
        <div className={s.comparison}>
          <div className={s.fictionalGame}>
            <div className={s.gameArt} style={{ backgroundImage: "url(/images/steam-discovery/cover-1245620.jpg)" }} role="img" aria-label="ELDEN RING cover, used as illustrative artwork" />
            <div><span className={s.eyebrow}>Illustrative scenario</span><h3>With an audience</h3><p>Existing interest gives players a reason to look. Engagement can begin before the discovery window opens.</p></div>
          </div>
          <div className={`${s.fictionalGame} ${s.quietGame}`}>
            <div className={s.gameArt} style={{ backgroundImage: "url(/images/steam-discovery/cover-367520.jpg)" }} role="img" aria-label="Hollow Knight cover, used as illustrative artwork" />
            <div><span className={s.eyebrow}>Illustrative scenario</span><h3>Without that visibility</h3><p>A relevant game first needs to be noticed. It enters the same discovery window with less initial attention.</p></div>
          </div>
        </div>
        <div className={s.loop} aria-label="Conceptual reinforcing loop, not verified ranking logic">
          <span>Existing audience</span><ArrowRight aria-hidden="true" /><span>Initial engagement</span><ArrowRight aria-hidden="true" /><span>Visibility</span><ArrowRight aria-hidden="true" /><span>More engagement</span>
          <p>More engagement can grow the audience, reinforcing the starting advantage.</p>
        </div>
        <div className={s.observations}>
          <div><strong>~60%</strong><p>of outcome variance explained by pre-festival audience size, across <b>16,878 Next Fest games</b>.</p></div>
          <div><p>Games entering with <b>&lt;500 followers</b></p><strong>+11</strong><p>median followers gained</p></div>
        </div>
        <p className={s.caveat}>These are observed relationships. They do not prove that Steam&apos;s algorithm is broken or deliberately suppresses smaller games.</p>
        <p className={s.source}>Sources: SakujoData, NextFestStats, Immutable. Cover artwork is illustrative; these scenarios do not describe the pictured games&apos; measured outcomes.</p>
      </section>

      <section className={s.experience} aria-labelledby="experience-title">
        <div className={s.reading}><p className={s.eyebrow}>The player&apos;s side of the shelf</p><h2 id="experience-title">Which game would you try?</h2><p className={s.body}>Artwork, familiarity, reviews and social proof compete for your attention before you have played a thing.</p></div>
        <Storefront />
        <p className={s.transition}>But which game actually fits<br />what you want to play tonight?</p>
      </section>

      <section className={s.opportunity} aria-labelledby="opportunity-title">
        <h2 id="opportunity-title">Why it matters</h2>
        <dl className={s.stakeholders}>
          <div><dt>Player</dt><dd>Limited time to evaluate an increasingly large catalogue.</dd></div>
          <div><dt>Developer</dt><dd>Relevant games still need a way to reach the right audience without already having large visibility.</dd></div>
          <div><dt>Steam</dt><dd>Better matching could create more meaningful discovery without simply showing users more games.</dd></div>
        </dl>
        <p className={s.hmw}>How might Steam increase discovery of relevant, previously unseen games without reducing recommendation quality?</p>
      </section>
      <section className={s.solution} aria-labelledby="solution-title">
        <div className={s.solutionIntro}><p className={s.eyebrow}>A proposed discovery surface inside Steam</p><h2 id="solution-title">Taste Discovery</h2><p className={s.body}>Player intent → curated queue → feedback → adapted recommendations.</p></div>
        <TasteDiscoveryDemo />
      </section>
      <section className={s.analysis} aria-labelledby="ranking-title">
        <p className={s.eyebrow}>Behind the proposed experience</p><h2 id="ranking-title">Balance relevance with an opportunity to be seen.</h2>
        <ol className={s.rankingFlow}>
          <li><h3>Candidate games</h3><p>Start with eligible catalogue titles and remove games the player already knows.</p></li>
          <li><h3>Quality filter</h3><p>Check trust, compatibility, content preferences, and signs of a satisfying experience.</p></li>
          <li><h3>Relevance</h3><p>Match current intent with gameplay, mood, and the player&apos;s feedback.</p></li>
          <li><h3>Exposure balancing</h3><p>Give relevant, less-exposed games a chance without bypassing the quality threshold.</p></li>
          <li><h3>Ranked queue</h3><p>Offer a varied sequence and explain why each game belongs.</p></li>
        </ol>
        <p className={s.source}>Conceptual production pipeline. The demo only reranks a curated sample using preferences and feedback; it does not implement live quality or exposure models.</p>
      </section>
      <section className={s.analysis} aria-labelledby="hypothesis-title">
        <h2 id="hypothesis-title">Why this may work</h2><div className={s.analyticColumns}><div><h3>Intent changes the starting point.</h3><p>Asking what someone wants now may reveal relevant games that historical popularity alone would miss.</p></div><div><h3>Feedback separates different signals.</h3><p>“Already know it” signals familiarity. “Not for me” signals poor fit. Treating them differently may improve the next recommendation.</p></div></div>
        <p className={s.source}>Hypotheses to test, not measured outcomes.</p>
      </section>
      <section className={s.analysis} aria-labelledby="experiment-title">
        <p className={s.eyebrow}>Experiment design</p><h2 id="experiment-title">Does discovery become more meaningful?</h2>
        <div className={s.analyticColumns}><div><h3>Control</h3><p>Current discovery surfaces.</p></div><div><h3>Treatment</h3><p>Taste Discovery for eligible players, with assignment held stable at player level.</p></div></div>
        <div className={s.metricDefinition}><h3>Primary: Qualified Discovery Rate</h3><p>The share of eligible discovery sessions in which a player takes a meaningful action on a relevant game they report not previously knowing.</p><p>Predefine a qualifying action, such as a wishlist addition, follow, or demo start, and validate relevance with lightweight player feedback.</p></div>
        <dl className={s.stakeholders}><div><dt>Secondary metrics</dt><dd>Demo starts, wishlist additions, previously unseen titles explored, repeat use, and catalogue coverage.</dd></div><div><dt>Guardrails</dt><dd>Recommendation satisfaction, abandonment, latency, inappropriate content exposure, and downstream purchase or refund quality.</dd></div><div><dt>Readout</dt><dd>Compare groups over a predefined window. Check differences by prior familiarity and developer audience size; use uncertainty intervals, not isolated percentage lifts.</dd></div></dl>
      </section>
      <section className={s.analysis} aria-labelledby="tradeoffs-title">
        <h2 id="tradeoffs-title">The trade-offs are part of the product.</h2><div className={s.analyticColumns}><div><h3>Novelty can cost relevance.</h3><p>Exposure balancing needs quality constraints. A lesser-known game is not automatically the right game.</p></div><div><h3>More input can mean more friction.</h3><p>Keep preferences lightweight. Avoid overreacting to a single rejection or narrowing the queue too quickly.</p></div></div>
        <p className={s.finalTakeaway}>The goal is not equal attention for every game. It is a better chance for the right unfamiliar game to reach the right player.</p>
      </section>
    </article>
  );
}
