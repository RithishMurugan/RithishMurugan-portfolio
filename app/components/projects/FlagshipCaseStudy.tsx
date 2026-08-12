"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
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

function StepVisual({ visual }: { visual: (typeof STORY_STEPS)[number]["visual"] }) {
  if (visual === "text") {
    return (
      <div className="w-full max-w-md space-y-3 rounded-3xl border border-border bg-card p-5 sm:p-6">
        {["FHIR / HL7 ingestion", "Kafka event pipelines", "Multi-domain records"].map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3 text-sm text-foreground">
            <span className="h-2 w-2 shrink-0 rounded-full bg-cta" />
            {item}
          </div>
        ))}
      </div>
    );
  }
  if (visual === "diagram") {
    return (
      <div className="w-full rounded-3xl border border-border bg-card/80 p-3 sm:p-6">
        <HealthcareArchitectureDiagram />
      </div>
    );
  }
  if (visual === "mockup") {
    return <ClinicianReviewMockup className="w-full max-w-sm" />;
  }
  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:gap-4">
      {[
        { value: "400K+", label: "Records" },
        { value: "50K+", label: "Interactions/mo" },
        { value: "99.99%", label: "Uptime" },
        { value: "25%", label: "Cost saved" },
      ].map((m) => (
        <div key={m.label} className="rounded-2xl border border-border bg-card p-4 text-center sm:p-5">
          <p className="font-heading text-xl font-bold text-foreground sm:text-2xl">{m.value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
        </div>
      ))}
    </div>
  );
}

/** Mobile / tablet: natural scroll stages with evolving visuals — no pin traps. */
function FlagshipStagedStory() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !rootRef.current) return;
    registerGsapPlugins();

    const stages = gsap.utils.toArray<HTMLElement>("[data-flagship-stage]", rootRef.current);
    const progress = rootRef.current.querySelector<HTMLElement>("[data-flagship-progress]");

    const ctx = gsap.context(() => {
      stages.forEach((stage, i) => {
        gsap.fromTo(
          stage,
          { opacity: 0.35, y: 16 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: stage,
              start: "top 78%",
              end: "top 42%",
              scrub: 0.35,
              invalidateOnRefresh: true,
            },
          }
        );

        if (progress) {
          gsap.to(progress, {
            scaleX: (i + 1) / stages.length,
            ease: "none",
            scrollTrigger: {
              trigger: stage,
              start: "top 70%",
              end: "center center",
              scrub: 0.3,
              invalidateOnRefresh: true,
            },
          });
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="relative border-y border-border bg-muted/20">
      <div className="section-shell">
        <SectionHeader
          index="02"
          badge="Case study"
          title="Healthcare AI"
          titleAccent="copilot"
          subtitle={flagship.description}
          align="left"
        />

        <div className="mb-8 h-px w-full overflow-hidden bg-border/60">
          <div data-flagship-progress className="h-full origin-left scale-x-[0.25] bg-cta" />
        </div>

        <div className="space-y-12 sm:space-y-16">
          {STORY_STEPS.map((step) => (
            <article key={step.id} data-flagship-stage className="grid items-start gap-6 sm:gap-8">
              <div>
                <p className="mb-2 font-mono-stamp text-[11px] text-cta">{step.label}</p>
                <h3 className="font-heading mb-3 text-[clamp(1.35rem,4vw,1.875rem)] font-semibold tracking-tight text-foreground">
                  {step.title}
                </h3>
                {step.body && (
                  <p className="max-w-prose text-sm leading-relaxed text-muted-foreground sm:text-base">{step.body}</p>
                )}
                {step.visual === "metrics" && (
                  <ul className="mt-5 space-y-3">
                    {flagship.impact.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 border-l-2 border-cta pl-4 text-sm text-foreground sm:text-base"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex justify-center sm:justify-start">
                <StepVisual visual={step.visual} />
              </div>
            </article>
          ))}
        </div>

        <a href="#work" className="mt-10 block text-center text-xs text-muted-foreground transition hover:text-cta">
          From ingestion to interface →
        </a>
      </div>
    </div>
  );
}

function FlagshipPinnedStory() {
  const pinHostRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pinHostRef.current || !pinRef.current || !stepsRef.current) return;

    registerGsapPlugins();

    const panels = gsap.utils.toArray<HTMLElement>(".flagship-panel", stepsRef.current);
    const labels = gsap.utils.toArray<HTMLElement>(".flagship-label", pinHostRef.current);

    const ctx = gsap.context(() => {
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
    }, pinHostRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pinHostRef} className="relative">
      <div ref={pinRef} className="relative min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="section-shell flex min-h-[100svh] flex-col py-8 sm:py-12 lg:h-screen">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 font-mono-stamp text-[11px] text-muted-foreground">
                <span className="text-cta">02</span> / Case study
              </p>
              <h2 className="font-heading text-[clamp(1.5rem,4vw,2.75rem)] font-semibold tracking-tight text-foreground">
                {flagship.title}
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 xl:gap-4">
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
                  <h3 className="font-heading mb-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {step.title}
                  </h3>
                  {step.body && (
                    <p className="max-w-lg text-base leading-relaxed text-muted-foreground">{step.body}</p>
                  )}
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
                  <StepVisual visual={step.visual} />
                </div>
              </div>
            ))}
          </div>

          <a href="#work" className="mt-2 block text-center text-xs text-muted-foreground transition hover:text-cta">
            From ingestion to interface →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function FlagshipCaseStudy() {
  const reducedMotion = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <section id="flagship" className="relative">
      {reducedMotion || !isDesktop ? <FlagshipStagedStory /> : <FlagshipPinnedStory />}
    </section>
  );
}
