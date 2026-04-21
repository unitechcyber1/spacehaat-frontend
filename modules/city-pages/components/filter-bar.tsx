"use client";

import { Grid2x2, Map, Search, SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { SearchOption } from "@/types";
import { cn } from "@/utils/cn";

type SharedFilters = {
  budgets: SearchOption[];
  teamSizes: SearchOption[];
  spaceTypes: SearchOption[];
  amenities: SearchOption[];
  brands: SearchOption[];
};

type SelectedFilters = {
  budget?: string;
  teamSize?: string;
  spaceType?: string;
  amenity?: string;
  brand?: string;
};

type FilterState = {
  budget: string;
  teamSize: string;
  spaceType: string;
  amenity: string;
  brand: string;
};

type ListingTopBarProps = {
  totalSpaces: number;
  /** When true, replaces the “N spaces found” line (e.g. remote workspaces loading). */
  spacesLoading?: boolean;
  view: "grid" | "map";
  onViewChange: (view: "grid" | "map") => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
};

type FilterSidebarProps = {
  filters: SharedFilters;
  selected: SelectedFilters;
};

function buildQuery(pathname: string, values: FilterState, router: ReturnType<typeof useRouter>) {
  const query = new URLSearchParams();

  Object.entries(values).forEach(([key, value]) => {
    if (value) {
      query.set(key, value);
    }
  });

  router.push(`${pathname}${query.toString() ? `?${query.toString()}` : ""}`);
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2.5 text-[0.98rem] font-medium transition",
        active
          ? "border-slate-950 bg-slate-950 text-white"
          : "border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50",
      )}
    >
      {label}
    </button>
  );
}

export function ListingTopBar({
  totalSpaces,
  spacesLoading = false,
  view,
  onViewChange,
  searchValue,
  onSearchChange,
}: ListingTopBarProps) {
  return (
    <div className="sticky top-20 z-30 border-b border-slate-200/70 bg-white/92 pb-6 pt-2 backdrop-blur-xl">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <label className="group flex min-h-[3.7rem] flex-1 items-center gap-3 rounded-full border border-[#efad41] bg-white px-5 shadow-[0_12px_28px_rgba(15,23,42,0.05)] transition focus-within:border-[#e59f26]">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by name or location..."
              className="w-full border-0 bg-transparent p-0 text-lg text-slate-800 outline-none placeholder:text-slate-500"
            />
          </label>

          <div className="hidden items-center rounded-full border border-slate-200 bg-white p-1 shadow-[0_10px_24px_rgba(15,23,42,0.06)] sm:flex">
            <button
              type="button"
              onClick={() => onViewChange("grid")}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full transition",
                view === "grid" ? "bg-slate-950 text-white" : "text-slate-500 hover:text-slate-900",
              )}
              aria-label="Grid view"
            >
              <Grid2x2 className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => onViewChange("map")}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full transition",
                view === "map" ? "bg-slate-950 text-white" : "text-slate-500 hover:text-slate-900",
              )}
              aria-label="Map view"
            >
              <Map className="h-5 w-5" />
            </button>
          </div>
        </div>

        <p className="text-[1.05rem] font-medium text-slate-500">
          {spacesLoading ? (
            <span className="inline-flex items-center gap-2 text-slate-500">
              <span
                className="inline-block size-2 animate-pulse rounded-full bg-slate-400"
                aria-hidden
              />
              Loading spaces…
            </span>
          ) : (
            <>{totalSpaces} spaces found</>
          )}
        </p>
      </div>
    </div>
  );
}

export function FilterSidebar({ filters, selected }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [values, setValues] = useState<FilterState>({
    budget: selected.budget ?? "",
    teamSize: selected.teamSize ?? "",
    spaceType: selected.spaceType ?? "",
    amenity: selected.amenity ?? "",
    brand: selected.brand ?? "",
  });

  const visibleSpaceTypes = useMemo(
    () => filters.spaceTypes.filter((option) => option.value).slice(0, 8),
    [filters.spaceTypes],
  );
  const visibleAmenities = useMemo(
    () => filters.amenities.filter((option) => option.value).slice(0, 8),
    [filters.amenities],
  );
  const visibleBrands = useMemo(
    () => filters.brands.filter((option) => option.value).slice(0, 6),
    [filters.brands],
  );

  function setAndApply(next: FilterState) {
    setValues(next);
    buildQuery(pathname, next, router);
  }

  function toggleValue(key: keyof FilterState, value: string) {
    const next = {
      ...values,
      [key]: values[key] === value ? "" : value,
    };
    setAndApply(next);
  }

  function updateSelect(key: keyof FilterState, value: string) {
    const next = { ...values, [key]: value };
    setAndApply(next);
  }

  function clearFilters() {
    const reset = {
      budget: "",
      teamSize: "",
      spaceType: "",
      amenity: "",
      brand: "",
    };
    setValues(reset);
    router.push(pathname);
    setIsMobileOpen(false);
  }

  const sidebarContent = (
    <div className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[2rem] font-semibold tracking-[-0.03em] text-slate-950">Filters</h3>
        <button
          type="button"
          onClick={clearFilters}
          className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          Clear
        </button>
      </div>

      <div className="mt-8 space-y-8">
        <section>
          <p className="text-xl font-semibold text-slate-950">Space Type</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {visibleSpaceTypes.map((option) => (
              <FilterChip
                key={option.value}
                label={option.label}
                active={values.spaceType === option.value}
                onClick={() => toggleValue("spaceType", option.value)}
              />
            ))}
          </div>
        </section>

        <section>
          <p className="text-xl font-semibold text-slate-950">Price Range</p>
          <p className="mt-4 text-lg font-medium text-slate-800">
            {filters.budgets.find((option) => option.value === values.budget)?.label ?? "Any budget"}
          </p>
          <select
            value={values.budget}
            onChange={(event) => updateSelect("budget", event.target.value)}
            className="mt-4 w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none"
          >
            {filters.budgets.map((option) => (
              <option key={`budget-${option.value || "all"}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </section>

        <section>
          <p className="text-xl font-semibold text-slate-950">Amenities</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {visibleAmenities.map((option) => (
              <FilterChip
                key={option.value}
                label={option.label}
                active={values.amenity === option.value}
                onClick={() => toggleValue("amenity", option.value)}
              />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <p className="text-xl font-semibold text-slate-950">Team Size</p>
            <select
              value={values.teamSize}
              onChange={(event) => updateSelect("teamSize", event.target.value)}
              className="mt-4 w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none"
            >
              {filters.teamSizes.map((option) => (
                <option key={`team-${option.value || "all"}`} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="text-xl font-semibold text-slate-950">Brand</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {visibleBrands.map((option) => (
                <FilterChip
                  key={option.value}
                  label={option.label}
                  active={values.brand === option.value}
                  onClick={() => toggleValue("brand", option.value)}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden xl:sticky xl:top-[10.5rem] xl:block">{sidebarContent}</div>

      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-900 xl:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </button>

      {isMobileOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/40 px-4 py-6 xl:hidden">
          <div className="mx-auto max-w-lg rounded-[1.75rem] bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,0.2)]">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-lg font-semibold text-slate-950">Filters</p>
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="text-sm text-slate-500"
              >
                Close
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      ) : null}
    </>
  );
}
