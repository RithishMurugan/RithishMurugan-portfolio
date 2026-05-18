"use client";

import { motion } from "framer-motion";
import { cardReveal, cardHover, viewportOnce } from "../lib/motion";

const cardVariants = {
  hidden: cardReveal.hidden,
  visible: cardReveal.visible,
  rest: cardHover.rest,
  hover: cardHover.hover,
};

export default function AnimatedCard({ children, className = "", index = 0 }) {
  return (
    <motion.div
      className={className}
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      whileHover="hover"
    >
      {children}
    </motion.div>
  );
}
