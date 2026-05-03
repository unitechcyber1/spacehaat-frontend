import { SectionWrapper } from "@/components/sections/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { CityRail } from "@/modules/home/components/city-rail";
import { ExpertLeadSection } from "@/modules/home/components/expert-lead-section";
import { BenefitCards } from "@/modules/verticals/components/benefit-cards";
import { SpaceRail } from "@/modules/verticals/components/space-rail";
import { VerticalHero } from "@/modules/verticals/components/vertical-hero";
import { listHomepageCitiesFromAvailable } from "@/services/homepage-available-cities";
import { listSpaces } from "@/services/mock-db";
import { VerticalLandingData } from "@/types";

type CoworkingHomepageProps = {
  data: VerticalLandingData;
};

export function CoworkingHomepage({ data }: CoworkingHomepageProps) {
  const homepageCities = listHomepageCitiesFromAvailable().map((city) => ({
    ...city,
    spaceCount: listSpaces({ vertical: "coworking", city: city.slug }).length,
  }));

  return (
    <>
      <VerticalHero data={data} />

      <SectionWrapper id="cities">
        <SectionHeading
          eyebrow="Top Cities"
          title="Discover coworking hubs where teams actually want to work."
        />
        <CityRail cities={homepageCities} basePath="/coworking" />
      </SectionWrapper>

      <SectionWrapper className="bg-[linear-gradient(180deg,rgba(244,248,255,0)_0%,rgba(244,248,255,0.92)_100%)]">
        <SectionHeading
          eyebrow="Featured Coworking Spaces"
          title="Premium coworking inventory with a cleaner shortlist experience."
        />
        <SpaceRail spaces={data.featuredSpaces} />
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeading
          eyebrow="Why Coworking"
          title="Made for productive, flexible teams."
        />
        <div className="mt-10">
          <BenefitCards items={data.benefits} showDescription={false} />
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
        <SectionHeading
          eyebrow="How It Works"
          title="Search, compare, and move faster."
        />
        <div className="mt-10">
          <BenefitCards items={data.howItWorks} showDescription={false} />
        </div>
      </SectionWrapper>

      <SectionWrapper id="lead-form">
        <ExpertLeadSection
          variant="coworking"
          leadSection={data.leadSection}
          mxSpaceType="Web Coworking"
        />
      </SectionWrapper>

    </>
  );
}
