import Link from "next/link";
import { ArrowRight, LayoutDashboard, QrCode, Radar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveIndicator } from "@/components/live-indicator";
import { event, attendee } from "@/data/event";

const benefits = [
  {
    icon: QrCode,
    title: "Digital Entry",
    description: "One QR ticket replaces paper passes and printed lists at every gate.",
  },
  {
    icon: Users,
    title: "Live Queue Tracking",
    description: "Attendees watch their position move in real time — no guessing, no crowding.",
  },
  {
    icon: Radar,
    title: "Crowd Intelligence",
    description: "Staff see density and entry rate per gate the moment it starts to build.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col pb-16 sm:pb-0">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border-soft">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="animate-fade-up">
            <LiveIndicator label="1,284 tickets issued today" />
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Skip the queue.
              <br />
              <span className="text-signal">Keep moving.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-text-secondary sm:text-lg">
              Digital tickets, live queue tracking, and smarter event entry — built to
              keep crowds moving.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/ticket">
                <Button size="lg">
                  Get Your Ticket
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </Button>
              </Link>
              <Link href="/admin">
                <Button size="lg" variant="secondary">
                  <LayoutDashboard className="h-4 w-4" strokeWidth={2} />
                  Open Event Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual preview */}
          <div className="relative mx-auto w-full max-w-sm animate-fade-up [animation-delay:120ms]">
            <div className="absolute -inset-6 -z-10 rounded-[40px] bg-signal/10 blur-3xl" />
            <div className="rounded-3xl border border-border bg-surface p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-signal/30 bg-signal-dim px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-signal">
                  {attendee.ticketType}
                </span>
                <span className="font-mono text-xs text-text-tertiary">#{attendee.queueNumber}</span>
              </div>
              <p className="mt-4 font-display text-lg font-semibold leading-snug">{event.name}</p>
              <p className="mt-1 text-sm text-text-secondary">{event.venue}</p>

              <div className="mt-5 rounded-xl border border-border-soft bg-surface-2/60 p-4">
                <div className="flex items-center justify-between text-xs text-text-tertiary">
                  <span className="uppercase tracking-wider">You&apos;re in line</span>
                  <LiveIndicator />
                </div>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="font-display text-4xl font-bold tabular-nums tracking-tight">18</p>
                    <p className="text-xs text-text-secondary">people ahead</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg font-semibold tabular-nums">12 min</p>
                    <p className="text-xs text-text-secondary">est. wait</p>
                  </div>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
                  <div className="h-full w-2/3 rounded-full bg-signal" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto w-full max-w-6xl px-6 py-14">
        <div className="grid gap-4 sm:grid-cols-3">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-border-soft bg-surface/60 p-6 transition-colors hover:border-signal/30"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-signal-dim text-signal">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <p className="mt-4 font-display text-base font-semibold tracking-tight">{title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
