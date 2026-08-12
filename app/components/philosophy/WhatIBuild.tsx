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

    const cards = gsap.utils.toArray<HTMLElement>("[data-expertise-card]", cardsRef.current);
    const routes = gsap.utils.toArray<HTMLElement>("[data-expertise-route]", cardsRef.current);

    const ctx = gsap.context(() => {
      gsap.set(cards, { opacity: 0, y: 10 });
      gsap.set(routes, { scaleX: 0, opacity: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        const at = i * 0.1;
        tl.to(
          card,
          { opacity: 1, y: 0, duration: TIME.reveal, ease: EASE.reveal, clearProps: "transform" },
          at
        );
        if (routes[i]) {
          tl.to(
            routes[i],
            { scaleX: 1, opacity: 0.7, duration: TIME.reveal * 0.85, ease: EASE.structure },
            at + 0.06
          );
        }
      });
    }, cardsRef);

    return () => ctx.revert();
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

        <div ref={cardsRef} className="mb-16">
          <div className="grid gap-6 lg:grid-cols-3">
            {CAPABILITY_PILLARS.map((pillar, i) => (
              <div key={pillar.id} className="relative">
                {i < CAPABILITY_PILLARS.length - 1 && (
                  <div
                    data-expertise-route
                    aria-hidden
                    className="pointer-events-none absolute left-[calc(100%+0.25rem)] top-12 z-20 hidden h-px w-6 origin-left bg-cta/40 lg:block"
                  />
                )}
                <div data-expertise-card>
                  <CapabilityCard pillar={pillar} index={i} />
                </div>
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
