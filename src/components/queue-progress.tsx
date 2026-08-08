"use client";

import { motion } from "framer-motion";

export function QueueProgress({
  ahead,
  total,
}: {
  ahead: number;
  total: number;
}) {
  const progress = total === 0 ? 1 : Math.min(1, Math.max(0, 1 - ahead / total));
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <div className="relative mx-auto flex h-56 w-56 items-center justify-center">
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="var(--surface-3)"
          strokeWidth="10"
        />
        <motion.circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="var(--signal)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={false}
          animate={{ strokeDashoffset: offset }}
          transition={{ type: "spring", stiffness: 90, damping: 20 }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
          Ahead of you
        </span>
        <motion.span
          key={ahead}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl font-bold tabular-nums tracking-tight"
        >
          {ahead}
        </motion.span>
        <span className="mt-1 text-sm text-text-secondary">
          {ahead === 1 ? "person" : "people"}
        </span>
      </div>
    </div>
  );
}
