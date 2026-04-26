import {
  BadgePercent,
  Building2,
  Handshake,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { SectionWrapper } from "@/components/sections/section-wrapper";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { CityRail } from "@/modules/home/components/city-rail";
import { HowItWorksCards } from "@/modules/home/components/how-it-works-cards";
import { HostListingCtaBanner } from "@/modules/home/components/host-listing-cta-banner";
import { PremiumVerticalShowcase } from "@/modules/home/components/premium-vertical-showcase";
import { SpacehaatSelectShowcase } from "@/modules/home/components/spacehaat-select-showcase";
import { LeadForm } from "@/modules/home/components/lead-form";
import { TestimonialCard } from "@/modules/home/components/testimonial-card";
import { AnimatedCounter } from "@/modules/home/components/animated-counter";
import { HomeHero } from "@/modules/home/hero";
import { VerticalSpaceCard } from "@/modules/spaces/components/vertical-space-card";
import { HomepageData } from "@/types";
import { cn } from "@/utils/cn";

type HomepageProps = {
  data: HomepageData;
};

const differentiatorIcons = [ShieldCheck, BadgePercent, Handshake, Building2];
const howItWorksIcons = [Search, Building2, Sparkles];

/** Space between section heading and content (replaces visual weight of removed descriptions). */
const headingGap = "mt-8 sm:mt-10";

export function Homepage({ data }: HomepageProps) {
  return (
    <>
      <HomeHero
        searchOptions={data.searchOptions}
        featuredSpaces={data.featuredSpaces}
      />
      <SectionWrapper id="cities">
        <SectionHeading
          eyebrow="Top Cities"
          title="Explore premium workspace inventory across India."
        />
        <CityRail cities={data.cities} />
      </SectionWrapper>

      <SectionWrapper>
        <PremiumVerticalShowcase />
      </SectionWrapper>

      <SectionWrapper className="bg-[linear-gradient(180deg,rgba(244,248,255,0)_0%,rgba(244,248,255,0.92)_100%)]">
        <SectionHeading
          eyebrow="Featured Spaces"
          title="Shortlist spaces that already feel like a fit."
          action={
            <Button href="/coworking" variant="secondary">
              Browse all listings
            </Button>
          }
        />
        <div className={cn("no-scrollbar flex snap-x gap-4 overflow-x-auto pb-2", headingGap)}>
          {data.featuredSpaces.map((space) => (
            <div
              key={space.id}
              className="w-[16.75rem] shrink-0 snap-start sm:w-[19.5rem] lg:w-[21rem]"
            >
              <VerticalSpaceCard space={space} />
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <HostListingCtaBanner />
      </SectionWrapper>

      <SectionWrapper>
        <div className="rounded-[2rem] bg-black px-6 py-14 text-white shadow-[0_40px_120px_rgba(15,23,42,0.22)] sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          <SpacehaatSelectShowcase />
        </div>
      </SectionWrapper>
      <SectionWrapper className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
        <SectionHeading
          eyebrow="How It Works"
          title="A clearer path from search to shortlist."
        />
        <HowItWorksCards
          steps={data.howItWorks}
          icons={howItWorksIcons}
          className={headingGap}
        />
      </SectionWrapper>

      <SectionWrapper id="lead-form">
        <div className="overflow-hidden rounded-[2rem] bg-black p-6 text-white shadow-[0_40px_120px_rgba(15,23,42,0.28)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                Get expert advice
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
                Let us find your perfect office
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/82">
                Share your requirement and our team will shortlist verified operators, compare pricing,
                and help you schedule tours or a virtual walkthrough.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {["Fast shortlist", "Verified inventory", "Zero consultation fee"].map(
                  (point) => (
                    <div
                      key={point}
                      className="rounded-[1.25rem] border border-white/12 bg-white/5 px-4 py-4 text-sm text-white/84 backdrop-blur"
                    >
                      {point}
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-white/12 bg-white p-5 text-ink shadow-[0_18px_60px_rgba(0,0,0,0.35)] sm:p-7">
              <LeadForm submitLabel="Submit" city="India" mxSpaceType="Homepage lead" />
            </div>
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper>
        <div className="grid gap-4 md:grid-cols-3">
          {data.trustMetrics.map((metric) => (
            <div
              key={metric.id}
              className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-soft"
            >
              <p className="font-display text-4xl text-ink sm:text-5xl">
                <AnimatedCounter value={metric.value} suffix={metric.suffix} />
              </p>
              <p className="mt-3 max-w-[16rem] text-sm leading-6 text-muted">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeading
          eyebrow="Trusted Operators"
          title="Operators and brands teams already know."
        />
        <div
          className={cn(
            "no-scrollbar flex snap-x gap-4 overflow-x-auto pb-2",
            "sm:grid sm:overflow-visible sm:grid-cols-2 sm:pb-0",
            "xl:grid-cols-6",
            headingGap,
          )}
        >
          {data.brands.map((brand) => (
            <div
              key={brand.id}
              className={cn(
                "shrink-0 snap-start",
                "w-[15rem] sm:w-auto",
                "rounded-[1.25rem] border border-slate-200/80 bg-white px-5 py-6 text-center shadow-soft",
              )}
            >
              <p className="text-lg font-semibold tracking-[-0.02em] text-ink">
                {brand.name}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
                {brand.category}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeading
          eyebrow="Testimonials"
          title="Teams come for clarity and stay for the curation."
        />
        <div
          className={cn(
            "no-scrollbar flex snap-x gap-5 overflow-x-auto pb-2",
            "lg:grid lg:overflow-visible lg:grid-cols-3 lg:pb-0",
            headingGap,
          )}
        >
          {data.testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-[18.5rem] shrink-0 snap-start lg:w-auto">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="pb-24 sm:pb-28">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-soft sm:p-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--color-brand)]">
                Final CTA
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
                Start your workspace journey today
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="#lead-form">Get Free Consultation</Button>
              <Button href="/coworking" variant="secondary">
                Explore Spaces
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>

    </>
  );
}
