"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiFetch } from "@/lib/api";

type AuthContextValue = {
  token: string | null;
  username: string | null;
  ready: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = "gsw_token";
const USER_KEY = "gsw_username";

function readStoredToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

function readStoredUsername() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(USER_KEY);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setToken(readStoredToken());
    setUsername(readStoredUsername());
    setReady(true);
  }, []);

  // While logged in (any page/tab), keep the server-side presence alive so
  // other visitors' headers can hide the Admin button.
  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    const beat = () => {
      apiFetch("/heartbeat", { method: "POST", token }).catch(() => {});
    };
    beat();
    const id = setInterval(() => {
      if (!cancelled) beat();
    }, 30000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [token]);

  const login = useCallback(async (u: string, password: string) => {
    const res = await apiFetch<{ token: string; admin: { username: string } }>(
      "/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: u, password }),
      }
    );
    localStorage.setItem(TOKEN_KEY, res.token);
    localStorage.setItem(USER_KEY, res.admin.username);
    setToken(res.token);
    setUsername(res.admin.username);
  }, []);

  const logout = useCallback(() => {
    const current = localStorage.getItem(TOKEN_KEY);
    if (current) {
      apiFetch("/logout", { method: "POST", token: current }).catch(() => {});
    }
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUsername(null);
  }, []);

  const value = useMemo(
    () => ({ token, username, ready, login, logout }),
    [token, username, ready, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function getStoredToken() {
  return readStoredToken();
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
