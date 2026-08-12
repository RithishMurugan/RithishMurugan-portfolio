"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { EASE, TIME, gsap, registerGsapPlugins } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

interface SectionEntryProps {
  children: ReactNode;
  className?: string;
  transitionWord?: string;
}

/** Quiet editorial ghost word — yields quickly so content stays primary. */
export default function SectionEntry({ children, className = "", transitionWord }: SectionEntryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current || !transitionWord) return;
    registerGsapPlugins();

    const root = ref.current;
    const word = root.querySelectorAll("[data-transition-word]");
    if (!word.length) return;

    const ctx = gsap.context(() => {
      gsap.set(word, { opacity: 0.04, y: 12 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
            invalidateOnRefresh: true,
          },
        })
        .to(word, { opacity: 0.07, y: 0, duration: TIME.reveal, ease: EASE.reveal })
        .to(word, { opacity: 0, duration: TIME.component * 0.8, ease: EASE.ui }, "+=0.15");
    }, root);

    return () => ctx.revert();
  }, [reducedMotion, transitionWord]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {transitionWord && (
        <p
          data-transition-word
          aria-hidden
          className="pointer-events-none absolute -top-4 left-0 z-0 select-none font-heading text-[clamp(3rem,10vw,6.5rem)] font-semibold leading-none tracking-tight text-foreground/[0.06] dark:text-foreground/[0.05] sm:-top-6"
        >
          {transitionWord}
        </p>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
