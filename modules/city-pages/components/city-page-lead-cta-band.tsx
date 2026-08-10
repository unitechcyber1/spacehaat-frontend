import { Container } from "@/components/ui/container";
import { LeadCTA } from "@/modules/city-pages/components/lead-cta";
import type { SpaceVertical } from "@/types";

export function CityPageLeadCtaBand({
  title,
  description,
  ctaLabel,
  citySlug,
  vertical,
  microlocation,
}: {
  title: string;
  description: string;
  ctaLabel: string;
  citySlug: string;
  vertical?: SpaceVertical;
  microlocation?: string;
}) {
  return (
    <section className="pb-14 sm:pb-20">
      <Container>
        <LeadCTA
          title={title}
          description={description}
          ctaLabel={ctaLabel}
          citySlug={citySlug}
          vertical={vertical}
          microlocation={microlocation}
        />
      </Container>
    </section>
  );
}
