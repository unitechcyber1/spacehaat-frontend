import type { PgDetail } from "@/types/pg.model";

/** Client-side slug for list links when API omits `slug`. */
export function slugifyPgName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Prefer API `slug`, then an explicit detail response slug, then name slug. */
export function resolvePgListingSlug(
  pg: { name: string; slug?: string },
  responseSlug?: string,
): string {
  const fromRow = pg.slug?.trim();
  if (fromRow) return fromRow;
  const fromResponse = responseSlug?.trim();
  if (fromResponse) return fromResponse;
  return slugifyPgName(pg.name);
}

/** Stable React key for PG list rows (slug → address → index fallback). */
export function pgListingReactKey(pg: PgDetail, index = 0): string {
  const slug = pg.slug?.trim();
  if (slug) return slug;

  const addressKey = [pg.address?.trim(), pg.street?.trim()].filter(Boolean).join("|");
  const base = `${pg.name}::${pg.locality}`;
  if (addressKey) return `${base}::${addressKey}`;

  return `${base}::${index}`;
}

