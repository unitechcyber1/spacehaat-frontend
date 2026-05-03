import { MapPin, Star } from "lucide-react";

import type { Space } from "@/types";
import { getVirtualOfficeStartingMonthlyPrice } from "@/services/virtual-office-pricing";
import { formatCurrency, toTitleCase } from "@/utils/format";

export function VirtualOfficeDetailHeader({ space }: { space: Space }) {
  const startingMonthly = getVirtualOfficeStartingMonthlyPrice(space);
  const line = space.address?.trim() || `${toTitleCase(space.location)}, ${toTitleCase(space.city)}`;
  return (
    <header className="rounded-[1.6rem] border border-slate-200/80 bg-white p-6 shadow-soft sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-brand)]">
            {space.brand || "Virtual office"}
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">{space.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {line}
            </span>
            {space.rating > 0 ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                <Star className="h-4 w-4 fill-current text-amber-500" />
                {space.rating.toFixed(1)}
              </span>
            ) : null}
          </div>
        </div>
        <div className="rounded-[1rem] border border-slate-200 bg-slate-50 px-5 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Starting from
          </p>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-ink">
            {formatCurrency(startingMonthly)}
            <span className="text-base font-medium text-muted">/month</span>
          </p>
        </div>
      </div>
    </header>
  );
}
