"use client";

import { useEffect, useState } from "react";
import { ActivityEvent, Gate, attendeePool, gates as initialGates, initialActivity } from "@/data/event";

function statusForWaiting(waiting: number): Gate["status"] {
  if (waiting < 25) return "Normal";
  if (waiting < 55) return "Busy";
  return "High";
}

function jitter(value: number, min: number, max: number) {
  const delta = Math.round((Math.random() - 0.5) * 6);
  return Math.min(max, Math.max(min, value + delta));
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

export function useAdminSimulation() {
  const [gates, setGates] = useState<Gate[]>(initialGates);
  const [activity, setActivity] = useState<ActivityEvent[]>(initialActivity);
  const [inside, setInside] = useState(1100);

  useEffect(() => {
    const gateTimer = setInterval(() => {
      setGates((prev) =>
        prev.map((gate) => {
          const waiting = jitter(gate.waiting, 8, 90);
          return { ...gate, waiting, status: statusForWaiting(waiting) };
        })
      );
    }, 4200);

    const activityTimer = setInterval(() => {
      const name = attendeePool[Math.floor(Math.random() * attendeePool.length)];
      const gateLabel = ["Gate A", "Gate B", "Gate C"][Math.floor(Math.random() * 3)];
      const action = Math.random() > 0.4 ? "Ticket verified" : "Entered event";
      const entry: ActivityEvent = {
        id: `${Date.now()}`,
        time: formatTime(new Date()),
        name,
        action,
        gate: gateLabel,
      };
      setActivity((prev) => [entry, ...prev].slice(0, 8));
      if (action === "Entered event") {
        setInside((prev) => prev + 1);
      }
    }, 5200);

    return () => {
      clearInterval(gateTimer);
      clearInterval(activityTimer);
    };
  }, []);

  const waiting = gates.reduce((sum, g) => sum + g.waiting, 0);

  return { gates, activity, inside, waiting };
}
