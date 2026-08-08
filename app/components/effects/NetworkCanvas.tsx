"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
  label?: string;
}

const LABELS = ["API", "RAG", "Kafka", "EKS", "AI", "DATA"];

function getAccentRgb(): [number, number, number] {
  if (typeof window === "undefined") return [37, 99, 235];
  const style = getComputedStyle(document.documentElement);
  const cta = style.getPropertyValue("--color-cta").trim();
  if (cta.startsWith("#")) {
    const hex = cta.slice(1);
    return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
  }
  return [37, 99, 235];
}

function getThemeMultipliers(isDark: boolean) {
  return isDark
    ? { line: 0.35, node: 0.85, glow: 0.5, label: 0.55, mouse: 0.06 }
    : { line: 0.55, node: 0.95, glow: 0.35, label: 0.75, mouse: 0.08 };
}

export default function NetworkCanvas({
  className = "",
  focalSide = "center",
}: {
  className?: string;
  focalSide?: "left" | "center" | "right";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const themeRef = useRef(true);
  const reducedMotion = usePrefersReducedMotion();
  const { resolvedTheme } = useTheme();
  const frameRef = useRef<number>(0);

  useEffect(() => {
    themeRef.current = resolvedTheme !== "light";
  }, [resolvedTheme]);

  const focalRef = useRef(focalSide);
  useEffect(() => { focalRef.current = focalSide; }, [focalSide]);

  const initNodes = useCallback((w: number, h: number): Node[] => {
    const count = Math.min(48, Math.floor((w * h) / 18000));
    const focalX = focalSide === "right" ? w * 0.72 : focalSide === "left" ? w * 0.28 : w * 0.5;
    return Array.from({ length: count }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * Math.min(w, h) * 0.45;
      const bias = focalSide === "center" ? 1 : 0.35 + Math.random() * 0.65;
      return {
        x: focalX + Math.cos(angle) * dist * bias + (Math.random() - 0.5) * w * 0.3,
        y: h * 0.5 + Math.sin(angle) * dist * 0.8 + (Math.random() - 0.5) * h * 0.4,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 2 + 1.5,
      pulse: Math.random() * Math.PI * 2,
      label: i < LABELS.length ? LABELS[i] : undefined,
      };
    });
  }, [focalSide]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let nodes: Node[] = [];
    let w = 0;
    let h = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = initNodes(w, h);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    };
    const onTouch = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
        active: true,
      };
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("touchmove", onTouch, { passive: true });
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchend", onLeave);

    const connectionDist = 140;
    const mouseRadius = 180;

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const [r, g, b] = getAccentRgb();
      const mult = getThemeMultipliers(themeRef.current);
      const mouse = mouseRef.current;

      if (!reducedMotion) {
        nodes.forEach((node) => {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > w) node.vx *= -1;
          if (node.y < 0 || node.y > h) node.vy *= -1;

          if (mouse.active) {
            const dx = mouse.x - node.x;
            const dy = mouse.y - node.y;
            const dist = Math.hypot(dx, dy);
            if (dist < mouseRadius && dist > 0) {
              const force = ((mouseRadius - dist) / mouseRadius) * 0.02;
              node.vx += (dx / dist) * force;
              node.vy += (dy / dist) * force;
            }
          }

          node.vx *= 0.995;
          node.vy *= 0.995;
        });
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * mult.line;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.lineWidth = themeRef.current ? 1 : 1.25;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node, i) => {
        const pulse = reducedMotion ? 1 : 0.7 + Math.sin(time * 0.002 + node.pulse) * 0.3;
        const radius = node.radius * pulse;

        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 4);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${mult.glow})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${mult.node})`;
        ctx.fill();

        if (node.label && i < 6) {
          ctx.font = `600 ${themeRef.current ? 10 : 11}px system-ui, sans-serif`;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${mult.label})`;
          ctx.textAlign = "center";
          ctx.fillText(node.label, node.x, node.y - radius - 8);
        }
      });

      if (mouse.active && !reducedMotion) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouseRadius);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${mult.mouse})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(mouse.x - mouseRadius, mouse.y - mouseRadius, mouseRadius * 2, mouseRadius * 2);
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("touchmove", onTouch);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchend", onLeave);
    };
  }, [initNodes, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-auto absolute inset-0 h-full w-full touch-pan-y ${className}`}
      aria-hidden
    />
  );
}
