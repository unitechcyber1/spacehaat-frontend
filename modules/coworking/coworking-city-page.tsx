import { Container } from "@/components/ui/container";
import { CityPageExpertLead } from "@/modules/city-pages/components/city-page-expert-lead";
import { CityPageFaqSection } from "@/modules/city-pages/components/city-page-faq-section";
import { CityPageHero } from "@/modules/city-pages/components/city-page-hero";
import { CityPageLeadCtaBand } from "@/modules/city-pages/components/city-page-lead-cta-band";
import { CityPageSeoRail } from "@/modules/city-pages/components/city-page-seo-rail";
import { PopularLocalitiesRail } from "@/modules/city-pages/components/popular-localities-rail";
import { CoworkingCityListing } from "@/modules/coworking/components/coworking-city-listing";
import type { CityPageData } from "@/types";

export function CoworkingCityPage({ data }: { data: CityPageData }) {
  return (
    <>
      <CityPageHero title={data.title}>
        {data.catalogCityId ? (
          <PopularLocalitiesRail
            catalogCityId={data.catalogCityId}
            citySlug={data.city.slug}
            fallbackLocations={data.popularLocations.map((loc) => ({
              name: loc.name,
              slug: loc.slug,
            }))}
          />
        ) : null}
      </CityPageHero>
      <section className="pb-14 sm:pb-20">
        <Container>
          <CoworkingCityListing data={data} showPopularLocalities={false} />
        </Container>
      </section>
      <CityPageLeadCtaBand
        title={data.leadCta.title}
        description={data.leadCta.description}
        ctaLabel={data.leadCta.ctaLabel}
      />
      <CityPageSeoRail data={data} />
      <CityPageExpertLead
        cityName={data.city.name}
        submitLabel={data.leadCta.ctaLabel}
        mxSpaceType="Web Coworking"
      />
      <CityPageFaqSection pageTitle={data.title} faqs={data.faqs} />
    </>
  );
}
