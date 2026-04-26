import { cache } from "react";

import { resolveApiBaseUrl, resolveInternalAppBaseUrl } from "@/services/env-config";
import type { SeoContent } from "@/types/seo.model";

function toTrimmedString(v: unknown): string | null {
  if (v == null) return null;
  if (typeof v === "string") {
    const t = v.trim();
    return t.length > 0 ? t : null;
  }
  if (typeof v === "number" && Number.isFinite(v)) return String(v);
  return null;
}

/**
 * Picks a document from common API envelopes (`{ data: ... }`, `{ result: ... }`, first array item, etc.).
 */
function pickRawDoc(json: unknown): Record<string, unknown> | null {
  if (!json || typeof json !== "object") return null;
  const o = json as Record<string, unknown>;
  const keys = ["data", "result", "seo", "doc", "document", "payload"] as const;
  for (const k of keys) {
    const v = o[k];
    if (v && typeof v === "object" && !Array.isArray(v)) {
      return v as Record<string, unknown>;
    }
  }
  if (Array.isArray(o.data) && o.data[0] && typeof o.data[0] === "object") {
    return o.data[0] as Record<string, unknown>;
  }
  return o;
}

function firstNonEmptyString(rec: Record<string, unknown>, fields: string[]): string | null {
  for (const f of fields) {
    const s = toTrimmedString(rec[f]);
    if (s) return s;
  }
  return null;
}

/**
 * The backend may use `page_title` without `title`, or nest the payload. Normalize so metadata always gets strings.
 */
function normalizeSeoFromResponse(json: unknown): SeoContent | null {
  const raw = pickRawDoc(json);
  if (!raw) return null;
  if (raw.status === false) return null;

  const title = firstNonEmptyString(raw, ["title", "page_title", "pageTitle"]);
  const description = firstNonEmptyString(raw, [
    "description",
    "metaDescription",
    "meta_description",
  ]);
  if (!title || !description) return null;

  return { ...raw, title, description } as SeoContent;
}

async function fetchSeoBySlugInternal(slug: string): Promise<SeoContent | null> {
  if (!slug) return null;

  const upstream = resolveApiBaseUrl();
  if (!upstream) return null;

  const tryFetch = async (url: string) => {
    const res = await fetch(url, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const json = (await res.json().catch(() => null)) as unknown;
    return normalizeSeoFromResponse(json);
  };

  const directUrl = `${upstream}/api/user/seo/${encodeURIComponent(slug)}`;
  const fromDirect = await tryFetch(directUrl);
  if (fromDirect) return fromDirect;

  const appBase = resolveInternalAppBaseUrl();
  const proxyUrl = `${appBase}/api/user/seo/${encodeURIComponent(slug)}`;
  if (proxyUrl !== directUrl) {
    return tryFetch(proxyUrl);
  }
  return null;
}

/**
 * Deduplicate SEO fetch in the same request (e.g. `generateMetadata` + layout).
 */
export const getSeoBySlug = cache((slug: string) => fetchSeoBySlugInternal(slug));
