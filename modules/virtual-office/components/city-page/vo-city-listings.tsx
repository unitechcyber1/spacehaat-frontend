"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { formatInrPrice, getVirtualOfficeCityDisplayName } from "@/lib/virtual-office-city-catalog";
import { VirtualOfficeCityGridCard } from "@/modules/virtual-office/components/city-page/vo-city-grid-card";
import { VoEyebrow, VoSection, VoSectionSub, VoSectionTitle } from "@/modules/virtual-office/components/city-page/vo-city-ui";
import { SpaceGridSkeleton } from "@/modules/spaces/components/space-grid-skeleton";
import { coworkingWorkspacesListForCity } from "@/services/coworking-api";
import { mapSeedSpaceToCoworkingWorkspace } from "@/services/coworking-workspace-mapper";
import type { CityPageData } from "@/types";
import type { CoworkingModel } from "@/types/coworking-workspace.model";

export function VoCityListingsSection({ data }: { data: CityPageData }) {
  const cityDisplay = getVirtualOfficeCityDisplayName(data.city.slug, data.city.name);
  const [fromApi, setFromApi] = useState<CoworkingModel.WorkSpace[] | null>(null);
  const needsRemote = Boolean(data.catalogCityId);
  const [loading, setLoading] = useState(needsRemote);
  const pageSize = 9;
  const [visibleCount, setVisibleCount] = useState(pageSize);

  useEffect(() => {
    if (!needsRemote) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setFromApi(null);
    let cancelled = false;
    coworkingWorkspacesListForCity(data.catalogCityId!, 48, undefined, true)
      .then((rows) => {
        if (!cancelled && rows) setFromApi(rows);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [needsRemote, data.catalogCityId]);

  const workspaces = useMemo((): CoworkingModel.WorkSpace[] => {
    if (fromApi?.length) return fromApi;
    const catalogId = data.catalogCityId ?? data.city.id;
    if (data.spaces.length && catalogId) {
      return data.spaces.map((s) => mapSeedSpaceToCoworkingWorkspace(s, catalogId));
    }
    return [];
  }, [data.catalogCityId, data.city.id, data.spaces, fromApi]);

  const visible = workspaces.slice(0, visibleCount);
  const lowest = workspaces.reduce<number | null>((min, ws) => {
    const p = ws.starting_price;
    if (typeof p !== "number" || !Number.isFinite(p)) return min;
    return min == null || p < min ? p : min;
  }, null);

  return (
    <VoSection id="vo-listings">
      <VoEyebrow>Featured listings</VoEyebrow>
      <VoSectionTitle>Verified Providers in {cityDisplay}</VoSectionTitle>
      <VoSectionSub className="mt-3">
        Compare real listings. Real pricing. Zero brokerage.
        {lowest != null ? ` Starting ${formatInrPrice(lowest)}/month.` : null}
      </VoSectionSub>

      {loading ? (
        <div className="mt-8">
          <SpaceGridSkeleton count={6} />
        </div>
      ) : workspaces.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-sm text-muted">No virtual office listings in {cityDisplay} right now. Check back soon.</p>
        </div>
      ) : (
        <>
          <div className="vo-list-scroll mt-6 flex gap-3 overflow-x-auto pb-2 lg:mt-8 lg:gap-[18px] lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
            {visible.map((ws) => (
              <VirtualOfficeCityGridCard key={ws.id || ws._id} workspace={ws} />
            ))}
          </div>
          {visibleCount < workspaces.length ? (
            <div className="mt-6 flex justify-center">
              <Button type="button" variant="secondary" onClick={() => setVisibleCount((c) => c + pageSize)}>
                Load More
              </Button>
            </div>
          ) : null}
          <p className="mt-6 text-center">
            <Link
              href="#lead-form"
              className="text-[15px] font-semibold text-[color:var(--color-brand)] underline-offset-4 hover:underline"
            >
              View all verified virtual office providers in {cityDisplay} →
            </Link>
          </p>
        </>
      )}
    </VoSection>
  );
}
