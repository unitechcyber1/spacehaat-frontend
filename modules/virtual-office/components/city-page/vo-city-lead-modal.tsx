"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

import type { VirtualOfficeCatalogCity } from "@/lib/virtual-office-city-catalog";
import { VoCityLeadWizard } from "@/modules/virtual-office/components/city-page/vo-city-lead-wizard";

type VoCityLeadModalProps = {
  open: boolean;
  onClose: () => void;
  citySlug: string;
  cityDisplay: string;
  catalog: VirtualOfficeCatalogCity;
};

export function VoCityLeadModal({
  open,
  onClose,
  citySlug,
  cityDisplay,
  catalog,
}: VoCityLeadModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-[rgba(20,20,20,0.55)] p-4 backdrop-blur-[3px] sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Get virtual office details"
    >
      <div className="my-auto w-full max-w-[430px] sm:max-w-[480px]">
        <VoCityLeadWizard
          citySlug={citySlug}
          cityDisplay={cityDisplay}
          catalog={catalog}
          showClose
          onClose={onClose}
        />
      </div>
    </div>,
    document.body,
  );
}
