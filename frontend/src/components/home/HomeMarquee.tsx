export function HomeMarquee() {
  const items = [
    "Fine gold",
    "Silver artistry",
    "Master craftsmen",
    "Heirloom quality",
    "Custom commissions",
    "Bespoke design",
  ];
  const strip = (suffix: string) => (
    <div className="flex items-center gap-10 px-6 sm:gap-12 sm:px-10">
      {items.map((label) => (
        <span key={`${suffix}-${label}`} className="flex items-center gap-10">
          <span className="whitespace-nowrap font-brand text-[0.6rem] uppercase tracking-[0.35em] text-ab-muted">
            {label}
          </span>
          <span className="inline-block h-1 w-1 shrink-0 rounded-full bg-ab-gold" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="border-y border-ab-gold/[0.12] bg-ab-charcoal overflow-hidden py-4">
      <div className="relative flex w-max animate-marquee-ref">
        <div className="flex">{strip("a")}</div>
        <div className="flex">{strip("b")}</div>
      </div>
    </div>
  );
}
