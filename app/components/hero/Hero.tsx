"use client";

import { useEffect, useRef } from "react";
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
    <div data-hero-metrics className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 sm:flex sm:items-start sm:justify-between sm:gap-0">
      {HERO_METRICS.map((metric, i) => (
        <div key={metric.label} data-hero-metric className="flex items-stretch sm:flex-1">
          {i > 0 && (
            <div
              className="mr-4 hidden w-px self-stretch bg-gradient-to-b from-transparent via-border/25 to-transparent sm:block lg:mr-6"
              aria-hidden
            />
          )}
          <div className="min-w-0 flex-1 sm:text-left">
            <p className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-[1.75rem] lg:text-3xl">
              {metric.value}
            </p>
            <p className="mt-1 max-w-[9rem] text-[10px] leading-snug text-meta sm:max-w-none sm:text-xs">
              {metric.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
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

  useEffect(() => {
    if (!rootRef.current) return;
    registerGsapPlugins();
    const root = rootRef.current;

    const title = root.querySelector("[data-hero-title]");
    const tagline = root.querySelector("[data-hero-tagline]");
    const ctas = root.querySelector("[data-hero-ctas]");
    const socials = root.querySelector("[data-hero-socials]");
    const visual = root.querySelector("[data-hero-visual]");
    const metrics = root.querySelectorAll("[data-hero-metric]");
    const scrollCue = root.querySelector("[data-hero-scroll]");

    if (reducedMotion) {
      gsap.set([title, tagline, ctas, socials, visual, metrics, scrollCue], { clearProps: "all", opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set([title, tagline, ctas, socials, visual, scrollCue], { opacity: 0 });
      gsap.set(metrics, { opacity: 0, y: 6 });
      gsap.set(title, { y: 5 });
      gsap.set(tagline, { y: 5 });
      gsap.set(ctas, { y: 5 });
      gsap.set(visual, { y: 10, scale: 0.99 });

      const tl = gsap.timeline({ defaults: { ease: EASE.reveal } });

      // Name (HeroName) leads; supporting copy follows — no hero stamp/eyebrow
      tl.to(title, { opacity: 1, y: 0, duration: 0.35, clearProps: "transform" }, 0.28)
        .to(tagline, { opacity: 1, y: 0, duration: 0.35, clearProps: "transform" }, 0.4)
        .to(visual, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: EASE.cinematic, clearProps: "transform" }, 0.48)
        .to(metrics, { opacity: 1, y: 0, duration: 0.3, stagger: TIME.staggerTiny, ease: EASE.ui, clearProps: "transform" }, 0.68)
        .to(ctas, { opacity: 1, y: 0, duration: 0.3, ease: EASE.ui, clearProps: "transform" }, 0.78)
        .to(socials, { opacity: 1, duration: 0.25, ease: EASE.ui }, 0.88)
        .to(scrollCue, { opacity: 1, duration: 0.25, ease: EASE.ui }, 0.98);
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="home"
      ref={rootRef}
      className="hero-section relative flex min-h-[100dvh] flex-col justify-end overflow-hidden safe-top"
      aria-label="Introduction"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetParallax}
    >
      <motion.div className="hero-bg-base absolute inset-0" style={{ x: visualX, y: visualY }} />
      <motion.div className="hero-bg-overlay absolute inset-0" style={{ x: visualX, y: visualY }} />
      <motion.div className="absolute inset-0" style={{ x: visualX, y: visualY }}>
        <NetworkCanvas focalSide="right" className="opacity-90 dark:opacity-75" />
      </motion.div>
      <div className="hero-bg-bottom-fade pointer-events-none absolute inset-x-0 bottom-0 h-56" />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.025]" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-[calc(6rem+env(safe-area-inset-top))] sm:px-6 sm:pb-28 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <HeroName
              firstName={firstName}
              lastName={lastName}
              parallaxX={parallaxEnabled ? nameX : undefined}
              parallaxY={parallaxEnabled ? nameY : undefined}
            />

            <p
              data-hero-title
              className="mb-4 text-[clamp(1.125rem,2.5vw,1.75rem)] font-medium leading-snug text-secondary"
            >
              {SITE.title}
            </p>

            <p data-hero-tagline className="mb-8 max-w-lg text-sm leading-relaxed text-secondary sm:text-base">
              {HERO_TAGLINE}
            </p>

            <div data-hero-ctas className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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

            <div data-hero-socials className="mt-7 flex items-center gap-3">
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
                  className="interactive flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground backdrop-blur-sm transition hover:border-cta/40 hover:text-cta"
                  aria-label={label}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={springSmooth}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>
          </div>

          <motion.div data-hero-visual className="lg:col-span-7" style={{ x: visualX, y: visualY }}>
            <div className="relative">
              <EvolvingIntelligence />
              <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 font-mono-stamp text-[9px] text-meta">
                Evolving Intelligence
              </p>
            </div>
            <HeroMetrics />
          </motion.div>
        </div>
      </div>

      <a
        data-hero-scroll
        href="#build"
        className="interactive absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-xs text-muted-foreground hover:text-cta"
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
