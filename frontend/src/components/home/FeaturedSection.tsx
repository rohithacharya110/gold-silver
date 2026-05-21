"use client";

import Link from "next/link";
import { useState } from "react";
import type { Artwork } from "@/lib/types";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { Lightbox } from "@/components/artwork/Lightbox";
import { CreeperDivider } from "@/components/brand/CreeperFlourish";

export function FeaturedSection({ items }: { items: Artwork[] }) {
  const [active, setActive] = useState<Artwork | null>(null);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-20">
      <CreeperDivider className="mb-10 text-ab-gold/40" />

      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-px w-6 bg-ab-gold/60" />
            <p className="text-[10px] uppercase tracking-[0.34em] text-ab-muted">Curated</p>
          </div>
          <h2 className="mt-4 font-display text-3xl font-semibold italic tracking-[-0.02em] text-ab-ink md:text-4xl">
            Featured works
          </h2>
        </div>
        <Link
          href="/gallery"
          className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ab-muted transition hover:text-ab-gold"
        >
          Explore all
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="rounded-2xl border border-ab-goldBorder/80 bg-ab-card/90 p-10 text-center text-sm font-light leading-relaxed text-ab-muted shadow-luxury">
          No artworks yet. Sign in to the admin dashboard to publish your first piece.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => (
            <ArtworkCard key={a._id} artwork={a} onOpen={setActive} />
          ))}
        </div>
      )}

      <Lightbox artwork={active} onClose={() => setActive(null)} />
    </section>
  );
}
