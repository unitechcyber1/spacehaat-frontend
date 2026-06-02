import { pgListingReactKey } from "@/lib/pg-slug";
import { ColivingListingCard } from "@/modules/coliving/components/coliving-listing-card";
import type { PgDetail } from "@/types/pg.model";

type ColivingFeaturedRailProps = {
  listings: PgDetail[];
};

export function ColivingFeaturedRail({ listings }: ColivingFeaturedRailProps) {
  if (!listings.length) return null;

  return (
    <div className="no-scrollbar mt-10 flex snap-x items-stretch gap-5 overflow-x-auto pb-2">
      {listings.map((pg, index) => (
        <div
          key={pgListingReactKey(pg, index)}
          className="flex h-full w-[18.5rem] shrink-0 snap-start flex-col sm:w-[21rem]"
        >
          <ColivingListingCard pg={pg} className="min-h-0 flex-1" />
        </div>
      ))}
    </div>
  );
}
