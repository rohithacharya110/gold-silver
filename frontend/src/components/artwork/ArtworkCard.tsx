"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Artwork } from "@/lib/types";
import { CreeperCorners } from "@/components/brand/CreeperFlourish";

const materialLabel = { gold: "Gold", silver: "Silver" } as const;
const sourceLabel = {
  customer: "Customer order",
  workshop: "Workshop",
} as const;

export function ArtworkCard({
  artwork,
  onOpen,
}: {
  artwork: Artwork;
  onOpen: (a: Artwork) => void;
}) {
  const date = new Date(artwork.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-ab-goldBorder/80 bg-ab-card shadow-luxury transition-[box-shadow,transform] duration-300 hover:border-ab-gold/50 hover:shadow-luxury-glow"
    >
      <CreeperCorners className="text-ab-gold/25" />
      <button
        type="button"
        onClick={() => onOpen(artwork)}
        className="block w-full text-left"
      >
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-ab-raised">
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover opacity-85 transition duration-700 group-hover:scale-[1.05] group-hover:opacity-100"
            priority={false}
          />
          {/* Dark overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ab-void/70 via-transparent to-transparent opacity-90" />

          {/* Material/source badges */}
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-[9px] font-medium uppercase tracking-widest ring-1 ${
                artwork.material === "gold"
                  ? "bg-ab-goldDim text-ab-gold ring-ab-goldBorder"
                  : "bg-ab-silverDim text-ab-silver ring-ab-silver/25"
              }`}
            >
              {materialLabel[artwork.material]}
            </span>
            <span className="rounded-full bg-ab-raised/90 px-2.5 py-1 text-[9px] font-light uppercase tracking-widest text-ab-muted ring-1 ring-ab-border">
              {sourceLabel[artwork.source]}
            </span>
          </div>

          {/* Hover reveal — "View" */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
            <span className="rounded-full border border-ab-goldBorder bg-ab-void/80 px-6 py-2 text-xs uppercase tracking-[0.2em] text-ab-gold backdrop-blur-sm">
              View
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="space-y-2 p-5">
          <h3 className="font-display text-lg font-medium text-ab-ink group-hover:text-ab-gold transition">
            {artwork.title}
          </h3>
          <p className="line-clamp-2 text-sm font-light text-ab-muted">
            {artwork.description || "—"}
          </p>
          <p className="text-[10px] uppercase tracking-widest text-ab-dim font-mono">{date}</p>
        </div>
      </button>
    </motion.article>
  );
}
