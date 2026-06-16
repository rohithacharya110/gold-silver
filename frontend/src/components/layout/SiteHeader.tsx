"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

const links = [
  { href: "/#collection", label: "Collection" },
  { href: "/gallery?material=gold", label: "Gold" },
  { href: "/gallery?material=silver", label: "Silver" },
  { href: "/contact", label: "Contact" },
];

function navLinkActive(href: string, pathname: string, sp: URLSearchParams): boolean {
  const pathPart = href.split("?")[0] ?? href;
  if (pathPart.includes("#")) return false;
  const queryPart = href.split("?")[1];
  const path = pathPart.split("#")[0];
  if (path !== pathname) return false;
  if (!queryPart) return true;
  const want = new URLSearchParams(queryPart);
  for (const [k, v] of want.entries()) {
    if (sp.get(k) !== v) return false;
  }
  return true;
}

export function SiteHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { token, ready } = useAuth();
  const [open, setOpen] = useState(false);
  const [adminActive, setAdminActive] = useState(false);

  // Poll whether any admin is currently logged in elsewhere, so the public
  // Admin button hides while an admin session is active.
  useEffect(() => {
    let cancelled = false;
    const check = () => {
      apiFetch<{ active: boolean }>("/admin-active")
        .then((r) => {
          if (!cancelled) setAdminActive(Boolean(r.active));
        })
        .catch(() => {});
    };
    check();
    const id = setInterval(check, 30000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [pathname]);

  // Show the Admin button only when the page is ready, this device isn't
  // logged in, and no admin session is active anywhere.
  const showAdmin = ready && !token && !adminActive;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ab-goldBorder/70 bg-ab-deep/88 backdrop-blur-2xl shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.06]">
      {/* Top gold accent line */}
      <div
        className="h-px w-full bg-gradient-to-r from-transparent via-ab-gold to-transparent opacity-70"
        aria-hidden
      />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
        {/* Logo + Brand name */}
        <Link href="/" className="group flex items-center gap-3 md:gap-4">
          <BrandLogo />
          <span className="hidden min-[320px]:flex min-[320px]:flex-col border-ab-goldBorder min-[320px]:border-l min-[320px]:pl-3 sm:pl-4 leading-tight">
            <span className="font-display text-sm tracking-[0.14em] text-ab-gold transition group-hover:text-ab-goldSoft md:text-base">
              SHRI JAGANMATHE
            </span>
            <span className="mt-0.5 text-[9px] font-light uppercase tracking-[0.22em] text-ab-muted sm:text-[10px]">
              Gold & Silver Artwork
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = navLinkActive(l.href, pathname, searchParams);
            return (
              <Link
                key={l.href}
                href={l.href}
                className="group relative px-3 py-2 text-[0.8rem] text-ab-muted transition hover:text-ab-ink"
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-ab-goldDim ring-1 ring-ab-goldBorder"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                <span
                  className={`relative font-light tracking-wide ${
                    active ? "font-medium text-ab-gold" : ""
                  }`}
                >
                  {l.label}
                </span>
              </Link>
            );
          })}

          {/* Admin CTA — hidden once an admin is logged in */}
          {showAdmin && (
            <Link
              href="/admin/login"
              className="ml-2 rounded-full border border-ab-goldBorder bg-ab-goldDim px-5 py-2 text-xs font-medium uppercase tracking-[0.16em] text-ab-gold shadow-sm transition hover:bg-ab-gold hover:text-ab-void"
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ab-border bg-ab-raised text-ab-ink shadow-sm md:hidden"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-xl font-light">{open ? "×" : "≡"}</span>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="border-t border-ab-border bg-ab-surface/98 px-4 py-4 shadow-temple md:hidden"
          >
            <div className="mb-3 border-b border-ab-goldBorder pb-3">
              <p className="font-display text-sm tracking-widest text-ab-gold">SHRI JAGANMATHE</p>
              <p className="text-[10px] uppercase tracking-widest text-ab-muted">Gold & Silver Artwork</p>
            </div>
            <div className="flex flex-col gap-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-ab-border bg-ab-raised px-4 py-3 text-sm text-ab-ink"
                >
                  {l.label}
                </Link>
              ))}
              {showAdmin && (
                <Link
                  href="/admin/login"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-ab-goldBorder bg-ab-goldDim px-4 py-3 text-center text-xs font-medium uppercase tracking-widest text-ab-gold"
                >
                  Admin
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
