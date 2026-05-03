import { SectionWrapper } from "@/components/sections/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { CityCard } from "@/modules/home/components/city-card";
import { ExpertLeadSection } from "@/modules/home/components/expert-lead-section";
import { BenefitCards } from "@/modules/verticals/components/benefit-cards";
import { VirtualOfficeFitSection } from "@/modules/verticals/components/virtual-office-fit-section";
import { VirtualOfficeDocumentsProvided } from "@/modules/verticals/components/virtual-office-documents-provided";
import { VirtualOfficeFaqSection } from "@/modules/verticals/components/virtual-office-faq-section";
import { VirtualOfficePlanChooser } from "@/modules/verticals/components/virtual-office-plan-chooser";
import { VerticalHero } from "@/modules/verticals/components/vertical-hero";
import { listHomepageCitiesFromAvailable } from "@/services/homepage-available-cities";
import { listSpaces } from "@/services/mock-db";
import { VerticalLandingData } from "@/types";

type VirtualOfficeHomepageProps = {
  data: VerticalLandingData;
};

export function VirtualOfficeHomepage({
  data,
}: VirtualOfficeHomepageProps) {
  const homepageCities = listHomepageCitiesFromAvailable("virtual-office").map((city) => ({
    ...city,
    spaceCount: listSpaces({ vertical: "virtual-office", city: city.slug }).length,
  }));

  return (
    <>
      <VerticalHero data={data} />
      <SectionWrapper id="cities">
        <SectionHeading
          title="Top cities across India"
        />
        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:gap-3.5 xl:grid-cols-4">
          {homepageCities.map((city) => (
            <CityCard key={city.id} city={city} basePath="/virtual-office" variant="compact" />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-4 sm:pt-10">
        <VirtualOfficeFitSection imageSrc={data.hero.image} imageAlt="Virtual office workspace scene" />
      </SectionWrapper>

      <SectionWrapper className="pt-0 sm:pt-2">
        <SectionHeading
          title="Choose a virtual office based on your needs"
        />
        <div className="mt-10">
          <VirtualOfficePlanChooser />
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-0 sm:pt-4">
        <VirtualOfficeDocumentsProvided
          imageSrc={data.hero.image}
          imageAlt="Virtual office documents support"
        />
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeading
          title="Built for trust, documentation, and smoother setup."
        />
        <div className="mt-10">
          <BenefitCards items={data.benefits} />
        </div>
      </SectionWrapper>

      <SectionWrapper id="lead-form">
        <ExpertLeadSection
          variant="virtual-office"
          leadSection={data.leadSection}
          mxSpaceType="Virtual Office page lead"
        />
      </SectionWrapper>

      <SectionWrapper id="faq" className="bg-[#f9f8f5]">
        <VirtualOfficeFaqSection />
      </SectionWrapper>

    </>
  );
}
