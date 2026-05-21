import { Suspense } from "react";
import { GalleryClient } from "@/components/gallery/GalleryClient";

export default function GalleryPage() {
  return (
    <Suspense
      fallback={<div className="mx-auto max-w-6xl px-4 pb-28 pt-28 md:px-8 md:pt-32">Loading gallery…</div>}
    >
      <GalleryClient />
    </Suspense>
  );
}
