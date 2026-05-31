import {
  getVirtualOfficeCityCatalogBySlug,
  getVirtualOfficeCityDisplayName,
  type VirtualOfficeCatalogCity,
} from "@/lib/virtual-office-city-catalog";
import { VoCityPageExperience } from "@/modules/virtual-office/components/city-page/vo-city-page-experience";
import type { CityPageData } from "@/types";

function resolveVirtualOfficeCatalog(data: CityPageData): VirtualOfficeCatalogCity {
  const fromRaw = getVirtualOfficeCityCatalogBySlug(data.city.slug);
  if (fromRaw) return fromRaw;

  return {
    name: data.city.name,
    id: data.catalogCityId ?? data.city.id,
    slug: data.city.slug,
    locations: data.popularLocations.map((loc) => ({
      locality: loc.name,
    })),
  };
}

export function VirtualOfficeCityPage({ data }: { data: CityPageData }) {
  const catalog = resolveVirtualOfficeCatalog(data);
  const cityDisplay = getVirtualOfficeCityDisplayName(data.city.slug, catalog.name);

  return <VoCityPageExperience data={data} catalog={catalog} cityDisplay={cityDisplay} />;
}
