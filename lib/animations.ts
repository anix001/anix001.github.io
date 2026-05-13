import type { Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// Individual badge entrance: scale + fade + slight lift
export const badgePop: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 4 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease },
  },
};

// Timeline dot: square scales in from zero
export const dotAppear: Variants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { duration: 0.25, ease },
  },
};
