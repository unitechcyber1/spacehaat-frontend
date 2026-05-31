"use client";

import { Calendar, Clock, Plus, Sparkles, Trash2 } from "lucide-react";

import {
  COLIVING_COMMON_AMENITY_ICONS,
  COLIVING_ROOM_AMENITY_ICONS,
} from "./coliving-listing-amenity-icons";
import { COLIVING_HOUSE_RULES } from "./coliving-listing.constants";
import { ColivingListingLocationStep } from "./coliving-listing-location-step";
import { ColivingListingPhotosStep } from "./coliving-listing-photos-step";
import {
  LfAmenGrid,
  LfField,
  LfMoney,
  LfPills,
  LfSeg,
  LfYesNo,
} from "./coliving-listing-primitives";
import {
  ColivingStepAmenities,
  ColivingStepBasic,
  ColivingStepDescription,
  ColivingStepRooms,
  ColivingStepRules,
  ColivingStepServices,
  type ColivingStepProps,
} from "./coliving-listing-steps";
import type { ColivingListingDraft, ColivingRoomDraft } from "./coliving-listing.types";

type BodyProps = ColivingStepProps & { stepIdx: number };

export function ColivingStepBody({ stepIdx, data, set, patchLocation, setImages, disabled }: BodyProps) {
  if (stepIdx === 2) return <ColivingStepRoomsDesktop data={data} set={set} disabled={disabled} />;
  if (stepIdx === 4) return <ColivingStepAmenitiesDesktop data={data} set={set} disabled={disabled} />;
  if (stepIdx === 5) return <ColivingStepRulesDesktop data={data} set={set} disabled={disabled} />;
  switch (stepIdx) {
    case 0:
      return <ColivingStepBasic data={data} set={set} disabled={disabled} />;
    case 1:
      return (
        <ColivingListingLocationStep
          location={data.location}
          onLocationChange={(patch) => patchLocation?.(patch)}
          plot={data.plot}
          onPlotChange={(plot) => set({ plot })}
          disabled={disabled}
        />
      );
    case 3:
      return <ColivingStepServices data={data} set={set} disabled={disabled} />;
    case 6:
      return (
        <>
          <ColivingListingPhotosStep
            images={data.images}
            onChange={(images) => setImages?.(images)}
            disabled={disabled}
          />
          <ColivingStepDescription data={data} set={set} disabled={disabled} />
        </>
      );
    default:
      return null;
  }
}

export function ColivingMobileStepBody(props: BodyProps) {
  const { stepIdx } = props;
  if (stepIdx === 2) return <ColivingStepRooms {...props} />;
  if (stepIdx === 4) return <ColivingStepAmenities {...props} />;
  if (stepIdx === 5) return <ColivingStepRules {...props} />;
  return <ColivingStepBody {...props} />;
}

function RoomCardLite({
  room,
  idx,
  onChange,
  onRemove,
  canRemove,
  disabled,
}: {
  room: ColivingRoomDraft;
  idx: number;
  onChange: (r: ColivingRoomDraft) => void;
  onRemove: () => void;
  canRemove: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="lf-room-card">
      <div className="lf-room-card-head">
        <div className="lf-room-card-title">
          <span className="lf-room-num">{idx + 1}</span>
          Room Type {idx + 1}
        </div>
        {canRemove ? (
          <button type="button" className="lf-icon-btn" onClick={onRemove} disabled={disabled}>
            <Trash2 size={14} strokeWidth={1.8} />
          </button>
        ) : null}
      </div>
      <LfField label="Room Type">
        <select
          className="lf-select"
          value={room.kind}
          onChange={(e) => onChange({ ...room, kind: e.target.value })}
          disabled={disabled}
        >
          {["Single", "Double", "Triple", "Four-bed"].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </LfField>
      <LfField label="Monthly Rent" helper="Per person / month">
        <LfMoney value={room.rent} placeholder="10,000" onChange={(v) => onChange({ ...room, rent: v })} />
      </LfField>
      <LfField label="Security Deposit" helper="One-time, refundable">
        <LfMoney
          value={room.deposit}
          placeholder="5,000"
          onChange={(v) => onChange({ ...room, deposit: v })}
        />
      </LfField>
    </div>
  );
}

function ColivingStepRoomsDesktop({ data, set, disabled }: ColivingStepProps) {
  const rooms = data.rooms;
  const upd = (i: number, r: ColivingRoomDraft) =>
    set({ rooms: rooms.map((x, j) => (i === j ? r : x)) });
  const rm = (i: number) => set({ rooms: rooms.filter((_, j) => j !== i) });
  const add = () => set({ rooms: [...rooms, { kind: "Double", rent: "", deposit: "" }] });

  return (
    <>
      <div className="lfd-group-h">
        Room types <span className="lfd-group-count">{rooms.length} added</span>
      </div>
      <div className="lfd-rooms-grid">
        {rooms.map((r, i) => (
          <RoomCardLite
            key={i}
            room={r}
            idx={i}
            onChange={(nr) => upd(i, nr)}
            onRemove={() => rm(i)}
            canRemove={rooms.length > 1}
            disabled={disabled}
          />
        ))}
        <button
          type="button"
          className="lf-add-room"
          onClick={add}
          disabled={disabled}
          style={{ height: "100%", minHeight: 200 }}
        >
          <Plus size={14} strokeWidth={2.4} /> Add Room Type
        </button>
      </div>

      <div className="lfd-group-h">Move-in &amp; charges</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
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
              disabled={disabled}
            />
          </div>
        </LfField>
        <div />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <LfYesNo
            label="Notice period required?"
            value={data.noticeRequired}
            onChange={(v) => set({ noticeRequired: v })}
          />
          {data.noticeRequired ? (
            <div style={{ marginTop: 10 }}>
              <LfSeg
                value={data.noticeDays}
                options={["15 days", "30 days", "45 days", "60 days"]}
                onChange={(v) => set({ noticeDays: v })}
              />
            </div>
          ) : null}
        </div>
        <div>
          <LfYesNo
            label="Monthly maintenance charge?"
            value={data.maintenance}
            onChange={(v) => set({ maintenance: v })}
          />
          {data.maintenance ? (
            <div style={{ marginTop: 10 }}>
              <LfMoney
                value={data.maintenanceAmt}
                placeholder="500"
                onChange={(v) => set({ maintenanceAmt: v })}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

function ColivingStepAmenitiesDesktop({ data, set, disabled }: ColivingStepProps) {
  const common = (data.amenCommon || []).length;
  const inroom = (data.amenRoom || []).length;
  return (
    <>
      <div className="lf-helper tip" style={{ fontSize: 13, padding: "10px 14px" }}>
        <Sparkles size={14} fill="currentColor" />
        <span>
          Properties with more amenities get <b>3× more inquiries</b>.
        </span>
      </div>
      <div>
        <div className="lfd-group-h">
          Common / Building{" "}
          <span className="lfd-group-count">
            {common} of {COLIVING_COMMON_AMENITY_ICONS.length} selected
          </span>
        </div>
        <LfAmenGrid
          list={COLIVING_COMMON_AMENITY_ICONS}
          value={data.amenCommon}
          onChange={(v) => set({ amenCommon: v })}
        />
      </div>
      <div>
        <div className="lfd-group-h">
          In-Room{" "}
          <span className="lfd-group-count">
            {inroom} of {COLIVING_ROOM_AMENITY_ICONS.length} selected
          </span>
        </div>
        <LfAmenGrid
          list={COLIVING_ROOM_AMENITY_ICONS}
          value={data.amenRoom}
          onChange={(v) => set({ amenRoom: v })}
        />
      </div>
    </>
  );
}

function ColivingStepRulesDesktop({ data, set, disabled }: ColivingStepProps) {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <LfYesNo
            label="Gate closing time?"
            value={data.gateClose}
            onChange={(v) => set({ gateClose: v })}
          />
          {data.gateClose ? (
            <div style={{ marginTop: 10 }}>
              <div className="lf-input-wrap">
                <span className="lf-leading">
                  <Clock size={14} strokeWidth={2} />
                </span>
                <input
                  className="lf-input"
                  placeholder="e.g. 10:30 PM"
                  value={data.gateTime}
                  onChange={(e) => set({ gateTime: e.target.value })}
                  disabled={disabled}
                />
              </div>
            </div>
          ) : null}
        </div>
        <LfField label="Visitor Policy">
          <select
            className="lf-select"
            value={data.visitor}
            onChange={(e) => set({ visitor: e.target.value })}
            disabled={disabled}
          >
            <option>Not Allowed</option>
            <option>Allowed in Common Areas</option>
            <option>Allowed in Rooms with Permission</option>
          </select>
        </LfField>
      </div>

      <LfField label="House Rules" helper="Select all that apply">
        <LfPills
          value={data.rules}
          options={COLIVING_HOUSE_RULES}
          onChange={(v) => set({ rules: v as string[] })}
        />
      </LfField>

      <LfField label="Contact Availability">
        <LfSeg
          value={data.contactHours}
          options={["All Day", "Morning", "Evening", "Custom"]}
          onChange={(v) => set({ contactHours: v })}
        />
      </LfField>
      {data.contactHours === "Custom" ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <LfField label="From">
            <input
              className="lf-input"
              placeholder="9:00 AM"
              value={data.contactFrom || ""}
              onChange={(e) => set({ contactFrom: e.target.value })}
              disabled={disabled}
            />
          </LfField>
          <LfField label="To">
            <input
              className="lf-input"
              placeholder="8:00 PM"
              value={data.contactTo || ""}
              onChange={(e) => set({ contactTo: e.target.value })}
              disabled={disabled}
            />
          </LfField>
        </div>
      ) : null}
    </>
  );
}
