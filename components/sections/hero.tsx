"use client";

import { useReducedMotion, motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { portfolio } from "@/data/portfolio";

export default function Hero() {
  const reduced = useReducedMotion();

  const container = reduced ? {} : staggerContainer;
  const item = reduced ? {} : fadeInUp;

  return (
    <section className="flex min-h-screen items-center">
      <div className="mx-auto w-full max-w-4xl px-6 pb-24 pt-32 md:px-12 lg:px-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <motion.p
            variants={item}
            className="text-sm text-muted-foreground"
          >
            {portfolio.role}
          </motion.p>

          <motion.h1
            variants={item}
            className="bg-linear-to-r from-muted-foreground via-foreground to-muted-foreground bg-size-[200%_auto] bg-clip-text text-5xl font-bold tracking-tight text-transparent motion-safe:animate-shimmer md:text-7xl"
          >
            {portfolio.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-md text-base leading-7 text-muted-foreground md:text-lg"
          >
            {portfolio.bio}
          </motion.p>

          <motion.div variants={item} className="flex gap-3 pt-2">
            <a
              href="#work"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              View Work
            </a>
            <a
              href="#contact"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              Contact
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
