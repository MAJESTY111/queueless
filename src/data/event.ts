export const event = {
  name: "Lagos Future Tech Summit 2026",
  venue: "Landmark Event Centre, Lagos",
  date: "Saturday, September 19, 2026",
  time: "9:00 AM",
  status: "LIVE" as const,
};

export const attendee = {
  name: "David Adeyemi",
  ticketType: "GENERAL ADMISSION",
  queueNumber: "A-247",
  gate: "Gate A",
};

export type Gate = {
  id: string;
  label: string;
  waiting: number;
  status: "Normal" | "Busy" | "High";
  nowServing: string;
};

export const gates: Gate[] = [
  { id: "gate-a", label: "Gate A", waiting: 18, status: "Normal", nowServing: "A-229" },
  { id: "gate-b", label: "Gate B", waiting: 42, status: "Busy", nowServing: "B-118" },
  { id: "gate-c", label: "Gate C", waiting: 71, status: "High", nowServing: "C-084" },
];

export const dashboardStats = {
  totalTickets: 1284,
  waiting: 184,
  inside: 1100,
  avgWaitMinutes: 12,
};

export const entryRate = [
  { time: "8 AM", admitted: 120 },
  { time: "9 AM", admitted: 260 },
  { time: "10 AM", admitted: 410 },
  { time: "11 AM", admitted: 620 },
  { time: "12 PM", admitted: 780 },
  { time: "1 PM", admitted: 940 },
  { time: "2 PM", admitted: 1100 },
];

export const attendeePool = [
  "Amaka Johnson",
  "Michael Okoro",
  "Sarah Williams",
  "Chidi Nwosu",
  "Bisi Adebayo",
  "Tunde Bakare",
  "Ngozi Eze",
  "Femi Alabi",
  "Kemi Ade",
  "Ifeoma Chukwu",
  "Segun Ogunleye",
  "Yetunde Balogun",
  "Emeka Obi",
  "Halima Bello",
  "Chinedu Okafor",
];

export type ActivityEvent = {
  id: string;
  time: string;
  name: string;
  action: "Ticket verified" | "Entered event";
  gate: string;
};

export const initialActivity: ActivityEvent[] = [
  { id: "a1", time: "09:42", name: "David Adeyemi", action: "Ticket verified", gate: "Gate A" },
  { id: "a2", time: "09:41", name: "Amaka Johnson", action: "Ticket verified", gate: "Gate B" },
  { id: "a3", time: "09:40", name: "Michael Okoro", action: "Entered event", gate: "Gate A" },
  { id: "a4", time: "09:38", name: "Sarah Williams", action: "Ticket verified", gate: "Gate C" },
];

export const feedbackTags = [
  "Fast entry",
  "Easy to use",
  "Clear instructions",
  "Too much waiting",
  "Scanner issue",
  "Confusing queue",
];
