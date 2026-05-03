import type { Metadata } from "next";

import { buildPageMetadataFromSeo } from "@/lib/seo-metadata";
import { getResolvedSeoForRequest } from "@/lib/seo-for-request";

/**
 * Use as `generateMetadata` on public **page** (or a route `layout` for client-only pages).
 * Parent layouts do not re-run on client-side navigation, so CMS SEO for `<head>` must be
 * resolved at the page (or leaf layout) that changes when the URL changes.
 */
export async function generateMetadataForPublicRoute(): Promise<Metadata> {
  const { seo, pathname } = await getResolvedSeoForRequest();
  return buildPageMetadataFromSeo(pathname || "/", seo);
}
