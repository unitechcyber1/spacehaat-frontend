"use client";

import { SharedGalleryStep } from "@/modules/listing/components/wizard/shared-gallery-step";
import type { ListingModel } from "@/types/listing.model";

type Props = {
  images: ListingModel.ListingImage[];
  onChange: (images: ListingModel.ListingImage[]) => void;
  disabled?: boolean;
};

/** Photo upload — same flow as coworking (`POST /api/admin/upload`). */
export function ColivingListingPhotosStep({ images, onChange, disabled }: Props) {
  return (
    <div className="coliving-listing-gallery">
      <SharedGalleryStep images={images} onChange={onChange} disabled={disabled} />
    </div>
  );
}
