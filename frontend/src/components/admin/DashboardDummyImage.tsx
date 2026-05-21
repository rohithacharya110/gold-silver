"use client";

import Image from "next/image";

const PLACEHOLDER = "https://picsum.photos/id/201/640/360";

/** Decorative placeholder strip for the admin dashboard when a dedicated asset is not wired. */
export function DashboardDummyImage() {
  return (
    <div className="relative mb-4 h-32 w-full overflow-hidden rounded-lg border border-ab-border bg-ab-line shadow-inner md:h-40">
      <Image
        src={PLACEHOLDER}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 720px"
        priority={false}
      />
    </div>
  );
}
