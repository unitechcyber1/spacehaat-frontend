import { Container } from "@/components/ui/container";
import { LeadCTA } from "@/modules/city-pages/components/lead-cta";

export function CityPageLeadCtaBand({
  title,
  description,
  ctaLabel,
}: {
  title: string;
  description: string;
  ctaLabel: string;
}) {
  return (
    <section className="pb-14 sm:pb-20">
      <Container>
        <LeadCTA title={title} description={description} ctaLabel={ctaLabel} />
      </Container>
    </section>
  );
}
