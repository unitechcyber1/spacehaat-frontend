import { Button } from "@/components/ui/button";

type LeadCTAProps = {
  title: string;
  description: string;
  ctaLabel: string;
};

export function LeadCTA({ title, description, ctaLabel }: LeadCTAProps) {
  return (
    <div className="rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(135deg,#08111f_0%,#10203d_58%,#254eab_100%)] p-8 text-white shadow-[0_30px_90px_rgba(15,23,42,0.2)] sm:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/64">
            Consultation
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/74">
            {description}
          </p>
        </div>
        <Button href="#lead-form">{ctaLabel}</Button>
      </div>
    </div>
  );
}
