import type { OfficeSpaceModel } from "@/types/office-space.model";
import type { ListingModel } from "@/types/listing.model";

import type { OfficeWizardState } from "../components/office-wizard/use-office-wizard";
import { emptyLocation } from "../components/wizard/shared-location-step";

/**
 * Map API office space (vendor GET) into wizard state for editing.
 */
export function mapOfficeSpaceToOfficeWizardState(
  office: OfficeSpaceModel.OfficeSpace,
): OfficeWizardState {
  const loc = office.location;
  const city = loc?.city;
  const micro = loc?.micro_location;
  const cityId = typeof city === "object" && city && "id" in city ? String(city.id) : "";
  const cityName = typeof city === "object" && city && "name" in city ? String(city.name) : "";
  let microId = "";
  let microName = "";
  if (typeof micro === "object" && micro) {
    microId = String((micro as { id?: string; _id?: string; key?: string }).id
      ?? (micro as { _id?: string })._id
      ?? (micro as { key?: string }).key
      ?? "");
    microName = String((micro as { name?: string }).name ?? "");
  }

  const other = office.other_detail;
  const area = other?.area_for_lease_in_sq_ft;
  const rent = other?.rent_in_sq_ft;
  const officeType = (other?.office_type as ListingModel.OfficeType | string | undefined) ?? "";

  const amenties = office.amenties as ListingModel.Amenity[] | undefined;
  const images: ListingModel.ListingImage[] = (office.images ?? []).map((row, i) => {
    const asset = row?.image as { id?: string; s3_link?: string } | undefined;
    return {
      image: asset?.id ?? "",
      url: asset?.s3_link ?? "",
      order: typeof row?.order === "number" ? row.order : i + 1,
    };
  }).filter((x) => x.image || x.url);

  return {
    name: String(office.name ?? "").trim(),
    area: area != null && Number.isFinite(Number(area)) ? String(area) : "",
    rent: rent != null ? String(rent) : "",
    officeType: (officeType as OfficeWizardState["officeType"]) || "",
    description: String(office.description ?? "").trim(),
    amenities: Array.isArray(amenties) ? amenties : [],
    location: {
      ...emptyLocation,
      cityId,
      cityName,
      microLocationId: microId,
      microLocationName: microName,
      address: String(loc?.address1 ?? loc?.address ?? "").trim(),
      metroLandmark: String(loc?.landmark ?? "").trim(),
      nearByLandmark: String(
        (loc as { metro_stop_landmark?: string } | undefined)?.metro_stop_landmark
          ?? loc?.metro_detail?.name
          ?? "",
      ).trim(),
    },
    images,
  };
}
