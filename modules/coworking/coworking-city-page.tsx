import { Container } from "@/components/ui/container";
import { CityPageExpertLead } from "@/modules/city-pages/components/city-page-expert-lead";
import { CityPageFaqSection } from "@/modules/city-pages/components/city-page-faq-section";
import { CityPageHero } from "@/modules/city-pages/components/city-page-hero";
import { CityPageLeadCtaBand } from "@/modules/city-pages/components/city-page-lead-cta-band";
import { CityPageSeoRail } from "@/modules/city-pages/components/city-page-seo-rail";
import { CoworkingCityListing } from "@/modules/coworking/components/coworking-city-listing";
import { MobileConsultationBar } from "@/modules/home/components/mobile-consultation-bar";
import type { CityPageData } from "@/types";

const EYEBROW = "Flexible workspace discovery";

export function CoworkingCityPage({ data }: { data: CityPageData }) {
  return (
    <>
      <CityPageHero eyebrow={EYEBROW} title={data.title} />
      <section className="pb-14 sm:pb-20">
        <Container>
          <CoworkingCityListing data={data} />
        </Container>
      </section>
      <CityPageLeadCtaBand
        title={data.leadCta.title}
        description={data.leadCta.description}
        ctaLabel={data.leadCta.ctaLabel}
      />
      <CityPageSeoRail data={data} />
      <CityPageExpertLead cityName={data.city.name} submitLabel={data.leadCta.ctaLabel} />
      <CityPageFaqSection pageTitle={data.title} faqs={data.faqs} />
      <MobileConsultationBar label={data.leadCta.ctaLabel} />
    </>
  );
}
