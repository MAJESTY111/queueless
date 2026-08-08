"use client";

import { useEffect, useRef, useState } from "react";

export function useQueueSimulation({
  startAhead,
  startNowServing,
  tickMs = 2600,
}: {
  startAhead: number;
  startNowServing: number;
  tickMs?: number;
}) {
  const [ahead, setAhead] = useState(startAhead);
  const [nowServing, setNowServing] = useState(startNowServing);
  const admitted = ahead <= 0;
  const tickCount = useRef(0);

  useEffect(() => {
    if (admitted) return;
    const id = setInterval(() => {
      tickCount.current += 1;
      setAhead((prev) => Math.max(0, prev - 1));
      setNowServing((prev) => prev + 1);
    }, tickMs);
    return () => clearInterval(id);
  }, [admitted, tickMs]);

  return { ahead, nowServing, admitted };
}
