import { resolvePgListingSlug } from "@/lib/pg-slug";

/** Public coliving detail URL — uses API `slug` on the listing when available. */
export function colivingDetailHref(
  pg: { name: string; slug?: string },
  responseSlug?: string,
): string {
  const key = resolvePgListingSlug(pg, responseSlug);
  return `/coliving/${encodeURIComponent(key)}`;
}
