import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Globe,
  MapPin,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { PrintButton } from "@/components/resume/PrintButton";

export const metadata = {
  title: "Resume — Vishwaraj Saxena | Product Portfolio",
  description:
    "Product portfolio resume for Vishwaraj Saxena. Product teardowns, systems and interaction design, consumer logistics, and product strategy.",
};

export default function ResumePage() {
  return (
    <div className="theme-global bg-[var(--page-bg)] text-[var(--page-fg)] pb-24">
      {/* Top Action Bar */}
      <div className="border-b border-[var(--page-border)] bg-[var(--page-bg)]/92 backdrop-blur-md sticky top-20 z-40 no-print">
        <div className="max-w-4xl mx-auto px-6 h-12 flex items-center justify-between text-xs font-mono">
          <Link
            href="/"
            className="text-[var(--page-fg-muted)] hover:text-[var(--page-fg)] transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio</span>
          </Link>
          <div className="flex items-center gap-3">
            <PrintButton />
          </div>
        </div>
      </div>

      {/* Main Resume Sheet */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 pt-12">
        <div className="rounded-xl border border-[var(--page-border)] bg-[var(--page-surface)] p-8 sm:p-14 shadow-sm shadow-black/5 print-page space-y-12">
          {/* Header */}
          <div className="border-b border-[var(--page-border)] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-editorial font-normal">
                Vishwaraj Saxena
              </h1>
              <div className="text-sm font-mono text-[var(--page-fg-muted)] font-bold uppercase tracking-wider">
                Product Portfolio — Systems &amp; Strategy
              </div>
              <p className="text-sm text-[var(--page-fg-muted)] font-sans max-w-xl leading-relaxed">
                Specialising in systems deconstruction, player retention mechanics, consumer logistics
                queuing, and product strategy under tight engineering constraints.
              </p>
            </div>

            <div className="space-y-2 text-xs font-mono text-[var(--page-fg-muted)] shrink-0">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Bengaluru, Karnataka, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:contact@vishwaraj.dev" className="hover:underline">
                  contact@vishwaraj.dev
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <a
                  href="https://www.linkedin.com/in/vishwarajsaxena/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  linkedin.com/in/vishwarajsaxena
                </a>
              </div>
            </div>
          </div>

          {/* Core Competencies */}
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--page-fg-muted)] font-bold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Competencies &amp; Product Toolkit</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
              {[
                {
                  h: "Product Strategy & Analytics",
                  p: "Funnel Optimisation, Queuing Theory, SLA Predictability, Cohort Retention, PRD Authoring, Trade-off Matrices, SQL & Data Modeling.",
                },
                {
                  h: "Systems & Interaction Design",
                  p: "Combat Loop Design, Cognitive Load Mapping, Reflex Window Calibration, Player Segmentation, Reward Schedules, Mechanic Prototyping.",
                },
                {
                  h: "Execution & Prototyping",
                  p: "Next.js, TypeScript, Tailwind CSS, Interactive Canvas/SVG Visualisations, Figma Wireframing, Jira/Linear Sprint Backlog Management.",
                },
              ].map((c) => (
                <div
                  key={c.h}
                  className="p-5 rounded-lg bg-[var(--page-bg-alt)] border border-[var(--page-border)] space-y-2"
                >
                  <div className="font-mono uppercase text-[var(--page-fg)] font-bold text-[11px]">
                    {c.h}
                  </div>
                  <p className="text-[var(--page-fg-muted)] leading-relaxed">{c.p}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Case Studies */}
          <div className="space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--page-fg-muted)] font-bold flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>In-Depth Product &amp; Game Strategy Studies</span>
            </div>

            <div className="space-y-2 border-l-2 border-[var(--page-accent)] pl-5 py-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="font-editorial font-bold text-lg">
                  Clair Obscur: Expedition 33 — Eliminating the Turn-Based Combat Cliff
                </div>
                <div className="text-xs font-mono text-[var(--page-fg-muted)]">Game Systems Strategy</div>
              </div>
              <p className="text-sm text-[var(--page-fg-muted)] font-sans leading-relaxed">
                Formulated a Product Strategy Dossier and Mini-PRD on Sandfall Interactive’s
                innovative battle loop. Analysed player segmentation across action gamers, hybrid
                RPGs, and purists to argue how real-time reactive defence (tight parry windows)
                reduces passive enemy-turn downtime under severe indie team, budget, and engine
                constraints. Built an interactive 6-stage battle loop simulator and reflex tester.
              </p>
              <div className="flex items-center gap-2 pt-1 no-print">
                <Link
                  href="/case-studies/expedition-33"
                  className="text-xs font-mono text-[var(--page-fg)] underline font-bold flex items-center gap-1"
                >
                  <span>View Interactive Game Breakdown</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--page-fg-muted)] font-bold flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Professional Experience</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="font-editorial font-bold text-lg">Product Management Intern</div>
                  <div className="text-xs font-mono text-[var(--page-fg-muted)]">2024 – Present</div>
                </div>
                <div className="text-xs font-mono text-[var(--page-fg-muted)]">
                  Consumer Tech &amp; Product Incubation
                </div>
              </div>

              <ul className="space-y-2 text-sm text-[var(--page-fg-muted)] font-sans leading-relaxed list-disc list-outside pl-5">
                <li>
                  Conducted quantitative user telemetry analysis and qualitative user journey mapping
                  to identify onboarding friction and drop-off points across high-volume mobile flows.
                </li>
                <li>
                  Authored comprehensive Product Requirement Documents (PRDs), wireframes, and
                  acceptance criteria for cross-functional engineering and design sprints.
                </li>
                <li>
                  Partnered with data engineering to define core North Star metrics, replacing vanity
                  averages with high-fidelity percentile distributions (P50, P90, P99).
                </li>
                <li>
                  Led user research synthesis sessions with 40+ customer interviews to validate
                  behavioural assumptions before committing engineering cycles.
                </li>
              </ul>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--page-fg-muted)] font-bold flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Education</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <div className="font-editorial font-bold text-lg">
                  Bachelor of Technology / Computer Science &amp; Business Systems
                </div>
                <div className="text-xs text-[var(--page-fg-muted)] font-sans">
                  Focus on System Design, Data Structures, and Human-Computer Interaction
                </div>
              </div>
              <div className="text-xs font-mono text-[var(--page-fg-muted)]">2021 – 2025</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
