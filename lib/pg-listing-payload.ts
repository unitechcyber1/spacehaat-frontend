import { DEFAULT_COUNTRY_ID } from "@/modules/listing/components/wizard/constants";
import type { LocationFormState } from "@/modules/listing/components/wizard/shared-location-step";
import { validateLocation } from "@/modules/listing/components/wizard/shared-location-step";
import type { ColivingListingDraft } from "@/modules/listing/coliving/coliving-listing.types";
import type { ListingModel } from "@/types/listing.model";

/** Exact upstream shape for `POST|PUT /api/admin/pg`. */
export type PgCreatePayload = {
  userId: string;
  name: string;
  contactNumber: string;
  contactEmail: string;
  city: string;
  locality: string;
  address: string;
  street: string;
  locationIds: {
    address: string;
    country: string;
    state: string;
    city: string;
    micro_location: string[];
  };
  images: { image: string; order: number }[];
  noticePeriod: boolean;
  noticePeriodDuration: number;
  maintenanceAmount: boolean;
  maintenanceAmountValue: string;
  foodIncluded: boolean;
  includedMeals: string[];
  pgHostelRule: string[];
  isLaundryService: boolean;
  laundryService: { title: string; days: string };
  roomCleaning: boolean;
  waterFacility: boolean;
  parking: boolean;
  availableAmenities: string[];
  roomAmenities: string[];
  gateClosing: boolean;
  gateClosingTime: string;
  preferredGuest: string;
  vehicleType: string;
  availableFor: string;
  availableFrom: string;
  postBy: string;
  selectTimeSchedule: string;
  startTime?: string;
  endTime?: string;
  description: string;
  form_status: string;
  pgRooms: {
    roomType: string;
    monthlyRent: number;
    expectedDeposit: number;
    roomImage: string[];
  }[];
  owner: unknown[];
};

export type BuildPgPayloadOptions = {
  draft: ColivingListingDraft;
  location: LocationFormState;
  images: ListingModel.ListingImage[];
  userId: string;
  contactNumber?: string;
  contactEmail?: string;
};

function parseNoticeDays(value: string): number {
  const n = parseInt(value.replace(/\D/g, ""), 10);
  return Number.isFinite(n) && n > 0 ? n : 30;
}

function parseRent(value: string): number {
  const n = Number(value.replace(/,/g, "").trim());
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function mapVehicleType(value: string): string {
  if (value === "Two-wheeler") return "Two Wheeler";
  if (value === "Four-wheeler") return "Four Wheeler";
  if (value === "Both") return "Both";
  return value;
}

function formatAvailableFrom(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";

  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
    return trimmed.slice(0, 10);
  }

  const parts = trimmed.split(/[/\-.]/).map((p) => p.trim());
  if (parts.length === 3) {
    const [d, m, y] = parts;
    const day = Number(d);
    const month = Number(m);
    let year = Number(y);
    if (year < 100) year += 2000;
    if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 2000) {
      return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    }
  }

  const parsed = Date.parse(trimmed);
  if (!Number.isNaN(parsed)) {
    const d = new Date(parsed);
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
  }

  return trimmed;
}

function mapContactSchedule(draft: ColivingListingDraft): Pick<
  PgCreatePayload,
  "selectTimeSchedule" | "startTime" | "endTime"
> {
  if (draft.contactHours === "Custom") {
    return {
      selectTimeSchedule: "Custom",
      startTime: draft.contactFrom?.trim() || undefined,
      endTime: draft.contactTo?.trim() || undefined,
    };
  }
  return { selectTimeSchedule: draft.contactHours };
}

/** Coliving location validation (no map coordinates). */
export function validateColivingLocation(location: LocationFormState): string | null {
  return validateLocation(location);
}

export function buildPgCreatePayload(options: BuildPgPayloadOptions): PgCreatePayload {
  const { draft, location, images, userId, contactNumber, contactEmail } = options;

  const addressLine = location.address.trim();
  const localityName = location.microLocationName.trim();
  const cityName = location.cityName.trim();

  const pgRooms = draft.rooms.map((r) => ({
    roomType: r.kind,
    monthlyRent: parseRent(r.rent),
    expectedDeposit: parseRent(r.deposit),
    roomImage: [] as string[],
  }));

  const laundrySchedule = draft.laundrySchedule || "Weekly";
  const contact = mapContactSchedule(draft);

  return {
    userId: userId.trim(),
    name: draft.name.trim(),
    contactNumber: contactNumber?.trim() ?? "",
    contactEmail: contactEmail?.trim() ?? "",
    city: cityName,
    locality: localityName,
    address: addressLine,
    street: draft.plot.trim(),
    locationIds: {
      address: [addressLine, localityName, cityName].filter(Boolean).join(", "),
      country: DEFAULT_COUNTRY_ID,
      state: "",
      city: location.cityId,
      micro_location: location.microLocationId ? [location.microLocationId] : [],
    },
    images: images.map((img) => ({ image: img.image, order: img.order })),
    noticePeriod: draft.noticeRequired,
    noticePeriodDuration: draft.noticeRequired ? parseNoticeDays(draft.noticeDays) : 30,
    maintenanceAmount: draft.maintenance,
    maintenanceAmountValue: draft.maintenance ? draft.maintenanceAmt.trim() || "0" : "",
    foodIncluded: draft.foodIncluded,
    includedMeals: draft.foodIncluded ? [...draft.meals] : [],
    pgHostelRule: [...draft.rules],
    isLaundryService: draft.laundry,
    laundryService: {
      title: laundrySchedule,
      days: laundrySchedule,
    },
    roomCleaning: draft.cleaning,
    waterFacility: draft.water,
    parking: draft.parking,
    availableAmenities: [...draft.amenCommon],
    roomAmenities: [...draft.amenRoom],
    gateClosing: draft.gateClose,
    gateClosingTime: draft.gateClose ? draft.gateTime.trim() : "",
    preferredGuest: draft.gender,
    vehicleType: draft.parking ? mapVehicleType(draft.vehicles) : "",
    availableFor: draft.availableFor,
    availableFrom: formatAvailableFrom(draft.availableFrom),
    postBy: draft.postedBy,
    selectTimeSchedule: contact.selectTimeSchedule,
    ...(contact.startTime ? { startTime: contact.startTime } : {}),
    ...(contact.endTime ? { endTime: contact.endTime } : {}),
    description: draft.desc.trim(),
    form_status: "completed",
    pgRooms,
    owner: [],
  };
}
