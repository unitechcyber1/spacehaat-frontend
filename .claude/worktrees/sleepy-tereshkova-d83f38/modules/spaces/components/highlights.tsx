import { Building2, CheckCircle2, IndianRupee, Users } from "lucide-react";

import { Space } from "@/types";
import { formatCurrency } from "@/utils/format";

type HighlightsProps = {
  space: Space;
};

export function Highlights({ space }: HighlightsProps) {
  const teamSizes = space.teamSizes ?? [];
  const plans = space.plans ?? [];
  const highlights = space.highlights ?? [];
  const capacity = teamSizes[teamSizes.length - 1] ?? "Flexible";
  const stats = [
    {
      label: "Seating capacity",
      value: capacity,
      icon: Users,
    },
    {
      label: "Starting price",
      value: formatCurrency(space.price),
      icon: IndianRupee,
    },
    {
      label: "Available plans",
      value: `${plans.length} options`,
      icon: Building2,
    },
    {
      label: "Key features",
      value: highlights.slice(0, 2).join(" / ") || "Premium amenities",
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto sm:grid sm:snap-none sm:gap-4 sm:overflow-visible sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="w-[18.5rem] shrink-0 snap-start rounded-[1.2rem] border border-slate-200/80 bg-white px-5 py-5 shadow-soft first:ml-1 last:mr-1 sm:w-auto sm:shrink sm:snap-none sm:first:ml-0 sm:last:mr-0"
          >
            <Icon className="h-5 w-5 text-[color:var(--color-brand)]" />
            <p className="mt-5 text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-lg font-semibold text-ink">{item.value}</p>
          </div>
        );
      })}
    </section>
  );
}
