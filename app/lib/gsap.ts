"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsapPlugins(): typeof gsap {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    registered = true;
  }
  return gsap;
}

/** Shared easing vocabulary — do not invent per-component easings. */
export const EASE = {
  ui: "power2.out",
  reveal: "power3.out",
  structure: "power3.inOut",
  cinematic: "expo.out",
  none: "none",
} as const;

/** Shared timing (seconds) — kept short so motion never waits on the visitor. */
export const TIME = {
  micro: 0.15,
  reveal: 0.4,
  component: 0.55,
  large: 0.75,
  heroTotal: 1.15,
  staggerTiny: 0.04,
  staggerSmall: 0.05,
  staggerMed: 0.07,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Soft fade + small resolve — prefer this over large y / clip masks. */
export function softResolve(
  targets: gsap.TweenTarget,
  opts: { delay?: number; duration?: number; y?: number; stagger?: number } = {}
) {
  const { delay = 0, duration = TIME.reveal, y = 6, stagger = 0 } = opts;
  return gsap.fromTo(
    targets,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: EASE.reveal,
      clearProps: "transform",
      // Avoid fighting ScrollTrigger-paused timelines (prevents double-apply / jumps)
      immediateRender: false,
    }
  );
}

/** Debounced ScrollTrigger.refresh for resize / orientation / font load. */
export function bindScrollTriggerRefresh(): () => void {
  if (typeof window === "undefined") return () => {};
  registerGsapPlugins();

  let timer: ReturnType<typeof setTimeout> | undefined;
  const refresh = () => {
    clearTimeout(timer);
    timer = setTimeout(() => ScrollTrigger.refresh(), 120);
  };

  window.addEventListener("resize", refresh, { passive: true });
  window.addEventListener("orientationchange", refresh, { passive: true });
  document.fonts?.ready?.then(() => ScrollTrigger.refresh()).catch(() => {});

  return () => {
    clearTimeout(timer);
    window.removeEventListener("resize", refresh);
    window.removeEventListener("orientationchange", refresh);
  };
}

export { gsap, ScrollTrigger };
