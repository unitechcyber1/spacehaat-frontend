"use client";

import Link from "next/link";

import {
  formatInrPrice,
  getVirtualOfficePlanPrices,
  type VirtualOfficeCatalogCity,
} from "@/lib/virtual-office-city-catalog";
import { useVoCityLead } from "@/modules/virtual-office/components/city-page/vo-city-lead-context";
import { VoCityLeadWizard } from "@/modules/virtual-office/components/city-page/vo-city-lead-wizard";
import { VoCheckPill, VoEyebrow, VoPrimaryButton } from "@/modules/virtual-office/components/city-page/vo-city-ui";

type VoCityHeroProps = {
  citySlug: string;
  cityDisplay: string;
  catalog: VirtualOfficeCatalogCity;
  locationNames: string[];
};

export function VoCityHero({ citySlug, cityDisplay, catalog, locationNames }: VoCityHeroProps) {
  const { openLead } = useVoCityLead();
  const plans = getVirtualOfficePlanPrices(catalog);
  const locationLine =
    locationNames.length > 0
      ? locationNames.slice(0, 5).join(", ")
      : `top business districts in ${cityDisplay}`;

  return (
    <section className="border-b border-[#EAE7E0] pb-10 pt-8 sm:pb-14 sm:pt-10">
      <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.95fr] lg:gap-12">
        <div>
          <VoEyebrow>Virtual Office · {cityDisplay}</VoEyebrow>
          <h1 className="font-display text-[1.65rem] font-bold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[2.65rem]">
            Virtual Office in {cityDisplay},{" "}
            <span className="bg-gradient-to-br from-[color:var(--color-brand)] to-[#7AC97D] bg-clip-text text-transparent">
              GST‑Ready Docs
            </span>
            , Verified Addresses
          </h1>
          <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-[#444] sm:text-lg">
            Compare verified virtual office providers across {locationLine}. Starting{" "}
            {formatInrPrice(plans.businessAddress)}/month.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2">
            <VoCheckPill>GST &amp; MCA Compliant</VoCheckPill>
            <VoCheckPill>Documents in 24–48 hrs</VoCheckPill>
            <VoCheckPill>High approval rate</VoCheckPill>
            <VoCheckPill>Zero Brokerage</VoCheckPill>
          </div>

          <div className="mt-8 flex flex-col gap-3 lg:hidden">
            <VoPrimaryButton type="button" onClick={openLead} className="w-full">
              Get Virtual Office Details
            </VoPrimaryButton>
            <Link
              href="#locations"
              className="text-center text-sm font-medium text-ink underline-offset-4 hover:underline"
            >
              Browse All Locations ↓
            </Link>
          </div>

          <div className="mt-8 hidden flex-wrap items-center gap-3 lg:flex">
            <VoPrimaryButton type="button" onClick={openLead}>
              Get Virtual Office Details
            </VoPrimaryButton>
            <Link
              href="#locations"
              className="text-sm font-medium text-ink underline-offset-4 hover:underline"
            >
              Browse All Locations ↓
            </Link>
          </div>
        </div>

        <div id="lead-form" className="hidden scroll-mt-24 lg:block">
          <VoCityLeadWizard citySlug={citySlug} cityDisplay={cityDisplay} catalog={catalog} />
        </div>
      </div>
    </section>
  );
}
