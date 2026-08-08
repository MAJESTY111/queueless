"use client";

import { cn } from "@/lib/utils";
import { ScanLine } from "lucide-react";

const cornerClasses =
  "absolute h-8 w-8 border-signal transition-colors duration-300";

export function ScannerFrame({
  active,
  children,
}: {
  active: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-3xl border border-border bg-[radial-gradient(circle_at_50%_50%,rgba(76,124,255,0.08),transparent_70%)]">
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="absolute inset-8">
        <span className={cn(cornerClasses, "left-0 top-0 border-l-[3px] border-t-[3px] rounded-tl-xl")} />
        <span className={cn(cornerClasses, "right-0 top-0 border-r-[3px] border-t-[3px] rounded-tr-xl")} />
        <span className={cn(cornerClasses, "left-0 bottom-0 border-l-[3px] border-b-[3px] rounded-bl-xl")} />
        <span className={cn(cornerClasses, "right-0 bottom-0 border-r-[3px] border-b-[3px] rounded-br-xl")} />

        {active && (
          <div className="absolute inset-x-0 top-0 h-0.5 animate-scan-line bg-gradient-to-r from-transparent via-signal to-transparent shadow-[0_0_12px_2px_var(--signal)]" />
        )}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        {children ?? (
          <ScanLine
            className={cn("h-10 w-10 text-text-tertiary transition-opacity", active && "opacity-30")}
            strokeWidth={1.5}
          />
        )}
      </div>
    </div>
  );
}
