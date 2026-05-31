"use client";

import "./coliving-listing-form.css";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ColivingListingDesktopChrome } from "./coliving-listing-desktop-chrome";
import { ColivingListingMobileChrome } from "./coliving-listing-mobile-chrome";
import { useColivingListingWizard } from "./use-coliving-listing-wizard";

const DESKTOP_MIN = 1024;

type Props = {
  editId?: string | null;
};

export function ColivingListingForm({ editId = null }: Props) {
  const router = useRouter();
  const wizard = useColivingListingWizard({ editId });
  const [isDesktop, setIsDesktop] = useState(false);
  const isEdit = Boolean(wizard.editId);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_MIN}px)`);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (wizard.initializing || !wizard.hydrated) {
    return (
      <div className="coliving-listing-root flex min-h-[60vh] items-center justify-center bg-[#f9f8f5] text-sm text-ink/70">
        {wizard.initializing ? "Loading listing…" : "Loading your draft…"}
      </div>
    );
  }

  if (wizard.loadError) {
    return (
      <div className="coliving-listing-root flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-[#f9f8f5] px-4 text-center">
        <p className="text-sm text-red-700">{wizard.loadError}</p>
        <Link
          href="/add/dashboard"
          className="rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-white"
        >
          Back to My listings
        </Link>
      </div>
    );
  }

  const shared = {
    stepIdx: wizard.stepIdx,
    data: wizard.data,
    set: wizard.set,
    patchLocation: wizard.patchLocation,
    setImages: wizard.setImages,
    onBack: wizard.goBack,
    onNext: wizard.goNext,
    onSubmit: wizard.submit,
    onView: () => router.push("/add/dashboard"),
    onAnother: wizard.reset,
    isSuccess: wizard.submitted,
    busy: wizard.busy,
    submitError: wizard.submitError,
    isEdit,
  };

  return (
    <div className="coliving-listing-root coliving-listing-root--app w-full min-w-0 max-w-[100vw] overflow-x-hidden min-h-dvh">
      {isDesktop ? (
        <ColivingListingDesktopChrome {...shared} onJump={wizard.jumpTo} />
      ) : (
        <ColivingListingMobileChrome {...shared} />
      )}
    </div>
  );
}
