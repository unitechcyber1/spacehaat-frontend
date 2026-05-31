"use client";

import { CoworkingFilteredListing } from "@/modules/coworking/components/coworking-filtered-listing";
import { Pagination } from "@/modules/city-pages/components/pagination";
import type { LocationPageData } from "@/types";

const EMPTY_LOCALITY_FALLBACK: Array<{ name: string; slug: string }> = [];

type LocationListingExperienceProps = {
  data: LocationPageData;
};

export function LocationListingExperience({ data }: LocationListingExperienceProps) {
  if (data.vertical === "coworking" && data.catalogCityId) {
    const listBasePath = `/coworking/${data.citySlug}/${data.locationSlug}`;

    return (
      <CoworkingFilteredListing
        listBasePath={listBasePath}
        catalogCityId={data.catalogCityId}
        locationLabel={data.locationName}
        microLocationId={data.workspaceMicroLocationId}
        seedSpaces={data.spaces}
        showPopularLocalities
        popularLocalities={{
          catalogCityId: data.catalogCityId,
          citySlug: data.citySlug,
          fallbackLocations: EMPTY_LOCALITY_FALLBACK,
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Pagination
        spaces={data.spaces}
        coworkingWorkspaces={null}
        ctaLabel={data.vertical === "coworking" ? "View Details" : "Get Quote"}
        cardVariant="airbnb"
      />
    </div>
  );
}
