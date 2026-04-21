import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";

export function CityPageHero({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <section className="relative overflow-hidden pb-10 pt-10 sm:pb-14 sm:pt-14">
      <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top_left,rgba(48,88,215,0.12),transparent_32%),linear-gradient(180deg,#f8fbff_0%,#ffffff_92%)]" />
      <Container>
        <div className="max-w-4xl">
          <Badge className="bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)]">{eyebrow}</Badge>
          <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-[-0.04em] text-ink sm:text-5xl">
            {title}
          </h1>
        </div>
      </Container>
    </section>
  );
}
