"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Download, ScanLine, Settings, Ticket, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";
import { LiveIndicator } from "@/components/live-indicator";
import { StatCard } from "@/components/stat-card";
import { CrowdDensity } from "@/components/crowd-density";
import { ActivityFeed } from "@/components/activity-feed";
import { StatusBadge, statusTone } from "@/components/ui/status-badge";
import { useAdminSimulation } from "@/hooks/use-admin-simulation";
import { dashboardStats, entryRate, event } from "@/data/event";

export default function AdminPage() {
  const { gates, activity, inside, waiting } = useAdminSimulation();
  const router = useRouter();
  const toast = useToast();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-5 pb-24 pt-8 sm:px-6 sm:pb-16 sm:pt-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-semibold tracking-tight">Event Overview</h1>
            <LiveIndicator label={event.status} />
          </div>
          <p className="mt-1 text-sm text-text-secondary">{event.name}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" onClick={() => router.push("/scanner")}>
            <ScanLine className="h-4 w-4" strokeWidth={2} />
            Open Scanner
          </Button>
          <Button variant="secondary" size="sm" onClick={() => router.push("/queue")}>
            <Users className="h-4 w-4" strokeWidth={2} />
            View Queue
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setSettingsOpen(true)}>
            <Settings className="h-4 w-4" strokeWidth={2} />
            Settings
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => toast("Report exported to Downloads")}
          >
            <Download className="h-4 w-4" strokeWidth={2} />
            Export
          </Button>
        </div>
      </div>

      <Dialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        title="Event Settings"
        description="Configuration for this demo event."
      >
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between rounded-lg border border-border-soft bg-surface-2/50 px-3.5 py-2.5">
            <span className="text-text-secondary">Event name</span>
            <span className="font-medium text-text-primary">{event.name}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border-soft bg-surface-2/50 px-3.5 py-2.5">
            <span className="text-text-secondary">Gates active</span>
            <span className="font-medium text-text-primary">3</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border-soft bg-surface-2/50 px-3.5 py-2.5">
            <span className="text-text-secondary">Entry mode</span>
            <span className="font-medium text-text-primary">QR verification</span>
          </div>
        </div>
        <Button className="mt-5 w-full" onClick={() => setSettingsOpen(false)}>
          Done
        </Button>
      </Dialog>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Tickets" value={dashboardStats.totalTickets} icon={Ticket} tone="signal" />
        <StatCard label="Waiting" value={waiting} icon={Users} />
        <StatCard label="Inside" value={inside} icon={TrendingUp} />
        <StatCard label="Avg. Wait" value={dashboardStats.avgWaitMinutes} suffix="min" icon={TrendingUp} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Main column */}
        <div className="flex flex-col gap-6">
          <Card className="p-5 sm:p-6">
            <CardTitle>Crowd Density</CardTitle>
            <CardDescription className="mt-1">Live attendee concentration per gate</CardDescription>
            <div className="mt-5">
              <CrowdDensity gates={gates} />
            </div>
          </Card>

          <Card className="p-5 sm:p-6">
            <CardTitle>Queue Monitoring</CardTitle>
            <CardDescription className="mt-1">Waiting attendees by gate</CardDescription>
            <div className="mt-5 flex flex-col gap-4">
              {gates.map((gate) => (
                <div key={gate.id}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium">{gate.label}</span>
                    <span className="flex items-center gap-2 text-text-secondary">
                      <span className="font-mono tabular-nums">{gate.waiting} waiting</span>
                      <StatusBadge tone={statusTone(gate.status)}>{gate.status}</StatusBadge>
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-surface-3">
                    <div
                      className="h-full rounded-full bg-signal transition-all duration-1000 ease-out"
                      style={{ width: `${Math.min(100, (gate.waiting / 90) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5 sm:p-6">
            <CardTitle>Entry Rate</CardTitle>
            <CardDescription className="mt-1">Attendees admitted over time</CardDescription>
            <div className="mt-4 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={entryRate} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="entryFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--signal)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--signal)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="time"
                    stroke="var(--text-tertiary)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                      borderRadius: 10,
                      fontSize: 13,
                      color: "var(--text-primary)",
                    }}
                    labelStyle={{ color: "var(--text-secondary)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="admitted"
                    stroke="var(--signal)"
                    strokeWidth={2.5}
                    fill="url(#entryFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <CardTitle>Live Activity</CardTitle>
              <LiveIndicator />
            </div>
            <div className="mt-3">
              <ActivityFeed events={activity} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
