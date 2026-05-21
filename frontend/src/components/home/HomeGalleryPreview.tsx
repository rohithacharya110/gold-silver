"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Artwork, Material } from "@/lib/types";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { Lightbox } from "@/components/artwork/Lightbox";

type Filter = "all" | Material;

export function HomeGalleryPreview({ items }: { items: Artwork[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<Artwork | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((a) => a.material === filter);
  }, [items, filter]);

  const chips: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "gold", label: "Gold" },
    { id: "silver", label: "Silver" },
  ];

  return (
    <section id="gallery-preview" className="scroll-mt-28 bg-ab-graphite px-5 py-[4.5rem] md:px-[8vw] md:py-[7rem]">
      <header className="mb-14 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-5 flex items-center gap-4 font-sans text-[0.62rem] font-light uppercase tracking-[0.45em] text-ab-gold">
            <span className="h-px w-10 bg-ab-gold" />
            Curated works
          </p>
          <h2 className="font-display text-[clamp(2rem,3.5vw,3.25rem)] font-light leading-tight tracking-tight text-ab-ink">
            From the <em className="text-ab-goldSoft not-italic">gallery</em>
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {chips.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilter(c.id)}
              className={`rounded-full border px-5 py-2.5 font-sans text-[0.62rem] uppercase tracking-[0.22em] transition ${
                filter === c.id
                  ? "border-ab-gold bg-ab-gold/15 text-ab-goldSoft"
                  : "border-ab-border bg-ab-void/40 text-ab-muted hover:border-ab-gold/40 hover:text-ab-ink"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </header>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-ab-goldBorder/60 bg-ab-charcoal/80 p-12 text-center text-sm font-light text-ab-muted">
          No pieces to show yet. Visit the admin dashboard to publish works.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, 6).map((a) => (
            <ArtworkCard key={a._id} artwork={a} onOpen={setActive} />
          ))}
        </div>
      )}

      <div className="mt-14 flex justify-center border-t border-ab-gold/[0.12] pt-10">
        <Link
          href="/gallery"
          className="group inline-flex items-center gap-3 font-sans text-[0.68rem] font-light uppercase tracking-[0.28em] text-ab-gold transition hover:text-ab-goldSoft"
        >
          View full gallery
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      <Lightbox artwork={active} onClose={() => setActive(null)} />
    </section>
  );
}
