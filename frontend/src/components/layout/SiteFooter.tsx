import Link from "next/link";
import { CreeperDivider } from "@/components/brand/CreeperFlourish";
import { BrandLogo } from "@/components/brand/BrandLogo";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-ab-goldBorder bg-gradient-to-b from-ab-surface to-ab-void text-ab-ink">
      {/* Top shimmer line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-ab-gold/50 to-transparent" />

      <CreeperDivider className="text-ab-gold/40" />

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 md:flex-row md:items-start md:justify-between md:px-8">
        {/* Brand block */}
        <div className="flex max-w-md flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          <div className="shrink-0">
            <BrandLogo imgClassName="h-16 w-auto object-contain opacity-90 sm:h-20" />
          </div>
          <div>
            <p className="font-display text-sm tracking-[0.2em] text-ab-gold">SHRI JAGANMATHE</p>
            <p className="mt-1 text-[10px] font-light uppercase tracking-[0.22em] text-ab-muted">
              Gold & Silver Artwork
            </p>
            <p className="mt-4 text-sm font-light leading-relaxed text-ab-muted">
              Bespoke gold and silver artistry for collectors worldwide — precision craft,
              luminous finish, inspired by traditional workshop ornament.
            </p>
          </div>
        </div>

        {/* Links + copyright */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-5 text-xs uppercase tracking-[0.16em] text-ab-muted">
            <Link href="/gallery" className="transition hover:text-ab-gold">
              Gallery
            </Link>
            <span className="text-ab-goldBorder">·</span>
            <Link href="/contact" className="transition hover:text-ab-gold">
              Contact
            </Link>
            <span className="text-ab-goldBorder">·</span>
            <Link href="/admin/login" className="transition hover:text-ab-gold">
              Admin
            </Link>
          </div>
          <p className="text-[11px] font-light text-ab-dim">
            © {new Date().getFullYear()} Shri Jaganmathe. All rights reserved.
          </p>
        </div>
      </div>

      {/* Bottom gold line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-ab-gold/30 to-transparent" />
    </footer>
  );
}
