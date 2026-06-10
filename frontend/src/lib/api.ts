export function apiBase() {
  // In production (and any deploy), the configured API URL always wins.
  const configured = process.env.NEXT_PUBLIC_API_URL;
  if (configured) return configured;

  // Dev fallback: when no API URL is configured, talk to the same host on
  // port 4000 so a phone opening the site over the LAN reaches this machine.
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    return `http://${host}:4000`;
  }
  return "http://localhost:4000";
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit & { token?: string | null }
): Promise<T> {
  const { token, headers, ...rest } = init ?? {};
  const h = new Headers(headers);
  if (token) h.set("Authorization", `Bearer ${token}`);
  const res = await fetch(`${apiBase()}${path}`, { ...rest, headers: h });
  const text = await res.text();
  let data: unknown = null;
  if (text) {
    try {
      data = JSON.parse(text) as unknown;
    } catch {
      data = { raw: text };
    }
  }
  if (!res.ok) {
    const errObj = data as { error?: string } | null;
    const err = errObj?.error ?? res.statusText;
    throw new Error(err);
  }
  return data as T;
}
