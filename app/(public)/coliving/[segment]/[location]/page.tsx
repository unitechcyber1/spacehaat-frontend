import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { buildMetadataWithCmsSeoFallback } from "@/lib/metadata-with-cms-seo";
import { pathnameToSeoSlug } from "@/lib/pathname-to-seo-slug";
import { buildPgColivingLocationPageParams } from "@/lib/pg-list-priority";
import { seoFaqsOrFallback } from "@/lib/seo-page-faqs";
import { seoPageTitleOrFallback } from "@/lib/seo-page-title";
import { ColivingLocationPage } from "@/modules/coliving/coliving-location-page";
import { getCatalogCityIdBySlug } from "@/services/catalog-city-id";
import { getColivingLocationPageContent } from "@/services/coliving-location";
import { loadPgList } from "@/services/pg-api";
import { getSeoBySlug } from "@/services/seo-content";
import { toTitleCase } from "@/utils/format";

type PageProps = {
  params: Promise<{ segment: string; location: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { segment, location } = await params;
  const page = await getColivingLocationPageContent(segment, location);

  if (!page) {
    return buildMetadataWithCmsSeoFallback(`/coliving/${segment}/${location}`, {
      title: `Coliving & PG in ${toTitleCase(location)}, ${toTitleCase(segment)}`,
      description: "Discover coliving and PG options in this location.",
    });
  }

  return buildMetadataWithCmsSeoFallback(`/coliving/${segment}/${location}`, {
    title: page.title,
    description: page.subtitle,
  });
}

export default async function ColivingLocationRoute({ params }: PageProps) {
  const { segment, location } = await params;
  const data = await getColivingLocationPageContent(segment, location);

  if (!data) {
    notFound();
  }

  const cityName = data.city.name;
  const localityName = data.locationName;
  const catalogCityId = data.catalogCityId ?? getCatalogCityIdBySlug(data.citySlug) ?? undefined;
  const pgList = await loadPgList(
    buildPgColivingLocationPageParams(catalogCityId, cityName, localityName),
  );
  const pathname = `/coliving/${segment}/${location}`;
  const seo = await getSeoBySlug(pathnameToSeoSlug(pathname));

  return (
    <ColivingLocationPage
      data={{
        ...data,
        title: seoPageTitleOrFallback(seo, data.title),
        faqs: seoFaqsOrFallback(seo, data.faqs),
      }}
      pgList={pgList.data}
      pgTotal={pgList.totalRecords}
    />
  );
}
