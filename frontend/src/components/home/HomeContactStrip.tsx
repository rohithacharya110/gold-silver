"use client";

import { useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

export function HomeContactStrip() {
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
    "w-full rounded-none border-b border-ab-border bg-transparent px-0 py-3 font-sans text-sm font-light text-ab-ink placeholder:text-ab-dim outline-none transition focus:border-ab-gold";

  return (
    <section id="contact" className="scroll-mt-28 border-t border-ab-gold/[0.12] bg-ab-obsidian px-5 py-[4.5rem] md:px-[8vw] md:py-[6rem]">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          <p className="mb-5 flex items-center gap-4 font-sans text-[0.62rem] font-light uppercase tracking-[0.45em] text-ab-gold">
            <span className="h-px w-10 bg-ab-gold" />
            Concierge
          </p>
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] font-light leading-tight text-ab-ink">
            Begin your <em className="text-ab-goldSoft not-italic">commission</em>
          </h2>
          <p className="mt-6 max-w-md font-sans text-sm font-light leading-[1.85] text-ab-muted">
            Share a brief, timeline, and budget. We reply within two business days. For fuller details you can also visit
            our contact page.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex font-sans text-[0.68rem] font-light uppercase tracking-[0.28em] text-ab-gold transition hover:text-ab-goldSoft"
          >
            Full contact form →
          </Link>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-sans text-[0.58rem] uppercase tracking-[0.25em] text-ab-muted">
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
              <label className="mb-1 block font-sans text-[0.58rem] uppercase tracking-[0.25em] text-ab-muted">
                Email
              </label>
              <input
                required
                type="email"
                className={inputCls}
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block font-sans text-[0.58rem] uppercase tracking-[0.25em] text-ab-muted">
              Message
            </label>
            <textarea
              required
              rows={4}
              className={`${inputCls} resize-none rounded-lg border border-ab-border bg-ab-void/50 px-4 py-3`}
              placeholder="Describe your idea…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="submit"
              disabled={loading}
              className="inline-block bg-ab-gold px-10 py-3.5 font-sans text-[0.72rem] font-normal uppercase tracking-[0.22em] text-ab-void transition hover:bg-ab-goldSoft disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send inquiry"}
            </button>
            {status === "ok" && (
              <span className="font-sans text-sm text-ab-goldSoft">Thank you — we will be in touch shortly.</span>
            )}
            {status === "err" && err && <span className="font-sans text-sm text-red-400/90">{err}</span>}
          </div>
        </form>
      </div>
    </section>
  );
}
