import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { buildMetadataWithCmsSeoFallback } from "@/lib/metadata-with-cms-seo";
import { ColivingLocationPage } from "@/modules/coliving/coliving-location-page";
import { getColivingLocationPageContent } from "@/services/coliving-location";
import { loadPgList } from "@/services/pg-api";
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
  const pgList = await loadPgList({
    city: cityName,
    locality: localityName,
    limit: 50,
    page: 1,
    sortBy: "rating",
    orderBy: -1,
  });

  return (
    <ColivingLocationPage
      data={data}
      pgList={pgList.data}
      pgTotal={pgList.totalRecords}
    />
  );
}
