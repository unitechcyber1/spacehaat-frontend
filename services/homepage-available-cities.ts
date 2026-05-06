import {
  AVAILABLE_CITY,
  AVAILABLE_CITY_OFFICE_SPACE,
  AVAILABLE_CITY_VIRTUAL_OFFICE,
} from "@/services/cities-data";
import type { City } from "@/types";

/** Preferred order for all "Top cities" rails/grids across verticals. */
const CITY_SEQUENCE = [
  "gurgaon",
  "noida",
  "delhi",
  "mumbai",
  "pune",
  "bangalore",
  "hyderabad",
  "ahmedabad",
  "jaipur",
  "chennai",
  "lucknow",
  "indore",
] as const;

/** Max cities on the homepage rail and hero search. */
const HOMEPAGE_CITY_LIMIT = CITY_SEQUENCE.length;

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

function isCatalogEntry(entry: unknown): entry is LooseEntry {
  if (!entry || typeof entry !== "object") return false;
  const o = entry as LooseEntry;
  if (typeof o.name !== "string" || !o.name.trim()) return false;
  if (typeof o.image !== "string" || !o.image.startsWith("http")) return false;
  return true;
}

/**
 * "Top cities" list (homepage rails + vertical pages) in preferred sequence order.
 * Falls back gracefully if a city is missing for the vertical.
 */
export function listHomepageCitiesFromAvailable(
  vertical: "coworking" | "office-space" | "virtual-office" = "coworking",
): City[] {
  const bySlug = new Map<string, LooseEntry>();

  const source =
    vertical === "office-space"
      ? AVAILABLE_CITY_OFFICE_SPACE
      : vertical === "virtual-office"
        ? AVAILABLE_CITY_VIRTUAL_OFFICE
        : AVAILABLE_CITY;

  for (const entry of source) {
    if (!isCatalogEntry(entry)) continue;
    const rawName = (entry as LooseEntry).name as string;
    const slug = ROUTE_SLUG_OVERRIDES[rawName] ?? rawName;
    if (!bySlug.has(slug)) bySlug.set(slug, entry as LooseEntry);
  }

  const result: City[] = [];
  for (const slug of CITY_SEQUENCE) {
    const entry = bySlug.get(slug);
    if (!entry) continue;

    const rawName = entry.name as string;
    const id =
      typeof entry.id === "string" && entry.id.length > 0 ? entry.id : `available_${slug}`;

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
