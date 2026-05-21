import type { Metadata } from "next";
import { Suspense } from "react";
import { Cormorant_Garamond, Cinzel, Jost, DM_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CreeperUnderlay } from "@/components/brand/CreeperFlourish";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const brand = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-brand",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "SHRI JAGANMATHE — Gold & Silver Artwork",
  description:
    "SHRI JAGANMATHE — Gold & Silver Artwork Workshop. Explore the gallery, commissions, and workshop collaborations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${display.variable} ${brand.variable} ${body.variable} ${mono.variable} min-h-screen ab-wallpaper font-sans text-ab-ink antialiased`}
      >
        <Providers>
          <div className="relative isolate min-h-screen">
            <CreeperUnderlay />
            {/* Cinematic edge vignette — depth without clutter */}
            <div
              className="pointer-events-none fixed inset-0 z-[1] shadow-[inset_0_0_160px_rgba(0,0,0,0.65)]"
              aria-hidden
            />
            <div
              className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_100%_80%_at_50%_100%,rgba(4,4,10,0.55),transparent_62%)]"
              aria-hidden
            />
            <Suspense fallback={<div className="h-14 border-b border-ab-goldBorder/50 bg-ab-deep/90 md:h-[72px]" />}>
              <SiteHeader />
            </Suspense>
            <main className="relative z-10">{children}</main>
            <div className="relative z-10">
              <SiteFooter />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
