import type { LucideIcon } from "lucide-react";
import { Cpu, Brain, GitBranch, Sparkles, Layers } from "lucide-react";

export const HERO_TAGLINE =
  "From event streams to user-facing decisions, I engineer the whole path.";

export const HERO_METRICS = [
  { value: "400K+", label: "Records moved at scale" },
  { value: "50K+", label: "Monthly live interactions" },
  { value: "99.99%", label: "Platform uptime" },
  { value: "4+", label: "Years building software" },
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
    subtitle: "Services under pressure",
    description:
      "Event-driven services, API platforms, and cloud delivery—the paths data takes when traffic, retries, and failure are real.",
    footnote: "Services that keep moving when traffic, data, and failure get messy.",
    nodes: ["FastAPI", "Spring Boot", "Kafka", "PostgreSQL", "AWS EKS", "Terraform"],
  },
  {
    id: "intelligence",
    icon: Brain,
    title: "Applied AI",
    subtitle: "Useful after the demo",
    description:
      "LangGraph workflows, grounded RAG, and review loops—AI wired into product behavior with evaluation and guardrails.",
    footnote: "AI that earns its place in the product—not just the demo.",
    nodes: ["LangChain", "LangGraph", "RAG", "GPT-4o", "Claude", "Llama 3"],
  },
  {
    id: "fullstack",
    icon: Cpu,
    title: "Full-Stack Delivery",
    subtitle: "Contract to screen",
    description:
      "API contracts, data pipelines, and React interfaces as one ownership loop—not a handoff between layers.",
    footnote: "From API contract to the screen someone actually uses.",
    nodes: ["React", "TypeScript", "Python", "FastAPI", "CI/CD", "Observability"],
  },
];

export const PHILOSOPHY_STATEMENTS = [
  {
    icon: GitBranch,
    title: "Clear contracts",
    text: "I like hard boundaries, clear contracts, and systems that fail in ways you can diagnose.",
  },
  {
    icon: Layers,
    title: "Own the path",
    text: "From Kafka pipelines to the interface—someone has to own the whole route. I prefer that someone to be me.",
  },
  {
    icon: Sparkles,
    title: "After the demo",
    text: "I care about what happens after the demo: evaluation, feedback, and the boring controls that keep AI honest.",
  },
] as const;

export const EVOLVING_WORDS = ["SIGNAL", "ROUTE", "SYSTEM", "BUILD", "BOUND", "SHIP"] as const;
