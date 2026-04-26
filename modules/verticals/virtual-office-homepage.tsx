import { ShieldCheck } from "lucide-react";

import { SectionWrapper } from "@/components/sections/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { CityCard } from "@/modules/home/components/city-card";
import { LeadForm } from "@/modules/home/components/lead-form";
import { BenefitCards } from "@/modules/verticals/components/benefit-cards";
import { PricingPlanCard } from "@/modules/verticals/components/pricing-plan-card";
import { VirtualOfficeFitSection } from "@/modules/verticals/components/virtual-office-fit-section";
import { VirtualOfficeDocumentsProvided } from "@/modules/verticals/components/virtual-office-documents-provided";
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
  const homepageCities = listHomepageCitiesFromAvailable().map((city) => ({
    ...city,
    spaceCount: listSpaces({ vertical: "coworking", city: city.slug }).length,
  }));

  return (
    <>
      <VerticalHero data={data} />

      <SectionWrapper className="pt-6 sm:pt-10">
        <VirtualOfficeFitSection imageSrc={data.hero.image} imageAlt="Virtual office workspace scene" />
      </SectionWrapper>

      <SectionWrapper className="pt-0 sm:pt-2">
        <SectionHeading
          eyebrow="Choose your plan"
          title="Choose a virtual office based on your needs"
          description="Pick the most common intent — we’ll confirm eligibility, documents, and best pricing for your city."
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

      {data.pricingPlans ? (
        <SectionWrapper className="pt-4 sm:pt-6">
          <SectionHeading
            eyebrow="Pricing Preview"
            title="Choose the service level that matches your compliance needs."
            description="Simple plan previews for teams that want address quality, faster documentation, and predictable support."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {data.pricingPlans.map((plan, index) => (
              <PricingPlanCard
                key={plan.id}
                plan={plan}
                featured={index === 1}
              />
            ))}
          </div>
        </SectionWrapper>
      ) : null}

      <SectionWrapper>
        <SectionHeading
          eyebrow="Benefits"
          title="Built for trust, documentation, and smoother setup."
          description="A more confidence-led route to finding the right virtual office partner."
        />
        <div className="mt-10">
          <BenefitCards items={data.benefits} />
        </div>
      </SectionWrapper>

      <SectionWrapper id="cities">
        <SectionHeading
          eyebrow="Top cities"
          title="Top cities across India"
          description="Choose a city to explore verified providers, documentation support, and pricing options."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {homepageCities.map((city) => (
            <CityCard key={city.id} city={city} basePath="/virtual-office" variant="compact" />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="lead-form" className="pb-28 sm:pb-24">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(135deg,#09111f_0%,#0f2240_58%,#183f86_100%)] p-6 text-white shadow-[0_40px_120px_rgba(15,23,42,0.22)] sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/66">
                Compliance-led support
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
                {data.leadSection.title}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/74">
                {data.leadSection.description}
              </p>
              <div className="mt-8 grid gap-4">
                {data.leadSection.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-center gap-3 text-sm text-white/84">
                    <ShieldCheck className="h-4 w-4" />
                    {bullet}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.5rem] bg-white p-5 text-ink sm:p-6">
              <LeadForm
                submitLabel={data.leadSection.ctaLabel}
                city="India"
                mxSpaceType="Virtual Office"
              />
            </div>
          </div>
        </div>
      </SectionWrapper>

    </>
  );
}
