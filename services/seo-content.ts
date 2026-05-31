import { unstable_cache } from "next/cache";
import { cache } from "react";

import { buildApiClientHeaders } from "@/services/api-client-headers";
import { resolveApiBaseUrl, resolveInternalAppBaseUrl } from "@/services/env-config";
import { normalizeSeoFromResponse } from "@/lib/seo-normalize";
import type { SeoContent } from "@/types/seo.model";

const SEO_REVALIDATE_SEC = 300;

async function fetchSeoBySlugInternal(slug: string): Promise<SeoContent | null> {
  if (!slug) return null;

  const upstream = resolveApiBaseUrl();
  if (!upstream) return null;

  const tryFetch = async (url: string) => {
    const res = await fetch(url, {
      next: { revalidate: SEO_REVALIDATE_SEC },
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

function getSeoBySlugCached(slug: string) {
  return unstable_cache(
    () => fetchSeoBySlugInternal(slug),
    ["seo-by-slug", slug],
    { revalidate: SEO_REVALIDATE_SEC, tags: [`seo:${slug}`] },
  )();
}

/**
 * Deduplicate SEO fetch in the same request (e.g. `generateMetadata` + layout).
 * Cross-request results are cached for {@link SEO_REVALIDATE_SEC}s.
 */
export const getSeoBySlug = cache((slug: string) => getSeoBySlugCached(slug));
