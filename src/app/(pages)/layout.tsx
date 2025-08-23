/*
 * Blue Flame's Honors Society Point Manager
 * Copyright (C) 2025 Blue Flame
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import { pickPrimary, pickForeground } from "../pick-theme";

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
    default: "Untitled Page",
    template: `%s | ${process.env.APPLICATION_NAME ?? "Honors Society Point Manager"}`,
  },
  description: "Blue Flame's Honors Society Point Manager",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/favicon.ico" },
    { rel: "icon", url: "/favicon.ico" },
  ],
  manifest: process.env.FAVICON_IMAGE,
  appleWebApp: {
    title: `${process.env.APPLICATION_NAME ?? "Honors Society Point Manager"}`,
    statusBarStyle: "black-translucent",
    capable: true,
    startupImage: process.env.FAVICON_IMAGE,
  },
  metadataBase: new URL(process.env.BASE_URL ?? ""),
  openGraph: {
    title: `${process.env.APPLICATION_NAME ?? "Honors Society Point Manager"}`,
    description: "Blue Flame's Honors Society Point Manager",
    url: process.env.BASE_URL,
    siteName: process.env.APPLICATION_NAME,
    images: [
      {
        url: process.env.FAVICON_IMAGE ?? "",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${process.env.APPLICATION_NAME ?? "Honors Society Point Manager"}`,
    description: "Blue Flame's Honors Society Point Manager",
    images: [process.env.FAVICON_IMAGE ?? ""],
    creator: "@catalyst",
    site: "@catalyst",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={
        {
          "--ui-primary": pickPrimary(process.env.COLOR_THEME ?? "red"),
          "--ui-foreground": pickForeground(process.env.COLOR_THEME ?? "red"),
        } as React.CSSProperties
      }
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gradient-to-br from-[color-mix(in_oklch,var(--background),black_10%)] to-[color-mix(in_oklch,var(--background),white_10%)] bg-fixed bg-center antialiased`}
      >
        <div className="relative mx-auto flex h-screen max-w-[100ch] flex-col gap-2 p-8">
          {children}
          <Toaster richColors position="bottom-right" />
        </div>
        <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
          <div className="absolute top-full left-1/2 -z-10 size-[25rem] -translate-x-1/2 bg-[var(--ui-primary)] blur-[15rem]" />
        </div>
      </body>
    </html>
  );
}
