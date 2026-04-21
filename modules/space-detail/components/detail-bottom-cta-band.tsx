import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function DetailBottomCtaBand({
  finalHeading,
  finalCta,
}: {
  finalHeading: string;
  finalCta: string;
}) {
  return (
    <section className="pb-28 sm:pb-24">
      <Container>
        <div className="rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(135deg,#08111f_0%,#122343_58%,#2a56ae_100%)] p-8 text-white shadow-[0_30px_90px_rgba(15,23,42,0.22)] sm:p-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/66">Final step</p>
              <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{finalHeading}</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/74">
                Get a tailored shortlist, availability check, and best-price support from our advisory team.
              </p>
            </div>
            <Button href="#lead-form">{finalCta}</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
