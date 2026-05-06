import type { SitemapUrlEntry } from "@/lib/sitemap-xml";
import { buildUrlsetXml, mapLocsToEntries } from "@/lib/sitemap-xml";

export function sitemapEntriesResponse(entries: SitemapUrlEntry[]): Response {
  const xml = buildUrlsetXml(entries);
  return xmlResponse(xml);
}

/** Child sitemaps: plain URL lists, shared lastmod, no priority. */
export function sitemapXmlResponse(urls: string[]): Response {
  return sitemapEntriesResponse(mapLocsToEntries(urls));
}

function xmlResponse(xml: string): Response {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
