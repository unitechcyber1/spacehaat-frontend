import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { buildMetadataWithCmsSeoFallback } from "@/lib/metadata-with-cms-seo";
import { VerticalCityPage } from "@/modules/city-pages/vertical-city-page";
import { VirtualOfficeDetailPage } from "@/modules/virtual-office/virtual-office-detail-page";
import { getVerticalCityPageContent } from "@/services/cities";
import {
  getSimilarSpaces,
  getVerticalSpaceBySlug,
  resolveVerticalSegment,
} from "@/services/spaces";
import { getVirtualOfficeStartingMonthlyPrice } from "@/services/virtual-office-pricing";
import { formatCurrency, toTitleCase } from "@/utils/format";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ segment: string }>;
}): Promise<Metadata> {
  const { segment } = await params;
  const cityPage = await getVerticalCityPageContent("virtual-office", segment);

  if (cityPage) {
    return buildMetadataWithCmsSeoFallback(`/virtual-office/${cityPage.city.slug}`, {
      title: cityPage.title,
      description: cityPage.subtitle,
    });
  }

  const space = await getVerticalSpaceBySlug("virtual-office", segment);

  if (space) {
    const voStart = getVirtualOfficeStartingMonthlyPrice(space);
    return buildMetadataWithCmsSeoFallback(`/virtual-office/${space.slug}`, {
      title: `${space.name} | Virtual Office`,
      description: `${space.description} Business Address from ${formatCurrency(voStart)}/month in ${toTitleCase(space.city)}.`,
    });
  }

  return buildMetadataWithCmsSeoFallback(`/virtual-office/${segment}`, {
    title: `${toTitleCase(segment)} | Virtual Office`,
    description: "Compare virtual office providers and compliance-ready plans across India.",
  });
}

export default async function VirtualOfficeSegmentPage({
  params,
}: {
  params: Promise<{ segment: string }>;
}) {
  const { segment } = await params;
  const result = await resolveVerticalSegment("virtual-office", segment);

  if (result.type === "city") {
    const cityData = await getVerticalCityPageContent("virtual-office", segment);

    if (!cityData) {
      notFound();
    }

    return <VerticalCityPage data={cityData} />;
  }

  return (
    <VirtualOfficeDetailPage
      space={result.space}
      similarSpaces={await getSimilarSpaces("virtual-office", result.space.city, result.space.id)}
    />
  );
}
