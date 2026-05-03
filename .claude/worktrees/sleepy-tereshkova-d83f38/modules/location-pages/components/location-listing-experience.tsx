"use client";

import { useEffect, useMemo, useState } from "react";

import { Pagination } from "@/modules/city-pages/components/pagination";
import { PopularLocalitiesRail } from "@/modules/city-pages/components/popular-localities-rail";
import { SpaceGridSkeleton } from "@/modules/spaces/components/space-grid-skeleton";
import { coworkingWorkspacesListForCity } from "@/services/coworking-api";
import { mapSeedSpaceToCoworkingWorkspace } from "@/services/coworking-workspace-mapper";
import type { CoworkingModel } from "@/types/coworking-workspace.model";
import { LocationPageData, Space } from "@/types";

const EMPTY_LOCALITY_FALLBACK: Array<{ name: string; slug: string }> = [];

type LocationListingExperienceProps = {
  data: LocationPageData;
};

export function LocationListingExperience({ data }: LocationListingExperienceProps) {
  const [coworkingFromApi, setCoworkingFromApi] = useState<CoworkingModel.WorkSpace[] | null>(null);

  const needsRemoteWorkspaces =
    data.vertical === "coworking" &&
    Boolean(data.catalogCityId) &&
    Boolean(data.workspaceMicroLocationId);
  const [remoteWorkspacesLoading, setRemoteWorkspacesLoading] = useState(needsRemoteWorkspaces);

  useEffect(() => {
    if (!needsRemoteWorkspaces || !data.catalogCityId || !data.workspaceMicroLocationId) {
      setRemoteWorkspacesLoading(false);
      return;
    }

    setRemoteWorkspacesLoading(true);
    setCoworkingFromApi(null);

    let cancelled = false;

    coworkingWorkspacesListForCity(data.catalogCityId, 32, data.workspaceMicroLocationId)
      .then((rows) => {
        if (cancelled || rows === null) return;
        setCoworkingFromApi(rows);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setRemoteWorkspacesLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [
    needsRemoteWorkspaces,
    data.catalogCityId,
    data.citySlug,
    data.workspaceMicroLocationId,
  ]);

  const coworkingWorkspacesForGrid = useMemo((): CoworkingModel.WorkSpace[] | null => {
    if (data.vertical !== "coworking") return null;
    if (coworkingFromApi?.length) return coworkingFromApi;
    const catalogId = data.catalogCityId ?? data.city.id;
    if (data.spaces.length && catalogId) {
      return data.spaces.map((s) => mapSeedSpaceToCoworkingWorkspace(s, catalogId));
    }
    return null;
  }, [data.vertical, data.catalogCityId, data.city.id, data.spaces, coworkingFromApi]);

  const listingSpaces = data.spaces;

  return (
    <div className="space-y-6">
      {data.vertical === "coworking" && data.catalogCityId ? (
        <PopularLocalitiesRail
          catalogCityId={data.catalogCityId}
          citySlug={data.citySlug}
          fallbackLocations={EMPTY_LOCALITY_FALLBACK}
        />
      ) : null}
      {remoteWorkspacesLoading ? (
        <SpaceGridSkeleton count={8} />
      ) : (
        <Pagination
          spaces={listingSpaces}
          coworkingWorkspaces={data.vertical === "coworking" ? coworkingWorkspacesForGrid : null}
          ctaLabel={data.vertical === "coworking" ? "View Details" : "Get Quote"}
          cardVariant="airbnb"
        />
      )}
    </div>
  );
}
