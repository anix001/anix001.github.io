"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { portfolio } from "@/data/portfolio";

const spring = [0.16, 1, 0.3, 1] as const;
const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const words = portfolio.name.split(" ");

  return (
    <section className="flex min-h-screen items-center">
      <div className="mx-auto w-full max-w-4xl px-6 pb-24 pt-32 md:px-12 lg:px-24">
        <div className="flex flex-col gap-6">

          {/* Live Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0, duration: 0.5, ease }}
            className="flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 bg-emerald-400" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-emerald-400">
              Available for Architecture
            </span>
          </motion.div>

          {/* Role label */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease }}
            className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
          >
            {portfolio.role}
          </motion.p>

          {/* Thin Swiss rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease }}
            style={{ transformOrigin: "left" }}
            className="w-10 border-t border-foreground/30"
          />

          {/* Shutter word reveal */}
          <h1 className="flex flex-wrap gap-x-[0.22em] text-7xl font-black tracking-tighter md:text-9xl">
            {words.map((word, i) => (
              <span key={word} className="overflow-hidden leading-[1]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{
                    delay: 0.3 + i * 0.12,
                    duration: 0.9,
                    ease: spring,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5, ease }}
            className="max-w-md text-base leading-7 text-muted-foreground md:text-lg"
          >
            {portfolio.bio}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5, ease }}
            className="flex gap-3 pt-2"
          >
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

        </div>
      </div>
    </section>
  );
}
