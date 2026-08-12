"use client";

import { useEffect, useRef } from "react";
import { EASE, TIME, gsap, registerGsapPlugins } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

export function SectionReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;
    registerGsapPlugins();
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          once: true,
          invalidateOnRefresh: true,
        },
        opacity: 0,
        y: 8,
        duration: TIME.reveal,
        delay,
        ease: EASE.reveal,
        clearProps: "transform",
      });
    }, ref);
    return () => ctx.revert();
  }, [reducedMotion, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
