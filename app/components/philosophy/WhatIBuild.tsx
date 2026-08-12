"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import CapabilityCard from "@/components/philosophy/CapabilityCard";
import SectionEntry from "@/components/effects/SectionEntry";
import { EASE, TIME, gsap, registerGsapPlugins } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { CAPABILITY_PILLARS, PHILOSOPHY_STATEMENTS } from "@/lib/data/narrative";
import { cn } from "@/lib/utils";

export default function WhatIBuild() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !cardsRef.current) return;
    registerGsapPlugins();

    const root = cardsRef.current;
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isCompact: "(max-width: 1023px)",
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };
        const cards = gsap.utils.toArray<HTMLElement>("[data-expertise-card]", root);
        const hRoutes = gsap.utils.toArray<HTMLElement>("[data-expertise-route-h]", root);
        const vRoutes = gsap.utils.toArray<HTMLElement>("[data-expertise-route-v]", root);

        gsap.set(cards, { opacity: 0, y: 10 });

        if (isDesktop) {
          gsap.set(hRoutes, { scaleX: 0, opacity: 0, transformOrigin: "left center" });
          gsap.set(vRoutes, { clearProps: "all" });
        } else {
          gsap.set(vRoutes, { scaleY: 0, opacity: 0, transformOrigin: "top center" });
          gsap.set(hRoutes, { clearProps: "all" });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
            once: true,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((card, i) => {
          const at = i * 0.12;
          tl.to(
            card,
            { opacity: 1, y: 0, duration: TIME.reveal, ease: EASE.reveal, clearProps: "transform" },
            at
          );

          if (isDesktop && hRoutes[i]) {
            tl.to(
              hRoutes[i],
              { scaleX: 1, opacity: 0.7, duration: TIME.reveal * 0.85, ease: EASE.structure },
              at + 0.06
            );
          } else if (!isDesktop && vRoutes[i]) {
            tl.to(
              vRoutes[i],
              { scaleY: 1, opacity: 0.75, duration: TIME.reveal * 0.85, ease: EASE.structure },
              at + 0.06
            );
          }
        });
      }
    );

    return () => mm.revert();
  }, [reducedMotion]);

  return (
    <section id="build" className="section-shell relative">
      <SectionEntry transitionWord="SYSTEMS">
        <SectionHeader
          index="01"
          badge="Expertise"
          title="What I"
          titleAccent="engineer"
          subtitle="Three layers I keep joined: services under load, AI that survives review, and interfaces people actually use."
          className="text-left md:text-center"
        />

        <div ref={cardsRef} className="mb-14 sm:mb-16">
          <div className="grid gap-5 sm:gap-6 lg:grid-cols-3 lg:gap-6">
            {CAPABILITY_PILLARS.map((pillar, i) => (
              <div key={pillar.id} className="relative">
                {/* Desktop horizontal signal route */}
                {i < CAPABILITY_PILLARS.length - 1 && (
                  <div
                    data-expertise-route-h
                    aria-hidden
                    className="pointer-events-none absolute left-[calc(100%+0.25rem)] top-12 z-20 hidden h-px w-6 origin-left bg-cta/40 lg:block"
                  />
                )}

                <div data-expertise-card>
                  <CapabilityCard pillar={pillar} index={i} />
                </div>

                {/* Mobile / tablet vertical signal route */}
                {i < CAPABILITY_PILLARS.length - 1 && (
                  <div
                    data-expertise-route-v
                    aria-hidden
                    className="relative mx-auto mt-4 flex h-8 w-px origin-top justify-center bg-gradient-to-b from-cta/50 via-cta/25 to-transparent md:mt-5 lg:hidden"
                  >
                    <span className="absolute bottom-0 h-1.5 w-1.5 translate-y-1/2 rounded-full bg-cta/60" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {PHILOSOPHY_STATEMENTS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-6"
              >
                <div className="absolute left-0 top-1 h-full w-px bg-gradient-to-b from-cta/60 via-cta/20 to-transparent" />
                <div className="mb-3 flex items-center gap-2 text-cta">
                  <Icon size={18} aria-hidden />
                  <h4 className="font-heading text-sm font-semibold uppercase tracking-wide">{item.title}</h4>
                </div>
                <p className={cn("text-sm leading-relaxed text-muted-foreground sm:text-base")}>{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </SectionEntry>
    </section>
  );
}
