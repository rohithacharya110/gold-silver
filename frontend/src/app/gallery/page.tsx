import type { Metadata } from "next";
import { Suspense } from "react";
import { GalleryClient } from "@/components/gallery/GalleryClient";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery — Gold & Silver Artwork",
  description:
    "Browse the SHRI JAGANMATHE gallery — Jaganmathe gold and silver artwork, handcrafted gold works, silver pieces, and customer commissions from Udupi.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: `Gallery | ${siteName} — Jaganmathe Gold and Silver Artwork`,
    description:
      "Handcrafted gold and silver artwork from Shri Jaganmathe workshop in Udupi, Karnataka.",
    url: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <Suspense
      fallback={<div className="mx-auto max-w-6xl px-4 pb-28 pt-28 md:px-8 md:pt-32">Loading gallery…</div>}
    >
      <GalleryClient />
    </Suspense>
  );
}
