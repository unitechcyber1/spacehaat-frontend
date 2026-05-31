import type { ListingModel } from "@/types/listing.model";

function str(v: unknown): string {
  if (typeof v === "string") return v.trim();
  if (v == null) return "";
  return String(v).trim();
}

function isHttpUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

function urlFromRecord(rec: Record<string, unknown>): string {
  const candidates = [rec.s3_link, rec.url, rec.image_url, rec.link];
  for (const c of candidates) {
    const s = str(c);
    if (s && isHttpUrl(s)) return s;
  }
  return "";
}

function mapOneListingImage(row: unknown, index: number): ListingModel.ListingImage | null {
  const fallbackOrder = index + 1;

  if (row == null) return null;

  if (typeof row === "string") {
    const s = row.trim();
    if (!s) return null;
    if (isHttpUrl(s)) return { image: "", url: s, order: fallbackOrder };
    return { image: s, url: "", order: fallbackOrder };
  }

  if (typeof row !== "object") return null;

  const r = row as Record<string, unknown>;
  const order = typeof r.order === "number" && Number.isFinite(r.order) ? r.order : fallbackOrder;

  // Coworking / office / populated PG: { order, image: { id, s3_link } }
  const nested = r.image;
  if (nested && typeof nested === "object") {
    const asset = nested as Record<string, unknown>;
    const id = str(asset.id ?? asset._id);
    const url = urlFromRecord(asset);
    if (!id && !url) return null;
    return { image: id, url, order };
  }

  if (typeof nested === "string") {
    const nestedStr = nested.trim();
    if (!nestedStr) return null;
    if (isHttpUrl(nestedStr)) {
      return { image: "", url: nestedStr, order };
    }
    const url = urlFromRecord(r);
    return { image: nestedStr, url, order };
  }

  const id = str(r.id ?? r._id);
  const url = urlFromRecord(r);
  if (!id && !url) return null;
  return { image: id, url, order };
}

/**
 * Maps upstream `images[]` (coworking, office, PG) into wizard slots with
 * `{ image: id, url: s3_link, order }` for {@link SharedGalleryStep} previews.
 */
export function mapListingImagesFromApi(raw: unknown): ListingModel.ListingImage[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((row, i) => mapOneListingImage(row, i))
    .filter((x): x is ListingModel.ListingImage => x !== null && Boolean(x.image || x.url))
    .sort((a, b) => a.order - b.order)
    .map((img, i) => ({ ...img, order: i + 1 }));
}
