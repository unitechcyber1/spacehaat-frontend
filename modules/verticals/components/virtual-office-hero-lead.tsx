"use client";

import { type ReactNode } from "react";

import { getVirtualOfficeHomepageCatalog } from "@/lib/virtual-office-city-catalog";
import { VoCityLeadProvider } from "@/modules/virtual-office/components/city-page/vo-city-lead-context";
import { VoCityLeadWizard } from "@/modules/virtual-office/components/city-page/vo-city-lead-wizard";

const HOMEPAGE_CITY_SLUG = "india";
const HOMEPAGE_CITY_DISPLAY = "India";
const HOMEPAGE_CATALOG = getVirtualOfficeHomepageCatalog();

export function VirtualOfficeHeroLeadRoot({ children }: { children: ReactNode }) {
  return (
    <VoCityLeadProvider
      citySlug={HOMEPAGE_CITY_SLUG}
      cityDisplay={HOMEPAGE_CITY_DISPLAY}
      catalog={HOMEPAGE_CATALOG}
    >
      {children}
    </VoCityLeadProvider>
  );
}

export function VirtualOfficeHeroDesktopLead() {
  return (
    <VoCityLeadWizard
      citySlug={HOMEPAGE_CITY_SLUG}
      cityDisplay={HOMEPAGE_CITY_DISPLAY}
      catalog={HOMEPAGE_CATALOG}
    />
  );
}
