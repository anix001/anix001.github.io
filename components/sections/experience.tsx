"use client";

import { useReducedMotion, motion, type Variants } from "framer-motion";
import { Briefcase, Clock, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { H2 } from "@/components/ui/typography";
import { fadeInUp, dotAppear } from "@/lib/animations";
import { experience } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const MONTH_INDEX: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function parseDate(str: string): Date {
  const [mon, yr] = str.split(" ");
  return new Date(Number(yr), MONTH_INDEX[mon]);
}

function getDuration(start: string, end: string): string {
  const s = parseDate(start);
  const e = end === "Present" ? new Date() : parseDate(end);
  const total =
    (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  const yrs = Math.floor(total / 12);
  const mos = total % 12;
  if (yrs === 0) return `${mos} mo`;
  if (mos === 0) return `${yrs} yr`;
  return `${yrs} yr ${mos} mo`;
}

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 },
  },
};

export default function Experience() {
  const reduced = useReducedMotion();

  const entryVariant = reduced ? {} : fadeInUp;
  const dotVariant = reduced ? {} : dotAppear;
  const lineVar = reduced ? {} : lineVariants;

  const container: Variants = reduced
    ? {}
    : { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-4xl px-6 md:px-12 lg:px-24">
        <div className="mb-12">
          <H2>Experience</H2>
          <p className="mt-2 text-sm text-muted-foreground">
            Where I&apos;ve worked
          </p>
          <Separator className="mt-6" />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {experience.map((entry, i) => (
            <motion.div
              key={entry.title + entry.company}
              variants={entryVariant}
              className="flex gap-5"
            >
              {/* Left column: animated dot + drawing connector line */}
              <div className="flex flex-col items-center pt-1.5">
                <motion.div
                  variants={dotVariant}
                  className={cn(
                    "h-2 w-2 shrink-0",
                    entry.end === "Present"
                      ? "animate-pulse bg-accent"
                      : "bg-border",
                  )}
                />
                {i < experience.length - 1 && (
                  <motion.div
                    variants={lineVar}
                    className="mt-2 min-h-12 w-px flex-1 bg-border"
                    style={{ transformOrigin: "top" }}
                  />
                )}
              </div>

              {/* Right column: content */}
              <div
                className={cn(
                  "flex-1",
                  i < experience.length - 1 && "pb-8",
                )}
              >
                <p className="font-medium text-foreground">{entry.title}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Briefcase size={12} className="shrink-0" />
                  {entry.company} · {entry.type}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock size={12} className="shrink-0" />
                  {entry.start} – {entry.end} · {getDuration(entry.start, entry.end)}
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin size={12} className="shrink-0" />
                  {entry.location} · {entry.mode}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
