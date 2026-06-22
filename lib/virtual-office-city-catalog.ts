import { AVAILABLE_CITY_VIRTUAL_OFFICE } from "@/services/cities-data";

export type VirtualOfficeCatalogLocation = {
  locality: string;
  starting_price?: string;
  bgImg?: string;
};

export type VirtualOfficeCatalogCity = {
  name: string;
  id: string;
  slug: string;
  price?: string;
  image?: string;
  featureImage?: string;
  locations: VirtualOfficeCatalogLocation[];
};

const SLUG_ALIASES: Record<string, string[]> = {
  gurgaon: ["gurgaon", "gurugram"],
  gurugram: ["gurgaon", "gurugram"],
};

function normalizeRouteSlug(value: string): string {
  return value.trim().toLowerCase().replace(/_/g, "-");
}

function catalogEntrySlug(entry: { name: string; slug?: string }): string {
  const fromPath = entry.slug?.split("/").filter(Boolean).pop();
  if (fromPath) return normalizeRouteSlug(fromPath);
  return normalizeRouteSlug(entry.name);
}

export function parseInrPrice(raw?: string | null): number | null {
  if (!raw?.trim()) return null;
  const match = raw.replace(/,/g, "").match(/(\d+)/);
  if (!match) return null;
  const n = Number.parseInt(match[1], 10);
  return Number.isFinite(n) ? n : null;
}

export function formatInrPrice(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function localityToSlug(locality: string): string {
  return locality
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getVirtualOfficeCityDisplayName(citySlug: string, rawName?: string): string {
  const slug = normalizeRouteSlug(citySlug);
  if (slug === "gurgaon" || slug === "gurugram" || rawName?.toLowerCase() === "gurugram") {
    return "Gurgaon";
  }
  if (rawName?.trim()) {
    return rawName.replace(/\b\w/g, (c) => c.toUpperCase());
  }
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

export function getVirtualOfficeCityCatalogBySlug(
  citySlug: string,
): VirtualOfficeCatalogCity | null {
  const slug = normalizeRouteSlug(citySlug);
  const aliases = SLUG_ALIASES[slug] ?? [slug];

  const entry = AVAILABLE_CITY_VIRTUAL_OFFICE.find((row) => {
    const rowSlug = catalogEntrySlug(row as { name: string; slug?: string });
    const rowName = normalizeRouteSlug(String(row.name));
    return aliases.includes(rowSlug) || aliases.includes(rowName);
  });

  if (!entry) return null;

  const locations = Array.isArray((entry as { locations?: VirtualOfficeCatalogLocation[] }).locations)
    ? ((entry as { locations: VirtualOfficeCatalogLocation[] }).locations ?? [])
    : [];

  return {
    name: String(entry.name),
    id: String(entry.id),
    slug: catalogEntrySlug(entry as { name: string; slug?: string }),
    price: typeof entry.price === "string" ? entry.price : undefined,
    image: typeof entry.image === "string" ? entry.image : undefined,
    featureImage:
      typeof (entry as { featureImage?: string }).featureImage === "string"
        ? (entry as { featureImage: string }).featureImage
        : undefined,
    locations,
  };
}

export function getCityLowestMonthlyPrice(catalog: VirtualOfficeCatalogCity): number {
  const fromCity = parseInrPrice(catalog.price);
  const fromLocations = catalog.locations
    .map((loc) => parseInrPrice(loc.starting_price))
    .filter((n): n is number => n != null);

  const candidates = [...fromLocations, ...(fromCity != null ? [fromCity] : [])];
  if (!candidates.length) return 999;
  return Math.min(...candidates);
}

export function getVirtualOfficePlanPrices(catalog: VirtualOfficeCatalogCity) {
  const base = getCityLowestMonthlyPrice(catalog);
  return {
    businessAddress: base,
    gstRegistration: Math.max(base + 300, Math.round(base * 1.35)),
    companyRegistration: Math.max(base + 800, Math.round(base * 1.75)),
  };
}

export function getLocationPriceLabel(loc: VirtualOfficeCatalogLocation): string {
  const parsed = parseInrPrice(loc.starting_price);
  if (parsed != null) return `${formatInrPrice(parsed)}/mo`;
  if (loc.starting_price?.trim()) return loc.starting_price.replace(/^Starting\s*/i, "");
  return "On request";
}

const LOCATION_BADGES = [
  { label: "Most Popular", className: "bg-[#EDF7EE] text-[color:var(--color-brand)]" },
  { label: "Best Value", className: "bg-[#E7F8EF] text-emerald-600" },
  { label: "Premium", className: "bg-slate-900 text-white" },
  { label: "Established Hub", className: "bg-[#E6EEFA] text-[#0057B7]" },
  { label: "Central", className: "bg-[#EDF7EE] text-[color:var(--color-brand)]" },
] as const;

export function locationBadgeAt(index: number) {
  return LOCATION_BADGES[index % LOCATION_BADGES.length];
}

/** Nationwide catalog for the virtual office homepage lead wizard (city names as zones). */
export function getVirtualOfficeHomepageCatalog(): VirtualOfficeCatalogCity {
  const locations: VirtualOfficeCatalogLocation[] = AVAILABLE_CITY_VIRTUAL_OFFICE.map((entry) => {
    const slug = catalogEntrySlug(entry as { name: string; slug?: string });
    return {
      locality: getVirtualOfficeCityDisplayName(slug, String(entry.name)),
    };
  });

  return {
    name: "India",
    id: "virtual-office-home",
    slug: "india",
    locations,
  };
}
