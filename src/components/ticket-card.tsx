"use client";

import { QRCodeSVG } from "qrcode.react";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { event, attendee } from "@/data/event";

export function TicketCard() {
  const qrPayload = JSON.stringify({
    event: event.name,
    attendee: attendee.name,
    queue: attendee.queueNumber,
    type: attendee.ticketType,
  });

  return (
    <div className="relative mx-auto w-full max-w-sm animate-fade-up">
      <div className="relative overflow-hidden rounded-[28px] border border-border bg-gradient-to-b from-surface to-bg-elevated shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
        {/* Top: event details */}
        <div className="space-y-4 p-6 pb-8">
          <div className="flex items-center justify-between">
            <span className="rounded-full border border-signal/30 bg-signal-dim px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-signal">
              {attendee.ticketType}
            </span>
            <span className="font-mono text-xs text-text-tertiary">#{attendee.queueNumber}</span>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
              Attendee
            </p>
            <p className="mt-1 font-display text-xl font-semibold tracking-tight">
              {attendee.name}
            </p>
          </div>

          <div>
            <p className="font-display text-lg font-semibold leading-snug tracking-tight">
              {event.name}
            </p>
          </div>

          <div className="space-y-2 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-text-tertiary" strokeWidth={2} />
              {event.venue}
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 shrink-0 text-text-tertiary" strokeWidth={2} />
              {event.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-text-tertiary" strokeWidth={2} />
              {event.time}
            </div>
          </div>
        </div>

        {/* Perforation */}
        <div className="relative h-0">
          <div className="absolute -left-3 top-0 h-6 w-6 -translate-y-1/2 rounded-full bg-bg" />
          <div className="absolute -right-3 top-0 h-6 w-6 -translate-y-1/2 rounded-full bg-bg" />
          <div className="mx-6 border-t border-dashed border-border" />
        </div>

        {/* Bottom: QR */}
        <div className="flex flex-col items-center gap-3 p-6 pt-8">
          <div className="rounded-2xl bg-white p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
            <QRCodeSVG value={qrPayload} size={168} level="M" />
          </div>
          <p className="font-mono text-2xl font-semibold tracking-[0.15em] text-text-primary">
            {attendee.queueNumber}
          </p>
          <p className="text-xs text-text-tertiary">Present this code at the gate</p>
        </div>
      </div>
    </div>
  );
}
