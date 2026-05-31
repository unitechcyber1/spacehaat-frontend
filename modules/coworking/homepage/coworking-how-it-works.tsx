import { ClipboardList, Search, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { CoworkingSectionHeader } from "@/modules/coworking/homepage/coworking-section-header";

const STEPS: {
  num: number;
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    num: 1,
    icon: Search,
    title: "Search your city",
    description:
      "Filter by location, team size, and budget. See real, verified listings — not catalog pages.",
  },
  {
    num: 2,
    icon: ClipboardList,
    title: "Compare & tour",
    description:
      "Side-by-side pricing, amenities and ratings. Book a tour in two clicks — or let us tour for you.",
  },
  {
    num: 3,
    icon: Truck,
    title: "Move in fast",
    description:
      "Negotiated rates, transparent terms, zero brokerage. Most teams move in within 7 days.",
  },
];

export function CoworkingHowItWorks() {
  return (
    <section className="py-16 sm:py-[104px]">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-10">
        <CoworkingSectionHeader
          eyebrow="How It Works"
          title="From shortlist to move-in, in a week"
          titleClassName="lg:whitespace-nowrap"
        />

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-0">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="flex flex-1 flex-col items-center lg:flex-row">
                <div className="flex max-w-[270px] flex-col items-center text-center">
                  <div className="mb-5 flex h-[54px] w-[54px] items-center justify-center rounded-full border border-[color:var(--color-brand)]/25 bg-[color:var(--color-brand-soft)] text-lg font-bold text-[color:var(--color-accent)]">
                    {step.num}
                  </div>
                  <Icon className="mb-3.5 h-[30px] w-[30px] text-muted" strokeWidth={1.5} aria-hidden />
                  <h3 className="text-xl font-bold tracking-tight text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[14.5px]">
                    {step.description}
                  </p>
                </div>
                {index < STEPS.length - 1 ? (
                  <div
                    className="mx-auto my-4 hidden h-0 w-20 shrink-0 border-t-2 border-dashed border-[color:var(--color-brand)]/35 lg:my-0 lg:mt-[27px] lg:block"
                    aria-hidden
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
