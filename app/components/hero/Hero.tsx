"use client";

import { useLayoutEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { ArrowDown, ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { springSmooth } from "@/lib/motion";
import { SITE } from "@/lib/data/site";
import { HERO_METRICS, HERO_TAGLINE } from "@/lib/data/narrative";
import { useCoarsePointer } from "@/lib/hooks/useCoarsePointer";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { EASE, TIME, gsap, registerGsapPlugins } from "@/lib/gsap";
import NetworkCanvas from "@/components/effects/NetworkCanvas";
import EvolvingIntelligence from "@/components/effects/EvolvingIntelligence";
import HeroName from "@/components/hero/HeroName";
import SignalHandoff from "@/components/effects/SignalHandoff";
import { ButtonLink } from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";

function HeroMetrics() {
  return (
    <div
      data-hero-metrics
      className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-border/40 pt-5 sm:mt-6 sm:gap-y-5 sm:pt-6 lg:grid-cols-4 lg:gap-0 lg:border-0 lg:pt-0"
    >
      {HERO_METRICS.map((metric, i) => (
        <div key={metric.label} data-hero-metric className="flex min-w-0 items-stretch lg:flex-1">
          {i > 0 && (
            <div
              className="mr-4 hidden w-px self-stretch bg-gradient-to-b from-transparent via-border/25 to-transparent lg:mr-5 lg:block xl:mr-6"
              aria-hidden
            />
          )}
          <div className="min-w-0 flex-1">
            <p className="font-heading text-[clamp(1.35rem,3.5vw,1.875rem)] font-semibold tracking-tight text-foreground">
              {metric.value}
            </p>
            <p className="mt-1 max-w-[10rem] text-[10px] leading-snug text-meta sm:text-xs lg:max-w-none">
              {metric.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function HeroSocials() {
  return (
    <div data-hero-socials className="flex items-center gap-3">
      {[
        { href: SITE.linkedin, Icon: Linkedin, label: "LinkedIn" },
        { href: SITE.github, Icon: Github, label: "GitHub" },
        { href: `mailto:${SITE.email}`, Icon: Mail, label: "Email" },
      ].map(({ href, Icon, label }) => (
        <motion.a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="interactive flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground backdrop-blur-sm transition hover:border-cta/40 hover:text-cta"
          aria-label={label}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={springSmooth}
        >
          <Icon size={17} />
        </motion.a>
      ))}
    </div>
  );
}

/** Reveal a word via clip-path while the signal tracks the leading edge. */
function revealWordWithSignal(
  tl: gsap.core.Timeline,
  opts: {
    word: HTMLElement;
    signal: HTMLElement;
    nameRoot: HTMLElement;
    at: number;
    duration: number;
    ease?: string;
  }
) {
  const { word, signal, nameRoot, at, duration, ease = "power2.inOut" } = opts;
  const nameBox = nameRoot.getBoundingClientRect();
  const wordBox = word.getBoundingClientRect();
  const y = wordBox.top - nameBox.top + wordBox.height * 0.52;
  const startX = wordBox.left - nameBox.left;
  const endX = startX + wordBox.width;
  const proxy = { t: 0 };

  tl.set(word, { clipPath: "inset(0 100% 0 0)", opacity: 0.92, x: -4 }, at);
  tl.set(signal, { top: y, left: startX, opacity: 1 }, at);

  tl.to(
    proxy,
    {
      t: 1,
      duration,
      ease,
      onUpdate: () => {
        const p = proxy.t;
        word.style.clipPath = `inset(0 ${(1 - p) * 100}% 0 0)`;
        gsap.set(signal, { left: startX + (endX - startX) * p });
      },
    },
    at
  );

  // Micro settle as the word finishes
  tl.to(
    word,
    { opacity: 1, x: 0, duration: 0.22, ease: EASE.ui, clearProps: "transform" },
    at + duration - 0.12
  );

  return { endX, y, startX };
}

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const coarsePointer = useCoarsePointer();
  const parallaxEnabled = !reducedMotion && !coarsePointer;

  const nameX = useSpring(0, { stiffness: 140, damping: 26 });
  const nameY = useSpring(0, { stiffness: 140, damping: 26 });
  const visualX = useSpring(0, { stiffness: 90, damping: 22 });
  const visualY = useSpring(0, { stiffness: 90, damping: 22 });

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!parallaxEnabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    nameX.set(nx * 3);
    nameY.set(ny * 2.5);
    visualX.set(nx * -12);
    visualY.set(ny * -9);
  };

  const resetParallax = () => {
    nameX.set(0);
    nameY.set(0);
    visualX.set(0);
    visualY.set(0);
  };

  const [firstName, ...rest] = SITE.name.split(" ");
  const lastName = rest.join(" ");

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    registerGsapPlugins();
    const root = rootRef.current;

    const nameRoot = root.querySelector<HTMLElement>("[data-hero-name]");
    const firstWord = root.querySelector<HTMLElement>('[data-name-word="first"]');
    const lastWord = root.querySelector<HTMLElement>('[data-name-word="last"]');
    const signal = root.querySelector<HTMLElement>("[data-name-signal]");
    const title = root.querySelector<HTMLElement>("[data-hero-title]");
    const tagline = root.querySelector<HTMLElement>("[data-hero-tagline]");
    const ctas = root.querySelector("[data-hero-ctas]");
    const socials = root.querySelectorAll("[data-hero-socials]");
    const visual = root.querySelector<HTMLElement>("[data-hero-visual]");
    const systemPulse = root.querySelector<HTMLElement>("[data-system-pulse]");
    const metrics = root.querySelectorAll("[data-hero-metric]");
    const scrollCue = root.querySelector("[data-hero-scroll]");

    const reduceMotion =
      reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set([firstWord, lastWord, title, tagline, ctas, socials, visual, metrics, scrollCue], {
        clearProps: "all",
        opacity: 1,
        clipPath: "none",
      });
      gsap.set([signal, systemPulse], { clearProps: "all", opacity: 0 });
      return;
    }

    const mobile = window.matchMedia("(max-width: 767px)").matches;

    const ctx = gsap.context(() => {
      if (!nameRoot || !firstWord || !lastWord || !signal) return;

      // Initial: words hidden by clip; signal dormant
      gsap.set([firstWord, lastWord], { clipPath: "inset(0 100% 0 0)", opacity: 0.9, x: -4 });
      gsap.set(signal, { opacity: 0, left: 0, top: 0 });
      if (systemPulse) gsap.set(systemPulse, { opacity: 0, scale: 0.4 });

      gsap.set([title, tagline, ctas, socials, visual, scrollCue], { opacity: 0 });
      gsap.set(metrics, { opacity: 0, y: 6 });
      gsap.set(title, { y: 8, clipPath: "inset(0 0 100% 0)" });
      gsap.set(tagline, { y: 6 });
      gsap.set(ctas, { y: 5 });
      gsap.set(visual, { y: 10, scale: 0.99 });

      const tl = gsap.timeline({ defaults: { ease: EASE.reveal } });

      // 0ms — signal appears at left of Rithish
      const firstBox = firstWord.getBoundingClientRect();
      const nameBox = nameRoot.getBoundingClientRect();
      const firstY = firstBox.top - nameBox.top + firstBox.height * 0.52;
      const firstStartX = firstBox.left - nameBox.left;

      tl.set(signal, { opacity: 0, left: firstStartX, top: firstY }, 0)
        .to(signal, { opacity: 1, duration: 0.08, ease: EASE.ui }, 0);

      // 80–650ms — Rithish signal trace reveal
      revealWordWithSignal(tl, {
        word: firstWord,
        signal,
        nameRoot,
        at: 0.08,
        duration: mobile ? 0.5 : 0.55,
      });

      const afterFirst = 0.08 + (mobile ? 0.5 : 0.55);

      // Route handoff to Murugan (simplified on mobile)
      const lastBox = lastWord.getBoundingClientRect();
      const lastY = lastBox.top - nameBox.top + lastBox.height * 0.52;
      const lastStartX = lastBox.left - nameBox.left;
      const routeAt = afterFirst - 0.04;

      if (mobile) {
        tl.to(signal, { top: lastY, left: lastStartX, duration: 0.14, ease: EASE.structure }, routeAt);
      } else {
        const midX = Math.max(firstStartX + firstBox.width * 0.72, lastStartX + 8);
        tl.to(signal, { left: midX, duration: 0.1, ease: EASE.none }, routeAt)
          .to(signal, { top: lastY, left: lastStartX, duration: 0.16, ease: EASE.structure }, routeAt + 0.08);
      }

      // Murugan reveal
      const muruganAt = mobile ? routeAt + 0.14 : routeAt + 0.22;
      revealWordWithSignal(tl, {
        word: lastWord,
        signal,
        nameRoot,
        at: muruganAt,
        duration: mobile ? 0.5 : 0.55,
      });

      const muruganEnd = muruganAt + (mobile ? 0.5 : 0.55);

      // Signal exits beyond last letter and dissolves
      const lastEndX = lastStartX + lastBox.width + 18;
      tl.to(signal, { left: lastEndX, duration: 0.14, ease: EASE.none }, muruganEnd - 0.02).to(
        signal,
        { opacity: 0, duration: 0.16, ease: EASE.ui },
        muruganEnd + 0.1
      );

      // Hand off into Evolving Intelligence — brief system pulse
      if (systemPulse) {
        tl.to(
          systemPulse,
          { opacity: 0.85, scale: 1, duration: 0.22, ease: EASE.ui },
          muruganEnd + 0.18
        ).to(systemPulse, { opacity: 0, scale: 1.6, duration: 0.45, ease: EASE.ui }, muruganEnd + 0.4);
      }

      // Title — quieter complementary mask (not signal-trace)
      const titleAt = Math.max(muruganEnd + 0.18, 1.28);
      tl.to(
        title,
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.42,
          ease: EASE.reveal,
          clearProps: "transform,clipPath",
        },
        titleAt
      )
        .to(tagline, { opacity: 1, y: 0, duration: 0.36, ease: EASE.ui, clearProps: "transform" }, titleAt + 0.14)
        .to(
          visual,
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: EASE.cinematic, clearProps: "transform" },
          titleAt + 0.2
        )
        .to(
          metrics,
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: TIME.staggerTiny,
            ease: EASE.ui,
            clearProps: "transform",
          },
          titleAt + 0.4
        )
        .to(ctas, { opacity: 1, y: 0, duration: 0.3, ease: EASE.ui, clearProps: "transform" }, titleAt + 0.5)
        .to(socials, { opacity: 1, duration: 0.26, ease: EASE.ui }, titleAt + 0.58)
        .to(scrollCue, { opacity: 1, duration: 0.26, ease: EASE.ui }, titleAt + 0.66);
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="home"
      ref={rootRef}
      className="hero-section relative flex min-h-[100svh] flex-col justify-center overflow-x-hidden safe-top lg:min-h-[100dvh] lg:justify-end"
      aria-label="Introduction"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetParallax}
    >
      <motion.div className="hero-bg-base absolute inset-0" style={{ x: visualX, y: visualY }} />
      <motion.div className="hero-bg-overlay absolute inset-0" style={{ x: visualX, y: visualY }} />
      <motion.div className="absolute inset-0" style={{ x: visualX, y: visualY }}>
        <NetworkCanvas focalSide="right" className="opacity-35 md:opacity-70 lg:opacity-90 dark:opacity-55 md:dark:opacity-70 lg:dark:opacity-75" />
      </motion.div>
      <div className="hero-bg-bottom-fade pointer-events-none absolute inset-x-0 bottom-0 h-40 sm:h-56" />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.025]" aria-hidden />

      <div className="page-container relative z-10 pb-16 pt-[calc(4.75rem+env(safe-area-inset-top))] sm:pb-20 sm:pt-[calc(5.25rem+env(safe-area-inset-top))] lg:pb-24 lg:pt-[calc(5.75rem+env(safe-area-inset-top))]">
        <div className="grid items-center gap-7 md:grid-cols-12 md:gap-6 lg:gap-10 xl:gap-12">
          {/* Copy column */}
          <div className="md:col-span-5">
            <HeroName
              firstName={firstName}
              lastName={lastName}
              parallaxX={parallaxEnabled ? nameX : undefined}
              parallaxY={parallaxEnabled ? nameY : undefined}
            />

            <p
              data-hero-title
              className="mb-3 overflow-hidden text-[clamp(1.05rem,2.4vw,1.75rem)] font-medium leading-snug text-secondary sm:mb-4"
            >
              {SITE.title}
            </p>

            <p data-hero-tagline className="mb-5 max-w-lg text-[clamp(0.9375rem,1.4vw,1.0625rem)] leading-relaxed text-secondary sm:mb-8">
              {HERO_TAGLINE}
            </p>

            <div data-hero-ctas className="mb-1 flex flex-col gap-3 sm:mb-0 sm:flex-row sm:flex-wrap">
              <Magnetic className="w-full sm:w-auto">
                <ButtonLink href="#flagship" variant="primary" size="lg" className="group w-full sm:w-auto">
                  Explore work
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </ButtonLink>
              </Magnetic>
              <Magnetic strength={0.2} className="w-full sm:w-auto">
                <ButtonLink href="#contact" variant="secondary" size="lg" className="w-full sm:w-auto">
                  Get in touch
                </ButtonLink>
              </Magnetic>
            </div>

            {/* Desktop / tablet socials under CTAs */}
            <div className="mt-7 hidden md:block">
              <HeroSocials />
            </div>
          </div>

          {/* System visual + metrics — always present */}
          <motion.div data-hero-visual className="md:col-span-7" style={{ x: visualX, y: visualY }}>
            <div className="relative">
              <div className="h-[clamp(17.5rem,52vw,22.5rem)] w-full md:h-[min(20rem,42vw)] lg:h-auto lg:min-h-[420px]">
                <EvolvingIntelligence className="!min-h-0 h-full" />
              </div>
              <span
                data-system-pulse
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[42%] h-3 w-3 -translate-x-1/2 rounded-full bg-cta opacity-0"
              />
              <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 font-mono-stamp text-[9px] text-meta">
                Evolving Intelligence
              </p>
            </div>
            <HeroMetrics />
          </motion.div>

          {/* Phone socials after metrics */}
          <div className="md:hidden">
            <HeroSocials />
          </div>
        </div>
      </div>

      <a
        data-hero-scroll
        href="#build"
        className="interactive absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-xs text-muted-foreground hover:text-cta sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))]"
        aria-label="Scroll to explore"
      >
        <span className="tracking-widest uppercase">Scroll</span>
        {!reducedMotion ? (
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown size={18} />
          </motion.div>
        ) : (
          <ArrowDown size={18} />
        )}
      </a>

      <SignalHandoff fromId="home" toId="build" />
    </section>
  );
}
