import type { LocationFormState } from "@/modules/listing/components/wizard/shared-location-step";
import { emptyLocation } from "@/modules/listing/components/wizard/shared-location-step";
import type { ListingModel } from "@/types/listing.model";

export type ColivingRoomDraft = {
  kind: string;
  rent: string;
  deposit: string;
};

export type ColivingAvailableFor = "Students" | "Working Prof." | "Families" | "All";

export type ColivingListingDraft = {
  name: string;
  type: "PG" | "Co-living";
  gender: "Male" | "Female" | "Both";
  availableFor: ColivingAvailableFor;
  postedBy: "Owner" | "Agent" | "Broker";
  plot: string;
  rooms: ColivingRoomDraft[];
  availableFrom: string;
  noticeRequired: boolean;
  noticeDays: string;
  maintenance: boolean;
  maintenanceAmt: string;
  foodIncluded: boolean;
  meals: string[];
  laundry: boolean;
  laundrySchedule: string;
  cleaning: boolean;
  water: boolean;
  parking: boolean;
  vehicles: string;
  amenCommon: string[];
  amenRoom: string[];
  gateClose: boolean;
  gateTime: string;
  rules: string[];
  /** UI only until API adds visitorPolicy */
  visitor: string;
  contactHours: string;
  contactFrom: string;
  contactTo: string;
  location: LocationFormState;
  images: ListingModel.ListingImage[];
  desc: string;
};

export const DEFAULT_COLIVING_LISTING: ColivingListingDraft = {
  name: "",
  type: "PG",
  gender: "Both",
  availableFor: "Students",
  postedBy: "Owner",
  plot: "",
  rooms: [{ kind: "Double", rent: "", deposit: "" }],
  availableFrom: "",
  noticeRequired: false,
  noticeDays: "30 days",
  maintenance: false,
  maintenanceAmt: "",
  foodIncluded: false,
  meals: [],
  laundry: false,
  laundrySchedule: "Weekly",
  cleaning: false,
  water: false,
  parking: false,
  vehicles: "Both",
  amenCommon: [],
  amenRoom: [],
  gateClose: false,
  gateTime: "",
  rules: [],
  visitor: "Allowed in Common Areas",
  contactHours: "All Day",
  contactFrom: "",
  contactTo: "",
  location: emptyLocation,
  images: [],
  desc: "",
};
