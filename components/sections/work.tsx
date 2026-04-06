"use client";

import { useReducedMotion, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { H2 } from "@/components/ui/typography";
import { fadeInUp } from "@/lib/animations";
import { portfolio } from "@/data/portfolio";

export default function Work() {
  const reduced = useReducedMotion();
  const item = reduced ? {} : fadeInUp;

  const linkClass =
    "group flex items-start justify-between gap-6 border-b border-border py-7 transition-colors hover:bg-white/[0.03] -mx-3 px-3 rounded-sm";

  return (
    <section id="work" className="py-24">
      <div className="mx-auto max-w-4xl px-6 md:px-12 lg:px-24">
        <div className="mb-12">
          <H2>Selected Work</H2>
          <Separator className="mt-6" />
        </div>

        <div className="relative">
          {portfolio.projects.length > 4 && (
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-24 bg-linear-to-t from-background to-transparent" />
          )}
          <div
            data-lenis-prevent={portfolio.projects.length > 4 ? "" : undefined}
            className={[
              "flex flex-col",
              portfolio.projects.length > 4
                ? "max-h-160 min-h-0 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {portfolio.projects.map((project) => {
            const isInternal = !!project.internal;

            const body = (
              <>
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 font-medium text-foreground group-hover:underline underline-offset-4 decoration-border">
                    {isInternal && (
                      <span className="relative flex h-2 w-2 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                      </span>
                    )}
                    {project.title}
                  </span>
                  <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <ArrowUpRight
                  size={18}
                  className="mt-0.5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                />
              </>
            );

            return (
              <motion.div
                key={project.title}
                variants={item}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                {isInternal ? (
                  <Link href={project.url} className={linkClass}>
                    {body}
                  </Link>
                ) : (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {body}
                  </a>
                )}
              </motion.div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
