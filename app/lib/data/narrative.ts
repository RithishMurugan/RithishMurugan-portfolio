import type { LucideIcon } from "lucide-react";
import { Cpu, Brain, Cloud, GitBranch, Sparkles, Layers } from "lucide-react";

export const HERO_EYEBROW = "Intelligent Systems · Built for Production";

export const HERO_TAGLINE =
  "Engineering production-grade AI platforms, distributed systems, and full-stack applications — from backend infrastructure to intelligent interfaces.";

export const HERO_METRICS = [
  { value: "400K+", label: "Records processed at scale" },
  { value: "50K+", label: "Monthly production interactions" },
  { value: "99.99%", label: "Platform uptime" },
  { value: "4+", label: "Years shipping software" },
] as const;

export interface CapabilityPillar {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  footnote: string;
  nodes: string[];
}

export const CAPABILITY_PILLARS: CapabilityPillar[] = [
  {
    id: "systems",
    icon: Layers,
    title: "Distributed Systems",
    subtitle: "Infrastructure that scales",
    description:
      "Event-driven microservices, API platforms, and cloud-native delivery — the backbone behind reliable, high-throughput production software.",
    footnote: "Designed for reliability under real load.",
    nodes: ["FastAPI", "Spring Boot", "Kafka", "PostgreSQL", "AWS EKS", "Terraform"],
  },
  {
    id: "intelligence",
    icon: Brain,
    title: "Applied AI",
    subtitle: "Intelligence with rigor",
    description:
      "LangGraph orchestration, multi-model RAG, and agentic workflows — production AI systems with evaluation, safety guardrails, and measurable impact.",
    footnote: "Intelligence grounded in evaluation and control.",
    nodes: ["LangChain", "LangGraph", "RAG", "GPT-4o", "Claude", "Llama 3"],
  },
  {
    id: "fullstack",
    icon: Cpu,
    title: "Full-Stack Delivery",
    subtitle: "End-to-end ownership",
    description:
      "From API contracts and data pipelines to React interfaces — shipping complete product loops, not isolated components.",
    footnote: "From backend contracts to usable interfaces.",
    nodes: ["React", "TypeScript", "Python", "FastAPI", "CI/CD", "Observability"],
  },
];

export const PHILOSOPHY_STATEMENTS = [
  {
    icon: GitBranch,
    title: "Production before polish",
    text: "I learned distributed systems and event-driven architecture at Hexaware and Virtualan before applying those instincts to AI platforms at Abridge.",
  },
  {
    icon: Layers,
    title: "End-to-end ownership",
    text: "From API contracts and Kafka pipelines to React interfaces — I ship the full loop, not just the model wrapper.",
  },
  {
    icon: Sparkles,
    title: "Intelligence with accountability",
    text: "Every AI feature ships with evaluation, feedback capture, and production guardrails baked into the architecture.",
  },
] as const;

export const EVOLVING_WORDS = ["BUILD", "AI", "SYSTEMS", "SCALE", "SHIP", "ENGINEER"] as const;
