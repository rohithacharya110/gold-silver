"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CreeperDivider } from "@/components/brand/CreeperFlourish";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-10 md:px-8 md:pb-24 md:pt-16">
      {/* Ambient orbs */}
      <div className="orb-gold pointer-events-none absolute -left-40 -top-20 h-[500px] w-[500px]" />
      <div className="orb-crimson pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <div className="h-px w-10 bg-ab-gold/60" />
          <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-ab-gold">
            Gold & Silver Artwork Workshop
          </p>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.06 }}
          className="mt-8 max-w-3xl font-display text-[2.125rem] font-semibold italic leading-[1.12] tracking-[-0.02em] text-ab-ink sm:text-5xl md:text-6xl md:leading-[1.06]"
        >
          Timeless craft in{" "}
          <span className="gold-shimmer not-italic">gold and silver</span>
          {" "}— made for you.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.14 }}
          className="mt-7 max-w-xl text-base font-light leading-relaxed text-ab-muted md:text-lg"
        >
          From personal commissions to workshop collaborations, each piece is finished with care,
          tradition, and a jeweller&apos;s eye for detail.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <Link
            href="/gallery"
            className="group relative overflow-hidden rounded-full border border-ab-goldBorder bg-gradient-to-b from-ab-gold to-ab-goldMid px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-ab-void shadow-temple-gold transition hover:shadow-[0_12px_40px_rgba(201,168,76,0.3)]"
          >
            <span className="relative z-10">View gallery</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-ab-border bg-ab-raised/80 px-9 py-3.5 text-sm font-light uppercase tracking-[0.16em] text-ab-ink shadow-sm backdrop-blur-sm transition hover:border-ab-goldBorder hover:text-ab-gold"
          >
            Commission
          </Link>
        </motion.div>

        <CreeperDivider className="mt-16 text-ab-gold/50" />
      </div>
    </section>
  );
}
