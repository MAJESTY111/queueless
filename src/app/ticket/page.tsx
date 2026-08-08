"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TicketCard } from "@/components/ticket-card";
import { useToast } from "@/components/ui/toast";

export default function TicketPage() {
  const [addedToWallet, setAddedToWallet] = useState(false);
  const toast = useToast();

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-5 pb-24 pt-8 sm:pb-16 sm:pt-14">
      <div className="mb-6 animate-fade-up text-center sm:text-left">
        <h1 className="font-display text-2xl font-semibold tracking-tight">Your ticket</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Keep this ready — you&apos;ll scan it at the gate.
        </p>
      </div>

      <TicketCard />

      <div className="mx-auto mt-8 flex w-full max-w-sm flex-col gap-3 animate-fade-up [animation-delay:120ms]">
        <Link href="/queue">
          <Button size="lg" className="w-full">
            View Live Queue
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Button>
        </Link>
        <Button
          size="lg"
          variant="secondary"
          className="w-full"
          onClick={() => {
            setAddedToWallet(true);
            toast("Ticket added to Wallet");
          }}
          disabled={addedToWallet}
        >
          {addedToWallet ? (
            <>
              <Check className="h-4 w-4" strokeWidth={2.5} />
              Added to Wallet
            </>
          ) : (
            <>
              <Wallet className="h-4 w-4" strokeWidth={2} />
              Add to Wallet
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
