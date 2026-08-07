"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TERMINAL_LINES } from "@/lib/data/site";

export default function TerminalWidget() {
  const prefersReducedMotion = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [history, setHistory] = useState<{ prompt: string; text: string }[]>([]);

  const currentLine = TERMINAL_LINES[lineIndex];
  const displayed = currentLine.text.slice(0, charIndex);

  useEffect(() => {
    if (prefersReducedMotion) {
      setHistory(TERMINAL_LINES.map((l) => ({ prompt: l.prompt, text: l.text })));
      return;
    }

    if (charIndex < currentLine.text.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 28);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setHistory((h) => [...h.slice(-3), { prompt: currentLine.prompt, text: currentLine.text }]);
      setLineIndex((i) => (i + 1) % TERMINAL_LINES.length);
      setCharIndex(0);
    }, 1800);
    return () => clearTimeout(t);
  }, [charIndex, currentLine, prefersReducedMotion, lineIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="w-full max-w-md rounded-2xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-xl"
      aria-label="Interactive terminal showing skills and focus areas"
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-2 font-mono text-xs text-zinc-400">rithish@portfolio ~</span>
      </div>
      <div className="min-h-[200px] space-y-2 p-4 font-mono text-xs leading-relaxed sm:text-sm">
        {history.map((line, i) => (
          <div key={`${line.prompt}-${i}`} className="text-zinc-400">
            <span className="text-cyan-400">$</span> {line.prompt}{" "}
            <span className="text-zinc-200">{line.text}</span>
          </div>
        ))}
        <div>
          <span className="text-cyan-400">$</span> {currentLine.prompt}{" "}
          <span className="text-emerald-300">{displayed}</span>
          {!prefersReducedMotion && (
            <motion.span
              className="inline-block w-2 bg-emerald-400"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              &nbsp;
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
