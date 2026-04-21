import { AVAILABLE_CITY } from "@/services/cities-data";

/** Maps catalog `name` to app route / seed `city` slug. */
const NAME_TO_SLUG: Record<string, string> = {
  gurugram: "gurgaon",
};

/**
 * Alternate slugs/labels users may type or sync from other UIs (e.g. homepage shows "Gurugram"
 * while the API/catalog key is `gurgaon`).
 */
const CITY_SLUG_ALIASES: Record<string, string> = {
  gurugram: "gurgaon",
};

type CatalogEntry = { id: string; name: string };

function asEntry(raw: unknown): CatalogEntry | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const id = typeof o.id === "string" ? o.id : undefined;
  const name = typeof o.name === "string" ? o.name : undefined;
  if (!id || !name) return null;
  return { id, name };
}

/** Mongo-style catalog id → app city slug (for mock-db / URLs). */
export function resolveCatalogIdToSlug(cityId: string): string | null {
  for (const raw of AVAILABLE_CITY) {
    const entry = asEntry(raw);
    if (!entry || entry.id !== cityId) continue;
    return NAME_TO_SLUG[entry.name] ?? entry.name;
  }
  return null;
}

/** Route slug for coworking URLs (aliases homepage/header labels to catalog slugs). */
export function canonicalCoworkingCitySlug(citySlug: string): string {
  const key = citySlug.trim().toLowerCase();
  return CITY_SLUG_ALIASES[key] ?? citySlug.trim();
}

/** App city slug → catalog `_id` string for `/api/user/workSpaces?city=…`. */
export function getCatalogCityIdBySlug(citySlug: string): string | null {
  const key = citySlug.trim().toLowerCase();
  const canonical = CITY_SLUG_ALIASES[key] ?? key;
  for (const raw of AVAILABLE_CITY) {
    const entry = asEntry(raw);
    if (!entry) continue;
    const slug = NAME_TO_SLUG[entry.name] ?? entry.name;
    if (slug === canonical) return entry.id;
  }
  return null;
}
