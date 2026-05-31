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
        "group relative flex min-w-[62%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-[#EAE7E0] bg-white shadow-[0_1px_2px_rgba(20,20,20,0.05)] transition duration-200",
        "hover:-translate-y-0.5 hover:border-[color:var(--color-brand)]/30 hover:shadow-[0_12px_40px_rgba(20,20,20,0.08)]",
        "sm:min-w-[56%] lg:min-w-0",
        wide && "lg:col-span-2",
      )}
    >
      <div className="h-1 w-full bg-gradient-to-r from-[color:var(--color-brand)] to-[#7AC97D]" />

      <div className="flex flex-1 flex-col p-3.5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[color:var(--color-brand)]" aria-hidden />
              {cityDisplay}
            </p>
            <h3 className="mt-1 text-[1.02rem] font-bold tracking-tight text-ink sm:mt-1.5 sm:text-[1.35rem]">
              {loc.locality}
            </h3>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.06em]",
              badge.className,
            )}
          >
            {badge.label}
          </span>
        </div>

        <p className="mt-2.5 flex-1 text-[12.5px] leading-relaxed text-[#555] sm:mt-4 sm:text-sm">
          Verified virtual office operators in {loc.locality}. Compare GST-ready plans, documentation
          support, and pricing — zero brokerage.
        </p>

        <div className="mt-3.5 flex flex-col gap-3 border-t border-[#EAE7E0] pt-3.5 sm:mt-5 sm:gap-4 sm:pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">Plans from</p>
            <p className="mt-0.5 text-xl font-bold tracking-tight text-[color:var(--color-brand)]">{priceLabel}</p>
          </div>
          <button
            type="button"
            onClick={openLead}
            className="inline-flex w-full items-center justify-center rounded-xl bg-[color:var(--color-brand)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3B8E3F] sm:w-auto sm:min-w-[140px]"
          >
            Get Address
          </button>
        </div>
      </div>
    </article>
  );
}
