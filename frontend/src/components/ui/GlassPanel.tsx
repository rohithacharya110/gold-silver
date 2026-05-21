import type { ReactNode } from "react";

export function GlassPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`glass-dark relative overflow-hidden rounded-2xl border border-ab-goldBorder/90 p-6 shadow-luxury md:p-8 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ab-gold/45 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-ab-gold/5 blur-3xl"
        aria-hidden
      />
      {children}
    </div>
  );
}
