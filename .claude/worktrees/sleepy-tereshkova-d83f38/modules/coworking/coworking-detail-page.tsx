import { Container } from "@/components/ui/container";
import {
  CoworkingDetailHeader,
  workspaceAddress,
  workspaceCitySlugish,
  workspaceRating,
} from "@/modules/coworking/components/coworking-detail-header";
import { CoworkingPricingCards } from "@/modules/coworking/components/coworking-pricing-cards";
import { AmenitiesList } from "@/modules/space-detail/components/amenities-list";
import { DetailBottomCtaBand } from "@/modules/space-detail/components/detail-bottom-cta-band";
import { DetailTrustMarkers } from "@/modules/space-detail/components/detail-trust-markers";
import { StickyLeadForm } from "@/modules/space-detail/components/sticky-lead-form";
import { WorkspaceDescription } from "@/modules/space-detail/components/workspace-description";
import { Highlights } from "@/modules/spaces/components/highlights";
import { ImageGallery } from "@/modules/space-detail/components/image-gallery";
import { SimilarSpaces } from "@/modules/spaces/components/similar-spaces";
import { NEARBY_LANDMARKS_BY_CITY } from "@/modules/space-detail/nearby-landmarks";
import {
  coworkingApiWorkspaceToSpace,
  deriveAppCitySlugFromWorkspace,
} from "@/services/coworking-workspace-mapper";
import {
  coworkingPlanCategoryLabel,
  filterCoworkingPlansForStartingPrice,
} from "@/services/workspace-plan-pricing";
import type { CoworkingModel } from "@/types/coworking-workspace.model";
import { toTitleCase } from "@/utils/format";

function workspaceImages(workspace: CoworkingModel.WorkSpace): string[] {
  const imgs = workspace.images?.map((img) => img.image?.s3_link).filter(Boolean) ?? [];
  const hero = workspace.image?.trim();
  if (hero) return [hero, ...imgs].filter(Boolean) as string[];
  return imgs as string[];
}

export function CoworkingDetailPage({
  workspace,
  similarWorkspaces,
}: {
  workspace: CoworkingModel.WorkSpace;
  similarWorkspaces: CoworkingModel.WorkSpace[];
}) {
  const startingPrice = workspace.starting_price ?? 0;
  const eligiblePlans = filterCoworkingPlansForStartingPrice(workspace.plans ?? []);
  const planRows = eligiblePlans.map((p) => ({
    name: coworkingPlanCategoryLabel(p),
    price: typeof p.price === "number" ? p.price : Number(p.price) || 0,
    unit: workspace.price_type || "per month",
  }));
  const plansForHighlights = planRows.length
    ? planRows
    : [{ name: "From", price: startingPrice, unit: workspace.price_type || "per month" }];

  const space = {
    id: workspace.id,
    name: workspace.name,
    brand: workspace.brand?.name || "Coworking",
    city: workspace.location?.city?.name || "",
    location: workspace.location?.micro_location?.name || "",
    address: workspaceAddress(workspace),
    images: workspaceImages(workspace),
    price: startingPrice,
    rating: workspaceRating(workspace),
    highlights: (workspace.amenties ?? []).map((a) => a.name).filter(Boolean).slice(0, 6),
    amenities: (workspace.amenties ?? []).map((a) => a.name).filter(Boolean),
    plans: plansForHighlights,
    description: workspace.description || "",
    vertical: "coworking",
  } as any;

  const similarSpaces = similarWorkspaces.map((ws) =>
    coworkingApiWorkspaceToSpace(ws, deriveAppCitySlugFromWorkspace(ws)),
  );

  const address = space.address as string;
  const images = space.images as string[];
  const cityName = (workspace.location?.city?.name?.trim() || "city") as string;
  const microName = (workspace.location?.micro_location?.name?.trim() || "micro location") as string;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  const nearbyLandmarks =
    NEARBY_LANDMARKS_BY_CITY[workspaceCitySlugish(workspace)] ??
    [toTitleCase(microName), toTitleCase(cityName), "Business District"];

  const tone = {
    primaryCta: "Request Booking",
    finalCta: "Get Free Consultation",
    finalHeading: "Talk to an expert and close the right deal",
  };

  return (
    <>
      <section className="pb-8 pt-8 sm:pb-12 sm:pt-12">
        <Container>
          <ImageGallery name={space.name} images={images} />
        </Container>
      </section>

      <section className="pb-6">
        <Container>
          <CoworkingDetailHeader workspace={workspace} />
        </Container>
      </section>

      <section className="pb-12">
        <Container>
          <Highlights space={space} />
        </Container>
      </section>

      <section className="pb-14 sm:pb-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
            <div className="space-y-8">
              <section className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-soft sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-brand)]">
                  Pricing plans
                </p>
                <div className="mt-6">
                  <CoworkingPricingCards workspace={workspace} />
                </div>
              </section>

              <section className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-soft sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-brand)]">
                  Amenities
                </p>
                <div className="mt-6">
                  <AmenitiesList amenities={space.amenities} />
                </div>
              </section>
              <section className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-soft sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-brand)]">
                  About this space
                </p>
                <WorkspaceDescription description={space.description} className="mt-5" />
              </section>

              <section className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-soft sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-brand)]">
                  Location
                </p>
                <p className="mt-4 text-base text-muted">{address}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {nearbyLandmarks.map((landmark) => (
                    <span
                      key={landmark}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
                    >
                      Near {landmark}
                    </span>
                  ))}
                </div>
                <div className="mt-6 overflow-hidden rounded-[1.2rem] border border-slate-200/80">
                  <iframe
                    title={`Map for ${workspace.name}`}
                    src={mapSrc}
                    className="h-80 w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </section>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <StickyLeadForm
                leadTarget={{ city: workspaceCitySlugish(workspace), spaceId: workspace.id }}
                submitLabel={tone.primaryCta}
              />
            </div>
          </div>
        </Container>
      </section>

      <DetailTrustMarkers />

      <section className="pb-14 sm:pb-20">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-brand)]">
            Similar spaces
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            More premium options in {toTitleCase(cityName)}
          </h2>
          <SimilarSpaces spaces={similarSpaces} />
        </Container>
      </section>

      <DetailBottomCtaBand finalHeading={tone.finalHeading} finalCta={tone.finalCta} />

    </>
  );
}
