import type { ColivingListingDraft, ColivingRoomDraft } from "@/modules/listing/coliving/coliving-listing.types";
import { DEFAULT_COLIVING_LISTING } from "@/modules/listing/coliving/coliving-listing.types";
import { emptyLocation } from "@/modules/listing/components/wizard/shared-location-step";
import { mapListingImagesFromApi } from "@/modules/listing/lib/map-listing-images";

type PgApiRecord = Record<string, unknown>;

function str(v: unknown): string {
  return typeof v === "string" ? v : v != null ? String(v) : "";
}

function bool(v: unknown): boolean {
  return v === true || v === "true";
}

function num(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function reverseVehicleType(value: string): ColivingListingDraft["vehicles"] {
  if (value === "Two Wheeler") return "Two-wheeler";
  if (value === "Four Wheeler") return "Four-wheeler";
  if (value === "Both") return "Both";
  return "Both";
}

function formatNoticeDays(days: number): string {
  if (days === 15) return "15 days";
  if (days === 45) return "45 days";
  if (days === 60) return "60 days";
  return "30 days";
}

function formatAvailableFromDisplay(value: unknown): string {
  const s = str(value);
  if (!s) return "";
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) {
    const [y, m, d] = s.slice(0, 10).split("-");
    return `${d} / ${m} / ${y}`;
  }
  return s;
}

function mapRooms(raw: unknown): ColivingRoomDraft[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    return DEFAULT_COLIVING_LISTING.rooms;
  }
  return raw.map((row) => {
    const r = row as PgApiRecord;
    return {
      kind: str(r.roomType) || "Double",
      rent: r.monthlyRent != null ? String(r.monthlyRent) : "",
      deposit: r.expectedDeposit != null ? String(r.expectedDeposit) : "",
    };
  });
}

function mapContactHours(api: PgApiRecord): Pick<
  ColivingListingDraft,
  "contactHours" | "contactFrom" | "contactTo"
> {
  const schedule = str(api.selectTimeSchedule);
  if (schedule === "Custom") {
    return {
      contactHours: "Custom",
      contactFrom: str(api.startTime),
      contactTo: str(api.endTime),
    };
  }
  if (["All Day", "Morning", "Evening"].includes(schedule)) {
    return { contactHours: schedule, contactFrom: "", contactTo: "" };
  }
  return { contactHours: "All Day", contactFrom: "", contactTo: "" };
}

/** Maps `GET /api/admin/pg/:id` response into the coliving listing wizard draft. */
export function mapPgApiToColivingDraft(api: PgApiRecord): ColivingListingDraft {
  const locationIds = api.locationIds as PgApiRecord | undefined;
  const microRaw = locationIds?.micro_location;
  const microId = Array.isArray(microRaw) ? str(microRaw[0]) : str(microRaw);

  const laundry = api.laundryService as PgApiRecord | undefined;
  const laundryLabel = str(laundry?.days || laundry?.title) || "Weekly";

  const typeRaw = str(api.type);
  const type: ColivingListingDraft["type"] =
    typeRaw === "Co-living" || typeRaw === "Coliving" ? "Co-living" : "PG";

  const genderRaw = str(api.preferredGuest);
  const gender: ColivingListingDraft["gender"] =
    genderRaw === "Male" || genderRaw === "Female" ? genderRaw : "Both";

  const availableForRaw = str(api.availableFor);
  const availableForNormalized =
    availableForRaw === "Working Professionals" ? "Working Prof." : availableForRaw;
  const availableFor: ColivingListingDraft["availableFor"] =
    availableForNormalized === "Working Prof." ||
    availableForNormalized === "Families" ||
    availableForNormalized === "All"
      ? availableForNormalized
      : "Students";

  const postedByRaw = str(api.postBy);
  const postedBy: ColivingListingDraft["postedBy"] =
    postedByRaw === "Agent" || postedByRaw === "Broker" ? postedByRaw : "Owner";

  return {
    ...DEFAULT_COLIVING_LISTING,
    name: str(api.name),
    type,
    gender,
    availableFor,
    postedBy,
    plot: str(api.street),
    rooms: mapRooms(api.pgRooms),
    availableFrom: formatAvailableFromDisplay(api.availableFrom),
    noticeRequired: bool(api.noticePeriod),
    noticeDays: formatNoticeDays(num(api.noticePeriodDuration)),
    maintenance: bool(api.maintenanceAmount),
    maintenanceAmt: str(api.maintenanceAmountValue),
    foodIncluded: bool(api.foodIncluded),
    meals: Array.isArray(api.includedMeals) ? api.includedMeals.map(str) : [],
    laundry: bool(api.isLaundryService),
    laundrySchedule: laundryLabel,
    cleaning: bool(api.roomCleaning),
    water: bool(api.waterFacility),
    parking: bool(api.parking),
    vehicles: api.parking ? reverseVehicleType(str(api.vehicleType)) : "Both",
    amenCommon: Array.isArray(api.availableAmenities) ? api.availableAmenities.map(str) : [],
    amenRoom: Array.isArray(api.roomAmenities) ? api.roomAmenities.map(str) : [],
    gateClose: bool(api.gateClosing),
    gateTime: str(api.gateClosingTime),
    rules: Array.isArray(api.pgHostelRule) ? api.pgHostelRule.map(str) : [],
    ...mapContactHours(api),
    location: {
      ...emptyLocation,
      cityId: str(locationIds?.city),
      cityName: str(api.city),
      microLocationId: microId,
      microLocationName: str(api.locality),
      address: str(api.address),
    },
    images: mapListingImagesFromApi(api.images ?? api.propertyMedia),
    desc: str(api.description),
  };
}
