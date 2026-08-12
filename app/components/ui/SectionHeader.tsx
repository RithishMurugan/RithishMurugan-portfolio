"use client";

import { useEffect, useRef } from "react";
import { EASE, TIME, gsap, registerGsapPlugins, softResolve } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  index?: string;
  title: string;
  titleAccent?: string;
  subtitle?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  badge,
  index,
  title,
  titleAccent,
  subtitle,
  className = "",
  align = "center",
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const alignClass = align === "left" ? "text-left" : "text-center";
  const lineClass = align === "left" ? "mr-auto" : "mx-auto";

  useEffect(() => {
    if (reducedMotion || !ref.current) return;
    registerGsapPlugins();

    const root = ref.current;
    const stamp = root.querySelectorAll("[data-stamp]");
    const route = root.querySelectorAll("[data-route]");
    const heading = root.querySelectorAll("[data-heading]");
    const copy = root.querySelectorAll("[data-copy]");
    const packet = root.querySelectorAll("[data-stamp-packet]");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 88%",
          toggleActions: "play none none none",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      if (stamp.length) {
        gsap.set(stamp, { opacity: 0, y: 4 });
        tl.to(stamp, { opacity: 1, y: 0, duration: TIME.micro, ease: EASE.ui, clearProps: "transform" });
      }

      if (route.length) {
        gsap.set(route, {
          scaleX: 0,
          opacity: 0,
          transformOrigin: align === "left" ? "left center" : "center center",
        });
        tl.to(
          route,
          { scaleX: 1, opacity: 0.75, duration: TIME.reveal * 0.85, ease: EASE.structure },
          "-=0.04"
        );
      }

      if (packet.length && align === "left") {
        gsap.set(packet, { opacity: 0, x: 0 });
        tl.to(packet, { opacity: 0.7, duration: 0.1, ease: EASE.ui }, "-=0.28");
        tl.to(packet, { x: 72, opacity: 0, duration: TIME.reveal * 0.8, ease: EASE.none }, "-=0.2");
      }

      // Soft resolve — no large % translate that clips descenders / accents
      if (heading.length) {
        gsap.set(heading, { opacity: 0, y: 8 });
        tl.add(softResolve(heading, { y: 8, duration: TIME.reveal }), "-=0.18");
      }

      if (copy.length) {
        gsap.set(copy, { opacity: 0, y: 5 });
        tl.add(softResolve(copy, { y: 5, duration: TIME.reveal * 0.9 }), "-=0.22");
      }
    }, root);

    return () => ctx.revert();
  }, [reducedMotion, align]);

  return (
    <div ref={ref} className={cn(`mb-8 sm:mb-10 md:mb-12 ${alignClass}`, className)}>
      {(index || badge) && (
        <div data-stamp className="section-badge mb-3 sm:mb-4">
          {index && <span className="stamp-index">{index}</span>}
          {index && badge && <span aria-hidden>/</span>}
          {badge && <span>{badge}</span>}
        </div>
      )}

      <div className={`relative mb-3 h-px w-20 overflow-visible sm:w-28 ${lineClass}`}>
        <div data-route className="absolute inset-0 origin-left bg-cta/60" />
        {align === "left" && (
          <span
            data-stamp-packet
            aria-hidden
            className="absolute left-0 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-cta/80 opacity-0"
          />
        )}
      </div>

      <h2
        data-heading
        className="font-heading text-balance text-[clamp(1.85rem,4.5vw+0.5rem,3.25rem)] font-semibold leading-[1.12] tracking-tight text-foreground"
      >
        {title}
        {titleAccent && (
          <>
            {" "}
            <span className="gradient-text">{titleAccent}</span>
          </>
        )}
      </h2>

      {subtitle && (
        <p
          data-copy
          className={cn(
            "mt-3 max-w-2xl text-balance text-[clamp(0.9375rem,1.2vw,1.125rem)] leading-relaxed text-secondary",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export { SectionReveal } from "./SectionReveal";
