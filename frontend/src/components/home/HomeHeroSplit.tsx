"use client";

import Link from "next/link";

export function HomeHeroSplit() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden lg:grid lg:grid-cols-2">
      {/* Left — copy */}
      <div className="relative z-[2] flex flex-col justify-center px-6 pb-16 pt-28 sm:px-10 sm:pb-24 sm:pl-[10vw] sm:pr-12 md:pt-32 lg:min-h-[100svh] lg:py-[12vh]">
        <p className="mb-8 flex items-center gap-4 font-sans text-[0.65rem] font-light uppercase tracking-[0.45em] text-ab-gold sm:mb-10">
          <span className="h-px w-10 shrink-0 bg-ab-gold" aria-hidden />
          Est. traditions · contemporary craft
        </p>

        <h1 className="font-display text-[clamp(3rem,7vw,5.75rem)] font-light leading-none tracking-tight text-ab-ink">
          Where metal
          <br />
          becomes <em className="text-ab-goldSoft not-italic">legend</em>
        </h1>

        <p className="mt-8 max-w-[400px] font-sans text-[0.9rem] font-light leading-[1.9] text-ab-muted">
          A curated workshop of handcrafted gold and silver — each piece a testament to the goldsmith&apos;s craft,
          refined for discerning collectors.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-5 sm:mt-14 sm:gap-6">
          <Link
            href="/gallery"
            className="inline-block bg-ab-gold px-9 py-[1.05rem] font-sans text-[0.72rem] font-normal uppercase tracking-[0.22em] text-ab-void transition hover:bg-ab-goldSoft"
          >
            Explore collection
          </Link>
          <a
            href="#collection"
            className="group flex items-center gap-3 font-sans text-[0.72rem] font-light uppercase tracking-[0.22em] text-ab-muted transition hover:text-ab-goldSoft"
          >
            <span className="relative flex h-[1px] w-7 shrink-0 items-center bg-current after:absolute after:right-0 after:top-[50%] after:h-[7px] after:w-[7px] after:-translate-y-1/2 after:border-r after:border-t after:border-current after:content-['']" />
            Our story
          </a>
        </div>

        <div className="relative mt-14 flex items-center gap-4 pb-4 font-sans text-[0.62rem] uppercase tracking-[0.3em] text-ab-muted opacity-70 sm:absolute sm:bottom-10 sm:left-[10vw] sm:mt-0 lg:relative lg:bottom-auto lg:left-auto lg:mt-20">
          <div
            className="origin-top h-[50px] w-px animate-scroll-line bg-gradient-to-b from-ab-gold to-transparent"
            aria-hidden
          />
          Scroll
        </div>
      </div>

      {/* Right — decorative rings + monogram + badge */}
      <div className="relative min-h-[45vh] overflow-hidden bg-ab-obsidian lg:min-h-[100svh]">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ab-gold/[0.08] via-transparent to-transparent bg-[length:100%_100%] [background-image:linear-gradient(135deg,rgba(201,168,76,0.08)_0%,transparent_60%),linear-gradient(to_right,#0a0a0a_0%,transparent_30%),radial-gradient(ellipse_at_70%_40%,rgba(201,168,76,0.12)_0%,transparent_60%)]">
          {/* Spinning rings */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ab-gold/[0.18] animate-[spin_40s_linear_infinite]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[580px] w-[580px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ab-gold/[0.12] animate-[spin_60s_linear_infinite_reverse]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-ab-gold/[0.1] opacity-50 animate-[spin_55s_linear_infinite]" />

          <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-brand text-[clamp(6rem,16vw,9rem)] font-semibold leading-none text-ab-gold/[0.06]">
            SJ
          </span>

          <div className="relative z-[3] mx-auto flex h-[220px] w-[220px] shrink-0 flex-col items-center justify-center gap-1 rounded-full border border-ab-gold/30 bg-[conic-gradient(from_0deg,rgba(201,168,76,0.15),rgba(201,168,76,0.05),rgba(201,168,76,0.15))]">
            <span className="font-brand text-[0.6rem] uppercase tracking-[0.35em] text-ab-gold">Curated</span>
            <span className="font-display text-[3.5rem] leading-none text-ab-goldSoft">∞</span>
            <span className="font-sans text-[0.58rem] font-light uppercase tracking-[0.3em] text-ab-muted">
              Masterworks
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
