"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Compass,
  Target,
  ShieldAlert,
  TrendingUp,
  Languages,
} from "lucide-react";
import { motion } from "framer-motion";
import { ProductLoop } from "@/components/duolingo/ProductLoop";
import { MissionSimulator } from "@/components/duolingo/MissionSimulator";
import { ReadinessGauge } from "@/components/duolingo/ReadinessGauge";

/* ------------------------------------------------------------------ helpers */

function PhoneFrame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[280px]">
      <div className="relative rounded-[2.2rem] border border-[var(--page-border)] bg-[var(--page-bg-alt)] p-2.5 shadow-xl shadow-black/10">
        <div className="rounded-[1.7rem] border border-[var(--page-border)] bg-white overflow-hidden">
          <div className="flex items-center justify-between px-4 pt-2.5 pb-1 text-[9px] font-mono text-[var(--page-fg-muted)]">
            <span>9:41</span>
            <span className="flex gap-1 items-center">
              <span className="w-3 h-1.5 rounded-[1px] border border-current/60" />
              <span className="w-1 h-1 rounded-full bg-current/60" />
            </span>
          </div>
          {children}
        </div>
      </div>
      <div className="text-center text-[10px] font-mono uppercase tracking-wide text-[var(--page-fg-muted)] mt-4">
        {label}
      </div>
    </div>
  );
}

function Section({
  n,
  kicker,
  title,
  children,
}: {
  n: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 py-12 border-t border-[var(--page-border)]"
    >
      <div className="lg:col-span-3 lg:sticky lg:top-32 self-start h-max">
        <div className="font-mono text-xs text-[var(--page-accent)]">{n}</div>
        <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-[var(--page-fg-muted)] mt-2">
          {kicker}
        </div>
        <h2 className="text-xl sm:text-2xl font-editorial font-normal leading-tight mt-1">
          {title}
        </h2>
      </div>
      <div className="lg:col-span-9 space-y-5 text-[15px] leading-relaxed text-[var(--page-fg-muted)] font-sans">
        {children}
      </div>
    </motion.section>
  );
}

const strong = "text-[var(--page-highlight)] font-semibold";

/* --------------------------------------------------------------------- page */

export default function DuolingoPage() {
  return (
    <article className="theme-duolingo min-h-screen bg-[var(--page-bg)] text-[var(--page-fg)] pb-24 overflow-hidden">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--page-border)] bg-[var(--page-bg)]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between text-xs font-mono">
          <Link
            href="/#work"
            className="text-[var(--page-fg-muted)] hover:text-[var(--page-fg)] transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to case studies</span>
          </Link>
          <div className="flex items-center gap-3 text-[var(--page-fg-muted)]">
            <span>Case study 03</span>
            <span>/</span>
            <span className="font-bold text-[var(--page-fg)]">Language learning</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <header className="max-w-5xl mx-auto px-6 sm:px-8 pt-16 sm:pt-24 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-[var(--page-accent)] text-[var(--page-accent-fg)] uppercase tracking-wider font-bold flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5" />
              Independent analysis
            </span>
            <span className="px-3 py-1 rounded-full border border-[var(--page-border)] text-[var(--page-fg-muted)] uppercase tracking-wider">
              Public information only
            </span>
            <span className="text-[var(--page-fg-muted)]">9 min read · Vishwaraj Saxena</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-editorial font-normal tracking-tight leading-[1.05]">
            From streaks to real-world use
          </h1>
          <p className="text-xl sm:text-2xl font-editorial italic text-[var(--page-fg-muted)] max-w-3xl">
            “Once Duolingo has got millions of people practising every day, what should happen
            next?”
          </p>
          <p className="max-w-3xl text-base leading-relaxed text-[var(--page-fg-muted)] font-sans">
            Duolingo is very good at getting people to come back. What it has said less about is
            whether a committed daily learner can actually hold a conversation when someone talks
            back to them. That gap is the subject of this teardown. It is a hypothesis, not a
            verdict on whether Duolingo users can speak.
          </p>

          {/* metric strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 pt-6 border-t border-[var(--page-border)] font-mono">
            {[
              { k: "Daily active users", v: "52.7M", s: "Q4 2025" },
              { k: "Monthly active users", v: "133.1M", s: "Q4 2025" },
              { k: "Users with a 365-day streak", v: "~15M", s: "Dec 2025" },
              { k: "Paid subscribers", v: "12.2M", s: "Q4 2025" },
            ].map((m) => (
              <div key={m.k}>
                <div className="text-[10px] uppercase tracking-wide text-[var(--page-fg-muted)]">
                  {m.k}
                </div>
                <div className="text-2xl font-semibold mt-1">{m.v}</div>
                <div className="text-[10px] text-[var(--page-fg-muted)] mt-0.5">{m.s}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </header>

      <main className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Disclaimer */}
        <div className="rounded-xl border border-[var(--page-border)] bg-[var(--page-surface)] p-5 text-sm leading-relaxed text-[var(--page-fg-muted)]">
          <span className="font-semibold text-[var(--page-fg)]">A note on scope.</span> This is an
          independent teardown. It uses only public information: the live Duolingo app, the
          company&rsquo;s published shareholder letters, and press coverage. I do not work for
          Duolingo and have no access to internal data, roadmaps, or user metrics. The feature
          proposed here is my own idea. The phone mockups are hand-built illustrations, not
          screenshots, and any per-user scores shown are invented to demonstrate the idea.
        </div>

        {/* 01 Opportunity */}
        <Section n="01" kicker="The opportunity" title="Engagement is solved. Use is not.">
          <p>
            For Q4 2025 Duolingo reported 52.7M daily and 133.1M monthly active users. Around 43M
            of the daily users held a 7-day streak and about 15M held a 365-day streak, meaning a
            lesson roughly every day for a year. Getting people to open the app is no longer the
            hard part.
          </p>
          <p>
            So the open question is what a committed daily learner should get next. My argument is
            that it is not more practice. It is a way to use what they have already practised. The
            audience for that already exists.
          </p>
        </Section>

        {/* 02 Problem */}
        <Section n="02" kicker="The problem" title="A lesson is controlled. A conversation is not.">
          <p>
            In a lesson the learner gets a sentence, a translation, a multiple-choice question, or
            a scripted dialogue. The shape of it is known in advance. A real exchange is not. If a
            café worker asks whether you want your coffee to stay or to go, you have to catch
            phrasing you were never drilled on, follow speech at normal speed, find the words, put
            a reply together, say it while unsure, and recover if you missed something. A lesson
            does not train that directly.
          </p>
          <p>
            Duolingo has said in public that speaking is the part of the product it has been
            weakest at, and in Q1 2026 it reported that the average number of words spoken per
            user in Video Call had roughly doubled year on year. So the question I want to look at
            is a narrow one:
          </p>
          <blockquote className="border-l-2 border-[var(--page-accent)] pl-4 text-[var(--page-fg)] font-editorial text-lg not-italic">
            Committed learners need more chances to take what a lesson taught and use it in an
            unscripted situation.
          </blockquote>
        </Section>

        {/* 03 Why it matters */}
        <Section n="03" kicker="Why it matters" title="Three things point the same way.">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                h: "The scale already exists",
                p: "Duolingo reported 56.5M daily users in Q1 2026. This does not need a new audience, only a reason for the existing one to keep going.",
              },
              {
                h: "Duolingo says speaking is the gap",
                p: "The company has named speaking as its weakest area and is putting money into Video Call. So this is not a random feature idea.",
              },
              {
                h: "Knowing and using are different",
                p: "One study of 607 English learners ties task design and anxiety to whether someone is willing to speak. A 2025 controlled study of 64 students found AI speaking practice improved performance and lowered anxiety.",
              },
            ].map((c) => (
              <div
                key={c.h}
                className="p-4 rounded-xl border border-[var(--page-border)] bg-[var(--page-surface)]"
              >
                <div className="text-sm font-bold text-[var(--page-fg)]">{c.h}</div>
                <p className="text-xs mt-1.5 leading-relaxed">{c.p}</p>
              </div>
            ))}
          </div>
          <p>
            Knowing a language and being willing to use it are related but not the same result.
          </p>
        </Section>

        {/* 04 User */}
        <Section n="04" kicker="The user" title="The target is the committed learner, not the beginner.">
          <div className="rounded-xl border border-[var(--page-border)] bg-[var(--page-surface)] p-5 grid grid-cols-1 sm:grid-cols-12 gap-5">
            <div className="sm:col-span-4">
              <div className="w-12 h-12 rounded-full bg-[var(--page-accent)] text-[var(--page-accent-fg)] grid place-items-center font-editorial text-xl">
                M
              </div>
              <div className="font-bold text-[var(--page-fg)] mt-3">Maya, 27</div>
              <div className="text-xs">Learning Spanish for a trip (composite, not a real person)</div>
            </div>
            <ul className="sm:col-span-8 text-sm space-y-1.5 self-center">
              <li>· 186-day streak, 10 to 15 minutes a day</li>
              <li>· Recognises vocabulary well, comfortable with structured exercises</li>
              <li>· Rarely speaks Spanish outside the app</li>
              <li>· Not sure she can use it when someone talks to her</li>
            </ul>
          </div>
          <p>
            Her problem is not motivation. It is:{" "}
            <span className={strong}>
              &ldquo;I have learned a lot, but I do not know whether I can actually use it.&rdquo;
            </span>{" "}
            Three needs sit under that: knowing what she can do, a low-stakes place to fail, and a
            clear next thing to work on.
          </p>
        </Section>

        {/* 05 Problem statement */}
        <Section n="05" kicker="Problem statement" title="Stated as a hypothesis, not a claim.">
          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-[var(--page-border)] bg-[var(--page-surface)]">
              <div className="text-[10px] font-mono uppercase text-[var(--page-fg-muted)] mb-1">
                How might we
              </div>
              <p className="text-[var(--page-fg)] font-editorial text-lg">
                help committed learners turn what they have practised into a conversation they can
                actually hold?
              </p>
            </div>
            <div className="p-4 rounded-xl border border-[var(--page-accent)]/40 bg-[var(--page-accent)]/10">
              <div className="text-[10px] font-mono uppercase text-[var(--page-highlight)] mb-1">
                Working hypothesis
              </div>
              <p className="text-[var(--page-fg)]">
                If Duolingo gives learners short, personalised simulations built from what they
                already know and where they struggle, they will get more practice at unscripted
                communication and do better on real tasks.
              </p>
            </div>
          </div>
        </Section>

        {/* 06 What I would not build */}
        <Section n="06" kicker="Scoping" title="What I would not build.">
          <div className="space-y-2.5">
            {[
              ["“Add an AI chatbot.”", "Too vague. Duolingo already has AI Video Call and conversation."],
              ["“Add more speaking lessons.”", "Still a controlled exercise. It does not close the gap between a lesson and a real exchange."],
              ["“Give users a proficiency score.”", "A number on its own changes nothing."],
              ["“Add more gamification.”", "Duolingo’s gamification is already very strong. Another badge is not the missing piece."],
            ].map(([a, b]) => (
              <div key={a} className="flex gap-3 text-sm">
                <span className="text-[var(--page-fg)] font-mono shrink-0">✕</span>
                <span>
                  <span className="text-[var(--page-fg)] font-semibold">{a}</span> {b}
                </span>
              </div>
            ))}
          </div>
          <p>
            The pieces already exist. The work is joining them: take what the learner knows, drop
            them into a situation, let them respond on their own, score the response, find the
            weak spot, and bring it back later.
          </p>
        </Section>

        {/* 07 Solution + mockups */}
        <Section
          n="07"
          kicker="The proposal"
          title="A layer on top of the path, not a replacement."
        >
          <p>
            The idea, which I will call Real World, sits on top of the existing lesson path.
            Instead of &ldquo;what lesson should I do?&rdquo; it asks{" "}
            <span className={strong}>&ldquo;what do you want to be able to do?&rdquo;</span> Order
            breakfast, check into a hotel, ask for directions, sort out a mix-up, get through a
            five-minute chat.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <PhoneFrame label="Illustration, not a screenshot">
              <div className="p-4 space-y-3 text-[11px] font-sans">
                <div className="flex items-center justify-between text-[var(--page-fg-muted)]">
                  <span>🇪🇸 Spanish</span>
                  <span className="text-[var(--page-accent)] font-bold">🔥 186</span>
                </div>
                <div className="rounded-lg bg-[var(--page-bg-alt)] p-3">
                  <div className="text-[var(--page-fg-muted)]">Continue your path</div>
                  <div className="mt-2 h-8 rounded-md bg-[var(--page-accent)] text-[var(--page-accent-fg)] grid place-items-center font-bold">
                    Continue lesson
                  </div>
                </div>
                <div className="h-px bg-[var(--page-border)]" />
                <div className="rounded-lg border border-[var(--page-accent)]/40 bg-[var(--page-accent)]/10 p-3 space-y-1.5">
                  <div className="text-[var(--page-accent)] font-bold tracking-wide">
                    🌎 REAL WORLD
                  </div>
                  <div className="text-[var(--page-fg)] font-semibold">Can you order breakfast?</div>
                  <div className="text-[var(--page-fg-muted)]">6 min · speaking · ●●●○○</div>
                  <div className="mt-2 h-7 rounded-md border border-[var(--page-accent)] text-[var(--page-accent)] grid place-items-center font-bold">
                    Try mission
                  </div>
                </div>
              </div>
            </PhoneFrame>

            <PhoneFrame label="Illustration, not a screenshot">
              <div className="p-4 space-y-3 text-[11px] font-sans">
                <div className="text-[var(--page-fg)] font-semibold">What do you want to practise?</div>
                {[
                  ["✈️ Travel", "Breakfast in Madrid", "6 min · ●●●○○"],
                  ["🛒 Everyday", "Grocery shopping", "5 min · ●●○○○"],
                  ["💼 Work", "Meet your coworker", "7 min · ●●●●○"],
                  ["❤️ Social", "Meet a new friend", "8 min · ●●●○○"],
                ].map(([cat, name, meta]) => (
                  <div key={name} className="rounded-lg bg-[var(--page-bg-alt)] p-2.5">
                    <div className="text-[var(--page-fg-muted)]">{cat}</div>
                    <div className="text-[var(--page-fg)] font-semibold">{name}</div>
                    <div className="text-[var(--page-fg-muted)]">{meta}</div>
                  </div>
                ))}
              </div>
            </PhoneFrame>
          </div>
          <p className="text-xs">
            Each mission would be built from what the learner has covered: course progress,
            vocabulary seen, past mistakes, speaking and listening history. So it tests language
            they should already have, not new material.
          </p>
        </Section>

        {/* 08 Product loop */}
        <Section n="08" kicker="The loop" title="Change what the app measures.">
          <p>
            Today the app mostly asks &ldquo;did you finish the lesson?&rdquo; The version I am
            describing also asks{" "}
            <span className={strong}>&ldquo;can you use what the lesson taught?&rdquo;</span> Click
            through each stage.
          </p>
          <ProductLoop />
        </Section>

        {/* 09 Mission demo */}
        <Section
          n="09"
          kicker="The interaction"
          title="Let the conversation go off-script once.">
          <p>
            The learner has to say something, not pick a translation. On one turn the other person
            asks something the learner was not set up for, and the difficulty adjusts based on how
            they handle it. Walk through the mission below. The numbers in it are made up, to show
            the flow.
          </p>
          <MissionSimulator />
          <p className="text-xs">
            The design decision I care about most: do not score on grammar alone. Score whether
            they understood, whether they got their meaning across, whether the language was
            reasonable, and whether they could recover. Someone who can say &ldquo;could you
            repeat that?&rdquo; and keep going is often more use in a real situation than someone
            who writes perfect sentences in a drill.
          </p>
        </Section>

        {/* 10 Learner model */}
        <Section n="10" kicker="The engine" title="What the system would remember.">
          <p>
            Instead of &ldquo;Maya is on Unit 47&rdquo;, the app would keep a rough read on each
            skill. Example values, to show the shape:
          </p>
          <div className="rounded-xl border border-[var(--page-border)] bg-[var(--page-surface)] p-5 font-mono text-xs space-y-2">
            <div className="text-[var(--page-fg-muted)] mb-2">Maya, Spanish (example)</div>
            {[
              ["Vocabulary", 89],
              ["Grammar", 81],
              ["Speaking", 78],
              ["Listening", 64],
              ["Recovery", 56],
            ].map(([k, v]) => (
              <div key={k as string} className="flex items-center gap-3">
                <span className="w-20 text-[var(--page-fg-muted)]">{k}</span>
                <div className="flex-1 h-2 rounded-full bg-[var(--page-bg-alt)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--page-accent)]"
                    style={{ width: `${v}%` }}
                  />
                </div>
                <span className="w-6 text-right">{v}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              [Target, "Weak-spot detection", "Spots a pattern across conversations, for example a learner who keeps missing fast speech, and builds a three-minute drill for it that ties back to the course."],
              [TrendingUp, "Bring it back later", "Struggle on day one, retrieval drill on day three, café scene on day seven, a different takeaway scene on day fourteen. It checks whether the learner can retrieve it later, not just once."],
              [Compass, "Personalisation", "Two learners with the same XP get different missions. This extends the personalisation Duolingo already does rather than adding a new system."],
            ].map(([Icon, h, p]) => {
              const I = Icon as React.ElementType;
              return (
                <div
                  key={h as string}
                  className="p-4 rounded-xl border border-[var(--page-border)] bg-[var(--page-surface)]"
                >
                  <I className="w-4 h-4 text-[var(--page-accent)]" />
                  <div className="text-sm font-bold text-[var(--page-fg)] mt-2">{h as string}</div>
                  <p className="text-xs mt-1 leading-relaxed">{p as string}</p>
                </div>
              );
            })}
          </div>
        </Section>

        {/* 11 Readiness metric */}
        <Section
          n="11"
          kicker="The metric"
          title="One new number, and it is not a fluency percentage.">
          <p>
            Not XP, not streak, not league position. A single score built from how the learner
            does across realistic tasks, broken down by skill. It should never say &ldquo;you are
            72% fluent&rdquo;. It should say &ldquo;across the situations you have practised, this
            is roughly where you are&rdquo;. The chart below uses example values.
          </p>
          <ReadinessGauge />
          <p className="text-xs">
            The primary metric I would track is successful real-world tasks per weekly active
            learner. A task counts when the learner gets the point across within a set threshold.
            That measures whether the feature helps people do things, not whether they open it.
          </p>
        </Section>

        {/* 12 MVP + experiment */}
        <Section n="12" kicker="Validation" title="A small first version and an A/B test.">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-[var(--page-border)] bg-[var(--page-surface)] text-sm">
              <div className="font-bold text-[var(--page-fg)] mb-2">First version</div>
              <ul className="space-y-1 text-xs">
                <li>· One language, three categories (travel, everyday, social)</li>
                <li>· Five-minute conversations</li>
                <li>· Four things scored: understood, responded, language, recovery</li>
                <li>· One personalised weak-spot suggestion</li>
                <li>· No readiness score, no leaderboard, no big library yet</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl border border-[var(--page-border)] bg-[var(--page-surface)] text-sm">
              <div className="font-bold text-[var(--page-fg)] mb-2">The test</div>
              <ul className="space-y-1 text-xs">
                <li>· Control: current Duolingo</li>
                <li>· Treatment: plus two or three missions a week</li>
                <li>· Around 1M eligible users, split evenly</li>
                <li>· Final sample size set by a power calculation</li>
              </ul>
            </div>
          </div>
          <p className="text-xs">
            I would start with travel because the payoff is easy to picture (&ldquo;I am going to
            Madrid&rdquo;) and the pass or fail is clear: did the learner complete the task or not.
          </p>
          <div className="text-xs">
            <div className="font-bold text-[var(--page-fg)] mb-1">
              What would count as success (targets, not predictions)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono">
              {[
                "task success up at least 5%",
                "D30 retention up at least 3%",
                "speaking and listening improve",
                "no drop in core lessons",
                "AI cost per mission acceptable",
                "positive qualitative feedback",
              ].map((s) => (
                <div key={s} className="p-2 rounded-lg border border-[var(--page-border)]">
                  {s}
                </div>
              ))}
            </div>
            <p className="mt-2">
              If it lifts engagement but not communication, it does not ship widely.
            </p>
          </div>
        </Section>

        {/* 13 Sizing + money */}
        <Section n="13" kicker="Scale and money" title="Even low adoption is a lot of sessions.">
          <p>
            A rough scenario, not a forecast. If one in five daily users tried it, that is around
            11M people. One extra mission a week is roughly 590M missions a year. Real numbers
            would come from the test, not from this.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {[
              ["Free", "A few missions. Keep the core loop intact and do not paywall it early."],
              ["Super", "More missions, personalised weak-spot practice, more scenarios."],
              ["Max", "Unlimited conversation, more detailed feedback, longer scenario chains."],
            ].map(([t, d]) => (
              <div
                key={t}
                className="p-4 rounded-xl border border-[var(--page-border)] bg-[var(--page-surface)]"
              >
                <div className="text-sm font-bold text-[var(--page-fg)]">{t}</div>
                <p className="mt-1 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <p className="text-xs">
            This fits the freemium model already in place. Duolingo reported 12.2M paid
            subscribers for Q4 2025, so there is an existing base to attach premium value to.
          </p>
        </Section>

        {/* 14 Risks */}
        <Section n="14" kicker="Risks" title="Six risks, each with a way to handle it.">
          <div className="space-y-2.5">
            {[
              ["False confidence", "Report performance per situation, never a general fluency claim."],
              ["Bad AI feedback", "Constrain scoring with the course content and simple rule-based checks where possible."],
              ["Novelty that fades", "Track whether learning holds up later, not whether people play with the feature."],
              ["Too much product", "Put it inside the existing path, not in a separate destination."],
              ["Voice AI is expensive", "Keep sessions short, optimise inference, cache the scenario context."],
              ["Eats into core lessons", "Only unlock missions once the matching course content is done, so it is practice, not a substitute."],
            ].map(([r, m]) => (
              <div key={r} className="flex gap-3 text-sm">
                <ShieldAlert className="w-4 h-4 text-[var(--page-accent)] shrink-0 mt-0.5" />
                <span>
                  <span className="text-[var(--page-fg)] font-semibold">{r}.</span> {m}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* 15 Recommendation */}
        <Section n="15" kicker="Recommendation" title="Build it as a layer on the course, test it properly.">
          <p>
            Use the learner&rsquo;s course history to decide what language they should be able to
            use, then check whether they can retrieve it in a situation they cannot predict. Score
            understanding, speaking, language, and recovery, and feed the weak spots back into
            practice. Ship travel first. Only add work, social and the rest if the test holds up.
          </p>
          <div className="rounded-xl border border-[var(--page-accent)]/40 bg-[var(--page-accent)]/10 p-5">
            <div className="text-[10px] font-mono uppercase text-[var(--page-highlight)] mb-1">
              The one-line version
            </div>
            <p className="text-[var(--page-fg)] font-editorial text-lg leading-snug">
              Duolingo has the daily habit. The next job is helping people use it, with a
              low-stakes place to practise a real conversation before they have to have one.
            </p>
          </div>
          <p className="text-xs text-[var(--page-fg-muted)]">
            The wider point: Duolingo&rsquo;s next challenge is moving from measuring activity
            (streak, XP, lessons, leagues) to measuring whether people can actually use the
            language.
          </p>
        </Section>

      </main>
    </article>
  );
}
