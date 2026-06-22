"use client";

import { MapPin } from "lucide-react";

import { getLocationPriceLabel, type VirtualOfficeCatalogLocation } from "@/lib/virtual-office-city-catalog";
import { useVoCityLead } from "@/modules/virtual-office/components/city-page/vo-city-lead-context";
import { cn } from "@/utils/cn";

type VoCityLocationCardProps = {
  locality: VirtualOfficeCatalogLocation;
  cityDisplay: string;
  badge: { label: string; className: string };
  wide?: boolean;
};

export function VoCityLocationCard({ locality: loc, cityDisplay, badge, wide }: VoCityLocationCardProps) {
  const { openLead } = useVoCityLead();
  const priceLabel = getLocationPriceLabel(loc);

  return (
    <article
      className={cn(
        "group relative flex h-full w-[88%] max-w-[88%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-[#EAE7E0] bg-white shadow-[0_1px_2px_rgba(20,20,20,0.05)] transition duration-200",
        "hover:-translate-y-0.5 hover:border-[color:var(--color-brand)]/30 hover:shadow-[0_12px_40px_rgba(20,20,20,0.08)]",
        "lg:w-auto lg:max-w-none",
        wide && "lg:col-span-2",
      )}
    >
      <div className="h-1 w-full shrink-0 bg-gradient-to-r from-[color:var(--color-brand)] to-[#7AC97D]" />

      <div className="flex min-h-0 flex-1 flex-col p-3.5 sm:p-6">
        <div className="flex min-h-[4.75rem] shrink-0 items-start justify-between gap-2 sm:min-h-[5.25rem]">
          <div className="min-w-0 flex-1 pr-1">
            <p className="flex h-5 items-center gap-1.5 text-xs font-medium text-muted">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[color:var(--color-brand)]" aria-hidden />
              <span className="truncate">{cityDisplay}</span>
            </p>
            <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] text-[1.02rem] font-bold leading-snug tracking-tight text-ink sm:mt-1.5 sm:min-h-[3.25rem] sm:text-[1.35rem]">
              {loc.locality}
            </h3>
          </div>
          <div className="flex h-[2.25rem] w-[5.25rem] shrink-0 items-start justify-end">
            <span
              className={cn(
                "line-clamp-2 max-w-full rounded-md px-2 py-1 text-center text-[9px] font-bold uppercase leading-[1.15] tracking-[0.05em] sm:text-[10px] sm:tracking-[0.06em]",
                badge.className,
              )}
            >
              {badge.label}
            </span>
          </div>
        </div>

        <p className="mt-2.5 hidden shrink-0 text-[12.5px] leading-relaxed text-[#555] sm:mt-4 sm:block sm:text-sm">
          Verified virtual office operators in {loc.locality}. Compare GST-ready plans, documentation
          support, and pricing, zero brokerage.
        </p>

        <div className="mt-auto flex shrink-0 flex-col gap-3 border-t border-[#EAE7E0] pt-3.5 sm:mt-5 sm:gap-4 sm:pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-h-[3.25rem]">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">Plans from</p>
            <p className="mt-0.5 text-xl font-bold leading-none tracking-tight text-[color:var(--color-brand)]">
              {priceLabel}
            </p>
          </div>
          <button
            type="button"
            onClick={openLead}
            className="inline-flex h-11 w-full shrink-0 items-center justify-center rounded-xl bg-[color:var(--color-brand)] px-5 text-sm font-semibold text-white transition hover:bg-[#3B8E3F] sm:h-auto sm:w-auto sm:min-w-[140px] sm:py-2.5"
          >
            Get Address
          </button>
        </div>
      </div>
    </article>
  );
}
