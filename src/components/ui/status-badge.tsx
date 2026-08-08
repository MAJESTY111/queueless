import { cn } from "@/lib/utils";

type Tone = "go" | "wait" | "high" | "neutral" | "signal";

const toneClasses: Record<Tone, string> = {
  go: "bg-go-dim text-go border-go/30",
  wait: "bg-wait-dim text-wait border-wait/30",
  high: "bg-high-dim text-high border-high/30",
  neutral: "bg-surface-2 text-text-secondary border-border",
  signal: "bg-signal-dim text-signal border-signal/30",
};

export function StatusBadge({
  tone = "neutral",
  children,
  className,
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium tracking-wide",
        toneClasses[tone],
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", {
        "bg-go": tone === "go",
        "bg-wait": tone === "wait",
        "bg-high": tone === "high",
        "bg-text-tertiary": tone === "neutral",
        "bg-signal": tone === "signal",
      })} />
      {children}
    </span>
  );
}

export function statusTone(status: "Normal" | "Busy" | "High"): Tone {
  if (status === "Normal") return "go";
  if (status === "Busy") return "wait";
  return "high";
}
