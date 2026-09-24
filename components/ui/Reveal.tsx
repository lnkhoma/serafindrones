"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Delay in seconds, handy for staggering grid items. */
  delay?: number;
  /** Distance (px) the element travels upward as it fades in. */
  y?: number;
};

/**
 * Fades + lifts its children into view once, when scrolled into the viewport.
 * Reduced-motion users get no movement (handled globally by <MotionConfig> in Providers).
 */
export default function Reveal({ delay = 0, y = 24, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
