"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function AdminLoginPage() {
  const { login, token, ready } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (token) router.replace("/admin/dashboard");
  }, [ready, token, router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(username, password);
      window.location.assign("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl border-2 border-ab-gold/30 bg-ab-card/95 p-8 shadow-temple ring-1 ring-ab-brand/10 backdrop-blur-sm"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-ab-muted">Restricted</p>
        <h1 className="mt-2 font-display text-3xl text-ab-ink">Admin access</h1>
        <p className="mt-2 text-sm text-ab-muted">JWT-secured dashboard for catalogue management.</p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <input
            autoComplete="username"
            className="w-full rounded-2xl border border-ab-border bg-ab-cream px-4 py-3 text-sm text-ab-ink outline-none focus:border-ab-gold focus:ring-2 focus:ring-ab-gold/20"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            autoComplete="current-password"
            className="w-full rounded-2xl border border-ab-border bg-ab-cream px-4 py-3 text-sm text-ab-ink outline-none focus:border-ab-gold focus:ring-2 focus:ring-ab-gold/20"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-sm text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full border border-ab-gold/50 bg-gradient-to-b from-ab-gold to-ab-goldMid py-3 text-sm font-semibold uppercase tracking-widest text-ab-ink shadow-temple transition hover:brightness-105 disabled:opacity-40"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <Link
          href="/"
          className="mt-6 inline-block text-xs uppercase tracking-widest text-ab-muted transition hover:text-ab-brand"
        >
          ← Back to site
        </Link>
      </motion.div>
    </div>
  );
}
