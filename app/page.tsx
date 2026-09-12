"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";

const CASE_STUDIES = [
  {
    index: "01",
    slug: "/case-studies/expedition-33",
    kicker: "Clair Obscur: Expedition 33 / Product and Interactive Systems",
    accent: "#8e1a2b",
    title: "The kinetic turn: eliminating the engagement cliff",
    question: "How does a turn-based system stay engaging when the user isn’t acting?",
    dek: "A systems dossier on Sandfall Interactive’s combat loop, where real-time inputs make passive turns feel active under strict resource constraints.",
    metrics: [
      { k: "Active screen time", v: "98%" },
      { k: "Early-funnel churn", v: "−34%" },
      { k: "Interaction", v: "Loop visualiser" },
    ],
    cta: "Read the systems breakdown",
  },
  {
    index: "02",
    slug: "/case-studies/steam-discovery",
    kicker: "Steam Discovery / Marketplace Product Strategy",
    accent: "#66c0f4",
    title: "Steam discovery is becoming an attention market",
    question: "How should a store help unfamiliar games earn qualified attention?",
    dek: "A product case study on crowded release volume, concentrated wishlist gains, and the discovery disadvantage facing games without pre-existing traction.",
    metrics: [
      { k: "2025 releases", v: "21,308" },
      { k: "Next Fest scale", v: "4,244 games" },
      { k: "Concentration", v: "Top 4%" },
    ],
    cta: "Read the Steam discovery study",
  },
  {
    index: "03",
    slug: "/case-studies/epf-claims",
    kicker: "EPF Claims / Public Infrastructure Product",
    accent: "#ffb020",
    title: "One in five people are told no when asking for their own money",
    question: "How might a member know a claim will fail before they file it?",
    dek: "An India-specific breakdown of why 1.74 crore provident fund claims were rejected in a single year, and why almost none of it was a decision about eligibility.",
    metrics: [
      { k: "Claims filed", v: "7.96 cr" },
      { k: "Rejected", v: "1.74 cr" },
      { k: "Rejection rate", v: "~22%" },
    ],
    cta: "Read the EPF claims breakdown",
  },
];

const PRINCIPLES = [
  {
    number: "01",
    title: "Deconstruct the incentive",
    body: "A pricing page, a delivery guarantee, an in-app economy — user behaviour is never irrational, it responds to the incentive structure. Find the incentive and you find the friction.",
  },
  {
    number: "02",
    title: "Respect the constraints",
    body: "Good strategy isn’t an infinite wishlist. Product thinking shows under tight budgets, small teams and technical bottlenecks — discipline in scope creates depth of craft.",
  },
  {
    number: "03",
    title: "Measure the tails, not the mean",
    body: "A 12-minute average delivery is worthless if the 90th percentile triggers 30% cancellation. Always evaluate the tail of the user experience.",
  },
];

function HeroLine({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <span className="block">
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom pr-[0.22em] pb-[0.12em] -mb-[0.12em]"
        >
          <span
            className="word-in"
            style={{ animationDelay: `${0.1 + (start + i) * 0.06}s` }}
          >
            {w}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function HomePage() {
  return (
    <div className="bg-[var(--page-bg)] text-[var(--page-fg)] theme-global">
      {/* ---------------------------------------------------------------- HERO */}
      <section className="px-6 sm:px-8 max-w-5xl mx-auto pt-20 sm:pt-28 pb-20">
        <h1 className="font-editorial font-normal tracking-tight leading-[1.02] text-[3.4rem] sm:text-8xl">
          <HeroLine text="Vishwaraj" />
          <HeroLine text="Saxena" start={1} />
        </h1>

        <p
          className="rise mt-8 max-w-2xl text-xl sm:text-2xl font-editorial italic leading-snug"
          style={{ animationDelay: "0.4s" }}
        >
          Product Portfolio
        </p>

        <p
          className="rise mt-5 max-w-xl text-base leading-relaxed text-[var(--page-fg-muted)] font-sans"
          style={{ animationDelay: "0.5s" }}
        >
          Selected product case studies and shipped work.
        </p>

        <div
          className="rise mt-8 flex flex-wrap items-center gap-3"
          style={{ animationDelay: "0.6s" }}
        >
          <a
            href="#work"
            className="btn-premium inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--page-accent)] text-[var(--page-accent-fg)] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[var(--page-accent-hover)]"
          >
            <span>View the Work</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href="/resume"
            className="btn-premium inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--page-border)] text-[var(--page-fg)] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[var(--page-bg-alt)]"
          >
            <FileText className="w-4 h-4" />
            <span>Resume</span>
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------- FEATURED WORK */}
      <section
        id="work"
        className="px-6 sm:px-8 max-w-5xl mx-auto py-16 border-t border-[var(--page-border)]"
      >
        <div className="flex items-baseline justify-between gap-4 mb-14">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--page-fg-muted)]">
            Selected case studies
          </h2>
          <span className="text-xs font-mono text-[var(--page-fg-muted)]">Current work</span>
        </div>

        <div>
          {CASE_STUDIES.map((cs) => (
            <article
              key={cs.slug}
              className="reveal border-t border-[var(--page-border)] first:border-t-0"
            >
              <Link
                href={cs.slug}
                className="group block py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 transition-colors hover:bg-[var(--page-surface)] -mx-4 px-4 rounded-lg"
              >
                <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-3">
                  <span className="font-editorial text-4xl text-[var(--page-fg-muted)] transition-colors group-hover:text-[var(--page-fg)]">
                    {cs.index}
                  </span>
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full transition-transform duration-300 group-hover:scale-[1.6]"
                    style={{ backgroundColor: cs.accent }}
                    aria-hidden
                  />
                </div>

                <div className="lg:col-span-10 space-y-5">
                  <div className="text-xs font-mono uppercase tracking-[0.14em] text-[var(--page-fg-muted)]">
                    {cs.kicker}
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-editorial font-normal leading-[1.12] max-w-3xl">
                    <span className="relative inline">
                      {cs.title}
                      <span
                        className="pointer-events-none absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 bg-[var(--page-fg)] transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                        aria-hidden
                      />
                    </span>
                  </h3>
                  <p className="text-sm font-editorial italic text-[var(--page-fg-muted)]">
                    “{cs.question}”
                  </p>
                  <p className="max-w-2xl text-base leading-relaxed text-[var(--page-fg-muted)] font-sans">
                    {cs.dek}
                  </p>

                  <dl className="flex flex-wrap gap-x-10 gap-y-3 pt-2 border-t border-[var(--page-border)]">
                    {cs.metrics.map((m) => (
                      <div key={m.k} className="font-mono">
                        <dt className="text-[10px] uppercase tracking-wide text-[var(--page-fg-muted)]">
                          {m.k}
                        </dt>
                        <dd className="text-lg font-semibold mt-0.5">{m.v}</dd>
                      </div>
                    ))}
                  </dl>

                  <span className="inline-flex items-center gap-2 pt-2 font-mono text-xs uppercase tracking-wider font-semibold text-[var(--page-fg)]">
                    <span className="link-draw">{cs.cta}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------- PHILOSOPHY */}
      <section
        id="philosophy"
        className="px-6 sm:px-8 max-w-5xl mx-auto py-16 border-t border-[var(--page-border)]"
      >
        <div className="reveal max-w-2xl space-y-3 mb-12">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--page-fg-muted)]">
            How I evaluate systems
          </h2>
          <p className="text-2xl sm:text-3xl font-editorial font-normal leading-snug">
            Every product is a system that exists to guide human choices. I evaluate the mechanics,
            not the surface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--page-border)] border border-[var(--page-border)] rounded-xl overflow-hidden">
          {PRINCIPLES.map((p) => (
            <div key={p.number} className="reveal bg-[var(--page-surface)] p-7 space-y-3">
              <div className="font-mono text-xs text-[var(--page-accent)] font-bold">{p.number}</div>
              <h3 className="text-lg font-editorial font-bold">{p.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--page-fg-muted)] font-sans">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------- ABOUT */}
      <section
        id="about"
        className="px-6 sm:px-8 max-w-5xl mx-auto py-16 border-t border-[var(--page-border)]"
      >
        <div className="reveal grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--page-fg-muted)]">
              About
            </h2>
            <p className="text-3xl font-editorial font-normal leading-tight">
              Product thinking across consumer systems
            </p>
          </div>

          <div className="md:col-span-8 space-y-5 text-base leading-relaxed text-[var(--page-fg-muted)] font-sans">
            <p>
              I work at the intersection of{" "}
              <strong className="text-[var(--page-highlight)] font-semibold">
                rigorous product analysis
              </strong>{" "}
                across funnel analytics, queuing theory, unit economics, and retention, alongside{" "}
              <strong className="text-[var(--page-highlight)] font-semibold">
                systems &amp; interaction design
              </strong>{" "}
                pacing, user agency, feedback loops, and tactile response.
            </p>
            <p>
              When I evaluate a product I don’t look at vanity metrics or UI trends. I dissect the
              mechanical core: what are the user’s inputs, what is the feedback loop, where is the
              friction, and what are the team’s constraints?
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link
                href="/resume"
                className="btn-premium inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--page-accent)] text-[var(--page-accent-fg)] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[var(--page-accent-hover)]"
              >
                <span>Full resume</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://www.linkedin.com/in/vishwarajsaxena/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-[var(--page-border)] font-mono text-xs uppercase tracking-wider font-semibold text-[var(--page-fg)] hover:bg-[var(--page-bg-alt)]"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-4 h-4 opacity-70" />
              </a>
              <a
                href="https://github.com/vishwaraj25"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-[var(--page-border)] font-mono text-xs uppercase tracking-wider font-semibold text-[var(--page-fg)] hover:bg-[var(--page-bg-alt)]"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-4 h-4 opacity-70" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
