"use client";

import { useReducedMotion, motion } from "framer-motion";
import { Briefcase, Clock, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { H2 } from "@/components/ui/typography";
import { fadeInUp, staggerContainer } from "@/lib/animations";
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

export default function Experience() {
  const reduced = useReducedMotion();

  const container = reduced ? {} : staggerContainer;
  const item = reduced ? {} : fadeInUp;

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
              variants={item}
              className="flex gap-5"
            >
              {/* Left column: dot + connecting line */}
              <div className="flex flex-col items-center pt-[6px]">
                <div
                  className={cn(
                    "h-2 w-2 shrink-0 rounded-full",
                    entry.end === "Present"
                      ? "animate-pulse bg-accent"
                      : "bg-border",
                  )}
                />
                {i < experience.length - 1 && (
                  <div className="mt-2 min-h-12 w-px flex-1 bg-border" />
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
