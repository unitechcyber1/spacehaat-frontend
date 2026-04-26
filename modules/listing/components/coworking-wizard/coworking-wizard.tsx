"use client";

import { useMemo } from "react";

import { SharedGalleryStep } from "../wizard/shared-gallery-step";
import { SharedLocationStep } from "../wizard/shared-location-step";
import { WizardShell, type WizardStep } from "../wizard/wizard-shell";

import { CoworkingStepBasicInfo } from "./step-basic-info";
import { CoworkingStepReview } from "./step-review";
import { useCatalog, useCoworkingWizard } from "./use-coworking-wizard";

type Props = {
  userName?: string;
  /** Existing listing id — load for editing */
  editId?: string | null;
};

/**
 * Single entry point the `/add/coworking-space` page renders. Wires the shared
 * wizard shell to coworking-specific steps and state.
 *
 * Data flow
 * ─────────
 *   Basic info ─┐
 *   Location   ─┼─► collected in-memory (useCoworkingWizard)
 *   Gallery    ─┘     (images upload via /api/admin/upload — step 3)
 *                          │
 *                          ▼
 *   Review step's "Save" button ─► buildCoworkingPayload(state)
 *                                 ─► POST /api/admin/workSpace (single call)
 */
export function CoworkingWizard({ userName, editId = null }: Props) {
  const wizard = useCoworkingWizard({ editId });
  const { catalog, loading: catalogLoading, error: catalogError } = useCatalog();

  const steps = useMemo<WizardStep[]>(
    () => [
      {
        id: "basic",
        title: "Basic information",
        description: userName
          ? `Hi ${userName}, let's start with the essentials.`
          : "Start with the essentials.",
        content: (
          <CoworkingStepBasicInfo
            wizard={wizard}
            catalog={catalog}
            catalogLoading={catalogLoading}
            catalogError={catalogError}
          />
        ),
        validate: () => wizard.basicInfoError,
      },
      {
        id: "location",
        title: "Where is the space?",
        description: "Pick city, micro-location and address. Buyers filter heavily on these.",
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
        description: "Upload high-quality photos so buyers can see the space before booking.",
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
        description: "Take a final look — everything below will be saved together.",
        content: <CoworkingStepReview state={wizard.state} />,
      },
    ],
    [wizard, catalog, catalogLoading, catalogError, userName],
  );

  if (wizard.loadError) {
    return (
      <div className="rounded-[1.75rem] border border-red-200 bg-red-50/90 px-5 py-6 text-sm text-red-900">
        {wizard.loadError}
      </div>
    );
  }

  if (wizard.initializing) {
    return (
      <div className="rounded-[1.75rem] border border-ink/10 bg-white px-5 py-12 text-center text-sm text-ink/70 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
        Loading your listing…
      </div>
    );
  }

  return (
    <WizardShell
      steps={steps}
      currentIndex={wizard.stepIndex}
      onStepChange={wizard.setStepIndex}
      onSubmit={wizard.submit}
      busy={wizard.busy}
      error={wizard.submitError}
      success={wizard.success}
      submitLabel={wizard.editId ? "Update coworking space" : "Save coworking space"}
      onResetDraft={wizard.editId ? undefined : wizard.resetDraft}
    />
  );
}
