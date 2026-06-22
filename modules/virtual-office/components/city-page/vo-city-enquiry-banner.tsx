"use client";

import { VoLeadCtaButton } from "@/modules/virtual-office/components/city-page/vo-lead-cta-button";

type VoCityEnquiryBannerProps = {
  cityDisplay: string;
};

export function VoCityEnquiryBanner({ cityDisplay }: VoCityEnquiryBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[color:var(--color-brand)]/15 bg-gradient-to-br from-white via-[#f4fbf5] to-[#e8f5e9] shadow-[0_20px_50px_rgba(76,175,80,0.08)]">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[color:var(--color-brand)]/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-[#c8e6c9]/40 blur-3xl"
        aria-hidden
      />

      <div className="relative px-6 py-10 sm:px-10 sm:py-12 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-brand)]">
            Free expert consultation · {cityDisplay}
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold leading-[1.12] tracking-tight text-ink sm:text-[2rem] lg:text-[2.125rem]">
            Not sure which plan or location is right?
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
            Our experts shortlist the best virtual office for your business type, budget, and GST
            requirements at no cost.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm text-ink/85">
            {["Curated by compliance experts", "Only verified providers", "Zero brokerage, always"].map(
              (line) => (
                <li key={line} className="flex items-center gap-2.5">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[color:var(--color-brand)] text-xs font-bold text-white">
                    ✓
                  </span>
                  {line}
                </li>
              ),
            )}
          </ul>
          <VoLeadCtaButton className="mt-8 border-0 bg-[color:var(--color-brand)] px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_8px_24px_rgba(76,175,80,0.35)] hover:bg-[#43a047]">
            Get Expert Shortlist
          </VoLeadCtaButton>
          <p className="mt-3 text-xs text-muted">Reply within 2 working hours · No spam</p>
        </div>

        <div className="mt-8 hidden lg:block">
          <div className="rounded-2xl border border-[color:var(--color-brand)]/12 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
            <p className="text-sm font-semibold text-ink">What you get</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex gap-3">
                <span className="font-semibold text-[color:var(--color-brand)]">01</span>
                <span>Personalised shortlist for your zone &amp; budget</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-[color:var(--color-brand)]">02</span>
                <span>GST / company registration plan comparison</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-[color:var(--color-brand)]">03</span>
                <span>Document checklist before you file</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
