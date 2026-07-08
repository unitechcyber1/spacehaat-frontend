import { cache } from "react";

import { normalizeSeoFromResponse } from "@/lib/seo-normalize";
import { buildApiClientHeaders } from "@/services/api-client-headers";
import { resolveApiBaseUrl, resolveInternalAppBaseUrl } from "@/services/env-config";
import type { SeoContent } from "@/types/seo.model";

async function fetchSeoBySlugInternal(slug: string): Promise<SeoContent | null> {
  if (!slug) return null;

  const upstream = resolveApiBaseUrl();
  if (!upstream) return null;

  const tryFetch = async (url: string) => {
    const res = await fetch(url, {
      cache: "no-store",
      headers: buildApiClientHeaders(),
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
 * Always hits the upstream API — no cross-request cache.
 */
export const getSeoBySlug = cache((slug: string) => fetchSeoBySlugInternal(slug));
