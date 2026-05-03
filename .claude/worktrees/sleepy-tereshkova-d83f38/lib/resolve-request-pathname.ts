import { headers } from "next/headers";

type RequestHeaders = Awaited<ReturnType<typeof headers>>;

/**
 * RSC/Flight and prefetch requests can omit or reuse middleware-injected `x-pathname` incorrectly,
 * so we also try other headers that may carry the active URL (platform-dependent).
 * Pass an optional `h` to reuse the same `headers()` snapshot as the caller.
 */
export async function getRequestPathnameForSeo(hIn?: RequestHeaders): Promise<string> {
  const h = hIn ?? (await headers());
  const fromMw = h.get("x-pathname")?.trim();
  if (fromMw) return fromMw.split("?")[0] || fromMw;

  for (const name of ["x-matched-path", "x-vercel-matched-path", "X-Matched-Path"] as const) {
    const v = h.get(name)?.trim();
    if (v && v.startsWith("/") && !v.startsWith("/_")) {
      return v.split("?")[0] || v;
    }
  }

  const urlLike = h.get("x-url") || h.get("X-Url") || h.get("x-nextjs-request-url");
  if (urlLike) {
    try {
      return new URL(urlLike, "https://placeholder.local").pathname;
    } catch {
      // ignore
    }
  }

  return "";
}
