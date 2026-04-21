import { AVAILABLE_CITY } from "@/services/cities-data";
import type { City } from "@/types";

/** Max cities on the homepage rail and hero search (first matches in catalog order). */
const HOMEPAGE_CITY_LIMIT = 8;

/** Route slug used in this app (seed data, URLs). */
const ROUTE_SLUG_OVERRIDES: Record<string, string> = {
  gurugram: "gurgaon",
};

function toDisplayName(rawName: string): string {
  if (rawName === "gurugram") return "Gurugram";
  const normalized = rawName.replace(/-/g, " ");
  return normalized.replace(/\b\w/g, (char) => char.toUpperCase());
}

type LooseEntry = Record<string, unknown>;

function isCoworkingCatalogEntry(entry: unknown): entry is LooseEntry {
  if (!entry || typeof entry !== "object") return false;
  const o = entry as LooseEntry;
  if (typeof o.name !== "string" || !o.name.trim()) return false;
  if (typeof o.image !== "string" || !o.image.startsWith("http")) return false;
  return o.for_coWorking === true;
}

/**
 * First {@link HOMEPAGE_CITY_LIMIT} cities from AVAILABLE_CITY with coworking coverage, in catalog order.
 */
export function listHomepageCitiesFromAvailable(): City[] {
  const seen = new Set<string>();
  const result: City[] = [];

  for (const entry of AVAILABLE_CITY) {
    if (!isCoworkingCatalogEntry(entry)) continue;

    const rawName = entry.name as string;
    const slug = ROUTE_SLUG_OVERRIDES[rawName] ?? rawName;
    if (seen.has(slug)) continue;
    seen.add(slug);

    const id =
      typeof entry.id === "string" && entry.id.length > 0
        ? entry.id
        : `available_${slug}`;

    result.push({
      id,
      name: toDisplayName(rawName),
      slug,
      image: entry.image as string,
      tagline: "Premium workspace inventory",
      spaceCount: 0,
    });

    if (result.length >= HOMEPAGE_CITY_LIMIT) break;
  }

  return result;
}
