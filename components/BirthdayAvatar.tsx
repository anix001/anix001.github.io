"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { format, parseISO } from "date-fns";
import type { Birthday } from "@/data/birthdays";
import {
  getDaysUntilBirthday,
  getAgeThisYear,
  getBirthdayStatus,
  getCountdownRingPercent,
  getZodiacSign,
} from "@/lib/birthday";

const CIRCUMFERENCE = 2 * Math.PI * 44;

export default function BirthdayAvatar({ person }: { person: Birthday }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  const days = getDaysUntilBirthday(person.birthDate);
  const isToday = days === 0;
  const isSoon = days > 0 && days <= 7;

  const ringPercent = getCountdownRingPercent(days);
  const dashOffset = CIRCUMFERENCE * (1 - ringPercent / 100);
  const ringColor = isToday ? "#fbbf24" : person.color;
  const ringOpacity = isToday ? 1 : isSoon ? 0.9 : days <= 30 ? 0.6 : 0.25;

  const zodiac = getZodiacSign(person.birthDate);
  const ageThisYear = getAgeThisYear(person.birthDate);
  const { label: statusLabel, color: statusColor } = getBirthdayStatus(days);
  const yearProgress = Math.round(((365 - days) / 365) * 100);
  const birthdayFormatted = format(parseISO(person.birthDate), "MMMM d");

  // Confetti burst when it's their birthday
  useEffect(() => {
    if (!isToday || reduced) return;
    import("canvas-confetti").then(({ default: confetti }) => {
      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.6 },
        colors: [person.color, "#fbbf24", "#f97316", "#ffffff"],
      });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative">
      {/* Avatar + ring wrapper */}
      <div
        className="relative flex cursor-pointer items-center justify-center"
        style={{ width: 100, height: 100 }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
      >
        {/* SVG ring — rotated so progress starts at 12 o'clock */}
        <svg
          width={100}
          height={100}
          className="absolute inset-0 -rotate-90"
          aria-hidden="true"
        >
          {/* Track */}
          <circle
            cx={50}
            cy={50}
            r={44}
            stroke="white"
            strokeOpacity={0.06}
            strokeWidth={2.5}
            fill="none"
          />
          {/* Progress */}
          <motion.circle
            cx={50}
            cy={50}
            r={44}
            stroke={ringColor}
            strokeOpacity={ringOpacity}
            strokeWidth={2.5}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={{ strokeDashoffset: reduced ? dashOffset : CIRCUMFERENCE }}
            animate={{
              strokeDashoffset: dashOffset,
              strokeOpacity:
                isToday && !reduced
                  ? [ringOpacity, 0.4, ringOpacity]
                  : ringOpacity,
            }}
            transition={{
              strokeDashoffset: {
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15,
              },
              strokeOpacity: isToday
                ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                : {},
            }}
          />
        </svg>

        {/* Glow for upcoming birthdays within 7 days */}
        {isSoon && !reduced && (
          <div
            className="absolute inset-[6px] animate-pulse rounded-full"
            style={{ boxShadow: `0 0 14px 3px ${person.color}50` }}
          />
        )}

        {/* Initials circle */}
        <div
          className="relative z-10 flex h-20 w-20 select-none items-center justify-center rounded-full text-2xl font-bold text-white"
          style={{
            background: `linear-gradient(135deg, ${person.color}50 0%, ${person.color}28 100%)`,
            border: `1px solid ${person.color}30`,
          }}
        >
          {person.name[0].toUpperCase()}
        </div>

        {/* Cake badge for today */}
        {isToday && (
          <span
            className="absolute bottom-1 right-1 z-20 text-base leading-none"
            aria-label="Birthday today"
          >
            🎂
          </span>
        )}
      </div>

      {/* Hover card */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 4 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full left-1/2 z-50 mb-3 w-52 -translate-x-1/2 rounded-xl border border-white/10 bg-[#111] p-4 shadow-2xl"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            {/* Caret */}
            <div className="absolute -bottom-[7px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-white/10 bg-[#111]" />

            {/* Header */}
            <div className="mb-3 flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{
                  background: `${person.color}40`,
                  border: `1px solid ${person.color}50`,
                }}
              >
                {person.name[0].toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {person.name}
                </p>
                <p className="text-xs text-muted-foreground">{person.relation}</p>
              </div>
            </div>

            {/* Rows */}
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span>🎂</span>
                <span className="text-muted-foreground">{birthdayFormatted}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🎉</span>
                <span className="text-muted-foreground">
                  Turning {ageThisYear} this year
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>⏳</span>
                <span style={{ color: statusColor }}>{statusLabel}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{zodiac.emoji}</span>
                <span className="text-muted-foreground">{zodiac.sign}</span>
              </div>
            </div>

            {/* Year progress bar */}
            <div className="mt-3">
              <div className="mb-1.5 flex justify-between text-[10px] text-muted-foreground/60">
                <span>Year progress</span>
                <span>{yearProgress}%</span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.07]">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: person.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${yearProgress}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
