"use client";

import { ArrowUpDown, SlidersHorizontal, X } from "lucide-react";

import type { PgFilterState } from "@/modules/coliving/components/coliving-listing-filters";
import { cn } from "@/utils/cn";

const SORT_OPTIONS = [
  { value: "added_on:-1", label: "Newest" },
  { value: "rating:-1", label: "Top rated" },
  { value: "minMonthlyRent:1", label: "Price ↑" },
  { value: "maxMonthlyRent:-1", label: "Price ↓" },
  { value: "name:1", label: "A–Z" },
] as const;

type ColivingCityListingToolbarProps = {
  filters: PgFilterState;
  activeFilterCount: number;
  total: number;
  cityName: string;
  pending?: boolean;
  onOpenFilters: () => void;
  onSortChange: (sortBy: string, orderBy: "1" | "-1") => void;
  onClearFilters: () => void;
  onRemoveFilter?: (key: keyof PgFilterState) => void;
};

function activeChips(filters: PgFilterState): { key: keyof PgFilterState; label: string }[] {
  const chips: { key: keyof PgFilterState; label: string }[] = [];
  if (filters.locality.trim()) chips.push({ key: "locality", label: filters.locality.trim() });
  if (filters.name.trim()) chips.push({ key: "name", label: filters.name.trim() });
  if (filters.type.trim()) chips.push({ key: "type", label: filters.type.trim() });
  if (filters.minPrice.trim() || filters.maxPrice.trim()) {
    const min = filters.minPrice.trim();
    const max = filters.maxPrice.trim();
    if (min && max) chips.push({ key: "minPrice", label: `₹${min}–₹${max}` });
    else if (min) chips.push({ key: "minPrice", label: `From ₹${min}` });
    else chips.push({ key: "maxPrice", label: `Up to ₹${max}` });
  }
  if (filters.preferredGuest.trim()) {
    chips.push({ key: "preferredGuest", label: filters.preferredGuest });
  }
  if (filters.verified) chips.push({ key: "verified", label: "Verified" });
  if (filters.foodIncluded) chips.push({ key: "foodIncluded", label: "Food included" });
  if (filters.parking) chips.push({ key: "parking", label: "Parking" });
  return chips;
}

export function ColivingCityListingToolbar({
  filters,
  activeFilterCount,
  total,
  cityName,
  pending,
  onOpenFilters,
  onSortChange,
  onClearFilters,
}: ColivingCityListingToolbarProps) {
  const sortValue = `${filters.sortBy}:${filters.orderBy}`;
  const chips = activeChips(filters);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-slate-600">
          {pending ? (
            <span className="inline-flex items-center gap-2">
              <span className="inline-block size-2 animate-pulse rounded-full bg-[#4CAF50]" aria-hidden />
              Loading listings…
            </span>
          ) : (
            <>
              <span className="font-semibold text-slate-900">{total.toLocaleString("en-IN")}</span> homes in{" "}
              <span className="font-semibold text-slate-900">{cityName}</span>
            </>
          )}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onOpenFilters}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold shadow-[0_8px_22px_rgba(15,23,42,0.06)] transition",
              activeFilterCount > 0
                ? "border-slate-900 bg-slate-900 text-white hover:bg-slate-800"
                : "border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50",
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 ? (
              <span className="inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-white/20 px-1.5 py-0.5 text-[0.7rem] font-bold text-white">
                {activeFilterCount}
              </span>
            ) : null}
          </button>

          <label className="relative inline-flex items-center">
            <span className="sr-only">Sort listings</span>
            <ArrowUpDown className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <select
              value={sortValue}
              onChange={(e) => {
                const [sortBy, orderBy] = e.target.value.split(":");
                onSortChange(sortBy, orderBy as "1" | "-1");
              }}
              disabled={pending}
              className="appearance-none rounded-full border border-slate-200 bg-white py-2.5 pr-8 pl-10 text-sm font-semibold text-slate-900 shadow-[0_8px_22px_rgba(15,23,42,0.06)] outline-none transition hover:border-slate-300 focus:border-[#4CAF50] focus:ring-4 focus:ring-[rgba(76,175,80,0.14)] disabled:opacity-60"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {chips.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          {chips.map((chip) => (
            <span
              key={`${chip.key}-${chip.label}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 shadow-sm"
            >
              {chip.label}
            </span>
          ))}
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1.5 text-xs font-semibold text-slate-600 underline-offset-2 hover:text-slate-950 hover:underline"
          >
            <X className="h-3.5 w-3.5" />
            Clear all
          </button>
        </div>
      ) : null}
    </div>
  );
}
