import { Container } from "@/components/ui/container";
import { LeadForm } from "@/modules/home/components/lead-form";

export function CityPageExpertLead({
  cityName,
  submitLabel,
  mxSpaceType = "City page lead",
}: {
  cityName: string;
  submitLabel: string;
  mxSpaceType?: string;
}) {
  return (
    <section className="pb-28 sm:pb-24" id="lead-form">
      <Container>
        <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(135deg,#08111f_0%,#122444_58%,#2a57b2_100%)] p-8 text-white shadow-[0_30px_90px_rgba(15,23,42,0.22)] sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/64">Expert support</p>
              <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
                Need help finding the right space?
              </h2>
              <p className="mt-4 max-w-xl text-[0.98rem] leading-7 text-white/74">
                Tell us your budget, team size, and preferred location. We&apos;ll help you shortlist better options in{" "}
                {cityName}.
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-white p-5 text-ink sm:p-6">
              <LeadForm submitLabel={submitLabel} city={cityName} mxSpaceType={mxSpaceType} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
