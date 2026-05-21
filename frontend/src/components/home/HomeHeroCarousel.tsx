"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import type { Artwork } from "@/lib/types";

const AUTO_MS = 4000;

type Slide = { id: string; src: string; title: string; kicker: string };

const DUMMY_SLIDES: Slide[] = [
  { id: "d1", src: "https://picsum.photos/id/30/1920/640", title: "Gold & silver spotlight", kicker: "Shri Jaganmathe" },
  { id: "d2", src: "https://picsum.photos/id/56/1920/640", title: "Hand-finished details", kicker: "The workshop" },
  { id: "d3", src: "https://picsum.photos/id/201/1920/640", title: "Commissions & collabs", kicker: "By appointment" },
  { id: "d4", src: "https://picsum.photos/id/308/1920/640", title: "New in collection", kicker: "Browse the gallery" },
];

function useSlides(items: Artwork[]): Slide[] {
  return useMemo(() => {
    if (items.length > 0) {
      const fromApi: Slide[] = items.slice(0, 4).map((a) => ({
        id: a._id,
        src: a.imageUrl,
        title: a.title,
        kicker: "From your gallery",
      }));
      if (fromApi.length >= 2) return fromApi;
      return [...fromApi, ...DUMMY_SLIDES].slice(0, 4);
    }
    return DUMMY_SLIDES;
  }, [items]);
}

export function HomeHeroCarousel({ items }: { items: Artwork[] }) {
  const slides = useSlides(items);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0);

  const go = useCallback(
    (next: number, direction: 1 | -1) => {
      setDir(direction);
      setIndex((next + slides.length) % slides.length);
    },
    [slides.length]
  );

  const next = useCallback(() => go(index + 1, 1), [go, index]);
  const prev = useCallback(() => go(index - 1, -1), [go, index]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = window.setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [slides.length, index]);

  const current = slides[index] ?? slides[0];

  return (
    <section className="w-full bg-transparent pt-24 md:pt-28">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        {/* Carousel frame — dark luxury card */}
        <div className="relative overflow-hidden rounded-2xl border border-ab-goldBorder/90 bg-ab-raised shadow-luxury ring-1 ring-ab-gold/[0.14] before:pointer-events-none before:absolute before:inset-x-6 before:top-0 before:z-10 before:h-px before:bg-gradient-to-r before:from-transparent before:via-ab-gold/40 before:to-transparent">
          <div className="relative aspect-[21/8] min-h-[200px] w-full sm:aspect-[16/6] sm:min-h-[240px] md:min-h-[300px] lg:min-h-[360px]">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={current.id}
                custom={dir}
                className="absolute inset-0"
                variants={{
                  enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0.3 }),
                  center: { x: 0, opacity: 1 },
                  exit:  (d: number) => ({ x: d > 0 ? "-45%" : "45%", opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "tween", duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={current.src}
                  alt={current.title}
                  fill
                  priority
                  className="object-cover object-center opacity-90"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
                {/* Dark luxury overlay — left-heavy gradient */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ab-void/90 via-ab-void/50 to-transparent"
                  aria-hidden
                />
                {/* Bottom fade */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ab-void/70 via-transparent to-transparent"
                  aria-hidden
                />

                {/* Slide content */}
                <div className="absolute bottom-0 left-0 top-0 flex max-w-[min(100%,440px)] flex-col justify-end px-6 pb-16 pt-8 md:px-12 md:pb-20">
                  <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-ab-gold/80">
                    {current.kicker}
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-semibold italic leading-tight text-ab-ink drop-shadow sm:text-3xl md:text-4xl">
                    {current.title}
                  </h2>
                  <Link
                    href="/gallery"
                    className="mt-5 inline-flex w-fit items-center rounded-full border border-ab-goldBorder bg-ab-goldDim px-6 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-ab-gold shadow-md transition hover:bg-ab-gold hover:text-ab-void"
                  >
                    Explore
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nav arrows */}
            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ab-goldBorder bg-ab-raised/90 text-ab-gold shadow-md transition hover:bg-ab-gold hover:text-ab-void md:left-5 md:h-11 md:w-11"
                  aria-label="Previous slide"
                >
                  <span className="text-lg leading-none">‹</span>
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ab-goldBorder bg-ab-raised/90 text-ab-gold shadow-md transition hover:bg-ab-gold hover:text-ab-void md:right-5 md:h-11 md:w-11"
                  aria-label="Next slide"
                >
                  <span className="text-lg leading-none">›</span>
                </button>

                {/* Dot indicators */}
                <div className="absolute bottom-4 left-0 right-0 z-10 flex items-center justify-center gap-2">
                  {slides.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => {
                        setDir(i > index ? 1 : -1);
                        setIndex(i);
                      }}
                      className={`h-1 rounded-full transition-all ${
                        i === index
                          ? "w-8 bg-ab-gold"
                          : "w-1.5 bg-ab-muted/50 hover:bg-ab-gold/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
