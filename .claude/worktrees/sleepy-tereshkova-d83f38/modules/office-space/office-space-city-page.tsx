import { Container } from "@/components/ui/container";
import { CityPageExpertLead } from "@/modules/city-pages/components/city-page-expert-lead";
import { CityPageFaqSection } from "@/modules/city-pages/components/city-page-faq-section";
import { CityPageHero } from "@/modules/city-pages/components/city-page-hero";
import { CityPageLeadCtaBand } from "@/modules/city-pages/components/city-page-lead-cta-band";
import { PopularLocalitiesRail } from "@/modules/city-pages/components/popular-localities-rail";
import { OfficeSpaceCityListing } from "@/modules/office-space/components/office-space-city-listing";
import type { CityPageData } from "@/types";

export function OfficeSpaceCityPage({ data }: { data: CityPageData }) {
  return (
    <>
      <CityPageHero title={data.title}>
        {data.catalogCityId ? (
          <PopularLocalitiesRail
            catalogCityId={data.catalogCityId}
            citySlug={data.city.slug}
            hrefPrefix="/office-space"
            fallbackLocations={data.popularLocations.map((loc) => ({
              name: loc.name,
              slug: loc.slug,
            }))}
          />
        ) : null}
      </CityPageHero>
      <section className="pt-2 pb-14 sm:pt-3 sm:pb-20">
        <Container>
          <OfficeSpaceCityListing data={data} />
        </Container>
      </section>
      <CityPageLeadCtaBand
        title={data.leadCta.title}
        description={data.leadCta.description}
        ctaLabel={data.leadCta.ctaLabel}
      />
      <CityPageExpertLead
        cityName={data.city.name}
        submitLabel={data.leadCta.ctaLabel}
        mxSpaceType="Web Office"
      />
      <CityPageFaqSection pageTitle={data.title} faqs={data.faqs} />
    </>
  );
}
