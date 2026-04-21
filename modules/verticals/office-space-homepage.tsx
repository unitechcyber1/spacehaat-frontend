import { SectionWrapper } from "@/components/sections/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { CityCard } from "@/modules/home/components/city-card";
import { LeadForm } from "@/modules/home/components/lead-form";
import { MobileConsultationBar } from "@/modules/home/components/mobile-consultation-bar";
import { BenefitCards } from "@/modules/verticals/components/benefit-cards";
import { CaseStudyCard } from "@/modules/verticals/components/case-study-card";
import { SpaceRail } from "@/modules/verticals/components/space-rail";
import { VerticalHero } from "@/modules/verticals/components/vertical-hero";
import { listHomepageCitiesFromAvailable } from "@/services/homepage-available-cities";
import { listSpaces } from "@/services/mock-db";
import { VerticalLandingData } from "@/types";

type OfficeSpaceHomepageProps = {
  data: VerticalLandingData;
};

export function OfficeSpaceHomepage({ data }: OfficeSpaceHomepageProps) {
  const homepageCities = listHomepageCitiesFromAvailable().map((city) => ({
    ...city,
    spaceCount: listSpaces({ vertical: "office-space", city: city.slug }).length,
  }));

  return (
    <>
      <VerticalHero data={data} />

      <SectionWrapper id="cities" className="pt-6 sm:pt-10">
        <SectionHeading
          eyebrow="Top cities"
          title="Top cities across India"
          description="Browse private and managed office inventory in major business hubs — pick a city to see availability and pricing."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {homepageCities.map((city) => (
            <CityCard
              key={city.id}
              city={city}
              basePath="/office-space"
              variant="compact"
            />
          ))}
        </div>
      </SectionWrapper>

      {data.enterpriseSolutions ? (
        <SectionWrapper className="pt-4 sm:pt-6">
          <SectionHeading
            eyebrow="Enterprise Solutions"
            title="Office strategies for teams planning beyond the next month."
          />
          <div className="mt-10">
            <BenefitCards items={data.enterpriseSolutions} showDescription={false} />
          </div>
        </SectionWrapper>
      ) : null}

      <SectionWrapper className="bg-[linear-gradient(180deg,rgba(244,248,255,0)_0%,rgba(244,248,255,0.92)_100%)]">
        <SectionHeading
          eyebrow="Featured Premium Offices"
          title="A more polished starting point for private office discovery."
        />
        <SpaceRail spaces={data.featuredSpaces} />
      </SectionWrapper>

      {data.caseStudies ? (
        <SectionWrapper>
          <SectionHeading
            eyebrow="Case Studies"
            title="How teams use SpaceHaat to make sharper office decisions."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {data.caseStudies.map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </div>
        </SectionWrapper>
      ) : null}

      <SectionWrapper className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
        <SectionHeading
          eyebrow="Benefits"
          title="Built for premium, scalable office requirements."
        />
        <div className="mt-10">
          <BenefitCards items={data.benefits} showDescription={false} />
        </div>
      </SectionWrapper>

      <SectionWrapper id="lead-form" className="pb-28 sm:pb-24">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(135deg,#08111f_0%,#122342_58%,#264b95_100%)] p-6 text-white shadow-[0_40px_120px_rgba(15,23,42,0.22)] sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/66">
                Workspace advisory
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
