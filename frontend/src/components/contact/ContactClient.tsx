"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { apiFetch } from "@/lib/api";

const contactInfo = {
  office: "Online Operations Office",
  company: "SHRI JAGANMATHE Gold & Silver Artwork",
  addressLines: [
    "Rajacharya Marg, 1st Cross, Karamballi",
    "Udupi, Karnataka",
    "576102",
  ],
  email: "rohithacharya110@gmail.com",
  phone: "+91 7996587096",
};

const mapQuery = encodeURIComponent(
  "Rajacharya Marg, 1st Cross, Karamballi, Udupi, Karnataka 576102"
);

export function ContactClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    setStatus("idle");
    try {
      await apiFetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      setStatus("ok");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setStatus("err");
      setErr(error instanceof Error ? error.message : "Could not send");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-ab-border bg-ab-raised px-5 py-3.5 text-sm font-light text-ab-ink placeholder:text-ab-dim outline-none transition focus:border-ab-goldBorder focus:ring-2 focus:ring-ab-gold/15";

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-28 md:px-8 md:pt-36">
      <div className="mb-10">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-ab-gold/60" />
          <p className="text-[10px] uppercase tracking-[0.36em] text-ab-gold">Contact us</p>
        </div>
        <h1 className="font-display text-4xl font-semibold italic text-ab-ink md:text-5xl">
          Location & contact
        </h1>
      </div>

      <section className="grid overflow-hidden rounded-3xl border border-ab-goldBorder/70 bg-ab-card/80 shadow-temple backdrop-blur-sm lg:grid-cols-[0.9fr_1.7fr]">
        <aside className="border-b border-ab-border p-6 md:p-8 lg:border-b-0 lg:border-r">
          <h2 className="font-display text-2xl font-light uppercase tracking-wide text-ab-ink">
            Our address
          </h2>

          <div className="mt-7 space-y-6 text-sm font-light leading-relaxed text-ab-muted">
            <div>
              <p className="font-medium text-ab-ink">{contactInfo.office}</p>
              <p className="mt-4">{contactInfo.company}</p>
              <address className="mt-4 not-italic">
                {contactInfo.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>

            <div className="border-t border-ab-border pt-5">
              <p>
                Email:{" "}
                <a href={`mailto:${contactInfo.email}`} className="text-ab-gold transition hover:text-ab-goldSoft">
                  {contactInfo.email}
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="text-ab-gold transition hover:text-ab-goldSoft">
                  {contactInfo.phone}
                </a>
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="font-display text-2xl font-light uppercase tracking-wide text-ab-ink">
              Contact us
            </h3>
            <a
              href="#contact-query"
              className="mt-5 block rounded-none bg-ab-brand px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-ab-gold hover:text-ab-void"
            >
              Contact us for query
            </a>
          </div>
        </aside>

        <div className="min-h-[360px] bg-ab-obsidian lg:min-h-[520px]">
          <iframe
            title="SHRI JAGANMATHE location map"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="h-full min-h-[360px] w-full border-0 grayscale-[0.15] lg:min-h-[520px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <motion.form
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        onSubmit={onSubmit}
        id="contact-query"
        className="mx-auto mt-12 max-w-2xl scroll-mt-28 space-y-4 rounded-2xl border border-ab-goldBorder bg-ab-card/80 p-6 shadow-temple backdrop-blur-sm md:p-8"
      >
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-ab-gold">Query form</p>
          <h2 className="mt-2 font-display text-3xl font-light text-ab-ink">Send a message</h2>
          <p className="mt-3 text-sm font-light leading-relaxed text-ab-muted">
            Share your brief, timeline, and references. Our studio replies within two business days.
          </p>
        </div>

        <div>
          <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-ab-muted">
            Name
          </label>
          <input
            required
            className={inputCls}
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-ab-muted">
            Email
          </label>
          <input
            required
            type="email"
            className={inputCls}
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-ab-muted">
            Message
          </label>
          <textarea
            required
            className={`${inputCls} min-h-[160px] resize-y`}
            placeholder="Tell us about your commission..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {status === "ok" && (
          <p className="rounded-xl border border-emerald-800/40 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-400">
            Message received. We&apos;ll be in touch shortly.
          </p>
        )}
        {status === "err" && err && (
          <p className="rounded-xl border border-red-800/40 bg-red-950/40 px-4 py-3 text-sm text-red-400">
            {err}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="group relative w-full overflow-hidden rounded-full border border-ab-goldBorder bg-gradient-to-b from-ab-gold to-ab-goldMid py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-ab-void shadow-temple-gold transition hover:shadow-[0_12px_40px_rgba(201,168,76,0.3)] disabled:opacity-40"
        >
          <span className="relative z-10">{loading ? "Sending…" : "Send message"}</span>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </button>
      </motion.form>
    </div>
  );
}
