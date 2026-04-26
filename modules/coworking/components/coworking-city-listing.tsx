"use client";

import { useEffect, useMemo, useState } from "react";

import { Pagination } from "@/modules/city-pages/components/pagination";
import { PopularLocalitiesRail } from "@/modules/city-pages/components/popular-localities-rail";
import { SpaceGridSkeleton } from "@/modules/spaces/components/space-grid-skeleton";
import { coworkingWorkspacesListForCity } from "@/services/coworking-api";
import { mapSeedSpaceToCoworkingWorkspace } from "@/services/coworking-workspace-mapper";
import type { CoworkingModel } from "@/types/coworking-workspace.model";
import type { CityPageData } from "@/types";

export function CoworkingCityListing({
  data,
  showPopularLocalities = true,
}: {
  data: CityPageData;
  showPopularLocalities?: boolean;
}) {
  const [coworkingFromApi, setCoworkingFromApi] = useState<CoworkingModel.WorkSpace[] | null>(null);
  const needsRemote = Boolean(data.catalogCityId);
  const [loading, setLoading] = useState(needsRemote);

  useEffect(() => {
    if (!needsRemote) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setCoworkingFromApi(null);
    let cancelled = false;

    coworkingWorkspacesListForCity(data.catalogCityId!, 32)
      .then((rows) => {
        if (cancelled || rows === null) return;
        setCoworkingFromApi(rows);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [needsRemote, data.catalogCityId]);

  const coworkingWorkspacesForGrid = useMemo((): CoworkingModel.WorkSpace[] | null => {
    if (coworkingFromApi?.length) return coworkingFromApi;
    const catalogId = data.catalogCityId ?? data.city.id;
    if (data.spaces.length && catalogId) {
      return data.spaces.map((s) => mapSeedSpaceToCoworkingWorkspace(s, catalogId));
    }
    return null;
  }, [data.catalogCityId, data.city.id, data.spaces, coworkingFromApi]);

  const localityFallback = useMemo(
    () => data.popularLocations.map((loc) => ({ name: loc.name, slug: loc.slug })),
    [data.popularLocations],
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {showPopularLocalities && data.catalogCityId ? (
        <PopularLocalitiesRail
          catalogCityId={data.catalogCityId}
          citySlug={data.city.slug}
          fallbackLocations={localityFallback}
        />
      ) : null}
      {loading ? (
        <SpaceGridSkeleton count={8} />
      ) : (
        <Pagination
          spaces={data.spaces}
          coworkingWorkspaces={coworkingWorkspacesForGrid}
          ctaLabel="View Details"
          cardVariant="airbnb"
        />
      )}
    </div>
  );
}
