"use client";

import { Container } from "@/components/ui/container";
import type { VirtualOfficeCatalogCity } from "@/lib/virtual-office-city-catalog";
import { VoCityBreadcrumb, VoCityMobileBar } from "@/modules/virtual-office/components/city-page/vo-city-chrome";
import { VoCityFaqSection } from "@/modules/virtual-office/components/city-page/vo-city-faq";
import { VoCityHero } from "@/modules/virtual-office/components/city-page/vo-city-hero";
import { VoCityLeadProvider } from "@/modules/virtual-office/components/city-page/vo-city-lead-context";
import { VoCityListingsSection } from "@/modules/virtual-office/components/city-page/vo-city-listings";
import { VoCityStoriesSection } from "@/modules/virtual-office/components/city-page/vo-city-stories-section";
import {
  VoCityAudienceSection,
  VoCityDocumentsSection,
  VoCityEnquirySection,
  VoCityExplainerSection,
  VoCityLocationsSection,
  VoCityPlansSection,
  VoCityStatsSection,
  VoCityTimelineSection,
  VoCityWhySection,
} from "@/modules/virtual-office/components/city-page/vo-city-sections";
import type { CityPageData } from "@/types";

type VoCityPageExperienceProps = {
  data: CityPageData;
  catalog: VirtualOfficeCatalogCity;
  cityDisplay: string;
};

export function VoCityPageExperience({ data, catalog, cityDisplay }: VoCityPageExperienceProps) {
  const locationNames = catalog.locations.map((l) => l.locality);

  return (
    <VoCityLeadProvider citySlug={data.city.slug} cityDisplay={cityDisplay} catalog={catalog}>
      <div className="bg-[color:var(--color-page-bg)] pb-20 lg:pb-0">
        <Container className="max-w-[1240px] pt-4 sm:pt-5 lg:pt-6">
          <VoCityBreadcrumb cityDisplay={cityDisplay} />

          <VoCityHero
            citySlug={data.city.slug}
            cityDisplay={cityDisplay}
            catalog={catalog}
            locationNames={locationNames}
          />

          <VoCityExplainerSection />

          <VoCityWhySection cityDisplay={cityDisplay} />

          <VoCityPlansSection cityDisplay={cityDisplay} catalog={catalog} />

          <VoCityLocationsSection
            citySlug={data.city.slug}
            cityDisplay={cityDisplay}
            catalog={catalog}
          />

          <VoCityTimelineSection />

          <VoCityAudienceSection cityDisplay={cityDisplay} />

          <VoCityDocumentsSection />

          <VoCityStatsSection cityDisplay={cityDisplay} />

          <VoCityStoriesSection cityDisplay={cityDisplay} />

          <VoCityListingsSection data={data} />

          <VoCityEnquirySection cityDisplay={cityDisplay} />

          <VoCityFaqSection cityDisplay={cityDisplay} faqs={data.faqs} />
        </Container>

        <VoCityMobileBar catalog={catalog} />
      </div>
    </VoCityLeadProvider>
  );
}
