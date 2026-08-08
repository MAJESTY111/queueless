"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Gate } from "@/data/event";
import { statusTone, StatusBadge } from "@/components/ui/status-badge";

const DOTS_PER_GATE = 24;

function densityFromWaiting(waiting: number) {
  if (waiting < 25) return "Normal";
  if (waiting < 55) return "Busy";
  return "High";
}

const toneDot: Record<string, string> = {
  Normal: "bg-go",
  Busy: "bg-wait",
  High: "bg-high",
};

function GateGrid({ gate }: { gate: Gate }) {
  const [pulseSeed, setPulseSeed] = useState(0);
  const level = densityFromWaiting(gate.waiting);
  const activeDots = Math.min(
    DOTS_PER_GATE,
    Math.round((gate.waiting / 80) * DOTS_PER_GATE) + 4
  );

  useEffect(() => {
    const id = setInterval(() => setPulseSeed((s) => s + 1), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border-soft bg-surface-2/50 p-4">
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-semibold">{gate.label}</p>
        <StatusBadge tone={statusTone(gate.status)}>{gate.status}</StatusBadge>
      </div>
      <div className="grid grid-cols-8 gap-1.5">
        {Array.from({ length: DOTS_PER_GATE }).map((_, i) => {
          const isActive = i < activeDots;
          const shouldPulse = isActive && (i + pulseSeed) % 7 === 0;
          return (
            <span
              key={i}
              className={cn(
                "aspect-square rounded-[3px] transition-colors duration-700",
                isActive ? toneDot[level] : "bg-surface-3",
                isActive && "opacity-90",
                shouldPulse && "animate-pulse"
              )}
            />
          );
        })}
      </div>
      <p className="text-xs text-text-tertiary">{gate.waiting} people in view</p>
    </div>
  );
}

export function CrowdDensity({ gates }: { gates: Gate[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {gates.map((gate) => (
        <GateGrid key={gate.id} gate={gate} />
      ))}
    </div>
  );
}
