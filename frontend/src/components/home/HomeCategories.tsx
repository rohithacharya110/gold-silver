import Image from "next/image";
import Link from "next/link";
import type { Artwork } from "@/lib/types";

const GOLD_IMG =
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80";
const COMM_IMG =
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4fb8?w=800&q=80";
const SILV_IMG =
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80";

export function HomeCategories({ artworks }: { artworks: Artwork[] }) {
  const uploads = artworks.filter((a) => a.material === "gold" || a.material === "silver");
  const goldHero = uploads.find((a) => a.material === "gold");
  const silverHero = uploads.find((a) => a.material === "silver");
  const customerHero = uploads.find((a) => a.source === "customer") ?? uploads[0];

  return (
    <section id="collection" className="scroll-mt-28 bg-ab-charcoal px-5 py-[4.5rem] md:px-[8vw] md:py-[7rem]">
      <header className="mb-10 text-center md:mb-12">
        <p className="mb-5 flex items-center justify-center gap-6 font-sans text-[0.62rem] font-light uppercase tracking-[0.45em] text-ab-gold">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-ab-gold" />
          Our collection
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-ab-gold" />
        </p>
        <h2 className="font-display text-[clamp(2rem,4vw,4rem)] font-light leading-tight tracking-tight text-ab-ink">
          Crafted in <em className="text-ab-goldSoft not-italic">gold & silver</em>
        </h2>
      </header>

      {uploads.length === 0 ? (
        <div className="mb-14 rounded-2xl border border-ab-border/80 bg-ab-obsidian/60 px-6 py-14 text-center md:mb-16">
          <p className="font-sans text-sm font-light text-ab-muted">
            No workshop photos yet. Sign in to the admin dashboard to upload gold and silver pieces — they will appear
            here automatically.
          </p>
          <Link
            href="/gallery"
            className="mt-6 inline-block font-sans text-[0.68rem] font-light uppercase tracking-[0.24em] text-ab-gold hover:text-ab-goldSoft"
          >
            View gallery →
          </Link>
        </div>
      ) : (
        <div className="mb-14 grid grid-cols-2 gap-px sm:grid-cols-3 md:mb-16 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 md:gap-0.5">
          {uploads.map((a) => (
            <Link
              key={a._id}
              href="/gallery"
              className="group relative isolate aspect-[4/3] overflow-hidden outline-none ring-ab-gold/30 focus-visible:ring-2"
            >
              <Image
                src={a.imageUrl}
                alt={a.title}
                fill
                className="object-cover transition duration-[600ms] group-hover:scale-[1.04]"
                sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 18vw"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ab-charcoal/70 via-transparent to-transparent opacity-90"
                aria-hidden
              />
              {/* Right-to-left gold sheen sweep on hover */}
              <div
                className="pointer-events-none absolute inset-0 translate-x-full bg-gradient-to-l from-transparent via-ab-gold/30 to-transparent transition-transform duration-700 ease-out group-hover:-translate-x-full"
                aria-hidden
              />
              <span
                className={`pointer-events-none absolute bottom-3 left-3 rounded px-2 py-0.5 font-sans text-[0.55rem] uppercase tracking-[0.2em] ${
                  a.material === "gold"
                    ? "bg-ab-gold/20 text-ab-goldSoft"
                    : "bg-ab-silverDim text-ab-silverMid"
                }`}
              >
                {a.material === "gold" ? "Gold" : "Silver"}
              </span>
            </Link>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-[2px] md:grid-cols-2 md:grid-rows-2">
        <Link
          href="/gallery?material=gold"
          className="group relative isolate min-h-[420px] overflow-hidden md:row-span-2 md:min-h-[1046px]"
        >
          <div className="absolute inset-0">
            <Image
              src={goldHero?.imageUrl ?? GOLD_IMG}
              alt={goldHero?.title ?? "Gold works"}
              fill
              className="object-cover transition duration-[700ms] group-hover:scale-105"
              sizes="(max-width:768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-ab-gold/20 via-ab-obsidian/50 to-ab-obsidian/85" />
            <div className="absolute inset-0 bg-gradient-to-t from-ab-obsidian/95 via-ab-obsidian/25 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
            <p className="mb-3 flex items-center gap-3 font-sans text-[0.58rem] uppercase tracking-[0.35em] text-ab-gold">
              <span className="h-px w-5 bg-ab-gold" />
              Au · 24K
            </p>
            <h3 className="font-display text-3xl font-light leading-tight text-ab-ink transition group-hover:text-ab-goldSoft md:text-[2.35rem]">
              Gold works
            </h3>
            <p className="mt-3 max-w-[340px] font-sans text-sm font-light leading-[1.7] text-ab-muted">
              Luminous gold — from delicate filigree to bold statement pieces.
            </p>
          </div>
          <span className="pointer-events-none absolute right-10 top-10 flex h-11 w-11 items-center justify-center rounded-full border border-ab-gold/30 text-ab-gold opacity-0 transition duration-300 group-hover:opacity-100 group-hover:scale-105">
            →
          </span>
        </Link>

        <Link href="/gallery?source=customer" className="group relative isolate min-h-[420px] overflow-hidden md:min-h-[520px]">
          <div className="absolute inset-0">
            <Image
              src={customerHero?.imageUrl ?? COMM_IMG}
              alt={customerHero?.title ?? "Customer commissions"}
              fill
              className="object-cover transition duration-[700ms] group-hover:scale-105"
              sizes="(max-width:768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ab-obsidian/95 via-ab-obsidian/35 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
            <p className="mb-3 flex items-center gap-3 font-sans text-[0.58rem] uppercase tracking-[0.35em] text-ab-gold">
              <span className="h-px w-5 bg-ab-gold" />
              Bespoke
            </p>
            <h3 className="font-display text-3xl font-light leading-tight text-ab-ink transition group-hover:text-ab-goldSoft md:text-[2.15rem]">
              Customer commissions
            </h3>
            <p className="mt-3 max-w-[340px] font-sans text-sm font-light leading-[1.7] text-ab-muted">
              Pieces born from personal briefs — made to become family treasures.
            </p>
          </div>
          <span className="pointer-events-none absolute right-10 top-10 flex h-11 w-11 items-center justify-center rounded-full border border-ab-gold/30 text-ab-gold opacity-0 transition duration-300 group-hover:opacity-100 group-hover:scale-105">
            →
          </span>
        </Link>

        <Link href="/gallery?material=silver" className="group relative isolate min-h-[420px] overflow-hidden md:min-h-[520px]">
          <div className="absolute inset-0">
            <Image
              src={silverHero?.imageUrl ?? SILV_IMG}
              alt={silverHero?.title ?? "Silver artistry"}
              fill
              className="object-cover transition duration-[700ms] group-hover:scale-105"
              sizes="(max-width:768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ab-obsidian/95 via-ab-obsidian/35 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
            <p className="mb-3 flex items-center gap-3 font-sans text-[0.58rem] uppercase tracking-[0.35em] text-ab-gold">
              <span className="h-px w-5 bg-ab-gold" />
              Ag · sterling
            </p>
            <h3 className="font-display text-3xl font-light leading-tight text-ab-ink transition group-hover:text-ab-goldSoft md:text-[2.15rem]">
              Silver artistry
            </h3>
            <p className="mt-3 max-w-[340px] font-sans text-sm font-light leading-[1.7] text-ab-muted">
              Cool luminescence of sterling silver, shaped into enduring elegance.
            </p>
          </div>
          <span className="pointer-events-none absolute right-10 top-10 flex h-11 w-11 items-center justify-center rounded-full border border-ab-gold/30 text-ab-gold opacity-0 transition duration-300 group-hover:opacity-100 group-hover:scale-105">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
