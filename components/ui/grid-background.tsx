"use client";

import { useScroll, useTransform, motion } from "framer-motion";

export function GridBackground() {
  const { scrollY } = useScroll();
  // Invisible at the top; fades to 15% at 500px of scroll
  const opacity = useTransform(scrollY, [0, 500], [0, 0.15]);

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    >
      <div className="grid-bg h-full w-full" />
    </motion.div>
  );
}
