import type { Metadata, Viewport } from "next";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "./globals.css";
import { NavBar } from "@/components/nav/nav-bar";
import { ToastProvider } from "@/components/ui/toast";
import { MotionConfig } from "framer-motion";

export const metadata: Metadata = {
  title: "QueueLess — Skip the queue. Keep moving.",
  description:
    "Digital tickets, live queue tracking, and smarter event entry — built to keep crowds moving.",
};

export const viewport: Viewport = {
  themeColor: "#0a0c11",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg text-text-primary">
        <MotionConfig reducedMotion="user">
          <ToastProvider>
            <NavBar />
            <main className="flex-1 flex flex-col">{children}</main>
          </ToastProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
