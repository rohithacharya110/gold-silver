"use client";

import Image from "next/image";
import { useMemo, type CSSProperties } from "react";
import type { Artwork } from "@/lib/types";

type Slide = { key: string; src: string | null; alt: string };

export function DashboardMarquee({ artworks }: { artworks: Artwork[] }) {
  const slides: Slide[] = useMemo(() => {
    if (artworks.length === 0) {
      return Array.from({ length: 10 }, (_, i) => ({
        key: `placeholder-${i}`,
        src: null,
        alt: "",
      }));
    }
    return artworks.map((a) => ({
      key: a._id,
      src: a.imageUrl,
      alt: a.title,
    }));
  }, [artworks]);

  const loop = [...slides, ...slides];
  const durationSec = Math.max(18, Math.min(56, slides.length * 3.2));

  return (
    <div className="mb-10 overflow-hidden rounded-2xl border-2 border-ab-gold/25 bg-ab-card/90 shadow-temple">
      <div
        className="flex w-max gap-3 py-3 pl-3 animate-marquee-dashboard"
        style={
          {
            "--marquee-duration": `${durationSec}s`,
          } as CSSProperties
        }
      >
        {loop.map((s, i) => (
          <div
            key={`${s.key}-${i}`}
            className="relative h-24 w-36 shrink-0 overflow-hidden rounded-lg border border-ab-border bg-ab-card shadow-sm md:h-28 md:w-44"
          >
            {s.src ? (
              <Image src={s.src} alt={s.alt} fill className="object-cover" sizes="176px" />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-ab-line to-ab-border px-2 text-center">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-ab-muted">
                  Gallery
                </span>
                <span className="mt-1 text-[9px] text-ab-muted/80">Add pieces to preview</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
