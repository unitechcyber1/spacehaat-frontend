import { Armchair, Building2, LayoutGrid, Monitor } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { CoworkingSectionHeader } from "@/modules/coworking/homepage/coworking-section-header";

const TYPES: {
  icon: LucideIcon;
  price: string;
  unit: string;
  name: string;
  description: string;
  bestFor: string;
}[] = [
  {
    icon: Armchair,
    price: "₹300",
    unit: "/day",
    name: "Hot Desk",
    description: "Walk in, plug in, get to work. Pay only for the days you actually use.",
    bestFor: "Freelancers",
  },
  {
    icon: Monitor,
    price: "₹5,999",
    unit: "/mo",
    name: "Dedicated Desk",
    description: "Your own permanent desk with storage. Show up to a setup that's always yours.",
    bestFor: "Solo founders",
  },
  {
    icon: LayoutGrid,
    price: "₹8,000",
    unit: "/mo",
    name: "Private Cabin",
    description: "Lockable team cabins. Privacy and amenities for focused, heads-down work.",
    bestFor: "Teams 2–15",
  },
  {
    icon: Building2,
    price: "₹80,000",
    unit: "/mo",
    name: "Managed Office",
    description: "Custom-built floors, your branding, full ops support. A plug-and-play HQ.",
    bestFor: "Teams 30+",
  },
];

export function CoworkingWorkspaceTypes() {
  return (
    <section className="border-y border-slate-200/90 bg-page py-16 sm:py-[104px]">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-10">
        <CoworkingSectionHeader
          eyebrow="Workspace Types"
          title="Every Way to Work, Covered"
          description="From single-day desks to fully managed offices, pick the plan that fits your team."
        />

        <div className="no-scrollbar -mx-5 flex snap-x gap-2.5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {TYPES.map((type) => {
            const Icon = type.icon;
            return (
              <article
                key={type.name}
                className="group relative flex w-[calc((100vw-2.5rem)*0.9)] max-w-[calc((100vw-2.5rem)*0.9)] shrink-0 snap-center cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-[color:var(--color-brand)]/35 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] sm:w-auto sm:max-w-none sm:snap-start sm:min-w-0 sm:rounded-[20px] sm:p-7 sm:pb-8"
              >
                <div
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[color:var(--color-brand)] to-[#7AC97D] transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden
                />
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-full border border-[color:var(--color-brand)]/25 bg-[color:var(--color-brand-soft)] text-[color:var(--color-accent)] sm:mb-5 sm:h-14 sm:w-14">
                  <Icon className="h-5 w-5 sm:h-[26px] sm:w-[26px]" strokeWidth={1.6} aria-hidden />
                </div>
                <p className="text-xl font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[27px]">
                  {type.price}{" "}
                  <small className="text-xs font-medium text-muted sm:text-[13px]">{type.unit}</small>
                </p>
                <p className="mt-0.5 text-base font-bold tracking-tight text-[color:var(--color-accent)] sm:mt-1 sm:text-lg">
                  {type.name}
                </p>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-muted line-clamp-3 sm:mt-3 sm:text-sm sm:line-clamp-none">
                  {type.description}
                </p>
                <span className="mt-3 self-start rounded-full border border-slate-200/90 bg-page px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted sm:mt-5 sm:px-3.5 sm:py-1.5 sm:text-[11px]">
                  Best for · {type.bestFor}
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
