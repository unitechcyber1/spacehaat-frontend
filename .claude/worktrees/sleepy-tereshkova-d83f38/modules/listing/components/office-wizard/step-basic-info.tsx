"use client";

import type { ListingModel } from "@/types/listing.model";

import {
  CheckboxGrid,
  Field,
  Select,
  TextArea,
  TextInput,
} from "../wizard/fields";
import { MIN_DESCRIPTION_WORDS, OFFICE_TYPE_OPTIONS } from "../wizard/constants";

import type { UseOfficeWizardReturn } from "./use-office-wizard";

type Props = {
  wizard: UseOfficeWizardReturn;
  amenities: ListingModel.Amenity[];
  amenitiesLoading: boolean;
  amenitiesError: string | null;
};

export function OfficeStepBasicInfo({ wizard, amenities, amenitiesLoading, amenitiesError }: Props) {
  const { state, set, toggleAmenity, busy } = wizard;
  const disabled = busy;
  const descWords = wizard.countWords(state.description);

  const amenityItems = amenities.map((a) => ({ id: a.id, label: a.name }));
  const amenityIds = new Set(state.amenities.map((a) => a.id));

  return (
    <div className="grid gap-6">
      <Field label="Building / office name" required>
        <TextInput
          value={state.name}
          onChange={(v) => set("name", v)}
          placeholder="e.g. DLF Cyber Hub Tower 2"
          disabled={disabled}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Area for lease (sq ft)" required>
          <TextInput
            value={state.area}
            onChange={(v) => set("area", v.replace(/[^0-9]/g, ""))}
            inputMode="numeric"
            placeholder="e.g. 4500"
            disabled={disabled}
          />
        </Field>
        <Field label="Rent per sq ft (₹)" required>
          <TextInput
            value={state.rent}
            onChange={(v) => set("rent", v)}
            inputMode="decimal"
            placeholder="e.g. 150"
            disabled={disabled}
          />
        </Field>
      </div>

      <Field label="Furnishing type" required>
        <Select
          value={state.officeType}
          onChange={(v) => set("officeType", v as ListingModel.OfficeType)}
          options={OFFICE_TYPE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          placeholder="Select furnishing"
          disabled={disabled}
        />
      </Field>

      <Field
        label="Description"
        required
        hint={`${descWords} / ${MIN_DESCRIPTION_WORDS} words minimum`}
      >
        <TextArea
          value={state.description}
          onChange={(v) => set("description", v)}
          placeholder="Describe the building, floor plate, approach, nearby landmarks, parking, security, etc."
          rows={6}
          disabled={disabled}
        />
      </Field>

      <div className="grid gap-3">
        <div>
          <h3 className="text-sm font-semibold text-ink">Amenities</h3>
          <p className="mt-1 text-xs text-ink/60">
            Pick everything the property offers. These drive search filters.
          </p>
        </div>
        {amenitiesError ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {amenitiesError}
          </div>
        ) : amenitiesLoading ? (
          <p className="text-sm text-ink/60">Loading amenities…</p>
        ) : (
          <CheckboxGrid
            items={amenityItems}
            selected={amenityIds}
            onToggle={(id) => {
              const match = amenities.find((a) => a.id === id);
              if (match) toggleAmenity(match);
            }}
            disabled={disabled}
            columns={3}
          />
        )}
      </div>
    </div>
  );
}
