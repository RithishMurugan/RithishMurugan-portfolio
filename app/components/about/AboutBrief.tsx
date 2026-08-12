"use client";

import { useEffect, useRef } from "react";
import { SectionBadge } from "@/components/ui/Badge";
import { SITE } from "@/lib/data/site";
import { EASE, TIME, gsap, registerGsapPlugins } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

const expertiseTags = ["AI & GenAI", "Distributed Systems", "Full-Stack", "Cloud Infrastructure"] as const;

export default function AboutBrief() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;
    registerGsapPlugins();

    const root = ref.current;
    const stamp = root.querySelector("[data-about-stamp]");
    const heading = root.querySelector("[data-about-heading]");
    const support = root.querySelector("[data-about-support]");
    const bio = root.querySelectorAll("[data-about-bio]");
    const meta = root.querySelector("[data-about-meta]");
    const chips = root.querySelectorAll("[data-about-chip]");
    const seam = root.querySelector("[data-about-seam]");
    const seamMobile = root.querySelector("[data-about-seam-mobile]");

    const ctx = gsap.context(() => {
      gsap.set([stamp, support, meta, heading], { opacity: 0, y: 6 });
      gsap.set(bio, { opacity: 0, y: 6 });
      gsap.set(chips, { opacity: 0, y: 4 });
      gsap.set(seam, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(seamMobile, { scaleY: 0, transformOrigin: "top center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 88%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(stamp, { opacity: 1, y: 0, duration: TIME.micro, ease: EASE.ui, clearProps: "transform" })
        .to(heading, { opacity: 1, y: 0, duration: TIME.reveal, ease: EASE.reveal, clearProps: "transform" }, "-=0.04")
        .to(support, { opacity: 1, y: 0, duration: TIME.reveal * 0.9, ease: EASE.reveal, clearProps: "transform" }, "-=0.22")
        .to(seam, { scaleY: 1, duration: TIME.component * 0.85, ease: EASE.structure }, "-=0.3")
        .to(seamMobile, { scaleY: 1, duration: TIME.component * 0.85, ease: EASE.structure }, "<")
        .to(bio, { opacity: 1, y: 0, duration: TIME.reveal * 0.9, stagger: TIME.staggerTiny, ease: EASE.reveal, clearProps: "transform" }, "-=0.28")
        .to(meta, { opacity: 1, y: 0, duration: TIME.micro, ease: EASE.ui, clearProps: "transform" }, "-=0.12")
        .to(chips, { opacity: 1, y: 0, duration: TIME.micro, stagger: TIME.staggerTiny, ease: EASE.ui, clearProps: "transform" }, "-=0.08");
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="about" ref={ref} className="section-shell">
      <div className="relative grid items-start gap-8 md:gap-10 lg:grid-cols-2 lg:gap-x-14 xl:gap-x-16">
        {/* Desktop center seam */}
        <div
          data-about-seam
          className="pointer-events-none absolute bottom-6 left-1/2 top-6 hidden w-px -translate-x-1/2 origin-top scale-y-0 bg-gradient-to-b from-cta/40 via-border/35 to-transparent lg:block"
          aria-hidden
        />
        {/* Mobile / tablet vertical seam */}
        <div
          data-about-seam-mobile
          className="pointer-events-none absolute bottom-4 left-0 top-4 w-px origin-top scale-y-0 bg-gradient-to-b from-cta/40 via-border/35 to-transparent lg:hidden"
          aria-hidden
        />

        <div className="pl-5 lg:pl-0 lg:pr-4 xl:pr-8">
          <div data-about-stamp>
            <SectionBadge>
              <span className="stamp-index">06</span>
              <span aria-hidden>/</span>
              <span>About</span>
            </SectionBadge>
          </div>

          <h2
            data-about-heading
            className="mt-4 font-heading text-balance text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-foreground sm:mt-5"
          >
            I build across the <span className="gradient-text">seams.</span>
          </h2>

          <p
            data-about-support
            className="mt-3 max-w-md text-[clamp(0.95rem,1.5vw,1.1rem)] font-medium leading-[1.5] text-secondary sm:mt-4"
          >
            AI, backend, data, cloud, and interface—designed as one working system.
          </p>
        </div>

        <div className="space-y-4 pl-5 lg:pl-4 xl:pl-8">
          <p data-about-bio className="max-w-prose text-[0.9375rem] leading-[1.75] text-secondary sm:text-base">
            Most interesting problems sit between layers—where an API boundary, a data path, and a UI decision
            have to agree. That&apos;s where I like to work.
          </p>

          <p data-about-bio className="max-w-prose text-[0.9375rem] leading-[1.75] text-secondary sm:text-base">
            Based in the {SITE.location}. Curious by default, careful at the edges, and stubborn about software
            that still makes sense after launch.
          </p>

          <p
            data-about-meta
            className="max-w-prose pt-0.5 font-mono-stamp text-[10px] text-meta sm:text-[11px]"
          >
            4+ years · AI · Backend · Distributed Systems
          </p>

          <div className="flex max-w-prose flex-wrap gap-2 pt-1">
            {expertiseTags.map((tag) => (
              <span
                key={tag}
                data-about-chip
                className="inline-flex h-8 items-center rounded-full border border-border/60 bg-muted/35 px-3 text-xs font-medium text-foreground transition-colors duration-200 hover:border-cta/25 hover:bg-muted/55 dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:border-cta/20 dark:hover:bg-white/[0.07]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
