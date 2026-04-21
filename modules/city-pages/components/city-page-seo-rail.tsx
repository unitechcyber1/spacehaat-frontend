import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LocationCard } from "@/modules/city-pages/components/location-card";
import type { CityPageData } from "@/types";

type CityPageSeoRailProps = {
  data: Pick<CityPageData, "city" | "vertical" | "seoSection" | "popularLocations" | "leadCta">;
};

export function CityPageSeoRail({ data }: CityPageSeoRailProps) {
  return (
    <section className="pb-14 sm:pb-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-brand)]">
              SEO Guide
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-[2rem]">
              {data.seoSection.title}
            </h2>
            <div className="mt-5 space-y-4 text-[0.98rem] leading-7 text-muted">
              {data.seoSection.paragraphs.map((paragraph, index) => (
                <p key={`${data.seoSection.title}-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-[1.6rem] border border-slate-200/80 bg-white p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Popular Locations</p>
              <div className="mt-5 grid gap-4">
                {data.popularLocations.map((location) => (
                  <LocationCard
                    key={location.slug}
                    city={data.city.slug}
                    vertical={data.vertical}
                    location={location}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-[1.6rem] border border-slate-200/80 bg-white p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Quick Help</p>
              <p className="mt-4 text-[0.98rem] leading-7 text-muted">
                Share your requirement and our team will help you compare better-fit options in {data.city.name}.
              </p>
              <Button href="#lead-form" className="mt-5">
                {data.leadCta.ctaLabel}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
