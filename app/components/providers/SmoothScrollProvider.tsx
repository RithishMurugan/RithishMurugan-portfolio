"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { bindScrollTriggerRefresh, gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

type SmoothScrollContextValue = {
  lenis: Lenis | null;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue>({ lenis: null });

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Always keep ScrollTrigger geometry fresh on resize / orientation / fonts,
    // even when Lenis is disabled for reduced motion.
    const unbindRefresh = bindScrollTriggerRefresh();
    return () => unbindRefresh();
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    registerGsapPlugins();

    const instance = new Lenis({
      duration: 0.95,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Let section components own their ScrollTriggers via gsap.context().
    // Killing all triggers here races Strict Mode remounts and causes blank/double-fire.
    return () => {
      gsap.ticker.remove(onTick);
      instance.destroy();
      setLenis(null);
    };
  }, [reducedMotion]);

  return <SmoothScrollContext.Provider value={{ lenis }}>{children}</SmoothScrollContext.Provider>;
}
