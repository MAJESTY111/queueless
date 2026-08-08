"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, DoorOpen, QrCode, TicketCheck, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LiveIndicator } from "@/components/live-indicator";
import { QueueProgress } from "@/components/queue-progress";
import { useQueueSimulation } from "@/hooks/use-queue-simulation";
import { attendee } from "@/data/event";

const START_AHEAD = 18;

export default function QueuePage() {
  const { ahead, nowServing, admitted } = useQueueSimulation({
    startAhead: START_AHEAD,
    startNowServing: 229,
  });

  const estimatedWait = Math.max(0, Math.ceil((ahead / START_AHEAD) * 12));

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-5 pb-24 pt-8 sm:pb-16 sm:pt-14">
      <AnimatePresence mode="wait">
        {!admitted ? (
          <motion.div
            key="waiting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1 flex-col"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="font-display text-2xl font-semibold tracking-tight">
                  You&apos;re in line.
                </h1>
                <p className="mt-1 font-mono text-sm text-text-tertiary">
                  Ticket {attendee.queueNumber}
                </p>
              </div>
              <LiveIndicator />
            </div>

            <Card className="flex flex-col items-center gap-5 p-8">
              <QueueProgress ahead={ahead} total={START_AHEAD} />

              <div className="flex w-full items-center justify-between rounded-xl border border-border-soft bg-surface-2/50 px-4 py-3 text-sm">
                <span className="text-text-secondary">Now serving</span>
                <span className="font-mono font-semibold text-text-primary">A-{nowServing}</span>
              </div>

              <div className="grid w-full grid-cols-2 gap-3">
                <div className="rounded-xl border border-border-soft bg-surface-2/50 px-4 py-3">
                  <p className="text-xs text-text-tertiary">Est. wait</p>
                  <p className="mt-0.5 font-display text-lg font-semibold tabular-nums">
                    {estimatedWait} min
                  </p>
                </div>
                <div className="rounded-xl border border-border-soft bg-surface-2/50 px-4 py-3">
                  <p className="text-xs text-text-tertiary">Status</p>
                  <p className="mt-0.5 flex items-center gap-1.5 font-display text-lg font-semibold text-go">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                    Moving up
                  </p>
                </div>
              </div>
            </Card>

            <Card className="mt-4 p-5">
              <p className="font-display text-sm font-semibold tracking-tight">Before you enter</p>
              <ul className="mt-3 space-y-2.5 text-sm text-text-secondary">
                <li className="flex items-center gap-2.5">
                  <QrCode className="h-4 w-4 shrink-0 text-signal" strokeWidth={2} />
                  Keep your QR code ready
                </li>
                <li className="flex items-center gap-2.5">
                  <TicketCheck className="h-4 w-4 shrink-0 text-signal" strokeWidth={2} />
                  Have your ticket visible
                </li>
                <li className="flex items-center gap-2.5">
                  <UserCheck className="h-4 w-4 shrink-0 text-signal" strokeWidth={2} />
                  Follow staff instructions
                </li>
              </ul>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="admitted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1 flex-col items-center justify-center text-center"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.1 }}
              className="relative flex h-28 w-28 items-center justify-center rounded-full bg-go-dim text-go"
            >
              <span className="pulse-ring absolute inset-0 rounded-full text-go" />
              <DoorOpen className="h-12 w-12" strokeWidth={1.8} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-8 font-display text-3xl font-bold tracking-tight"
            >
              You&apos;re next.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-2 text-text-secondary"
            >
              Proceed to <span className="font-semibold text-text-primary">Gate A</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-10 w-full max-w-xs"
            >
              <Link href="/feedback">
                <Button size="lg" className="w-full">
                  Continue to Feedback
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
