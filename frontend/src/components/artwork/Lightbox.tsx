"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { Artwork } from "@/lib/types";

const materialLabel = { gold: "Gold", silver: "Silver" } as const;
const sourceLabel = {
  customer: "Customer direct order",
  workshop: "Jewellery workshop",
} as const;

export function Lightbox({
  artwork,
  onClose,
}: {
  artwork: Artwork | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!artwork) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [artwork, onClose]);

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ab-ink/75 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-ab-border bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full border border-ab-border bg-ab-card px-3 py-1 text-sm text-ab-ink shadow-sm transition hover:border-ab-brand/40 hover:text-ab-brand"
            >
              Close
            </button>
            <div className="grid max-h-[90vh] md:grid-cols-2">
              <div className="relative min-h-[280px] bg-neutral-100 md:min-h-[420px]">
                <Image
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  fill
                  className="object-contain"
                  sizes="(max-width:768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="flex flex-col gap-4 overflow-y-auto border-t border-ab-border p-6 md:border-l md:border-t-0 md:p-8">
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ring-1 ${
                      artwork.material === "gold"
                        ? "bg-amber-50 text-ab-gold ring-ab-gold/35"
                        : "bg-slate-100 text-slate-700 ring-slate-300/70"
                    }`}
                  >
                    {materialLabel[artwork.material]}
                  </span>
                  <span className="rounded-full bg-neutral-50 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-ab-muted ring-1 ring-ab-border">
                    {sourceLabel[artwork.source]}
                  </span>
                </div>
                <h2 className="font-display text-2xl text-ab-ink md:text-3xl">{artwork.title}</h2>
                <p className="text-sm leading-relaxed text-ab-muted">{artwork.description}</p>
                <p className="text-xs uppercase tracking-widest text-ab-muted/80">
                  {new Date(artwork.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
