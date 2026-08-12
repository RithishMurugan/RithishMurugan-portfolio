"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { useCoarsePointer } from "@/lib/hooks/useCoarsePointer";
import { EVOLVING_WORDS } from "@/lib/data/narrative";

type Formation = "network" | "ring" | "grid" | "orbital" | "lattice" | "wave";

interface Node3D {
  x: number;
  y: number;
  z: number;
  tx: number;
  ty: number;
  tz: number;
  baseX: number;
  baseY: number;
  baseZ: number;
}

interface Signal {
  from: number;
  to: number;
  progress: number;
  speed: number;
}

function getGraphicColors(isDark: boolean) {
  if (typeof window === "undefined") {
    return { accent: [37, 99, 235] as [number, number, number], signal: 0.9, node: 0.85, line: 0.35, glow: 0.15 };
  }
  const style = getComputedStyle(document.documentElement);
  const accent = style.getPropertyValue("--graphic-accent").trim() || (isDark ? "#6c63ff" : "#5b54ef");
  const hex = accent.startsWith("#") ? accent.slice(1) : "6c63ff";
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return {
    accent: [r, g, b] as [number, number, number],
    signal: isDark ? 0.95 : 0.85,
    node: isDark ? 0.9 : 0.8,
    line: isDark ? 0.4 : 0.5,
    glow: isDark ? 0.18 : 0.12,
  };
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function EvolvingIntelligence({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  const reducedMotion = usePrefersReducedMotion();
  const coarsePointer = useCoarsePointer();
  const { resolvedTheme } = useTheme();
  const themeRef = useRef(true);
  const frameRef = useRef(0);

  useEffect(() => {
    themeRef.current = resolvedTheme !== "light";
  }, [resolvedTheme]);

  const getFormationPositions = useCallback((formation: Formation, count: number, w: number, h: number): Node3D[] => {
    const cx = w * 0.5;
    const cy = h * 0.5;
    const scale = Math.min(w, h) * 0.28;

    return Array.from({ length: count }, (_, i) => {
      const t = i / count;
      let x = 0, y = 0, z = 0;

      switch (formation) {
        case "network":
          x = cx + (Math.random() - 0.5) * scale * 2.2;
          y = cy + (Math.random() - 0.5) * scale * 2.2;
          z = (Math.random() - 0.5) * scale * 0.5;
          break;
        case "ring":
          x = cx + Math.cos(t * Math.PI * 2) * scale;
          y = cy + Math.sin(t * Math.PI * 2) * scale;
          z = Math.sin(t * Math.PI * 4) * scale * 0.15;
          break;
        case "grid": {
          const cols = Math.ceil(Math.sqrt(count));
          const row = Math.floor(i / cols);
          const col = i % cols;
          x = cx + (col - cols / 2) * (scale * 0.45);
          y = cy + (row - cols / 2) * (scale * 0.45);
          z = 0;
          break;
        }
        case "orbital":
          x = cx + Math.cos(t * Math.PI * 2) * scale * (0.6 + (i % 3) * 0.2);
          y = cy + Math.sin(t * Math.PI * 2) * scale * (0.6 + (i % 3) * 0.2);
          z = (i % 3) * scale * 0.12 - scale * 0.12;
          break;
        case "lattice":
          x = cx + Math.cos(t * Math.PI * 2) * scale * 0.85 + Math.cos(t * Math.PI * 6) * scale * 0.15;
          y = cy + Math.sin(t * Math.PI * 2) * scale * 0.85 + Math.sin(t * Math.PI * 6) * scale * 0.15;
          z = Math.cos(t * Math.PI * 3) * scale * 0.2;
          break;
        case "wave":
          x = cx + (t - 0.5) * scale * 2.5;
          y = cy + Math.sin(t * Math.PI * 4) * scale * 0.5;
          z = Math.cos(t * Math.PI * 2) * scale * 0.1;
          break;
      }

      return { x, y, z, tx: x, ty: y, tz: z, baseX: x, baseY: y, baseZ: z };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const nodeCount = reducedMotion ? 24 : isMobile ? 32 : 48;
    const formations: Formation[] = ["network", "ring", "grid", "orbital", "lattice", "wave"];

    let w = 0, h = 0;
    let nodes: Node3D[] = [];
    let signals: Signal[] = [];
    let formationIndex = 0;
    let formationProgress = 1;
    let formationTimer = 0;
    let rotation = 0;
    let wordFlash: { text: string; opacity: number; x: number; y: number } | null = null;
    let wordTimer = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = getFormationPositions(formations[formationIndex]!, nodeCount, w, h);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height, active: true };
    };
    const onLeave = () => { mouseRef.current.active = false; };

    resize();
    window.addEventListener("resize", resize);
    if (!coarsePointer) {
      canvas.addEventListener("mousemove", onMove);
      canvas.addEventListener("mouseleave", onLeave);
    }

    const project = (x: number, y: number, z: number) => {
      const perspective = 600;
      const scale = perspective / (perspective + z);
      const parallaxX = mouseRef.current.active && !coarsePointer ? (mouseRef.current.x - 0.5) * 20 : 0;
      const parallaxY = mouseRef.current.active && !coarsePointer ? (mouseRef.current.y - 0.5) * 20 : 0;
      return { sx: w / 2 + (x - w / 2) * scale + parallaxX * (1 - scale), sy: h / 2 + (y - h / 2) * scale + parallaxY * (1 - scale), scale };
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const colors = getGraphicColors(themeRef.current);
      const [r, g, b] = colors.accent;

      if (!reducedMotion) {
        rotation += 0.0008;
        formationTimer += 1;

        if (formationTimer > 420 + Math.random() * 200) {
          formationTimer = 0;
          const next = (formationIndex + 1) % formations.length;
          const targets = getFormationPositions(formations[next]!, nodeCount, w, h);
          nodes.forEach((node, i) => {
            node.tx = targets[i]!.tx;
            node.ty = targets[i]!.ty;
            node.tz = targets[i]!.tz;
          });
          formationIndex = next;
          formationProgress = 0;
        }

        if (formationProgress < 1) {
          formationProgress = Math.min(1, formationProgress + 0.008);
          const ease = 1 - Math.pow(1 - formationProgress, 3);
          nodes.forEach((node) => {
            node.x = lerp(node.x, node.tx, ease * 0.06);
            node.y = lerp(node.y, node.ty, ease * 0.06);
            node.z = lerp(node.z, node.tz, ease * 0.06);
          });
        }

        if (Math.random() < 0.012 && nodes.length > 2) {
          const from = Math.floor(Math.random() * nodes.length);
          const to = Math.floor(Math.random() * nodes.length);
          if (from !== to) signals.push({ from, to, progress: 0, speed: 0.008 + Math.random() * 0.015 });
        }

        wordTimer += 1;
        if (wordTimer > 600 && Math.random() < 0.003) {
          wordTimer = 0;
          const node = nodes[Math.floor(Math.random() * nodes.length)]!;
          const p = project(node.x, node.y, node.z);
          wordFlash = { text: EVOLVING_WORDS[Math.floor(Math.random() * EVOLVING_WORDS.length)]!, opacity: 0.6, x: p.sx, y: p.sy };
        }
      }

      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);
      const cx = w / 2;
      const cy = h / 2;

      nodes.forEach((node, i) => {
        const dx = node.x - cx;
        const dy = node.y - cy;
        if (!reducedMotion) {
          node.x = cx + dx * cos - dy * sin * 0.3;
          node.y = cy + dx * sin * 0.3 + dy * cos;
        }
        const breathe = reducedMotion ? 1 : 1 + Math.sin(time * 0.0015 + i * 0.4) * 0.04;
        node.z = node.z * breathe;
      });

      const edges: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i]!.x - nodes[j]!.x;
          const dy = nodes[i]!.y - nodes[j]!.y;
          if (Math.hypot(dx, dy) < Math.min(w, h) * 0.22) edges.push([i, j]);
        }
      }

      const sorted = nodes.map((n, i) => ({ ...project(n.x, n.y, n.z), i, z: n.z })).sort((a, b) => a.z - b.z);

      edges.forEach(([a, b]) => {
        const pa = project(nodes[a]!.x, nodes[a]!.y, nodes[a]!.z);
        const pb = project(nodes[b]!.x, nodes[b]!.y, nodes[b]!.z);
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(pb.sx, pb.sy);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${colors.line * Math.min(pa.scale, pb.scale)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      signals = signals.filter((sig) => {
        sig.progress += sig.speed;
        if (sig.progress >= 1) return false;
        const na = nodes[sig.from];
        const nb = nodes[sig.to];
        if (!na || !nb) return false;
        const pa = project(na.x, na.y, na.z);
        const pb = project(nb.x, nb.y, nb.z);
        const sx = lerp(pa.sx, pb.sx, sig.progress);
        const sy = lerp(pa.sy, pb.sy, sig.progress);
        ctx.beginPath();
        ctx.arc(sx, sy, 2.5 * pa.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${colors.signal})`;
        ctx.fill();
        return true;
      });

      sorted.forEach(({ sx, sy, scale, i }) => {
        const radius = (2 + scale * 1.5) * scale;
        const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius * 5);
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${colors.glow})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(sx, sy, radius * 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${colors.node})`;
        ctx.fill();
      });

      [0.55, 0.7, 0.85].forEach((ringScale, ri) => {
        if (reducedMotion && ri > 0) return;
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.min(w, h) * ringScale * 0.35, Math.min(w, h) * ringScale * 0.22, rotation + ri * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.08 + ri * 0.04})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      if (wordFlash) {
        wordFlash.opacity -= 0.004;
        if (wordFlash.opacity <= 0) wordFlash = null;
        else {
          ctx.font = `500 9px "IBM Plex Mono", ui-monospace, monospace`;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${wordFlash.opacity * 0.5})`;
          ctx.textAlign = "center";
          ctx.fillText(wordFlash.text, wordFlash.x, wordFlash.y);
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [reducedMotion, coarsePointer, getFormationPositions]);

  return (
    <div className={`relative h-full min-h-[280px] w-full sm:min-h-[360px] lg:min-h-[420px] ${className}`} aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 55% 50%, color-mix(in srgb, var(--color-cta) 6%, transparent) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}
