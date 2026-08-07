import type { Transition, Variants } from "framer-motion";

export const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const springSmooth: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 22,
  mass: 0.8,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 280,
  damping: 26,
};

export const springGentle: Transition = {
  type: "spring",
  stiffness: 70,
  damping: 18,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...springSmooth, delay: i * 0.07 },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: springSmooth },
};

export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...springSmooth, delay: i * 0.1 },
  }),
};

export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: { y: -6, scale: 1.01, transition: springSnappy },
};

export const pillPop: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: springSnappy },
};

export const lineExpand: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.7, ease: easeOutExpo } },
};

export const badgeReveal: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: springSnappy },
};

export const viewportOnce = { once: true, margin: "-80px" as const, amount: 0.15 as const };

export const heroBlobTransition = {
  duration: 18,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

export const buttonMotion = {
  whileHover: { scale: 1.03, y: -2 },
  whileTap: { scale: 0.98 },
  transition: springSnappy,
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: springSnappy },
  exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } },
};

export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};
