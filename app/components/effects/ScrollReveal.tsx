"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
}

export default function ScrollReveal({ children, className = "", y = 48, delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;

    registerGsapPlugins();
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y,
        duration: 0.9,
        delay,
        ease: "power3.out",
      });
    }, ref);

    return () => ctx.revert();
  }, [reducedMotion, y, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
