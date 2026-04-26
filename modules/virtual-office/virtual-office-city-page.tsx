import { Container } from "@/components/ui/container";
import { CityPageExpertLead } from "@/modules/city-pages/components/city-page-expert-lead";
import { CityPageFaqSection } from "@/modules/city-pages/components/city-page-faq-section";
import { CityPageHero } from "@/modules/city-pages/components/city-page-hero";
import { CityPageLeadCtaBand } from "@/modules/city-pages/components/city-page-lead-cta-band";
import { CityPageSeoRail } from "@/modules/city-pages/components/city-page-seo-rail";
import { VirtualOfficeCityListing } from "@/modules/virtual-office/components/virtual-office-city-listing";
import type { CityPageData } from "@/types";

const EYEBROW = "Trust-led city search";

export function VirtualOfficeCityPage({ data }: { data: CityPageData }) {
  return (
    <>
      <CityPageHero eyebrow={EYEBROW} title={data.title} />
      <section className="pb-14 sm:pb-20">
        <Container>
          <VirtualOfficeCityListing data={data} />
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
        mxSpaceType="Virtual Office"
      />
      <CityPageFaqSection pageTitle={data.title} faqs={data.faqs} />
    </>
  );
}
