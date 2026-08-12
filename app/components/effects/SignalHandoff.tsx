"use client";

import { useEffect, useRef } from "react";
import { EASE, gsap, registerGsapPlugins } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

/**
 * Subtle hero → expertise continuity cue.
 * Intentionally quiet: a faint pulse, not a literal system diagram.
 */
export default function SignalHandoff({ fromId = "home", toId = "build" }: { fromId?: string; toId?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;
    registerGsapPlugins();

    const from = document.getElementById(fromId);
    const to = document.getElementById(toId);
    if (!from || !to) return;

    const line = ref.current.querySelector<HTMLElement>("[data-handoff-line]");
    if (!line) return;

    const ctx = gsap.context(() => {
      gsap.set(line, { opacity: 0, scaleY: 0, transformOrigin: "top center" });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: from,
            start: "bottom 78%",
            endTrigger: to,
            end: "top 62%",
            scrub: 0.35,
            invalidateOnRefresh: true,
          },
        })
        .to(line, { opacity: 0.35, scaleY: 1, duration: 0.5, ease: EASE.none })
        .to(line, { opacity: 0, duration: 0.35, ease: EASE.none }, 0.65);
    }, ref);

    return () => ctx.revert();
  }, [reducedMotion, fromId, toId]);

  if (reducedMotion) return null;

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute left-1/2 z-10 hidden h-16 w-px -translate-x-1/2 md:block"
      style={{ top: "100%", marginTop: "-0.75rem" }}
      aria-hidden
    >
      <div
        data-handoff-line
        className="absolute inset-0 origin-top bg-gradient-to-b from-cta/30 via-cta/10 to-transparent"
      />
    </div>
  );
}
