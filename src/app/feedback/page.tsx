"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RatingStars } from "@/components/rating-stars";
import { cn } from "@/lib/utils";
import { feedbackTags } from "@/data/event";

type Status = "idle" | "submitting" | "done";

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const toggleTag = (tag: string) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const submit = () => {
    setStatus("submitting");
    setTimeout(() => setStatus("done"), 1100);
  };

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-5 pb-24 pt-8 sm:pb-16 sm:pt-14">
      <AnimatePresence mode="wait">
        {status !== "done" ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-6 text-center sm:text-left">
              <h1 className="font-display text-2xl font-semibold tracking-tight">
                How was your entry experience?
              </h1>
              <p className="mt-1 text-sm text-text-secondary">
                Your feedback helps us keep the line moving.
              </p>
            </div>

            <Card className="p-6">
              <div className="flex flex-col items-center gap-2">
                <RatingStars value={rating} onChange={setRating} />
                <span className="h-4 text-xs text-text-tertiary">
                  {rating > 0 && ["", "Poor", "Fair", "Good", "Great", "Excellent"][rating]}
                </span>
              </div>

              <div className="mt-6">
                <p className="text-sm font-medium text-text-primary">What could we improve?</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {feedbackTags.map((tag) => {
                    const active = tags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        aria-pressed={active}
                        className={cn(
                          "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-150",
                          active
                            ? "border-signal/40 bg-signal-dim text-signal"
                            : "border-border text-text-secondary hover:border-border hover:text-text-primary hover:bg-surface-2"
                        )}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="comment" className="text-sm font-medium text-text-primary">
                  Tell us more{" "}
                  <span className="font-normal text-text-tertiary">(optional)</span>
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  placeholder="What stood out about entry today?"
                  className="mt-2 w-full resize-none rounded-xl border border-border bg-surface-2/50 p-3.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-signal/50 focus:outline-none focus:ring-2 focus:ring-signal/20"
                />
              </div>

              <Button
                size="lg"
                className="mt-6 w-full"
                disabled={rating === 0 || status === "submitting"}
                onClick={submit}
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
                    Submitting...
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </Button>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1 flex-col items-center justify-center text-center"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.1 }}
              className="relative flex h-24 w-24 items-center justify-center rounded-full bg-go-dim text-go"
            >
              <span className="pulse-ring absolute inset-0 rounded-full text-go" />
              <PartyPopper className="h-10 w-10" strokeWidth={1.8} />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="mt-7 font-display text-2xl font-bold tracking-tight"
            >
              Thanks for helping us improve.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="mt-2 text-text-secondary"
            >
              Your feedback has been received.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
