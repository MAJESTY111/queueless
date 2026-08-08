"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, LogIn } from "lucide-react";
import { ActivityEvent } from "@/data/event";

export function ActivityFeed({ events }: { events: ActivityEvent[] }) {
  return (
    <ul className="flex flex-col gap-1">
      <AnimatePresence initial={false}>
        {events.map((item) => (
          <motion.li
            key={item.id}
            layout
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-surface-2/60"
          >
            <span
              className={
                item.action === "Ticket verified"
                  ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-signal-dim text-signal"
                  : "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-go-dim text-go"
              }
            >
              {item.action === "Ticket verified" ? (
                <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
              ) : (
                <LogIn className="h-4 w-4" strokeWidth={2} />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-text-primary">{item.name}</p>
              <p className="truncate text-xs text-text-tertiary">
                {item.action} · {item.gate}
              </p>
            </div>
            <span className="shrink-0 font-mono text-xs text-text-tertiary">{item.time}</span>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
