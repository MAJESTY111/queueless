"use client";

import { useEffect, useRef, useState } from "react";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function useCountUp(target: number, durationMs = 1200) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let frame: number;
    const step = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, durationMs]);

  return value;
}

export function StatCard({
  label,
  value,
  suffix = "",
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  tone?: "default" | "signal";
}) {
  const animated = useCountUp(value);

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
          {label}
        </span>
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg",
            tone === "signal" ? "bg-signal-dim text-signal" : "bg-surface-2 text-text-secondary"
          )}
        >
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-semibold tabular-nums tracking-tight">
        {animated.toLocaleString()}
        <span className="ml-1 text-lg text-text-tertiary">{suffix}</span>
      </p>
    </Card>
  );
}
