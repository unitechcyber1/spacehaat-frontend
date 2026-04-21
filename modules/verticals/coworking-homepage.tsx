import { SectionWrapper } from "@/components/sections/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { CityRail } from "@/modules/home/components/city-rail";
import { LeadForm } from "@/modules/home/components/lead-form";
import { MobileConsultationBar } from "@/modules/home/components/mobile-consultation-bar";
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

      <SectionWrapper id="lead-form" className="pb-28 sm:pb-24">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(135deg,#08111f_0%,#112447_60%,#2556c6_100%)] p-6 text-white shadow-[0_40px_120px_rgba(15,23,42,0.22)] sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/66">
                Consultation
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
                {data.leadSection.title}
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {data.leadSection.bullets.map((bullet) => (
                  <div
                    key={bullet}
                    className="rounded-[1.25rem] border border-white/12 bg-white/8 px-4 py-4 text-sm text-white/82 backdrop-blur"
                  >
                    {bullet}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.5rem] bg-white p-5 text-ink sm:p-6">
              <LeadForm submitLabel={data.leadSection.ctaLabel} />
            </div>
          </div>
        </div>
      </SectionWrapper>

      <MobileConsultationBar label={data.leadSection.ctaLabel} />
    </>
  );
}
