import { headers } from "next/headers";
import { connection } from "next/server";

import { getFallbackSeoContent } from "@/lib/seo-fallbacks";
import { pathnameToSeoSlug } from "@/lib/pathname-to-seo-slug";
import { getRequestPathnameForSeo } from "@/lib/resolve-request-pathname";
import { getSeoBySlug } from "@/services/seo-content";
import type { SeoContent } from "@/types/seo.model";

export type ResolvedSeo = {
  seo: SeoContent;
  /** Normalized request path for canonical URLs, JSON-LD, and fallbacks. */
  pathname: string;
  /** True when `GET /api/user/seo/:slug` returned a usable document. */
  fromApi: boolean;
};

/**
 * Resolves the SEO document for the current request. Uses `x-seo-slug` / `x-pathname`
 * (set in middleware) and fallbacks for RSC/Flight. Not wrapped in `react.cache` so
 * a fresh `headers()` read is used per invocation after `router.refresh()`.
 * Falls back to {@link getFallbackSeoContent} by vertical when the API has no match.
 */
export async function getResolvedSeoForRequest(): Promise<ResolvedSeo> {
  await connection();
  const h = await headers();
  const pathname = (await getRequestPathnameForSeo(h)) || "";
  const pathNorm = pathname && pathname.length > 0 ? pathname : "/";
  // Prefer slug from resolved pathname; `x-seo-slug` can be stale on soft navigations.
  const slug = pathname
    ? pathnameToSeoSlug(pathname)
    : h.get("x-seo-slug")?.trim() || "generic";

  const fromApi = await getSeoBySlug(slug);
  if (fromApi) {
    return { seo: fromApi, pathname: pathNorm, fromApi: true };
  }

  return {
    seo: getFallbackSeoContent(pathname, slug),
    pathname: pathNorm,
    fromApi: false,
  };
}
