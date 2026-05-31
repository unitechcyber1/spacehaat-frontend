import { Suspense } from "react";

import { ColivingCityListing } from "@/modules/coliving/components/coliving-city-listing";
import { SpaceGridSkeleton } from "@/modules/spaces/components/space-grid-skeleton";
import type { PgDetail } from "@/types/pg.model";
import type { CityPageData } from "@/types";

export function ColivingCityListingShell({
  data,
  initialItems,
  initialTotal,
  initialPage,
}: {
  data: CityPageData;
  initialItems: PgDetail[];
  initialTotal: number;
  initialPage: number;
}) {
  return (
    <Suspense fallback={<SpaceGridSkeleton count={8} />}>
      <ColivingCityListing
        data={data}
        initialItems={initialItems}
        initialTotal={initialTotal}
        initialPage={initialPage}
      />
    </Suspense>
  );
}
