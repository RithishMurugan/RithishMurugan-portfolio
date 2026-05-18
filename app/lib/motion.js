/** Motion presets — respect prefers-reduced-motion via Framer Motion reducedMotion */
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export const viewportOnce = { once: true, margin: "-48px", amount: 0.12 };

/** Subtle hero blob drift — disabled when user prefers reduced motion */
export const heroBlobTransition = {
  duration: 14,
  repeat: Infinity,
  ease: "easeInOut",
};
