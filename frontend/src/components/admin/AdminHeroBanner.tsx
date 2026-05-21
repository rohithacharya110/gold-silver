"use client";

import Image from "next/image";
import { useMemo } from "react";
import { motion } from "framer-motion";
import type { Artwork } from "@/lib/types";

/** Hero fallback when the library is empty (Picsum — stable, unlike many Unsplash hotlinks) */
const FALLBACK_HERO = "https://picsum.photos/id/30/2000/1200";

type AdminHeroBannerProps = {
  artworks: Artwork[];
  onLogout: () => void;
};

export function AdminHeroBanner({ artworks, onLogout }: AdminHeroBannerProps) {
  const heroSrc = useMemo(() => artworks[0]?.imageUrl ?? FALLBACK_HERO, [artworks]);

  return (
    <section className="relative mt-20 w-full overflow-hidden bg-gradient-to-b from-[#1a0a0c] to-[#0f0808] md:mt-24">
      <div className="relative h-[min(52vh,520px)] w-full md:h-[min(56vh,560px)]">
        <motion.div
          className="absolute inset-y-0 w-[125%] max-w-none will-change-transform"
          style={{ left: "-12.5%" }}
          initial={false}
          animate={{ x: ["8%", "-8%"] }}
          transition={{
            duration: 36,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <Image
            src={heroSrc}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25"
          aria-hidden
        />

        <div className="absolute left-5 top-5 md:left-8 md:top-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 font-display text-sm font-semibold tracking-tight text-white backdrop-blur-sm md:h-14 md:w-14 md:text-base">
            SJ
          </div>
        </div>

        <div className="absolute right-5 top-5 md:right-8 md:top-8">
          <button
            type="button"
            onClick={onLogout}
            className="rounded-md border border-white/40 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            Log out
          </button>
        </div>

        <div className="absolute bottom-10 right-6 text-right md:bottom-14 md:right-16">
          <p className="font-display text-4xl leading-[0.95] text-[#d4af37] drop-shadow-md md:text-6xl md:leading-[0.95]">
            SHRI
            <br />
            JAGANMATHE
          </p>
          <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.38em] text-white/95 md:text-xs">
            Gold & Silver Artwork
          </p>
        </div>
      </div>
    </section>
  );
}
