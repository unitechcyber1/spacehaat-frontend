"use client";

import { Building2, CheckCircle2, FileText, MapPin } from "lucide-react";
import { useState } from "react";

import { ContactFormModal } from "@/components/contact/contact-form-modal";
import { cn } from "@/utils/cn";

type PlanCard = {
  title: string;
  description: string;
  bullets: string[];
  icon: typeof MapPin;
  accent: "mint" | "lavender" | "sand";
};

const cards: PlanCard[] = [
  {
    title: "Company Registration Plan",
    description:
      "Get a compliant business address for incorporation and early-stage paperwork — without renting a full office.",
    bullets: [
      "Premium registration address",
      "Support for incorporation filings",
      "Mail & courier handling (optional)",
    ],
    icon: FileText,
    accent: "lavender",
  },
  {
    title: "GST Registration Plan",
    description:
      "Expand into a new state with a credible address and smoother documentation support for GST needs.",
    bullets: [
      "GST registration / APOB support",
      "Address proof & documentation guidance",
      "Mail & courier handling",
    ],
    icon: CheckCircle2,
    accent: "mint",
  },
  {
    title: "Business Address Plan",
    description:
      "Use a prime business address for branding, invoices, and vendor onboarding — with mail handling support.",
    bullets: [
      "Professional business address",
      "Mail scanning / forwarding options",
      "Address on invoices & letterheads",
    ],
    icon: Building2,
    accent: "sand",
  },
];

function accentClass(accent: PlanCard["accent"]): string {
  if (accent === "mint") return "bg-[linear-gradient(180deg,rgba(76,175,80,0.10)_0%,rgba(76,175,80,0.04)_100%)]";
  if (accent === "sand") return "bg-[linear-gradient(180deg,rgba(255,244,230,0.85)_0%,rgba(255,255,255,0.95)_100%)]";
  return "bg-[linear-gradient(180deg,rgba(124,133,255,0.10)_0%,rgba(255,255,255,0.96)_100%)]";
}

export function VirtualOfficePlanChooser() {
  const [open, setOpen] = useState(false);
  const [activeTitle, setActiveTitle] = useState<string>(cards[1]!.title);

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <article
              key={c.title}
              className={cn(
                "relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 p-6 shadow-soft transition",
                "hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_30px_70px_rgba(15,23,42,0.12)]",
                accentClass(c.accent),
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-[0_14px_36px_rgba(15,23,42,0.10)]">
                  <Icon className="h-5 w-5 text-[color:var(--color-brand)]" />
                </div>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-700">
                  Popular
                </span>
              </div>

              <h3 className="mt-5 text-lg font-semibold text-ink">{c.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{c.description}</p>

              <div className="mt-5 grid gap-2">
                {c.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[color:var(--color-brand)]" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveTitle(c.title);
                  setOpen(true);
                }}
                className={cn(
                  "mt-6 inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-ink",
                  "transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_18px_44px_rgba(15,23,42,0.10)]",
                )}
              >
                Get details & pricing
              </button>
            </article>
          );
        })}
      </div>

      <ContactFormModal
        open={open}
        onOpenChange={setOpen}
        leadTarget={{ city: "global", spaceId: "virtual-office-plan-chooser" }}
        submitLabel="Request Details"
        title="Enquire Now"
        subtitle={`Get best deals for ${activeTitle}.`}
      />
    </>
  );
}

