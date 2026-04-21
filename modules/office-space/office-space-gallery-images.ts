import type { OfficeSpaceModel } from "@/types/office-space.model";
import type { ImageGalleryAdjustment } from "@/modules/space-detail/components/image-gallery";

/**
 * Builds `images` + optional `imageAdjustments` for {@link ImageGallery} from office-space API data.
 */
export function officeSpaceGalleryImages(office: OfficeSpaceModel.OfficeSpace): {
  images: string[];
  imageAdjustments: ImageGalleryAdjustment[];
} {
  const rows: { src: string; brightness: number; contrast: number }[] = [];

  const hero = typeof office.image === "string" ? office.image.trim() : "";
  if (hero) {
    rows.push({ src: hero, brightness: 1, contrast: 1 });
  }

  for (const row of office.images ?? []) {
    const src = row?.image?.s3_link?.trim?.() ? row.image.s3_link : "";
    if (!src) continue;
    if (rows.some((x) => x.src === src)) continue;
    rows.push({
      src,
      brightness:
        typeof row?.image?.brightness === "number" && Number.isFinite(row.image.brightness)
          ? row.image.brightness
          : 1,
      contrast:
        typeof row?.image?.contrast === "number" && Number.isFinite(row.image.contrast)
          ? row.image.contrast
          : 1,
    });
  }

  return {
    images: rows.map((r) => r.src),
    imageAdjustments: rows.map((r) => ({ brightness: r.brightness, contrast: r.contrast })),
  };
}
