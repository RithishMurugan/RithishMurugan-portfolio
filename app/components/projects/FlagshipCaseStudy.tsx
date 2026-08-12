"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { flagshipProjects } from "@/lib/data/projects";
import HealthcareArchitectureDiagram, { ClinicianReviewMockup } from "./HealthcareArchitectureDiagram";
import { SectionHeader } from "@/components/ui/SectionHeader";

const flagship = flagshipProjects[0]!;

const STORY_STEPS = [
  {
    id: "problem",
    label: "01 — Problem",
    title: "Fragmented clinical data, high stakes",
    body: flagship.problem,
    visual: "text" as const,
  },
  {
    id: "architecture",
    label: "02 — Architecture",
    title: "Event-driven clinical platform",
    body: flagship.approach,
    visual: "diagram" as const,
  },
  {
    id: "ai",
    label: "03 — Intelligence",
    title: "RAG with clinician oversight",
    body: "LangGraph workflows orchestrate multi-model RAG with citation review, groundedness checks, and human-in-the-loop approval before any insight reaches clinical workflows.",
    visual: "mockup" as const,
  },
  {
    id: "impact",
    label: "04 — Impact",
    title: "Production at scale",
    body: null,
    visual: "metrics" as const,
  },
];

export default function FlagshipCaseStudy() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !pinRef.current || !stepsRef.current) return;

    registerGsapPlugins();

    const panels = gsap.utils.toArray<HTMLElement>(".flagship-panel", stepsRef.current);
    const labels = gsap.utils.toArray<HTMLElement>(".flagship-label", sectionRef.current);

    const ctx = gsap.context(() => {
      // Opacity-only crossfades — y shifts jump awkwardly on reverse scrub
      panels.forEach((panel, i) => {
        if (i === 0) return;
        gsap.set(panel, { opacity: 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: `+=${panels.length * 80}%`,
          pin: true,
          scrub: 0.35,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) {
          tl.to(progressRef.current, { scaleX: 0.25, ease: "none", duration: 1 }, 0);
          return;
        }
        const prev = panels[i - 1];
        tl.to(prev, { opacity: 0, duration: 0.4, ease: "none" })
          .to(panel, { opacity: 1, duration: 0.4, ease: "none" }, "<")
          .to(labels, { opacity: 0.35, duration: 0.2, ease: "none" }, "<")
          .to(labels[i], { opacity: 1, duration: 0.2, ease: "none" }, "<")
          .to(progressRef.current, { scaleX: (i + 1) / panels.length, ease: "none", duration: 1 }, "<");
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section id="flagship" className="section-shell border-y border-border bg-muted/20">
        <SectionHeader badge="Selected professional impact" index="02" title="Healthcare AI" titleAccent="copilot" subtitle={flagship.description} />
        <div className="grid gap-8 lg:grid-cols-2">
          <HealthcareArchitectureDiagram />
          <ClinicianReviewMockup />
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {flagship.impact.map((item) => (
            <li key={item} className="rounded-2xl border border-border bg-card p-4 text-sm text-foreground">
              {item}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section id="flagship" ref={sectionRef} className="relative">
      <div ref={pinRef} className="relative min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="section-shell flex h-screen flex-col py-8 sm:py-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 font-mono-stamp text-[11px] text-muted-foreground">
                <span className="text-cta">02</span> / Case study
              </p>
              <h2 className="font-heading text-[clamp(1.5rem,4vw,2.75rem)] font-semibold tracking-tight text-foreground">{flagship.title}</h2>
            </div>
            <div className="flex gap-4">
              {STORY_STEPS.map((step, i) => (
                <span
                  key={step.id}
                  className="flagship-label font-mono-stamp text-[10px] text-muted-foreground"
                  style={{ opacity: i === 0 ? 1 : 0.4 }}
                >
                  {step.label}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6 h-px w-full overflow-hidden bg-border/60">
            <div ref={progressRef} className="h-full origin-left scale-x-[0.25] bg-cta" />
          </div>

          <div ref={stepsRef} className="relative flex flex-1 items-center">
            {STORY_STEPS.map((step) => (
              <div
                key={step.id}
                className="flagship-panel absolute inset-0 grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
              >
                <div>
                  <p className="mb-2 font-mono-stamp text-[11px] text-cta">{step.label}</p>
                  <h3 className="font-heading mb-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{step.title}</h3>
                  {step.body && <p className="max-w-lg text-base leading-relaxed text-muted-foreground">{step.body}</p>}
                  {step.visual === "metrics" && (
                    <ul className="mt-6 space-y-4">
                      {flagship.impact.map((item) => (
                        <li key={item} className="flex items-start gap-3 border-l-2 border-cta pl-4 text-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex items-center justify-center">
                  {step.visual === "text" && (
                    <div className="w-full max-w-md space-y-3 rounded-3xl border border-border bg-card p-6">
                      {["FHIR / HL7 ingestion", "Kafka event pipelines", "Multi-domain records"].map((item) => (
                        <div key={item} className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3 text-sm text-foreground">
                          <span className="h-2 w-2 rounded-full bg-cta" />
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                  {step.visual === "diagram" && (
                    <div className="w-full rounded-3xl border border-border bg-card/80 p-4 sm:p-6">
                      <HealthcareArchitectureDiagram />
                    </div>
                  )}
                  {step.visual === "mockup" && <ClinicianReviewMockup className="w-full max-w-sm" />}
                  {step.visual === "metrics" && (
                    <div className="grid w-full max-w-md grid-cols-2 gap-4">
                      {[
                        { value: "400K+", label: "Records" },
                        { value: "50K+", label: "Interactions/mo" },
                        { value: "99.99%", label: "Uptime" },
                        { value: "25%", label: "Cost saved" },
                      ].map((m) => (
                        <div key={m.label} className="rounded-2xl border border-border bg-card p-5 text-center">
                          <p className="font-heading text-2xl font-bold text-foreground">{m.value}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <a
            href="#work"
            className="mt-2 block text-center text-xs text-muted-foreground transition hover:text-cta"
          >
            From ingestion to interface →
          </a>
        </div>
      </div>
    </section>
  );
}
