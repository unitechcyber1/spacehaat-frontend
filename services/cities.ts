import { EMPTY_CITY_PAGE_FILTERS, getCityPageData } from "@/services/mock-db";
import { CityPageFilters, SpaceVertical } from "@/types";

export { AVAILABLE_CITY } from "@/services/cities-data";

export async function getVerticalCityPageContent(
  vertical: SpaceVertical,
  city: string,
  filters: CityPageFilters = EMPTY_CITY_PAGE_FILTERS,
) {
  return getCityPageData(vertical, city, filters);
}
