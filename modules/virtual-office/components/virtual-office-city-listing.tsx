"use client";

import { useEffect, useMemo, useState } from "react";

import { Pagination } from "@/modules/city-pages/components/pagination";
import { SpaceGridSkeleton } from "@/modules/spaces/components/space-grid-skeleton";
import { coworkingWorkspacesListForCity } from "@/services/coworking-api";
import { mapSeedSpaceToCoworkingWorkspace } from "@/services/coworking-workspace-mapper";
import type { CoworkingModel } from "@/types/coworking-workspace.model";
import type { CityPageData } from "@/types";

export function VirtualOfficeCityListing({ data }: { data: CityPageData }) {
  const [fromApi, setFromApi] = useState<CoworkingModel.WorkSpace[] | null>(null);
  const needsRemote = Boolean(data.catalogCityId);
  const [loading, setLoading] = useState(needsRemote);

  useEffect(() => {
    if (!needsRemote) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setFromApi(null);
    let cancelled = false;

    coworkingWorkspacesListForCity(data.catalogCityId!, 32, undefined, true)
      .then((rows) => {
        if (cancelled || rows === null) return;
        setFromApi(rows);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [needsRemote, data.catalogCityId]);

  const virtualOfficeWorkspaces = useMemo((): CoworkingModel.WorkSpace[] | null => {
    if (fromApi?.length) return fromApi;
    const catalogId = data.catalogCityId ?? data.city.id;
    if (data.spaces.length && catalogId) {
      return data.spaces.map((s) => mapSeedSpaceToCoworkingWorkspace(s, catalogId));
    }
    return null;
  }, [data.catalogCityId, data.city.id, data.spaces, fromApi]);

  if (loading) {
    return <SpaceGridSkeleton count={4} />;
  }
  console.log("virtualOfficeWorkspaces", virtualOfficeWorkspaces);

  return (
    <Pagination
      spaces={data.spaces}
      virtualOfficeWorkspaces={virtualOfficeWorkspaces}
      ctaLabel="Get Quote"
      cardVariant="airbnb"
    />
  );
}
