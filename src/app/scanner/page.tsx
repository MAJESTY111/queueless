"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, ScanLine, ShieldCheck, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScannerFrame } from "@/components/qr-scanner";
import { useToast } from "@/components/ui/toast";
import { attendeePool } from "@/data/event";

type Phase = "idle" | "scanning" | "verifying" | "success" | "admitted";

function randomTicket() {
  const name = attendeePool[Math.floor(Math.random() * attendeePool.length)];
  const gate = ["A", "B", "C"][Math.floor(Math.random() * 3)];
  const num = Math.floor(100 + Math.random() * 899);
  return {
    name,
    ticketType: "GENERAL ADMISSION",
    queue: `${gate}-${num}`,
  };
}

export default function ScannerPage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [ticket, setTicket] = useState(randomTicket);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const toast = useToast();

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const startScan = useCallback(() => {
    clearTimers();
    setTicket(randomTicket());
    setPhase("scanning");
    timers.current.push(
      setTimeout(() => setPhase("verifying"), 1100),
      setTimeout(() => setPhase("success"), 2000)
    );
  }, []);

  const reset = () => {
    clearTimers();
    setPhase("idle");
  };

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-5 pb-24 pt-8 sm:pb-16 sm:pt-14">
      <div className="mb-6 text-center sm:text-left">
        <h1 className="font-display text-2xl font-semibold tracking-tight">Entry Scanner</h1>
        <p className="mt-1 text-sm text-text-secondary">Scan attendee tickets to verify entry.</p>
      </div>

      <Card className="flex flex-col items-center gap-6 p-6 sm:p-8">
        <ScannerFrame active={phase === "scanning"}>
          <AnimatePresence mode="wait">
            {phase === "idle" && (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ScanLine className="h-10 w-10 text-text-tertiary" strokeWidth={1.5} />
              </motion.div>
            )}
            {phase === "scanning" && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2 text-signal"
              >
                <Loader2 className="h-8 w-8 animate-spin" strokeWidth={2} />
              </motion.div>
            )}
            {phase === "verifying" && (
              <motion.div
                key="verifying"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2 text-wait"
              >
                <ShieldCheck className="h-9 w-9" strokeWidth={1.8} />
              </motion.div>
            )}
            {(phase === "success" || phase === "admitted") && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="flex flex-col items-center gap-2 text-go"
              >
                <CheckCircle2 className="h-11 w-11" strokeWidth={1.8} />
              </motion.div>
            )}
          </AnimatePresence>
        </ScannerFrame>

        <div className="h-6 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={phase}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-sm font-medium text-text-secondary"
            >
              {phase === "idle" && "Ready to scan"}
              {phase === "scanning" && "Scanning..."}
              {phase === "verifying" && "Verifying ticket..."}
              {phase === "success" && "Ticket Verified"}
              {phase === "admitted" && "Entry recorded"}
            </motion.p>
          </AnimatePresence>
        </div>

        {phase === "idle" && (
          <Button size="lg" className="w-full max-w-xs" onClick={startScan}>
            Scan Ticket
          </Button>
        )}

        {(phase === "scanning" || phase === "verifying") && (
          <Button size="lg" className="w-full max-w-xs" disabled>
            {phase === "scanning" ? "Scanning..." : "Verifying..."}
          </Button>
        )}
      </Card>

      <AnimatePresence>
        {(phase === "success" || phase === "admitted") && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="mt-4 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-2 text-text-secondary">
                  <UserRound className="h-5 w-5" strokeWidth={2} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-base font-semibold">{ticket.name}</p>
                  <p className="text-xs text-text-tertiary">{ticket.ticketType}</p>
                </div>
                <span className="font-mono text-sm text-text-secondary">{ticket.queue}</span>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-lg border border-go/25 bg-go-dim px-3.5 py-2.5">
                <span className="text-sm font-medium text-go">
                  {phase === "admitted" ? "Attendee Admitted" : "Entry Approved"}
                </span>
                <CheckCircle2 className="h-4 w-4 text-go" strokeWidth={2.5} />
              </div>

              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                {phase === "success" && (
                  <Button
                    className="flex-1"
                    onClick={() => {
                      setPhase("admitted");
                      toast(`${ticket.name} admitted at the gate`);
                    }}
                  >
                    Admit Attendee
                  </Button>
                )}
                <Button variant="secondary" className="flex-1" onClick={reset}>
                  Try Another Ticket
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
