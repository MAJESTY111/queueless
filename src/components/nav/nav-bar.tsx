"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ticket, Users, ScanLine, LayoutDashboard, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/ticket", label: "Attendee", icon: Ticket },
  { href: "/queue", label: "Queue", icon: Users },
  { href: "/scanner", label: "Scanner", icon: ScanLine },
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop / tablet top nav */}
      <header className="sticky top-0 z-40 hidden border-b border-border-soft bg-bg/80 backdrop-blur-md sm:block">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-signal text-white">
              <Zap className="h-4 w-4" strokeWidth={2.5} />
            </span>
            QueueLess
          </Link>

          <nav className="flex items-center gap-1">
            {links.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-surface-2 text-text-primary"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-2/60"
                  )}
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                  {label}
                  {active && (
                    <span className="ml-0.5 h-1 w-1 rounded-full bg-signal" aria-hidden />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile top bar (brand only) */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border-soft bg-bg/90 px-4 backdrop-blur-md sm:hidden">
        <Link href="/" className="flex items-center gap-2 font-display text-base font-semibold tracking-tight">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-signal text-white">
            <Zap className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
          QueueLess
        </Link>
      </header>

      {/* Mobile bottom tab bar */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border-soft bg-bg-elevated/95 backdrop-blur-md sm:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                active ? "text-signal" : "text-text-tertiary"
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} />
              {label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
