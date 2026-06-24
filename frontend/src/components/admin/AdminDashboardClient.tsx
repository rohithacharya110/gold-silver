"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiFetch } from "@/lib/api";
import { useAuth, getStoredToken } from "@/context/AuthContext";
import type {
  Artwork,
  ContactMessage,
  Material,
  PaginatedArtworks,
  Source,
  Stats,
} from "@/lib/types";
import { AdminHeroBanner } from "@/components/admin/AdminHeroBanner";
import { DashboardMarquee } from "@/components/admin/DashboardMarquee";

const emptyForm = {
  title: "",
  description: "",
  material: "gold" as Material,
  source: "customer" as Source,
};

export function AdminDashboardClient() {
  const router = useRouter();
  const { token, ready, logout } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [list, setList] = useState<Artwork[]>([]);
  const [librarySearch, setLibrarySearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState<Artwork | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [editFile, setEditFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const refresh = useCallback(async () => {
    const authToken = token ?? getStoredToken();
    if (!authToken) return;
    setError(null);
    setLoading(true);
    try {
      const [s, artworks, inbox] = await Promise.all([
        apiFetch<Stats>("/artworks/stats", { token: authToken }),
        apiFetch<PaginatedArtworks>("/artworks?limit=100&page=1", { token: authToken }),
        apiFetch<{ data: ContactMessage[] }>("/contact/messages", { token: authToken }),
      ]);
      setStats(s);
      setList(artworks.data);
      setMessages(inbox.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!ready) return;
    const authToken = token ?? getStoredToken();
    if (!authToken) {
      router.replace("/admin/login");
      return;
    }
    void refresh();
  }, [ready, token, router, refresh]);

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || files.length === 0) {
      setError("Please select at least one image");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const titleBase = form.title.trim();
      const desc = form.description;
      const mat = form.material;
      const src = form.source;

      for (let i = 0; i < files.length; i++) {
        const f = files[i]!;
        const fallbackTitle = f.name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim() || "Artwork";
        const title =
          files.length === 1
            ? (titleBase || fallbackTitle)
            : `${titleBase || fallbackTitle} ${String(i + 1).padStart(2, "0")}`;

        const fd = new FormData();
        fd.append("image", f);
        fd.append("title", title);
        fd.append("description", desc);
        fd.append("material", mat);
        fd.append("source", src);
        await apiFetch<Artwork>("/artworks", { method: "POST", body: fd, token });
      }

      setForm(emptyForm);
      setFiles([]);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create failed");
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!token) return;
    if (!confirm("Delete this artwork permanently?")) return;
    setError(null);
    try {
      await apiFetch(`/artworks/${id}`, { method: "DELETE", token });
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  };

  const openEdit = (a: Artwork) => {
    setEditing(a);
    setEditForm({
      title: a.title,
      description: a.description,
      material: a.material,
      source: a.source,
    });
    setEditFile(null);
  };

  const onUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editing) return;
    setSubmitting(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("title", editForm.title);
      fd.append("description", editForm.description);
      fd.append("material", editForm.material);
      fd.append("source", editForm.source);
      if (editFile) fd.append("image", editFile);
      await apiFetch<Artwork>(`/artworks/${editing._id}`, { method: "PUT", body: fd, token });
      setEditing(null);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (!ready || !token) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-ab-muted">
        Checking session…
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.replace("/admin/login");
  };

  return (
    <>
      <AdminHeroBanner artworks={list} onLogout={handleLogout} />

      <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 md:px-6 md:pt-12">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-ab-muted">Admin</p>
          <h1 className="mt-2 font-display text-3xl text-ab-ink md:text-4xl">Workshop dashboard</h1>
          <p className="mt-2 max-w-xl text-sm text-ab-muted">
            Manage uploads, library, and contact messages.
          </p>
        </div>

        <DashboardMarquee artworks={list} />

      {error && (
        <p className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      {loading || !stats ? (
        <p className="text-sm text-ab-muted">Loading insights…</p>
      ) : (
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: "Total", value: stats.total },
            { label: "Gold", value: stats.gold },
            { label: "Silver", value: stats.silver },
            { label: "Customer", value: stats.customer },
            { label: "Workshop", value: stats.workshop },
          ].map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border-2 border-ab-gold/20 bg-ab-card/95 p-5 shadow-temple"
            >
              <p className="text-[10px] uppercase tracking-widest text-ab-muted">{s.label}</p>
              <p className="mt-2 font-display text-3xl text-ab-brand">{s.value}</p>
            </motion.div>
          ))}
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-2">
        <form
          onSubmit={onCreate}
          className="space-y-4 rounded-3xl border-2 border-ab-gold/20 bg-ab-card/95 p-6 shadow-temple"
        >
          <h2 className="font-display text-xl text-ab-ink">Upload artwork</h2>
          <input
            required
            className="w-full rounded-2xl border border-ab-border bg-ab-cream px-4 py-3 text-sm text-ab-ink outline-none focus:border-ab-gold focus:ring-2 focus:ring-ab-gold/20"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />
          <textarea
            className="min-h-[100px] w-full rounded-2xl border border-ab-border bg-ab-cream px-4 py-3 text-sm text-ab-ink outline-none focus:border-ab-gold focus:ring-2 focus:ring-ab-gold/20"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-xs uppercase tracking-widest text-ab-muted">
              Material
              <select
                className="mt-2 w-full rounded-2xl border border-ab-border bg-ab-cream px-4 py-3 text-sm text-ab-ink outline-none focus:border-ab-gold focus:ring-2 focus:ring-ab-gold/20"
                value={form.material}
                onChange={(e) =>
                  setForm((f) => ({ ...f, material: e.target.value as Material }))
                }
              >
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
              </select>
            </label>
            <label className="text-xs uppercase tracking-widest text-ab-muted">
              Source
              <select
                className="mt-2 w-full rounded-2xl border border-ab-border bg-ab-cream px-4 py-3 text-sm text-ab-ink outline-none focus:border-ab-gold focus:ring-2 focus:ring-ab-gold/20"
                value={form.source}
                onChange={(e) => setForm((f) => ({ ...f, source: e.target.value as Source }))}
              >
                <option value="customer">Customer direct order</option>
                <option value="workshop">Jewellery workshop</option>
              </select>
            </label>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
            className="w-full text-sm text-ab-muted file:mr-4 file:rounded-full file:border-0 file:bg-ab-brand/15 file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-widest file:text-ab-brand"
          />
          {files.length > 0 && (
            <p className="text-xs text-ab-muted">
              Selected: <span className="font-medium text-ab-ink">{files.length}</span>
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full border border-ab-gold/50 bg-gradient-to-b from-ab-gold to-ab-goldMid px-6 py-3 text-sm font-semibold uppercase tracking-widest text-ab-ink shadow-temple transition hover:brightness-105 disabled:opacity-40"
          >
            {submitting ? "Publishing…" : "Publish"}
          </button>
        </form>

        <div className="rounded-3xl border-2 border-ab-gold/20 bg-ab-card/95 p-6 shadow-temple">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-xl text-ab-ink">Library</h2>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-ab-muted">
                Search uploaded works
              </p>
            </div>
            <input
              value={librarySearch}
              onChange={(e) => setLibrarySearch(e.target.value)}
              placeholder="Search by title / material / source…"
              className="w-full rounded-2xl border border-ab-border bg-ab-cream px-4 py-2.5 text-sm text-ab-ink outline-none ring-0 placeholder:text-ab-muted/70 focus:border-ab-gold focus:ring-2 focus:ring-ab-gold/20 sm:max-w-xs"
            />
          </div>
          <div className="max-h-[520px] space-y-3 overflow-y-auto pr-1">
            {list
              .filter((a) => {
                const q = librarySearch.trim().toLowerCase();
                if (!q) return true;
                return (
                  a.title.toLowerCase().includes(q) ||
                  (a.description ?? "").toLowerCase().includes(q) ||
                  a.material.toLowerCase().includes(q) ||
                  a.source.toLowerCase().includes(q)
                );
              })
              .map((a) => (
              <div
                key={a._id}
                className="flex items-center gap-3 rounded-2xl border border-ab-border bg-neutral-50 p-3"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-neutral-200">
                  <Image src={a.imageUrl} alt={a.title} fill className="object-cover" sizes="56px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ab-ink">{a.title}</p>
                  <p className="text-[10px] uppercase tracking-widest text-ab-muted">
                    {a.material} · {a.source}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(a)}
                    className="rounded-full border border-ab-border bg-ab-card px-3 py-1 text-[10px] uppercase tracking-widest text-ab-muted transition hover:border-ab-brand/40 hover:text-ab-brand"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => void onDelete(a._id)}
                    className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[10px] uppercase tracking-widest text-red-800 transition hover:border-red-300"
                  >
                    Del
                  </button>
                </div>
              </div>
            ))}
            {list.length === 0 && !loading && (
              <p className="text-sm text-ab-muted">No artworks yet.</p>
            )}
            {list.length > 0 &&
              list.filter((a) => {
                const q = librarySearch.trim().toLowerCase();
                if (!q) return true;
                return (
                  a.title.toLowerCase().includes(q) ||
                  (a.description ?? "").toLowerCase().includes(q) ||
                  a.material.toLowerCase().includes(q) ||
                  a.source.toLowerCase().includes(q)
                );
              }).length === 0 && (
                <p className="text-sm text-ab-muted">No matches.</p>
              )}
          </div>
        </div>
      </div>

      <section className="mt-12 rounded-3xl border-2 border-ab-gold/20 bg-ab-card/95 p-6 shadow-temple">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-xl text-ab-ink">Contact messages</h2>
          <button
            type="button"
            onClick={() => void refresh()}
            className="self-start rounded-full border border-ab-border bg-ab-cream px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-ab-muted transition hover:border-ab-gold/50 hover:text-ab-brand sm:self-auto"
          >
            Refresh
          </button>
        </div>
        <p className="mb-4 text-sm text-ab-muted">
          Submissions from the public Contact page (newest first).
        </p>
        <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
          {messages.length === 0 ? (
            <p className="text-sm text-ab-muted">No messages yet.</p>
          ) : (
            messages.map((m) => (
              <article
                key={m._id}
                className="rounded-2xl border border-ab-border bg-neutral-50 p-4"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium text-ab-ink">{m.name}</p>
                  <time className="text-[10px] uppercase tracking-widest text-ab-muted">
                    {new Date(m.createdAt).toLocaleString()}
                  </time>
                </div>
                <a
                  href={`mailto:${encodeURIComponent(m.email)}`}
                  className="mt-1 inline-block text-sm text-ab-brand transition hover:text-ab-brandDeep"
                >
                  {m.email}
                </a>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-ab-muted">
                  {m.message}
                </p>
              </article>
            ))
          )}
        </div>
      </section>

      {editing && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-ab-ink/50 p-4 backdrop-blur-sm">
          <form
            onSubmit={onUpdate}
            className="w-full max-w-lg space-y-4 rounded-3xl border-2 border-ab-gold/25 bg-ab-card/95 p-6 shadow-2xl ring-1 ring-ab-brand/10"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl text-ab-ink">Edit artwork</h3>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="text-sm text-ab-muted transition hover:text-ab-brand"
              >
                Close
              </button>
            </div>
            <input
              required
              className="w-full rounded-2xl border border-ab-border bg-ab-cream px-4 py-3 text-sm text-ab-ink outline-none focus:border-ab-gold focus:ring-2 focus:ring-ab-gold/20"
              value={editForm.title}
              onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
            />
            <textarea
              className="min-h-[90px] w-full rounded-2xl border border-ab-border bg-ab-cream px-4 py-3 text-sm text-ab-ink outline-none focus:border-ab-gold focus:ring-2 focus:ring-ab-gold/20"
              value={editForm.description}
              onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <select
                className="rounded-2xl border border-ab-border bg-ab-cream px-4 py-3 text-sm text-ab-ink outline-none focus:border-ab-gold focus:ring-2 focus:ring-ab-gold/20"
                value={editForm.material}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, material: e.target.value as Material }))
                }
              >
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
              </select>
              <select
                className="rounded-2xl border border-ab-border bg-ab-cream px-4 py-3 text-sm text-ab-ink outline-none focus:border-ab-gold focus:ring-2 focus:ring-ab-gold/20"
                value={editForm.source}
                onChange={(e) => setEditForm((f) => ({ ...f, source: e.target.value as Source }))}
              >
                <option value="customer">Customer direct order</option>
                <option value="workshop">Jewellery workshop</option>
              </select>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setEditFile(e.target.files?.[0] ?? null)}
              className="w-full text-sm text-ab-muted file:mr-4 file:rounded-full file:border-0 file:bg-ab-brand/15 file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-widest file:text-ab-brand"
            />
            <p className="text-xs text-ab-muted">Leave image empty to keep the current asset.</p>
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full border border-ab-brand/40 bg-ab-brand/10 py-3 text-sm font-semibold uppercase tracking-widest text-ab-brand transition hover:bg-ab-brand/15 disabled:opacity-40"
            >
              {submitting ? "Saving…" : "Save changes"}
            </button>
          </form>
        </div>
      )}
      </div>
    </>
  );
}
