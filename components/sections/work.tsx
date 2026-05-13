"use client";

import { useReducedMotion, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { H2 } from "@/components/ui/typography";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { portfolio } from "@/data/portfolio";

export default function Work() {
  const reduced = useReducedMotion();
  const container = reduced ? {} : staggerContainer;
  const item = reduced ? {} : fadeInUp;

  return (
    <section id="work" className="py-24">
      <div className="mx-auto max-w-4xl px-6 md:px-12 lg:px-24">
        <div className="mb-10">
          <H2>Selected Work</H2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 border-l border-t border-border md:grid-cols-2"
        >
          {portfolio.projects.map((project, index) => {
            const isInternal = !!project.internal;
            const isFeatured = index === 0;

            const cardClass = cn(
              "group relative flex flex-col justify-between gap-6 border-b border-r border-border p-6 transition-colors hover:bg-foreground/[0.03] md:p-8",
              isFeatured && "md:col-span-2",
              "min-h-52",
            );

            const body = (
              <>
                {/* Border draw — clockwise: top → right → bottom → left */}
                <span className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-foreground/50 transition-[width] duration-200 ease-out group-hover:w-full" />
                <span className="pointer-events-none absolute right-0 top-0 h-0 w-px bg-foreground/50 transition-[height] delay-150 duration-200 ease-out group-hover:h-full" />
                <span className="pointer-events-none absolute bottom-0 right-0 h-px w-0 bg-foreground/50 transition-[width] delay-300 duration-200 ease-out group-hover:w-full" />
                <span className="pointer-events-none absolute bottom-0 left-0 h-0 w-px bg-foreground/50 transition-[height] delay-[450ms] duration-200 ease-out group-hover:h-full" />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {isInternal && (
                      <span className="relative flex h-2 w-2 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 bg-emerald-400" />
                      </span>
                    )}
                    <span className="text-lg font-bold leading-tight text-foreground group-hover:underline underline-offset-4 decoration-border">
                      {project.title}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="mt-0.5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="font-mono text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            );

            return (
              <motion.div
                key={project.title}
                variants={item}
                className={cardClass}
              >
                {isInternal ? (
                  <Link href={project.url} className="contents">
                    {body}
                  </Link>
                ) : (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contents"
                  >
                    {body}
                  </a>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
