import type { ListingModel } from "@/types/listing.model";

import type { LocationFormState } from "../wizard/shared-location-step";

/** A single amenity row the user has picked (keeps the full upstream record). */
export type AmenitySelection = ListingModel.Amenity;

/** A desk-type (`Active_category`) with the user-entered price. */
export type DeskTypeSelection = {
  id: string;
  name: string;
  price: string;
  /** Kept verbatim so we can echo it back into `plans[].category` etc. */
  raw: ListingModel.ActiveCategory;
};

export type CoworkingHoursState = {
  weekdayOpen: boolean;
  weekdayFrom: string;
  weekdayTo: string;
  saturdayOpen: boolean;
  saturdayFrom: string;
  saturdayTo: string;
  sundayOpen: boolean;
  sundayFrom: string;
  sundayTo: string;
};

export type CoworkingWizardState = {
  name: string;
  seats: string;
  description: string;
  deskTypes: DeskTypeSelection[];
  amenities: AmenitySelection[];
  hours: CoworkingHoursState;
  location: LocationFormState;
  images: ListingModel.ListingImage[];
};
