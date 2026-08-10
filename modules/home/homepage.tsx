import {
  BadgePercent,
  Building2,
  Handshake,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SectionWrapper } from "@/components/sections/section-wrapper";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { CityRail } from "@/modules/home/components/city-rail";
import { HowItWorksCards } from "@/modules/home/components/how-it-works-cards";
import { HomeFinalCtaBand } from "@/modules/home/components/home-final-cta-band";
import { HostListingCtaBanner } from "@/modules/home/components/host-listing-cta-banner";
import { PremiumVerticalShowcase } from "@/modules/home/components/premium-vertical-showcase";
import { SpacehaatSelectShowcase } from "@/modules/home/components/spacehaat-select-showcase";
import { TestimonialCard } from "@/modules/home/components/testimonial-card";
import { AnimatedCounter } from "@/modules/home/components/animated-counter";
import { HomeHero } from "@/modules/home/hero";
import { VerticalSpaceCard } from "@/modules/spaces/components/vertical-space-card";
import { TrustedBrandsMarquee } from "@/modules/verticals/components/trusted-brands-marquee";
import { FEATURED_CITY_SLUG } from "@/services/home";
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
          title="Coworking Spaces Across India"
        />
        <CityRail cities={data.cities} />
      </SectionWrapper>

      <SectionWrapper>
        <PremiumVerticalShowcase />
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeading
          title="Explore Premium Coworking Spaces"
          action={
            <Button href={`/coworking/${FEATURED_CITY_SLUG}`} variant="secondary">
              Browse all listings
            </Button>
          }
        />
        <div
          className={cn(
            "no-scrollbar flex snap-x items-stretch gap-4 overflow-x-auto pb-2",
            headingGap,
          )}
        >
          {data.featuredSpaces.map((space) => (
            <div
              key={space.id}
              className="flex h-full w-[16.75rem] shrink-0 snap-start flex-col sm:w-[19.5rem] lg:w-[21rem]"
            >
              <VerticalSpaceCard space={space} className="min-h-0 flex-1" />
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
      <SectionWrapper>
        <SectionHeading
          title="How It Works"
        />
        <HowItWorksCards
          steps={data.howItWorks}
          icons={howItWorksIcons}
          className={headingGap}
        />
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

      {data.brands?.length ? (
        <section className="py-14 sm:py-16">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-10">
            <SectionHeading title="Trusted Operators & Brands" />
          </div>
          <TrustedBrandsMarquee brands={data.brands} className="mt-8 sm:mt-10" />
        </section>
      ) : null}

      <SectionWrapper>
        <SectionHeading
          title="Customer Testimonials"
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
        <HomeFinalCtaBand />
      </SectionWrapper>

    </>
  );
}
