"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { apiFetch } from "@/lib/api";
import type { Artwork, Material, PaginatedArtworks, Source } from "@/lib/types";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { ArtworkGridSkeleton } from "@/components/artwork/ArtworkGridSkeleton";
import { Lightbox } from "@/components/artwork/Lightbox";

type FilterMaterial = "" | Material;
type FilterSource = "" | Source;

export function GalleryClient() {
  const searchParams = useSearchParams();
  const hydratedUrl = useRef(false);
  const [material, setMaterial] = useState<FilterMaterial>("");
  const [source, setSource] = useState<FilterSource>("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PaginatedArtworks | null>(null);
  const [active, setActive] = useState<Artwork | null>(null);

  useEffect(() => {
    if (hydratedUrl.current) return;
    hydratedUrl.current = true;
    const m = searchParams.get("material");
    if (m === "gold" || m === "silver") setMaterial(m);
    const s = searchParams.get("source");
    if (s === "customer" || s === "workshop") setSource(s);
  }, [searchParams]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 350);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => { setPage(1); }, [material, source, debouncedSearch]);

  const query = useMemo(() => {
    const p = new URLSearchParams();
    p.set("page", String(page));
    p.set("limit", "12");
    if (material) p.set("material", material);
    if (source)   p.set("source", source);
    if (debouncedSearch) p.set("search", debouncedSearch);
    return p.toString();
  }, [page, material, source, debouncedSearch]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch<PaginatedArtworks>(`/artworks?${query}`);
      setData(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => { void load(); }, [load]);

  const chip = (
    label: string,
    isActive: boolean,
    onClick: () => void
  ) => (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] ring-1 transition ${
        isActive
          ? "bg-ab-gold text-ab-void ring-ab-gold shadow-temple-gold"
          : "bg-ab-raised text-ab-muted ring-ab-border hover:text-ab-ink hover:ring-ab-goldBorder"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-28 md:px-8 md:pt-32">
      {/* Page heading */}
      <div className="mb-12 max-w-2xl">
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-ab-gold/60" />
          <p className="text-[10px] uppercase tracking-[0.36em] text-ab-gold">Archive</p>
        </div>
        <h1 className="mt-4 font-display text-4xl font-semibold italic text-ab-ink md:text-5xl">
          Gallery
        </h1>
        <p className="mt-4 text-sm font-light text-ab-muted">
          Filter by precious metal and commission source. Tap any piece for a full-screen view.
        </p>
      </div>

      {/* Search + filters */}
      <div className="mb-8 rounded-2xl border border-ab-goldBorder bg-ab-card/80 p-5 shadow-temple backdrop-blur-sm">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search title or description..."
          className="w-full rounded-xl border border-ab-border bg-ab-raised px-4 py-3 text-sm font-light text-ab-ink placeholder:text-ab-dim outline-none focus:border-ab-goldBorder focus:ring-2 focus:ring-ab-gold/15 md:max-w-md"
        />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="text-[10px] uppercase tracking-widest text-ab-dim">Material</span>
        {chip("All",    material === "", () => setMaterial(""))}
        {chip("Gold",   material === "gold", () => setMaterial("gold"))}
        {chip("Silver", material === "silver", () => setMaterial("silver"))}
      </div>
      <div className="mb-12 flex flex-wrap items-center gap-3">
        <span className="text-[10px] uppercase tracking-widest text-ab-dim">Source</span>
        {chip("All",              source === "",          () => setSource(""))}
        {chip("Customer orders",  source === "customer",  () => setSource("customer"))}
        {chip("Workshop orders",  source === "workshop",  () => setSource("workshop"))}
      </div>

      {/* Error */}
      {error && (
        <p className="mb-6 rounded-xl border border-red-900/40 bg-red-950/40 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {/* Grid */}
      {loading && !data ? (
        <ArtworkGridSkeleton />
      ) : !data && error ? (
        <div className="rounded-2xl border border-ab-border bg-ab-card p-10 text-center shadow-sm">
          <p className="text-sm text-ab-muted">{error}</p>
          <button
            type="button"
            onClick={() => void load()}
            className="mt-5 rounded-full border border-ab-goldBorder bg-ab-goldDim px-6 py-2 text-xs font-medium uppercase tracking-widest text-ab-gold transition hover:bg-ab-gold hover:text-ab-void"
          >
            Retry
          </button>
        </div>
      ) : data ? (
        <>
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.data.map((a) => (
              <ArtworkCard key={a._id} artwork={a} onOpen={setActive} />
            ))}
          </motion.div>

          {data.data.length === 0 && (
            <p className="mt-12 text-center text-sm font-light text-ab-muted">
              No pieces match these filters.
            </p>
          )}

          {/* Pagination */}
          {data.totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-4">
              <button
                type="button"
                disabled={page <= 1 || loading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-full border border-ab-border bg-ab-raised px-6 py-2.5 text-[11px] uppercase tracking-widest text-ab-muted transition hover:border-ab-goldBorder hover:text-ab-gold disabled:opacity-30"
              >
                Previous
              </button>
              <span className="font-mono text-xs text-ab-muted">
                {page} / {data.totalPages}
              </span>
              <button
                type="button"
                disabled={page >= data.totalPages || loading}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-full border border-ab-border bg-ab-raised px-6 py-2.5 text-[11px] uppercase tracking-widest text-ab-muted transition hover:border-ab-goldBorder hover:text-ab-gold disabled:opacity-30"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : null}

      {loading && data && (
        <p className="mt-6 text-center text-[11px] uppercase tracking-widest text-ab-dim">
          Refreshing…
        </p>
      )}

      <Lightbox artwork={active} onClose={() => setActive(null)} />
    </div>
  );
}
