import { SectionWrapper } from "@/components/sections/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { CityRail } from "@/modules/home/components/city-rail";
import { SpaceRail } from "@/modules/verticals/components/space-rail";
import { ColivingHero } from "@/modules/verticals/components/coliving-hero";
import { ColivingFindYourHomeCta } from "@/modules/verticals/components/coliving-find-your-home-cta";
import { ColivingResidentStories } from "@/modules/verticals/components/coliving-resident-stories";
import { ColivingSelectLiving } from "@/modules/verticals/components/coliving-select-living";
import { ColivingWhatsInside } from "@/modules/verticals/components/coliving-whats-inside";
import { ColivingWhySpacehaatLiving } from "@/modules/verticals/components/coliving-why-spacehaat-living";
import { listHomepageCitiesFromAvailable } from "@/services/homepage-available-cities";
import { listSpaces } from "@/services/mock-db";
import { VerticalLandingData } from "@/types";

type ColivingHomepageProps = {
  data: VerticalLandingData;
};

export function ColivingHomepage({ data }: ColivingHomepageProps) {
  const homepageCities = listHomepageCitiesFromAvailable("coliving").map((city) => ({
    ...city,
    spaceCount: listSpaces({ vertical: "coliving", city: city.slug }).length,
  }));

  return (
    <>
      <ColivingHero data={data} />

      <SectionWrapper id="cities" className="pt-6 sm:pt-10">
        <SectionHeading title="Top cities for coliving & PG" />
        <CityRail cities={homepageCities} basePath="/coliving" />
      </SectionWrapper>

      <ColivingWhySpacehaatLiving />

      <SectionWrapper>
        <SectionHeading title="Featured coliving & PG listings" />
        <SpaceRail spaces={data.featuredSpaces} />
      </SectionWrapper>

      <ColivingWhatsInside />

      <ColivingSelectLiving />

      <ColivingResidentStories />

      <ColivingFindYourHomeCta />
    </>
  );
}
