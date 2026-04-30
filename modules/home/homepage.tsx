import {
  BadgePercent,
  Building2,
  CheckCircle2,
  Handshake,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SectionWrapper } from "@/components/sections/section-wrapper";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { CityRail } from "@/modules/home/components/city-rail";
import { HowItWorksCards } from "@/modules/home/components/how-it-works-cards";
import { ExpertLeadSection } from "@/modules/home/components/expert-lead-section";
import { HostListingCtaBanner } from "@/modules/home/components/host-listing-cta-banner";
import { PremiumVerticalShowcase } from "@/modules/home/components/premium-vertical-showcase";
import { SpacehaatSelectShowcase } from "@/modules/home/components/spacehaat-select-showcase";
import { TestimonialCard } from "@/modules/home/components/testimonial-card";
import { AnimatedCounter } from "@/modules/home/components/animated-counter";
import { HomeHero } from "@/modules/home/hero";
import { VerticalSpaceCard } from "@/modules/spaces/components/vertical-space-card";
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
        <ExpertLeadSection />
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
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-white p-7 shadow-xl sm:p-10">
          {/* subtle pattern + glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(15,23,42,1) 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(76,175,80,0.22), rgba(76,175,80,0))" }}
            aria-hidden
          />

          <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* Left copy */}
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--color-brand)]">
                <Sparkles className="h-4 w-4" aria-hidden />
                Final CTA
              </p>
              <h2 className="mt-4 max-w-[22ch] font-display text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-ink sm:text-5xl">
                Find your ideal workspace &amp; start growing
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                Get expert guidance, best deals, and verified spaces — all in one place.
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                  <Zap className="h-4 w-4 text-[color:var(--color-brand)]" aria-hidden />
                  Limited-time deals available
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                  <BadgePercent className="h-4 w-4 text-[color:var(--color-brand)]" aria-hidden />
                  Spaces filling fast in your city
                </span>
              </div>
            </div>

            {/* Right CTA block */}
            <div className="relative rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_12px_40px_-18px_rgba(15,23,42,0.22)] backdrop-blur sm:p-5">
              <div
                className="pointer-events-none absolute -inset-3 rounded-3xl blur-2xl"
                style={{
                  background:
                    "radial-gradient(55% 55% at 50% 30%, rgba(76,175,80,0.22), rgba(76,175,80,0))",
                }}
                aria-hidden
              />

              <div className="relative grid gap-3">
                <Button
                  href="#lead-form"
                  className={cn(
                    "h-14 w-full rounded-xl px-6 text-base font-semibold",
                    "bg-gradient-to-b from-[color:var(--color-brand)] to-[color:var(--color-accent)]",
                    "shadow-[0_14px_34px_-12px_rgba(76,175,80,0.65)]",
                    "transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-12px_rgba(46,125,50,0.6)]",
                  )}
                >
                  Get Expert Advice
                </Button>

                <Button
                  href="/coworking"
                  variant="secondary"
                  className="h-12 w-full rounded-xl border-2 bg-white text-ink transition duration-300 hover:-translate-y-0.5 hover:bg-slate-50"
                >
                  Explore Spaces
                </Button>

                {/* Trust signals */}
                <div className="mt-1 grid gap-2 rounded-xl border border-slate-200/70 bg-slate-50/70 px-3 py-3 text-xs text-slate-700 sm:px-4">
                  <p className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[color:var(--color-brand)]" aria-hidden />
                    Trusted by 10,000+ users
                  </p>
                  <p className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[color:var(--color-brand)]" aria-hidden />
                    100% verified spaces
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[color:var(--color-brand)]" aria-hidden />
                    No spam guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

    </>
  );
}
