import {
  ArrowUpRight,
  Building2,
  CalendarClock,
  FileText,
  MapPin,
  Percent,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { LeadForm } from "@/modules/home/components/lead-form";
import { VerticalLandingData } from "@/types";
import { cn } from "@/utils/cn";

const defaultHighlights = [
  {
    icon: Sparkles,
    title: "Fast shortlist",
    subtitle: "Matches within hours",
  },
  {
    icon: ShieldCheck,
    title: "Verified inventory",
    subtitle: "Operator-vetted spaces",
  },
  {
    icon: Percent,
    title: "Zero consult fee",
    subtitle: "Transparent from day one",
  },
] as const;

const virtualOfficeHighlightIcons = [FileText, MapPin, Zap] as const;

const virtualOfficeHighlightSubtitles = [
  "GST-ready paperwork and verification support",
  "Trusted locations and operator credibility",
  "From enquiry to provider match with less friction",
] as const;

const coworkingHighlightIcons = [Sparkles, ShieldCheck, CalendarClock] as const;

const coworkingHighlightSubtitles = [
  "High-fit spaces shortlisted in hours",
  "Operator-verified pricing and availability",
  "Tours and comparisons coordinated end-to-end",
] as const;

const officeHighlightIcons = [Building2, ShieldCheck, Percent] as const;

const officeHighlightSubtitles = [
  "Private suites to full managed floors",
  "Premium buildings and verified operators",
  "Shortlist, compare, and negotiate with clarity",
] as const;

function renderCoworkingTitle(title: string) {
  const marker = "Coworking";
  const idx = title.toLowerCase().indexOf(marker.toLowerCase());
  if (idx === -1) {
    return (
      <span className="bg-gradient-to-r from-sky-200/95 via-white to-slate-300/90 bg-clip-text text-transparent">
        {title}
      </span>
    );
  }
  return (
    <>
      {title.slice(0, idx)}
      <span className="bg-gradient-to-r from-sky-200/95 via-white to-slate-300/90 bg-clip-text text-transparent">
        {title.slice(idx, idx + marker.length)}
      </span>
      {title.slice(idx + marker.length)}
    </>
  );
}

function renderOfficeSpaceTitle(title: string) {
  const marker = "Office";
  const idx = title.toLowerCase().indexOf(marker.toLowerCase());
  if (idx === -1) {
    return (
      <span className="bg-gradient-to-r from-sky-200/95 via-white to-slate-300/90 bg-clip-text text-transparent">
        {title}
      </span>
    );
  }
  return (
    <>
      {title.slice(0, idx)}
      <span className="bg-gradient-to-r from-sky-200/95 via-white to-slate-300/90 bg-clip-text text-transparent">
        {title.slice(idx, idx + marker.length)}
      </span>
      {title.slice(idx + marker.length)}
    </>
  );
}

function renderVirtualOfficeTitle(title: string) {
  const marker = "Virtual Office";
  const idx = title.indexOf(marker);
  if (idx === -1) {
    return (
      <span className="bg-gradient-to-r from-sky-200/95 via-white to-slate-300/90 bg-clip-text text-transparent">
        {title}
      </span>
    );
  }
  return (
    <>
      {title.slice(0, idx)}
      <span className="bg-gradient-to-r from-sky-200/95 via-white to-slate-300/90 bg-clip-text text-transparent">
        {marker}
      </span>
      {title.slice(idx + marker.length)}
    </>
  );
}

type ExpertLeadSectionBase = {
  /** Passed to LeadForm for attribution / analytics (default: homepage). */
  mxSpaceType?: string;
};

type ExpertLeadSectionProps =
  | (ExpertLeadSectionBase & { variant?: "default" })
  | (ExpertLeadSectionBase & {
      variant: "coworking";
      leadSection: VerticalLandingData["leadSection"];
    })
  | (ExpertLeadSectionBase & {
      variant: "office-space";
      leadSection: VerticalLandingData["leadSection"];
    })
  | (ExpertLeadSectionBase & {
      variant: "virtual-office";
      leadSection: VerticalLandingData["leadSection"];
    });

/**
 * Compact lead block on a black base with brand-tinted gradients (mostly black).
 */
export function ExpertLeadSection(props: ExpertLeadSectionProps) {
  const mxSpaceType = props.mxSpaceType ?? "Homepage lead";
  const isVirtualOffice = props.variant === "virtual-office";
  const isCoworking = props.variant === "coworking";
  const isOffice = props.variant === "office-space";

  const highlights = isVirtualOffice || isCoworking || isOffice
    ? props.leadSection.bullets.slice(0, 3).map((title, i) => {
        const icon = isVirtualOffice
          ? (virtualOfficeHighlightIcons[i] ?? Sparkles)
          : isCoworking
            ? (coworkingHighlightIcons[i] ?? Sparkles)
            : (officeHighlightIcons[i] ?? Sparkles);
        const subtitle = isVirtualOffice
          ? (virtualOfficeHighlightSubtitles[i] ?? "Verified virtual office guidance for your city")
          : isCoworking
            ? (coworkingHighlightSubtitles[i] ?? "Verified coworking guidance for your city")
            : (officeHighlightSubtitles[i] ?? "Verified office guidance for your city");
        return { icon, title, subtitle };
      })
    : defaultHighlights;

  const pillText = isVirtualOffice
    ? "Compliance-led support"
    : isCoworking
      ? "Coworking consultation"
      : isOffice
        ? "Office space advisory"
      : "Get expert advice";

  const footerNote = isVirtualOffice
    ? "Documentation and pricing clarity typically within one business day."
    : isCoworking
      ? "Shortlists and tour scheduling typically within one business day."
      : isOffice
        ? "Shortlists and comparisons typically within one business day."
    : "Specialist response typically within one business day.";

  const formEyebrow = isVirtualOffice
    ? "Virtual office brief"
    : isCoworking
      ? "Coworking brief"
      : isOffice
        ? "Office brief"
        : "Start your brief";
  const formTitle = isVirtualOffice
    ? "Tell us what you need"
    : isCoworking
      ? "Tell us your requirements"
      : isOffice
        ? "Tell us what you need"
      : "Tell us what you\u2019re looking for";
  const formDescription = isVirtualOffice
    ? "City, registration or address intent, and timeline are enough to shortlist providers."
    : isCoworking
      ? "City, seats, budget, and move-in date are enough to begin."
      : isOffice
        ? "City, team size, and move-in timeline are enough to begin."
      : "City, headcount, and move-in date are enough to begin.";

  const submitLabel = isVirtualOffice || isCoworking || isOffice
    ? props.leadSection.ctaLabel
    : "Request a consultation";

  const description = isVirtualOffice || isCoworking || isOffice
    ? props.leadSection.description
    : "Share your requirements and we'll shortlist verified operators, compare transparent pricing, and help you book tours or a walkthrough—at no consultation cost.";
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/[0.07] bg-black",
        "shadow-[0_24px_80px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]",
        "sm:rounded-3xl",
      )}
    >
      {/* Black-first gradients: subtle brand light, rest fades to black */}
      <div className="absolute inset-0 bg-black" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_0%_0%,rgba(48,88,215,0.14),rgba(0,0,0,0)_55%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_100%_100%,rgba(37,99,235,0.1),rgba(0,0,0,0)_50%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)]"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:linear-gradient(to_bottom,black,transparent_95%)]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden />

      <div className="relative z-10 px-4 py-6 sm:px-5 sm:py-8 lg:px-8 lg:py-10">
        <div className="grid items-start gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8 xl:gap-10">
          <div className="text-white">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 backdrop-blur-sm sm:px-3 sm:py-1.5">
              <span
                className="h-1 w-1 shrink-0 rounded-full bg-[color:var(--color-brand)] shadow-[0_0_8px_rgba(48,88,215,0.85)]"
                aria-hidden
              />
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/75 sm:text-[0.7rem]">
                {pillText}
              </span>
            </div>

            <h2 className="mt-3 max-w-[22ch] font-display text-[1.5rem] font-semibold leading-[1.1] tracking-[-0.035em] text-white sm:mt-4 sm:max-w-none sm:text-3xl lg:text-[2.1rem]">
              {isVirtualOffice ? (
                renderVirtualOfficeTitle(props.leadSection.title)
              ) : isCoworking ? (
                renderCoworkingTitle(props.leadSection.title)
              ) : isOffice ? (
                renderOfficeSpaceTitle(props.leadSection.title)
              ) : (
                <>
                  Let us find your{" "}
                  <span className="bg-gradient-to-r from-sky-200/95 via-white to-slate-300/90 bg-clip-text text-transparent">
                    perfect office
                  </span>
                </>
              )}
            </h2>

            <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-white/68 sm:mt-3 sm:text-[0.875rem] sm:leading-6">
              {description}
            </p>

            <ul className="mt-4 grid gap-1.5 sm:mt-5 sm:grid-cols-3 sm:gap-2.5">
              {highlights.map(({ icon: Icon, title, subtitle }, index) => (
                <li
                  key={`${title}-${index}`}
                  className="group rounded-lg border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-transparent p-2.5 transition hover:border-white/12 sm:p-3"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.06] text-[color:var(--color-brand)] sm:h-8 sm:w-8 sm:rounded-lg">
                    <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                  </div>
                  <p className="mt-1.5 text-xs font-semibold tracking-tight text-white/92 sm:mt-2 sm:text-[0.8125rem]">
                    {title}
                  </p>
                  <p className="mt-0.5 text-[0.65rem] leading-snug text-white/50 sm:text-xs">
                    {subtitle}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-4 hidden items-center gap-1.5 text-xs text-white/40 sm:mt-5 sm:flex">
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[color:var(--color-brand)]" />
              {footerNote}
            </p>
          </div>

          <div className="relative lg:pl-1">
            <div
              className="pointer-events-none absolute -inset-2 rounded-2xl bg-gradient-to-b from-[color:var(--color-brand)]/12 via-transparent to-blue-500/5 opacity-70 blur-2xl"
              aria-hidden
            />
            <div
              className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.98] p-4 text-ink shadow-[0_20px_50px_rgba(0,0,0,0.48)] sm:rounded-2xl sm:p-5"
            >
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-[0.65rem]">
                {formEyebrow}
              </p>
              <h3 className="mt-1 font-display text-base font-semibold tracking-[-0.02em] text-ink sm:mt-1.5 sm:text-lg">
                {formTitle}
              </h3>
              <p className="mt-1 text-[0.7rem] leading-relaxed text-muted sm:text-xs">
                {formDescription}
              </p>
              <div className="mt-3 sm:mt-3.5">
                <LeadForm
                  variant="premium"
                  submitLabel={submitLabel}
                  city="India"
                  mxSpaceType={mxSpaceType}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
