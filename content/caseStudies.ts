export interface CaseStudyMeta {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  client: string;
  category: string;
  badge: string;
  coreQuestion: string;
  readTime: string;
  publishedDate: string;
  heroExcerpt: string;
  summary: string;
  metrics: {
    label: string;
    value: string;
    subtext: string;
  }[];
  keyThemes: string[];
}

export const CASE_STUDIES: CaseStudyMeta[] = [
  {
    id: "swiggy-instamart",
    slug: "swiggy-instamart",
    title: "Reliability Isn't Just Speed: The Mathematics of Quick-Commerce Trust",
    shortTitle: "Swiggy Instamart",
    client: "Swiggy Instamart",
    category: "Consumer Product / Quick Commerce",
    badge: "Consumer Product",
    coreQuestion: "Is delivery speed actually the right measure of reliability?",
    readTime: "8 min read",
    publishedDate: "Product Analysis • 2024",
    heroExcerpt:
      "Why standard deviation destroys customer trust faster than slow delivery, and how dark-store logistics can solve the ETA variance trap.",
    summary:
      "Quick commerce anchored its entire value proposition on raw sub-15-minute speed. But user psychology, fulfillment bottlenecks, and variance curves tell a different story: customers do not churn because of 18-minute deliveries—they churn when a 10-minute promise stretches silently into 28 minutes.",
    metrics: [
      {
        label: "P95 SLA Adherence",
        value: "96.4%",
        subtext: "Buffer Model vs 74.2% in Aggressive Speed",
      },
      {
        label: "Variance Spread (σ)",
        value: "±2.8m",
        subtext: "Controlled tail risk vs ±8.6m uncontrolled",
      },
      {
        label: "Repeat Retention",
        value: "+23%",
        subtext: "When ETA promise accuracy exceeds 94%",
      },
      {
        label: "Rider Safety Index",
        value: "Zero Penalty",
        subtext: "Decoupled speed quotas from dispatch incentives",
      },
    ],
    keyThemes: [
      "ETA Variance vs Mean Speed",
      "Dark Store Fulfillment Funnel",
      "Prospect Theory & Loss Aversion",
      "Predictability as North Star",
    ],
  },
  {
    id: "expedition-33",
    slug: "expedition-33",
    title: "The Kinetic Turn: Eliminating the Turn-Based Engagement Cliff",
    shortTitle: "Clair Obscur: Expedition 33",
    client: "Sandfall Interactive",
    category: "Game Product / Game Design",
    badge: "Game Product",
    coreQuestion: "How does a turn-based combat system maintain player engagement when the player isn't attacking?",
    readTime: "10 min read",
    publishedDate: "Game Strategy • 2024",
    heroExcerpt:
      "A product and mechanical deconstruction of Sandfall Interactive's combat loop—solving passive turn downtime under indie constraints.",
    summary:
      "Classic turn-based RPGs suffer from a structural engagement cliff: players plan an action, execute it, and then wait passively through 15-second enemy animations. For modern players, this creates high early-game drop-off. Expedition 33 engineered active defense mechanics (parry/dodge) into enemy turns, transforming passive waiting into high-stakes participation without abandoning tactical depth.",
    metrics: [
      {
        label: "Active Screen Time",
        value: "98%",
        subtext: "Continuous cognitive engagement across full battle loop",
      },
      {
        label: "Early Churn Reduction",
        value: "-34%",
        subtext: "Mitigating passive turn fatigue in first 2 hours",
      },
      {
        label: "Scope Efficiency",
        value: "High Impact",
        subtext: "Single core mechanic loop vs expensive multi-mode bloat",
      },
      {
        label: "TAM Expansion",
        value: "Hybrid RPG",
        subtext: "Uniting action enthusiasts and traditional strategists",
      },
    ],
    keyThemes: [
      "Active Defense Loop (Parry/Dodge)",
      "Cognitive Load & Reflex Windows",
      "Indie Team Constraints (UE5 / Sandfall)",
      "Player Archetype Segmentation",
    ],
  },
];
