import type { SitemapUrlEntry } from "@/lib/sitemap-xml";
import { canonicalCoworkingCitySlug } from "@/services/catalog-city-id";
import { resolveAppUrl } from "@/services/env-config";
import { listHomepageCitiesFromAvailable } from "@/services/homepage-available-cities";
import { listCitiesByVertical, listSpaces } from "@/services/mock-db";
import type { SpaceVertical } from "@/types";

const VERTICALS: SpaceVertical[] = ["coworking", "virtual-office", "office-space"];

function baseOrigin(): string {
  return resolveAppUrl().replace(/\/$/, "");
}

export function toAbsoluteUrl(pathname: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${baseOrigin()}${path}`;
}

function normalizeCitySegment(vertical: SpaceVertical, citySlug: string): string {
  if (vertical === "coworking" || vertical === "virtual-office" || vertical === "office-space") {
    return canonicalCoworkingCitySlug(citySlug);
  }
  return citySlug.trim();
}

function citySlugSet(vertical: SpaceVertical): Set<string> {
  return new Set(
    listHomepageCitiesFromAvailable(vertical).map((c) => normalizeCitySegment(vertical, c.slug)),
  );
}

function dedupeSort(urls: string[]): string[] {
  return Array.from(new Set(urls)).sort((a, b) => a.localeCompare(b));
}

/**
 * Root `/sitemap.xml` — reference-style urlset: homepage + hub URLs + child sitemap documents under `/sitemap/`.
 */
export function buildRootSitemapEntries(): SitemapUrlEntry[] {
  const b = baseOrigin();
  const now = new Date();

  return [
    { loc: `${b}/`, lastmod: now, priority: 1 },
    { loc: `${b}/sitemap/city-pages-sitemap.xml`, lastmod: now },
    { loc: `${b}/sitemap/locality-pages-sitemap.xml`, lastmod: now },
    { loc: `${b}/sitemap/coworking-spaces-sitemap.xml`, lastmod: now },
    { loc: `${b}/sitemap/virtual-office-spaces-sitemap.xml`, lastmod: now },
    { loc: `${b}/sitemap/office-space-sitemap.xml`, lastmod: now },
    { loc: `${b}/coworking`, lastmod: now, priority: 0.8 },
    { loc: `${b}/virtual-office`, lastmod: now, priority: 0.8 },
    { loc: `${b}/office-space`, lastmod: now, priority: 0.8 },
    { loc: `${b}/list-your-space`, lastmod: now, priority: 0.5 },
  ];
}

/** `/{vertical}/{city}` from homepage-available city lists. */
export function collectCityPagesSitemapUrls(): string[] {
  const out: string[] = [];
  for (const vertical of VERTICALS) {
    for (const city of listHomepageCitiesFromAvailable(vertical)) {
      const seg = normalizeCitySegment(vertical, city.slug);
      out.push(toAbsoluteUrl(`/${vertical}/${encodeURIComponent(seg)}`));
    }
  }
  return dedupeSort(out);
}

/** `/{vertical}/{city}/{locality}` from seed inventory (unique location labels per city). */
export function collectLocalityPagesSitemapUrls(): string[] {
  const out: string[] = [];
  for (const vertical of VERTICALS) {
    for (const city of listCitiesByVertical(vertical)) {
      const citySeg = normalizeCitySegment(vertical, city.slug);
      const locations = new Set(
        listSpaces({ vertical, city: city.slug })
          .map((s) => s.location?.trim())
          .filter((loc): loc is string => Boolean(loc)),
      );
      for (const loc of locations) {
        out.push(
          toAbsoluteUrl(`/${vertical}/${encodeURIComponent(citySeg)}/${encodeURIComponent(loc)}`),
        );
      }
    }
  }
  return dedupeSort(out);
}

export function collectCoworkingSpacesSitemapUrls(): string[] {
  return collectVerticalSpaceDetailUrls("coworking");
}

export function collectVirtualOfficeSpacesSitemapUrls(): string[] {
  return collectVerticalSpaceDetailUrls("virtual-office");
}

export function collectOfficeSpaceSitemapUrls(): string[] {
  return collectVerticalSpaceDetailUrls("office-space");
}

function collectVerticalSpaceDetailUrls(vertical: SpaceVertical): string[] {
  const citySlugs = citySlugSet(vertical);
  const out: string[] = [];

  for (const space of listSpaces({ vertical })) {
    const slug = space.slug?.trim();
    if (!slug) continue;
    const asCityKey = normalizeCitySegment(vertical, slug);
    if (citySlugs.has(asCityKey)) continue;
    out.push(toAbsoluteUrl(`/${vertical}/${encodeURIComponent(slug)}`));
  }

  return dedupeSort(out);
}
