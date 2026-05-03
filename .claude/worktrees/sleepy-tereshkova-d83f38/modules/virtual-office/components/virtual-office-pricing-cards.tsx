"use client";

import { useMemo, useState } from "react";
import { Building2, CheckCircle2, FileCheck2, Landmark } from "lucide-react";

import { ContactFormModal } from "@/components/contact/contact-form-modal";
import { cn } from "@/utils/cn";
import type { Space } from "@/types";
import { formatCurrency } from "@/utils/format";

type PlanSlot = "business-address" | "gst-registration" | "company-registration";

const PLAN_ORDER: PlanSlot[] = ["business-address", "gst-registration", "company-registration"];

const FALLBACK_MONTHLY: Record<PlanSlot, number> = {
  "business-address": 1999,
  "gst-registration": 2199,
  "company-registration": 2799,
};

function planSlotFromName(raw: string): PlanSlot | null {
  const n = raw.trim().toLowerCase().replace(/\s+/g, " ");
  if (
    n.includes("company registration") ||
    n.includes("company incorporation") ||
    (n.includes("incorporation") && !n.includes("gst"))
  ) {
    return "company-registration";
  }
  if (n.includes("gst registration") || n.includes("gst address") || /^gst\b/.test(n)) {
    return "gst-registration";
  }
  if (n.includes("business address")) {
    return "business-address";
  }
  return null;
}

function monthlyBySlot(space: Space): Record<PlanSlot, number | null> {
  const best: Record<PlanSlot, number | null> = {
    "business-address": null,
    "gst-registration": null,
    "company-registration": null,
  };
  for (const p of space.plans ?? []) {
    const slot = planSlotFromName(p.name);
    if (!slot) continue;
    const price = typeof p.price === "number" && Number.isFinite(p.price) ? p.price : null;
    if (price == null) continue;
    const prev = best[slot];
    if (prev === null || price < prev) best[slot] = price;
  }
  return best;
}

const PLAN_CONFIG: Record<
  PlanSlot,
  {
    title: string;
    Icon: typeof Building2;
    features: [string, string, string, string];
  }
> = {
  "business-address": {
    title: "Business Address",
    Icon: Building2,
    features: [
      "Premium virtual office address in prime locations",
      "Ideal for startups, freelancers & remote businesses",
      "Enhance credibility with a professional business address",
      "Ensure legal compliance with expert documentation support",
    ],
  },
  "gst-registration": {
    title: "GST Registration",
    Icon: FileCheck2,
    features: [
      "Guided GST registration with structured documentation",
      "Suited for new businesses, freelancers, and growing SMEs",
      "Compliance-focused support from experienced specialists",
      "Clear timelines so you can start operating with confidence",
    ],
  },
  "company-registration": {
    title: "Company Registration",
    Icon: Landmark,
    features: [
      "Company incorporation and registration packages",
      "Transparent milestones from name approval to incorporation",
      "Support for common structures such as private limited companies",
      "Dedicated assistance through filings and follow-ups",
    ],
  },
};

type DurationTab = "12" | "24";

function monthlyForTab(baseMonthly: number, tab: DurationTab): number {
  if (tab === "12") return baseMonthly;
  return Math.max(0, Math.round(baseMonthly * 0.95));
}

function VirtualOfficePlanCard({
  slot,
  space,
  onEnquire,
}: {
  slot: PlanSlot;
  space: Space;
  onEnquire: (planTitle: string) => void;
}) {
  const [duration, setDuration] = useState<DurationTab>("12");
  const { title, Icon, features } = PLAN_CONFIG[slot];
  const fromApi = monthlyBySlot(space)[slot];
  const baseMonthly = fromApi ?? FALLBACK_MONTHLY[slot];
  const monthly = monthlyForTab(baseMonthly, duration);
  const months = duration === "12" ? 12 : 24;
  const annualTotal = monthly * months;

  return (
    <article className="flex flex-col rounded-2xl border border-slate-200/70 bg-[#f8fafc] p-4 shadow-sm sm:p-5">
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[color:var(--color-brand)] shadow-sm ring-1 ring-slate-200/80">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold leading-snug text-ink sm:text-lg">{title}</h3>
          <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2">
            {features.map((line) => (
              <li key={line} className="flex gap-2 text-xs leading-snug text-slate-700 sm:text-[0.8125rem]">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                  aria-hidden
                  strokeWidth={2}
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 inline-flex rounded-xl border border-slate-200/90 bg-white p-1 shadow-sm">
        <button
          type="button"
          onClick={() => setDuration("12")}
          className={cn(
            "rounded-lg px-4 py-2 text-xs font-semibold transition sm:text-sm",
            duration === "12"
              ? "bg-sky-50 text-[color:var(--color-brand)] ring-1 ring-sky-200/80"
              : "text-slate-600 hover:bg-slate-50",
          )}
        >
          12 Months
        </button>
        <button
          type="button"
          onClick={() => setDuration("24")}
          className={cn(
            "rounded-lg px-4 py-2 text-xs font-semibold transition sm:text-sm",
            duration === "24"
              ? "bg-sky-50 text-[color:var(--color-brand)] ring-1 ring-sky-200/80"
              : "text-slate-600 hover:bg-slate-50",
          )}
        >
          24 Months
        </button>
      </div>

      <div className="mt-3 rounded-xl border border-slate-100 bg-white px-3 py-3 shadow-sm sm:px-4 sm:py-3.5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div>
            <p className="text-lg font-bold tabular-nums text-ink sm:text-xl">
              {formatCurrency(monthly)}
              <span className="text-sm font-semibold text-slate-600">/ month</span>
            </p>
          </div>
          <div className="sm:text-right">
            <p className="text-sm font-semibold tabular-nums text-ink sm:text-base">
              {formatCurrency(annualTotal)}
              <span className="font-normal text-slate-600">/ year+gst*</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => onEnquire(title)}
            className="inline-flex w-full shrink-0 items-center justify-center rounded-lg bg-[color:var(--color-brand)] px-4 py-2.5 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-[color:var(--color-accent)] sm:w-auto sm:min-w-[8.5rem]"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </article>
  );
}

export function VirtualOfficePricingCards({ space }: { space: Space }) {
  const [contactOpen, setContactOpen] = useState(false);
  const [enquirePlanTitle, setEnquirePlanTitle] = useState("");

  const leadTarget = useMemo(
    () => ({ city: space.city, spaceId: space.id }),
    [space.city, space.id],
  );

  const openEnquire = (planTitle: string) => {
    setEnquirePlanTitle(planTitle);
    setContactOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        {PLAN_ORDER.map((slot) => (
          <VirtualOfficePlanCard key={slot} slot={slot} space={space} onEnquire={openEnquire} />
        ))}
      </div>

      <ContactFormModal
        open={contactOpen}
        onOpenChange={setContactOpen}
        leadTarget={leadTarget}
        submitLabel="Enquire Now"
        title="Enquire Now"
        subtitle={
          enquirePlanTitle
            ? `${space.name} — ${enquirePlanTitle}. We will get back to you with availability and pricing.`
            : `Tell us how we can help with ${space.name}.`
        }
        interestedInDefault={
          enquirePlanTitle
            ? `Virtual office — ${enquirePlanTitle}`
            : "Virtual office enquiry"
        }
        mxSpaceType="Virtual Office"
      />
    </>
  );
}
