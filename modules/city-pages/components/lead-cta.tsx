"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { ContactFormModal } from "@/components/contact/contact-form-modal";
import { Button } from "@/components/ui/button";
import type { SpaceVertical } from "@/types";

type LeadCTAProps = {
  title: string;
  description: string;
  ctaLabel: string;
  citySlug: string;
  vertical?: SpaceVertical;
  microlocation?: string;
};

function leadModalConfig(vertical?: SpaceVertical) {
  if (vertical === "coliving") {
    return {
      mxSpaceType: "Coliving",
      spaceListingKey: "living_space" as const,
      interestedInDefault: "Coliving consultation",
    };
  }
  if (vertical === "virtual-office") {
    return {
      mxSpaceType: "Virtual Office",
      spaceListingKey: "work_space" as const,
      interestedInDefault: "Virtual office consultation",
    };
  }
  if (vertical === "office-space") {
    return {
      mxSpaceType: "Office Space",
      spaceListingKey: "office_space" as const,
      interestedInDefault: "Office space consultation",
    };
  }
  return {
    mxSpaceType: "Web Coworking",
    spaceListingKey: "work_space" as const,
    interestedInDefault: "Coworking consultation",
  };
}

export function LeadCTA({
  title,
  description,
  ctaLabel,
  citySlug,
  vertical,
  microlocation = "",
}: LeadCTAProps) {
  const [open, setOpen] = useState(false);
  const modal = leadModalConfig(vertical);

  return (
    <>
      <div className="relative overflow-hidden rounded-[1.75rem] border border-[color:var(--color-brand)]/20 bg-[linear-gradient(125deg,#16351a_0%,#1f4a24_42%,#2e7d32_78%,#43a047_100%)] p-7 text-white shadow-[0_24px_64px_rgba(46,125,50,0.28)] sm:rounded-[2rem] sm:p-9 lg:p-10">
        <div
          className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[color:var(--color-brand)]/25 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 left-1/4 h-48 w-48 rounded-full bg-white/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          aria-hidden
          style={{
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
              `<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'><path fill='none' stroke='%23ffffff' stroke-width='1' d='M0 36h72M36 0v72'/></svg>`,
            )}")`,
            backgroundSize: "72px 72px",
          }}
        />

        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="min-w-0 max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#a5d6a7] shadow-[0_0_8px_rgba(165,214,167,0.8)]"
                aria-hidden
              />
              Free expert consultation
            </p>
            <h2 className="mt-4 font-display text-[1.65rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white sm:text-4xl sm:leading-[1.08] lg:text-[2.35rem]">
              {title}
            </h2>
            <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-white/80 sm:mt-4 sm:text-base sm:leading-7">
              {description}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#c8e6c9]">
              <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden strokeWidth={2.25} />
              Zero brokerage. Verified listings. Response within hours.
            </p>
          </div>

          <div className="shrink-0 lg:self-center">
            <Button
              type="button"
              onClick={() => setOpen(true)}
              className="group w-full bg-white px-7 py-3.5 text-[0.9375rem] font-semibold text-[color:var(--color-accent)] shadow-[0_12px_32px_rgba(0,0,0,0.18)] hover:bg-[#f1f8f1] hover:text-[#1b5e20] sm:w-auto"
            >
              {ctaLabel}
              <ArrowRight
                className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5"
                aria-hidden
                strokeWidth={2.25}
              />
            </Button>
          </div>
        </div>
      </div>

      <ContactFormModal
        open={open}
        onOpenChange={setOpen}
        leadTarget={{ city: citySlug || "india", spaceId: "city-cta" }}
        submitLabel={ctaLabel}
        title={ctaLabel}
        subtitle={description}
        interestedInDefault={modal.interestedInDefault}
        mxSpaceType={modal.mxSpaceType}
        spaceListingKey={modal.spaceListingKey}
        microlocation={microlocation}
      />
    </>
  );
}
