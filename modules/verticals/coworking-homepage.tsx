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
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

type CoworkingHomepageProps = {
  data: VerticalLandingData;
};

/** Space between section heading and content (aligns with homepage spacing). */
const headingGap = "mt-8 sm:mt-10";

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
          title="Top Coworking Cities Across India."
        />
        <CityRail cities={homepageCities} basePath="/coworking" />
      </SectionWrapper>

      <SectionWrapper className="bg-[linear-gradient(180deg,rgba(244,248,255,0)_0%,rgba(244,248,255,0.92)_100%)]">
        <SectionHeading
          title="Explore Premium Coworking Spaces"
        />
        <SpaceRail spaces={data.featuredSpaces} />
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeading
          title="Coworking Spaces for Productive, Flexible Teams."
        />
        <div className="mt-10">
          <BenefitCards items={data.benefits} showDescription={false} />
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
        <SectionHeading
          title="Search, compare, and move faster."
        />
        <div className="mt-10">
          <BenefitCards items={data.howItWorks} showDescription={false} />
        </div>
      </SectionWrapper>

      {data.brands?.length ? (
        <SectionWrapper>
          <SectionHeading title="Trusted Operators & Brands" />
          <div
            className={cn(
              "no-scrollbar flex snap-x gap-3 overflow-x-auto pb-2",
              "sm:grid sm:overflow-visible sm:grid-cols-2 sm:pb-0",
              "lg:grid-cols-4 xl:grid-cols-7",
              headingGap,
            )}
          >
            {data.brands.map((brand) => {
              const CardInner = (
                <div className="relative h-[4.85rem] w-full sm:h-[5.5rem]">
                  {brand.image ? (
                    <Image
                      src={brand.image}
                      alt=""
                      fill
                      className="object-contain object-center p-0.5"
                      sizes="(max-width: 640px) 208px, (max-width: 1280px) 22vw, 220px"
                    />
                  ) : (
                    <span className="sr-only">{brand.name}</span>
                  )}
                </div>
              );

              const cardClass =
                "flex w-[12.75rem] shrink-0 snap-start items-center justify-center rounded-xl border border-slate-200/85 bg-white px-3 py-3 shadow-[0_1px_3px_rgba(15,23,42,0.06)] transition duration-200 hover:border-slate-300/95 hover:shadow-[0_8px_24px_-8px_rgba(15,23,42,0.12)] sm:w-full sm:px-4 sm:py-3";

              if (brand.url) {
                return (
                  <Link
                    key={brand.id}
                    href={brand.url}
                    className={cn(cardClass, "group")}
                    aria-label={`${brand.name} — ${brand.category}`}
                  >
                    {CardInner}
                  </Link>
                );
              }

              return (
                <div key={brand.id} className={cardClass}>
                  {CardInner}
                </div>
              );
            })}
          </div>
        </SectionWrapper>
      ) : null}

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
