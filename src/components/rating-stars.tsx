"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const display = hovered ?? value;

  return (
    <div className="flex items-center gap-2" role="radiogroup" aria-label="Rate your entry experience">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= display;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onChange(n)}
            className="rounded-md p-1 transition-transform duration-150 ease-out hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
            style={{ transform: filled && hovered === n ? "scale(1.15)" : undefined }}
          >
            <Star
              className={cn(
                "h-9 w-9 transition-colors duration-150",
                filled ? "fill-wait text-wait" : "fill-transparent text-text-tertiary"
              )}
              strokeWidth={1.5}
            />
          </button>
        );
      })}
    </div>
  );
}
