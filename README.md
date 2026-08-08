# QueueLess

**Skip the queue. Keep moving.**

QueueLess is a frontend prototype for a ticketless event entry and queue
management system. Concerts, conferences, church programs, and government
offices often turn into chaotic physical lines — QueueLess replaces that with
digital tickets, QR verification, live queue tracking, and crowd monitoring.

This is a **portfolio-grade UI prototype**: every real-time behavior you see
(queue countdowns, scanner verification, crowd density, live activity) is
simulated entirely on the client. There is no backend, no database, and no
external API.

## Problem

High-attendance events waste time and goodwill on physical queues: attendees
don't know how long they'll wait, staff verify tickets by eye, and organizers
have no live picture of crowding until it's already a problem.

## Key features

- **Digital ticket** — a QR-coded event pass with attendee, event, and queue
  details, styled like a real digital boarding pass.
- **Live queue tracking** — an animated position counter that counts down in
  real time and hands off to a polished "you're next" admission state.
- **QR scanner (staff view)** — a simulated scan → verify → approve → admit
  flow with a realistic camera-style scanning frame.
- **Admin dashboard** — live stat counters, a per-gate crowd density map,
  queue monitoring bars, an entry-rate chart, and a live activity feed.
- **Feedback** — a 5-star rating flow with quick-tag selection after entry.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v4
- [Framer Motion](https://motion.dev) for interaction and page-state animation
- [Recharts](https://recharts.org) for the entry-rate chart
- [qrcode.react](https://github.com/zpao/qrcode.react) for the ticket QR code
- [Lucide React](https://lucide.dev) for icons
- Self-hosted fonts via `@fontsource` (Space Grotesk, Inter, JetBrains Mono) —
  no external font requests at build or runtime

All state is local React state (plus small client-side simulation hooks).
Nothing is persisted; refreshing a page resets its simulation.

## Architecture

```
src/
  app/                 Routes (App Router)
    /                  Landing page
    /ticket            Attendee digital ticket
    /queue             Live queue tracking + admission state
    /scanner           Staff QR scanner flow
    /admin             Admin dashboard
    /feedback          Post-entry feedback
  components/
    ui/                Button, Card, StatusBadge, Dialog, Toast
    nav/               Responsive nav (top nav desktop, bottom tabs mobile)
    ticket-card.tsx, queue-progress.tsx, qr-scanner.tsx,
    crowd-density.tsx, activity-feed.tsx, rating-stars.tsx,
    stat-card.tsx, live-indicator.tsx
  data/event.ts        Centralized mock data (event, attendee, gates, etc.)
  hooks/               Client-side simulation hooks
    use-queue-simulation.ts   Powers the /queue countdown
    use-admin-simulation.ts   Powers gate/activity movement on /admin
  lib/utils.ts          `cn()` class-merging helper
```

## Routes

| Route       | Experience                                   |
| ----------- | --------------------------------------------- |
| `/`         | Landing page with product overview            |
| `/ticket`   | Attendee's digital QR ticket                  |
| `/queue`    | Live queue position and admission state       |
| `/scanner`  | Staff-facing ticket scanner                   |
| `/admin`    | Event admin dashboard                         |
| `/feedback` | Post-entry attendee feedback                  |

## Running locally

Requires Node.js 18.18+ (Node 20+ recommended).

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). No environment
variables, API keys, or external services are required.

```bash
npm run build   # production build
npm run lint    # ESLint
```

## Current limitations

This is a frontend prototype only:

- No real backend, server, or database — all data lives in local React state.
- The "queue," "crowd density," and "live activity" behavior is a client-side
  simulation, not a connection to real attendees or hardware.
- The QR scanner does not use a device camera; scanning is simulated with
  timed state transitions.
- There is no authentication — the app assumes a single demo attendee
  (David Adeyemi) and a single demo event (Lagos Future Tech Summit 2026).
- Nothing persists between page reloads.

## Future improvements

- A real backend with a websocket or SSE feed for genuine live queue state.
- An actual device-camera QR scanner (e.g. via `getUserMedia` + a decoding
  library) for the staff scanner view.
- Authentication and per-attendee ticket issuance.
- Persisted feedback and analytics storage.
- Multi-event support in the admin dashboard.
