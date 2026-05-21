export function HomeTestimonial() {
  return (
    <section className="relative overflow-hidden border-y border-ab-gold/[0.1] bg-ab-charcoal px-5 py-[4.5rem] md:px-[8vw] md:py-[6.5rem]">
      <div
        className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 font-display text-[clamp(6rem,18vw,12rem)] font-light leading-none text-ab-gold/[0.04] md:left-[10%]"
        aria-hidden
      >
        “
      </div>
      <blockquote className="relative z-[1] mx-auto max-w-3xl text-center">
        <p className="font-display text-[clamp(1.35rem,2.5vw,1.85rem)] font-light leading-[1.65] text-ab-ink">
          The piece arrived beyond expectation — weight, finish, and the quiet confidence of true handwork. SHRI JAGANMATHE
          understood the brief and elevated it.
        </p>
        <footer className="mt-10">
          <cite className="not-italic">
            <span className="font-sans text-[0.68rem] font-light uppercase tracking-[0.28em] text-ab-gold">
              Private collector
            </span>
            <span className="mt-2 block font-sans text-xs text-ab-muted">Commission · gold</span>
          </cite>
        </footer>
      </blockquote>
    </section>
  );
}
