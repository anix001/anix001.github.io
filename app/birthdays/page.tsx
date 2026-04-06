"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { format, parseISO } from "date-fns";
import { birthdays } from "@/data/birthdays";
import BirthdayAvatar from "@/components/BirthdayAvatar";
import {
  getDaysUntilBirthday,
  getBirthdayStatus,
  isBirthdayToday,
  isBirthdaySoon,
} from "@/lib/birthday";
import { staggerContainer } from "@/lib/animations";

const avatarVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function BirthdaysPage() {
  const reduced = useReducedMotion();
  const [todayStr, setTodayStr] = useState("");

  useEffect(() => {
    setTodayStr(format(new Date(), "MMMM d, yyyy"));
  }, []);

  const sorted = useMemo(
    () =>
      [...birthdays].sort(
        (a, b) =>
          getDaysUntilBirthday(a.birthDate) - getDaysUntilBirthday(b.birthDate),
      ),
    [],
  );

  const upcoming = useMemo(
    () =>
      sorted.filter(
        (p) => isBirthdayToday(p.birthDate) || isBirthdaySoon(p.birthDate, 7),
      ),
    [sorted],
  );

  return (
    <main className="mx-auto max-w-4xl px-6 py-24 md:px-12 lg:px-24">
      {/* Back */}
      <Link
        href="/"
        className="mb-12 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      {/* Header */}
      <div className="mb-10 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Birthdays
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Family &amp; friends, never forget
          </p>
        </div>
        {todayStr && (
          <span className="mt-1 text-xs text-muted-foreground">{todayStr}</span>
        )}
      </div>

      {/* Upcoming alerts */}
      {upcoming.length > 0 && (
        <div className="mb-8 flex flex-col gap-2">
          {upcoming.map((person) => {
            const days = getDaysUntilBirthday(person.birthDate);
            const birthdayDate = format(parseISO(person.birthDate), "MMMM d");
            return (
              <div
                key={person.id}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm"
              >
                <span>🎂</span>
                <span>
                  <span className="font-medium text-foreground">
                    {person.name}
                  </span>
                  <span className="text-muted-foreground">
                    {days === 0
                      ? "'s birthday is today"
                      : `'s birthday is in ${days} day${days === 1 ? "" : "s"}`}{" "}
                    — {birthdayDate}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Grid */}
      {birthdays.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No birthdays added yet
        </p>
      ) : (
        <motion.div
          variants={reduced ? {} : staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-3 gap-6 md:grid-cols-4 lg:grid-cols-6"
        >
          {sorted.map((person) => {
            const days = getDaysUntilBirthday(person.birthDate);
            const { label, color } = getBirthdayStatus(days);
            return (
              <motion.div
                key={person.id}
                variants={reduced ? {} : avatarVariant}
                className="flex flex-col items-center gap-1.5"
              >
                <BirthdayAvatar person={person} />
                <span className="text-center text-xs font-medium leading-tight text-foreground">
                  {person.name}
                </span>
                <span
                  className="text-center text-[11px] leading-tight"
                  style={{ color }}
                >
                  {label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </main>
  );
}
