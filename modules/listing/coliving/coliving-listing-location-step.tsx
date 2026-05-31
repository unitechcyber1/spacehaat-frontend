"use client";

import type { LocationFormState } from "@/modules/listing/components/wizard/shared-location-step";
import { SharedLocationStep } from "@/modules/listing/components/wizard/shared-location-step";

import { LfField } from "./coliving-listing-primitives";

type Props = {
  location: LocationFormState;
  onLocationChange: (patch: Partial<LocationFormState>) => void;
  plot: string;
  onPlotChange: (value: string) => void;
  disabled?: boolean;
};

/**
 * PG/coliving location step — city + micro-location ObjectIds (coworking pattern)
 * and optional street/plot for the PG `street` field.
 */
export function ColivingListingLocationStep({
  location,
  onLocationChange,
  plot,
  onPlotChange,
  disabled,
}: Props) {
  return (
    <div className="lf-field-group">
      <SharedLocationStep value={location} onChange={onLocationChange} disabled={disabled} />
      <LfField label="Street / Plot Details" helper="Optional — plot number, block, or wing">
        <input
          className="lf-input"
          placeholder="e.g. Plot No. 6, Neelkanth Enclave"
          value={plot}
          onChange={(e) => onPlotChange(e.target.value)}
          disabled={disabled}
        />
      </LfField>
    </div>
  );
}
