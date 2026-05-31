"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, useTransition } from "react";

import {
  applyCoworkingListFiltersClient,
  countActiveCoworkingListFilters,
  coworkingFiltersToApiParams,
  coworkingFiltersToSearchParams,
  DEFAULT_COWORKING_LIST_FILTERS,
  parseCoworkingListFiltersFromSearchParams,
  type CoworkingListFilterState,
} from "@/lib/coworking-list-filters";
import { Pagination } from "@/modules/city-pages/components/pagination";
import { PopularLocalitiesRail } from "@/modules/city-pages/components/popular-localities-rail";
import { CoworkingFiltersModal } from "@/modules/coworking/components/coworking-filters-modal";
import { CoworkingListingToolbar } from "@/modules/coworking/components/coworking-listing-toolbar";
import { SpaceGridSkeleton } from "@/modules/spaces/components/space-grid-skeleton";
import { coworkingWorkspacesListForCity } from "@/services/coworking-api";
import { mapSeedSpaceToCoworkingWorkspace } from "@/services/coworking-workspace-mapper";
import type { CoworkingModel } from "@/types/coworking-workspace.model";
import type { Space } from "@/types";

const LIST_LIMIT = 48;

type CoworkingFilteredListingProps = {
  listBasePath: string;
  catalogCityId: string;
  locationLabel: string;
  microLocationId?: string;
  seedSpaces?: Space[];
  showPopularLocalities?: boolean;
  popularLocalities?: {
    catalogCityId: string;
    citySlug: string;
    fallbackLocations: { name: string; slug: string }[];
  };
};

export function CoworkingFilteredListing({
  listBasePath,
  catalogCityId,
  locationLabel,
  microLocationId,
  seedSpaces = [],
  showPopularLocalities = false,
  popularLocalities,
}: CoworkingFilteredListingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const needsRemote = Boolean(catalogCityId);

  const [filters, setFilters] = useState<CoworkingListFilterState>(() =>
    parseCoworkingListFiltersFromSearchParams(new URLSearchParams(searchParams.toString())),
  );
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [rows, setRows] = useState<CoworkingModel.WorkSpace[] | null>(null);
  const [loading, setLoading] = useState(needsRemote);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const activeFilterCount = useMemo(
    () => countActiveCoworkingListFilters(filters),
    [filters],
  );

  const fetchList = useCallback(
    async (nextFilters: CoworkingListFilterState) => {
      if (!catalogCityId) return;

      setError(null);
      setLoading(true);

      try {
        const includeSortInRequest = searchParams.has("sortBy");
        const apiFilters = coworkingFiltersToApiParams(nextFilters, { includeSortInRequest });
        let list = await coworkingWorkspacesListForCity(
          catalogCityId,
          LIST_LIMIT,
          microLocationId,
          false,
          apiFilters,
        );

        if (list?.length) {
          list = applyCoworkingListFiltersClient(list, nextFilters) as CoworkingModel.WorkSpace[];
          setRows(list);
        } else if (seedSpaces.length) {
          const seeded = seedSpaces.map((s) => mapSeedSpaceToCoworkingWorkspace(s, catalogCityId));
          setRows(applyCoworkingListFiltersClient(seeded, nextFilters) as CoworkingModel.WorkSpace[]);
        } else {
          setRows([]);
        }
      } catch {
        setError("Could not load coworking spaces. Please try again.");
        setRows([]);
      } finally {
        setLoading(false);
      }
    },
    [catalogCityId, microLocationId, searchParams, seedSpaces],
  );

  useEffect(() => {
    const parsed = parseCoworkingListFiltersFromSearchParams(
      new URLSearchParams(searchParams.toString()),
    );
    setFilters(parsed);

    if (!needsRemote) {
      setLoading(false);
      if (seedSpaces.length && catalogCityId) {
        const seeded = seedSpaces.map((s) => mapSeedSpaceToCoworkingWorkspace(s, catalogCityId));
        setRows(applyCoworkingListFiltersClient(seeded, parsed) as CoworkingModel.WorkSpace[]);
      }
      return;
    }

    startTransition(() => {
      void fetchList(parsed);
    });
  }, [searchParams, needsRemote, catalogCityId, microLocationId, fetchList, seedSpaces]);

  const applyFilters = useCallback(
    (next: CoworkingListFilterState) => {
      setFilters(next);
      const qs = coworkingFiltersToSearchParams(next);
      const href = qs.toString() ? `${listBasePath}?${qs}` : listBasePath;
      router.replace(href, { scroll: false });
    },
    [listBasePath, router],
  );

  const clearFilters = useCallback(() => {
    applyFilters({ ...DEFAULT_COWORKING_LIST_FILTERS });
  }, [applyFilters]);

  const resultCount = rows?.length ?? 0;
  const showGrid = !loading && !pending;

  return (
    <div className="space-y-4 sm:space-y-6">
      {showPopularLocalities && popularLocalities ? (
        <PopularLocalitiesRail
          catalogCityId={popularLocalities.catalogCityId}
          citySlug={popularLocalities.citySlug}
          fallbackLocations={popularLocalities.fallbackLocations}
        />
      ) : null}

      <CoworkingListingToolbar
        filters={filters}
        activeFilterCount={activeFilterCount}
        resultCount={resultCount}
        locationLabel={locationLabel}
        pending={loading || pending}
        onOpenFilters={() => setFiltersOpen(true)}
        onSortChange={(sortBy, orderBy) => applyFilters({ ...filters, sortBy, orderBy })}
        onClearFilters={clearFilters}
      />

      <CoworkingFiltersModal
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        filters={filters}
        onApply={applyFilters}
        onClear={clearFilters}
        resultCount={resultCount}
        pending={loading || pending}
      />

      {error ? (
        <div className="rounded-2xl border border-red-200/80 bg-red-50 px-5 py-4 text-sm text-red-800">
          <p>{error}</p>
          <button type="button" onClick={() => void fetchList(filters)} className="mt-2 font-semibold underline">
            Retry
          </button>
        </div>
      ) : null}

      {loading || pending ? <SpaceGridSkeleton count={8} /> : null}

      {showGrid && resultCount === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200/80 bg-white px-6 py-14 text-center">
          <p className="text-lg font-semibold text-ink">No coworking spaces match your filters</p>
          <p className="mt-2 text-sm text-muted">Try a wider price range or change the sort order.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 text-sm font-medium text-[color:var(--color-brand)] underline"
          >
            Clear filters
          </button>
        </div>
      ) : null}

      {showGrid && resultCount > 0 ? (
        <Pagination
          spaces={seedSpaces}
          coworkingWorkspaces={rows}
          ctaLabel="View Details"
          cardVariant="airbnb"
        />
      ) : null}
    </div>
  );
}
