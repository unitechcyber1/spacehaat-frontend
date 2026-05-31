"use client";

import {
  BedDouble,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Home,
  MapPin,
  Plus,
  Shield,
  Sparkles,
  Trash2,
} from "lucide-react";

import {
  COLIVING_COMMON_AMENITY_ICONS,
  COLIVING_ROOM_AMENITY_ICONS,
} from "./coliving-listing-amenity-icons";
import { COLIVING_HOUSE_RULES } from "./coliving-listing.constants";
import {
  LfAmenGrid,
  LfField,
  LfMoney,
  LfPills,
  LfSeg,
  LfYesNo,
} from "./coliving-listing-primitives";
import type { LocationFormState } from "@/modules/listing/components/wizard/shared-location-step";
import type { ListingModel } from "@/types/listing.model";

import type { ColivingListingDraft, ColivingRoomDraft } from "./coliving-listing.types";

export type ColivingStepProps = {
  data: ColivingListingDraft;
  set: (patch: Partial<ColivingListingDraft>) => void;
  patchLocation?: (patch: Partial<LocationFormState>) => void;
  setImages?: (images: ListingModel.ListingImage[]) => void;
  disabled?: boolean;
};

export function ColivingStepBasic({ data, set }: ColivingStepProps) {
  return (
    <>
      <LfField
        label="Property Name"
        helper="Give your property a friendly name that tenants will remember"
      >
        <input
          className="lf-input"
          placeholder="e.g. Blue Casa, Sunrise PG"
          value={data.name}
          onChange={(e) => set({ name: e.target.value })}
        />
      </LfField>

      <LfField label="Property Type">
        <div className="lf-cardgroup">
          <button
            type="button"
            className={`lf-card-opt ${data.type === "PG" ? "selected" : ""}`}
            onClick={() => set({ type: "PG" })}
          >
            <div className="lf-card-icon">
              <BedDouble size={22} strokeWidth={1.6} />
            </div>
            <div className="lf-card-title">PG</div>
            <div className="lf-card-desc">Shared rooms with common facilities</div>
          </button>
          <button
            type="button"
            className={`lf-card-opt ${data.type === "Co-living" ? "selected" : ""}`}
            onClick={() => set({ type: "Co-living" })}
          >
            <div className="lf-card-icon">
              <Home size={22} strokeWidth={1.6} />
            </div>
            <div className="lf-card-title">Co-living</div>
            <div className="lf-card-desc">Private or semi-private rooms, community living</div>
          </button>
        </div>
      </LfField>

      <LfField label="Who can stay?">
        <LfSeg
          value={data.gender}
          options={["Male", "Female", "Both"]}
          onChange={(v) => set({ gender: v as ColivingListingDraft["gender"] })}
        />
      </LfField>

      <LfField label="Available for" helper="Who is this property best suited for?">
        <LfSeg
          value={data.availableFor}
          options={["Students", "Working Prof.", "Families", "All"]}
          onChange={(v) => set({ availableFor: v as ColivingListingDraft["availableFor"] })}
        />
      </LfField>

      <LfField label="Posted by">
        <div className="lf-radiolist">
          {(["Owner", "Agent", "Broker"] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              className={`lf-radio ${data.postedBy === opt ? "selected" : ""}`}
              onClick={() => set({ postedBy: opt })}
            >
              <span className="lf-radio-dot" />
              {opt}
            </button>
          ))}
        </div>
      </LfField>
    </>
  );
}

function RoomCard({
  room,
  idx,
  onChange,
  onRemove,
  canRemove,
}: {
  room: ColivingRoomDraft;
  idx: number;
  onChange: (r: ColivingRoomDraft) => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  return (
    <div className="lf-room-card">
      <div className="lf-room-card-head">
        <div className="lf-room-card-title">
          <span className="lf-room-num">{idx + 1}</span>
          Room Type {idx + 1}
        </div>
        {canRemove ? (
          <button type="button" className="lf-icon-btn" onClick={onRemove} aria-label="Remove room">
            <Trash2 size={14} strokeWidth={1.8} />
          </button>
        ) : null}
      </div>
      <LfField label="Room Type">
        <select
          className="lf-select"
          value={room.kind}
          onChange={(e) => onChange({ ...room, kind: e.target.value })}
        >
          {["Single", "Double", "Triple", "Four-bed"].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </LfField>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <LfField label="Monthly Rent" helper="per person / month">
          <LfMoney
            value={room.rent}
            placeholder="10,000"
            onChange={(v) => onChange({ ...room, rent: v })}
          />
        </LfField>
        <LfField label="Security Deposit" helper="refundable">
          <LfMoney
            value={room.deposit}
            placeholder="5,000"
            onChange={(v) => onChange({ ...room, deposit: v })}
          />
        </LfField>
      </div>
    </div>
  );
}

export function ColivingStepRooms({ data, set }: ColivingStepProps) {
  const rooms = data.rooms;
  const upd = (i: number, r: ColivingRoomDraft) =>
    set({ rooms: rooms.map((x, j) => (i === j ? r : x)) });
  const rm = (i: number) => set({ rooms: rooms.filter((_, j) => j !== i) });
  const add = () => set({ rooms: [...rooms, { kind: "Double", rent: "", deposit: "" }] });

  return (
    <>
      {rooms.map((r, i) => (
        <RoomCard
          key={i}
          room={r}
          idx={i}
          onChange={(nr) => upd(i, nr)}
          onRemove={() => rm(i)}
          canRemove={rooms.length > 1}
        />
      ))}
      <button type="button" className="lf-add-room" onClick={add}>
        <Plus size={14} strokeWidth={2.4} /> Add Room Type
      </button>

      <LfField label="Available From" helper="When can tenants move in?">
        <div className="lf-input-wrap">
          <span className="lf-leading">
            <Calendar size={14} strokeWidth={2} />
          </span>
          <input
            className="lf-input"
            placeholder="DD / MM / YYYY"
            value={data.availableFrom}
            onChange={(e) => set({ availableFrom: e.target.value })}
          />
        </div>
      </LfField>

      <LfYesNo
        label="Notice period required?"
        value={data.noticeRequired}
        onChange={(v) => set({ noticeRequired: v })}
      />
      {data.noticeRequired ? (
        <LfField label="Notice Period">
          <LfSeg
            value={data.noticeDays}
            options={["15 days", "30 days", "45 days", "60 days"]}
            onChange={(v) => set({ noticeDays: v })}
          />
        </LfField>
      ) : null}

      <LfYesNo
        label="Monthly maintenance charge?"
        value={data.maintenance}
        onChange={(v) => set({ maintenance: v })}
      />
      {data.maintenance ? (
        <LfField label="Monthly Maintenance Amount">
          <LfMoney
            value={data.maintenanceAmt}
            placeholder="500"
            onChange={(v) => set({ maintenanceAmt: v })}
          />
        </LfField>
      ) : null}
    </>
  );
}

export function ColivingStepServices({ data, set }: ColivingStepProps) {
  return (
    <>
      <LfYesNo
        label="Is food included in rent?"
        value={data.foodIncluded}
        onChange={(v) => set({ foodIncluded: v })}
      />
      {data.foodIncluded ? (
        <LfField label="Which meals?">
          <LfPills
            value={data.meals}
            options={["Breakfast", "Lunch", "Dinner", "Evening Snacks"]}
            onChange={(v) => set({ meals: v as string[] })}
          />
        </LfField>
      ) : null}

      <LfYesNo
        label="Laundry service available?"
        value={data.laundry}
        onChange={(v) => set({ laundry: v })}
      />
      {data.laundry ? (
        <LfField label="Schedule">
          <LfSeg
            value={data.laundrySchedule}
            options={["Daily", "Weekdays", "Weekly"]}
            onChange={(v) => set({ laundrySchedule: v })}
          />
        </LfField>
      ) : null}

      <LfYesNo
        label="Daily room cleaning?"
        value={data.cleaning}
        onChange={(v) => set({ cleaning: v })}
      />
      <LfYesNo
        label="24/7 water supply?"
        value={data.water}
        onChange={(v) => set({ water: v })}
      />
      <LfYesNo
        label="Parking available?"
        value={data.parking}
        onChange={(v) => set({ parking: v })}
      />
      {data.parking ? (
        <LfField label="Vehicle Type">
          <LfPills
            value={data.vehicles}
            options={["Two-wheeler", "Four-wheeler", "Both"]}
            onChange={(v) => set({ vehicles: v as string })}
            multi={false}
          />
        </LfField>
      ) : null}
    </>
  );
}

export function ColivingStepAmenities({ data, set }: ColivingStepProps) {
  return (
    <>
      <div className="lf-helper tip">
        <Sparkles size={14} fill="currentColor" />
        <span>
          Properties with more amenities get <b>3× more inquiries</b>.
        </span>
      </div>

      <div>
        <div className="lf-section-h">Common / Building</div>
        <LfAmenGrid
          list={COLIVING_COMMON_AMENITY_ICONS}
          value={data.amenCommon}
          onChange={(v) => set({ amenCommon: v })}
        />
      </div>

      <div>
        <div className="lf-section-h">In-Room</div>
        <LfAmenGrid
          list={COLIVING_ROOM_AMENITY_ICONS}
          value={data.amenRoom}
          onChange={(v) => set({ amenRoom: v })}
        />
      </div>
    </>
  );
}

export function ColivingStepRules({ data, set }: ColivingStepProps) {
  return (
    <>
      <LfYesNo
        label="Gate closing time?"
        hint="Lets tenants know when entry closes"
        value={data.gateClose}
        onChange={(v) => set({ gateClose: v })}
      />
      {data.gateClose ? (
        <LfField label="Closing Time">
          <div className="lf-input-wrap">
            <span className="lf-leading">
              <Clock size={14} strokeWidth={2} />
            </span>
            <input
              className="lf-input"
              placeholder="e.g. 10:30 PM"
              value={data.gateTime}
              onChange={(e) => set({ gateTime: e.target.value })}
            />
          </div>
        </LfField>
      ) : null}

      <LfField label="House Rules" helper="Tap all that apply">
        <LfPills
          value={data.rules}
          options={COLIVING_HOUSE_RULES}
          onChange={(v) => set({ rules: v as string[] })}
        />
      </LfField>

      <LfField label="Visitor Policy">
        <select
          className="lf-select"
          value={data.visitor}
          onChange={(e) => set({ visitor: e.target.value })}
        >
          <option>Not Allowed</option>
          <option>Allowed in Common Areas</option>
          <option>Allowed in Rooms with Permission</option>
        </select>
      </LfField>

      <LfField label="Contact Availability">
        <LfSeg
          value={data.contactHours}
          options={["All Day", "Morning", "Evening", "Custom"]}
          onChange={(v) => set({ contactHours: v })}
        />
      </LfField>
      {data.contactHours === "Custom" ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <LfField label="From">
            <input
              className="lf-input"
              placeholder="9:00 AM"
              value={data.contactFrom || ""}
              onChange={(e) => set({ contactFrom: e.target.value })}
            />
          </LfField>
          <LfField label="To">
            <input
              className="lf-input"
              placeholder="8:00 PM"
              value={data.contactTo || ""}
              onChange={(e) => set({ contactTo: e.target.value })}
            />
          </LfField>
        </div>
      ) : null}
    </>
  );
}

export function ColivingStepDescription({ data, set, disabled }: ColivingStepProps) {
  return (
    <>
      <LfField label="Property Description" helper="Tenants will read this on your listing page">
        <textarea
          className="lf-textarea"
          rows={5}
          placeholder="Describe what makes your property special — the vibe, the location advantages, who it's best suited for…"
          value={data.desc}
          onChange={(e) => set({ desc: e.target.value.slice(0, 500) })}
          disabled={disabled}
        />
        <div className="lf-counter">
          <span>
            <b>{(data.desc || "").length}</b> / 500
          </span>
        </div>
      </LfField>

      <div className="lf-banner">
        <div className="lf-banner-ic">
          <Shield size={16} strokeWidth={2} />
        </div>
        <div className="lf-banner-content">
          <b>Verified within 24 hours</b>
          Our team will verify your property after submission. Verified listings get{" "}
          <b style={{ display: "inline" }}>2× more inquiries</b>.
        </div>
      </div>
    </>
  );
}

export function ColivingStepSuccess({
  data,
  onView,
  onAnother,
}: {
  data: ColivingListingDraft;
  onView: () => void;
  onAnother: () => void;
}) {
  return (
    <div className="lf-success">
      <div className="lf-check-burst">
        <div className="lf-ring" />
        <div className="lf-ring" />
        <div className="lf-check">
          <Check size={38} strokeWidth={3} />
        </div>
      </div>
      <h1>Your property has been submitted!</h1>
      <p>
        We&apos;ll review and publish your listing within 24 hours. We&apos;ll text you when
        it&apos;s live.
      </p>

      <div className="lf-summary">
        <div className="lf-summary-thumb" />
        <div className="lf-summary-meta">
          <div className="lf-summary-name">{data.name || "Sunrise PG"}</div>
          <div className="lf-summary-loc">
            <MapPin size={14} strokeWidth={2} />
            <span>
              {data.location.microLocationName || "Koramangala"},{" "}
              {data.location.cityName || "Bangalore"}
            </span>
          </div>
        </div>
        <div className="lf-summary-status">In Review</div>
      </div>

      <div className="lf-success-stats">
        <span className="lf-stat">
          <Clock size={14} strokeWidth={2} /> <b>~24h</b> review
        </span>
        <span className="lf-stat">
          <Sparkles size={14} fill="currentColor" /> <b>Verified</b> badge
        </span>
      </div>

      <div className="lf-success-actions">
        <button type="button" className="lf-btn primary" onClick={onView}>
          My listings
        </button>
        <button type="button" className="lf-btn ghost" onClick={onAnother}>
          List Another Property
        </button>
      </div>
    </div>
  );
}

export function ColivingChevron({ direction }: { direction: "left" | "right" }) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return <Icon size={16} strokeWidth={2} />;
}
