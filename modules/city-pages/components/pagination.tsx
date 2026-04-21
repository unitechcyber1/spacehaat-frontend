"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SpaceGrid } from "@/modules/spaces/components/space-grid";
import type { CoworkingModel } from "@/types/coworking-workspace.model";
import { Space } from "@/types";

type PaginationProps = {
  spaces: Space[];
  /** Coworking listing: wire workspaces for {@link CoworkingCard}; when set, pagination applies to this list. */
  coworkingWorkspaces?: CoworkingModel.WorkSpace[] | null;
  /** Virtual-office city listing: wire workspaces from `workSpaces?virtual=true`. */
  virtualOfficeWorkspaces?: CoworkingModel.WorkSpace[] | null;
  ctaLabel?: string;
  cardVariant?: "default" | "airbnb";
};

export function Pagination({
  spaces,
  coworkingWorkspaces,
  virtualOfficeWorkspaces,
  ctaLabel,
  cardVariant = "default",
}: PaginationProps) {
  const pageSize = 24;
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const useVirtualOffice = Boolean(virtualOfficeWorkspaces?.length);
  const useCoworkingWorkspaces = Boolean(coworkingWorkspaces?.length) && !useVirtualOffice;
  const totalCount = useVirtualOffice
    ? virtualOfficeWorkspaces!.length
    : useCoworkingWorkspaces
      ? coworkingWorkspaces!.length
      : spaces.length;

  if (totalCount === 0) {
    return (
      <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          No matches
        </p>
        <h3 className="mt-3 text-2xl font-semibold text-ink">
          No spaces match these filters right now
        </h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          Try a wider budget or remove one filter to see more results.
        </p>
      </div>
    );
  }

  const visibleVirtualOffice = useVirtualOffice
    ? virtualOfficeWorkspaces!.slice(0, visibleCount)
    : null;
  const visibleCoworking = useCoworkingWorkspaces
    ? coworkingWorkspaces!.slice(0, visibleCount)
    : null;
  const visibleSpaces = spaces.slice(0, visibleCount);
  const hasMore = visibleCount < totalCount;

  return (
    <div>
      <SpaceGrid
        spaces={useCoworkingWorkspaces || useVirtualOffice ? [] : visibleSpaces}
        coworkingWorkspaces={visibleCoworking}
        virtualOfficeWorkspaces={visibleVirtualOffice}
        ctaLabel={ctaLabel}
        variant={cardVariant}
      />
      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setVisibleCount((current) => current + pageSize)}
          >
            Load More
          </Button>
        </div>
      ) : null}
    </div>
  );
}
