import { getCatalogCityIdBySlug } from "@/services/catalog-city-id";
import { coworkingWorkspacesAsSpaces } from "@/services/coworking-api";
import { getHomepageData, listSpaces } from "@/services/mock-db";
import type { HomepageData } from "@/types";

/**
 * Featured coworking rail on the homepage: workspace API for this city (catalog id),
 * app routes use slug {@link FEATURED_CITY_SLUG}.
 */
export const FEATURED_CITY_SLUG = "gurgaon";

const FEATURED_SPACES_LIMIT = 8;

function fallbackFeaturedGurgaon(): HomepageData["featuredSpaces"] {
  return listSpaces({ vertical: "coworking", city: FEATURED_CITY_SLUG }).slice(
    0,
    FEATURED_SPACES_LIMIT,
  );
}

export async function getHomepageContent(): Promise<HomepageData> {
  const base = getHomepageData();
  const catalogId = getCatalogCityIdBySlug(FEATURED_CITY_SLUG);
  let featuredSpaces = fallbackFeaturedGurgaon();

  if (catalogId) {
    const fromApi = await coworkingWorkspacesAsSpaces(
      catalogId,
      FEATURED_CITY_SLUG,
      FEATURED_SPACES_LIMIT,
    );
    if (fromApi?.length) {
      featuredSpaces = fromApi.slice(0, FEATURED_SPACES_LIMIT);
    }
  }

  return { ...base, featuredSpaces };
}
