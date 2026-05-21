"use client";

import { GlassPanel } from "@/components/ui/GlassPanel";

export function IntroStrip() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-14 md:px-8 md:pb-20">
      <div className="grid gap-5 md:grid-cols-3">
        <GlassPanel className="md:col-span-2">
          <p className="text-[10px] uppercase tracking-[0.32em] text-ab-gold">The workshop</p>
          <h2 className="mt-4 font-display text-2xl font-medium italic text-ab-ink md:text-3xl">
            Heritage skill, refined for today&apos;s collector.
          </h2>
          <p className="mt-4 text-sm font-light leading-relaxed text-ab-muted">
            Our workshop bridges classical goldsmithing and thoughtful design — producing objet
            d&apos;art, ceremonial pieces, and architectural metalwork for private clients and partner
            jewellery houses.
          </p>
        </GlassPanel>

        {/* Materials card */}
        <GlassPanel>
          <p className="text-[10px] uppercase tracking-[0.32em] text-ab-muted">Materials</p>
          <ul className="mt-5 space-y-3 text-sm text-ab-ink/90">
            <li className="flex items-center justify-between border-b border-ab-line pb-3">
              <span className="font-light">22k & 18k alloys</span>
              <span className="font-medium text-ab-gold">Gold</span>
            </li>
            <li className="flex items-center justify-between border-b border-ab-line pb-3">
              <span className="font-light">Sterling & fine silver</span>
              <span className="font-medium text-ab-silver">Silver</span>
            </li>
            <li className="flex items-center justify-between pt-1">
              <span className="font-light">Finishes</span>
              <span className="font-light text-ab-muted">Satin · Mirror · Frost</span>
            </li>
          </ul>
        </GlassPanel>
      </div>
    </section>
  );
}
