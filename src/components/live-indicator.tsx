import { cn } from "@/lib/utils";

export function LiveIndicator({
  label = "Live",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-go/25 bg-go-dim px-3 py-1 text-xs font-semibold uppercase tracking-wider text-go",
        className
      )}
      role="status"
    >
      <span className="relative flex h-2 w-2">
        <span className="pulse-ring absolute inline-flex h-2 w-2 text-go" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-go" />
      </span>
      {label}
    </span>
  );
}
