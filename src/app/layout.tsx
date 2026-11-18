import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteFooter, SiteHeader } from "@/components/library/site-chrome";
import { TimerRuntime } from "@/components/focus/timer-runtime";
import { FloatingPomodoro } from "@/components/focus/floating-pomodoro";
import { getFirstBookId } from "@/lib/library-db";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "LockIn Library — Digital Learning Platform",
    template: "%s",
  },
  description:
    "A growing library of complete digital textbooks across every major field of knowledge — from absolute zero to mastery, with derivations, figures, worked examples and graded exercises.",
  keywords: ["textbooks", "learning", "mathematics", "education", "digital library"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* first book of the first shelf — the footer glossary link target.
   * Served from the content database; graceful fallback when the pack
   * is not present yet (e.g. a fresh clone before `bun run lib:pack`). */
  let firstBookId: string | undefined;
  try {
    firstBookId = (await getFirstBookId()) ?? undefined;
  } catch {
    firstBookId = undefined;
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter firstBookId={firstBookId} />
          </div>
          {/* the pomodoro runtime (the bell rings on every page) before the
           * floating icon that reads it — one runtime, one view, one bus */}
          <TimerRuntime />
          <FloatingPomodoro />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
