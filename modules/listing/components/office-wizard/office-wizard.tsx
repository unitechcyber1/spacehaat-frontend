"use client";

import { useMemo } from "react";

import { SharedGalleryStep } from "../wizard/shared-gallery-step";
import { SharedLocationStep } from "../wizard/shared-location-step";
import { WizardShell, type WizardStep } from "../wizard/wizard-shell";

import { OfficeStepBasicInfo } from "./step-basic-info";
import { OfficeStepReview } from "./step-review";
import { useOfficeAmenities, useOfficeWizard } from "./use-office-wizard";

type Props = {
  userName?: string;
};

/**
 * Office-space multi-step wizard. Mirrors the Angular
 * `AddOfficeSpaceComponent` flow: basic info → location → gallery → review,
 * with the single save happening only on the final step via
 * `POST /api/admin/officeSpaces`.
 */
export function OfficeWizard({ userName }: Props) {
  const wizard = useOfficeWizard();
  const {
    amenities,
    loading: amenitiesLoading,
    error: amenitiesError,
  } = useOfficeAmenities();

  const steps = useMemo<WizardStep[]>(
    () => [
      {
        id: "basic",
        title: "Basic information",
        description: userName
          ? `Hi ${userName}, start with the essentials.`
          : "Start with the essentials.",
        content: (
          <OfficeStepBasicInfo
            wizard={wizard}
            amenities={amenities}
            amenitiesLoading={amenitiesLoading}
            amenitiesError={amenitiesError}
          />
        ),
        validate: () => wizard.basicInfoError,
      },
      {
        id: "location",
        title: "Where is the property?",
        description: "Pick city, micro-location and address.",
        content: (
          <SharedLocationStep
            value={wizard.state.location}
            onChange={wizard.patchLocation}
            disabled={wizard.busy}
          />
        ),
        validate: () => wizard.locationError,
      },
      {
        id: "gallery",
        title: "Photos",
        description: "Upload clear photos of the building, floor plates, and common areas.",
        content: (
          <SharedGalleryStep
            images={wizard.state.images}
            onChange={(imgs) => wizard.set("images", imgs)}
            disabled={wizard.busy}
          />
        ),
        validate: () => wizard.galleryError,
      },
      {
        id: "review",
        title: "Review & submit",
        description: "Take a final look — everything below is saved together.",
        content: <OfficeStepReview state={wizard.state} />,
      },
    ],
    [wizard, amenities, amenitiesLoading, amenitiesError, userName],
  );

  return (
    <WizardShell
      steps={steps}
      currentIndex={wizard.stepIndex}
      onStepChange={wizard.setStepIndex}
      onSubmit={wizard.submit}
      busy={wizard.busy}
      error={wizard.submitError}
      success={wizard.success}
      submitLabel="Save office space"
      onResetDraft={wizard.resetDraft}
    />
  );
}
