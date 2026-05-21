export function apiBase() {
  // On mobile devices opening the site via LAN IP, "localhost" points to the phone.
  // Prefer the current hostname so API calls go back to the same machine.
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    const configured = process.env.NEXT_PUBLIC_API_URL;
    const isLanHost = host !== "localhost" && host !== "127.0.0.1";
    return isLanHost ? `http://${host}:4000` : configured ?? `http://${host}:4000`;
  }
  return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
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
