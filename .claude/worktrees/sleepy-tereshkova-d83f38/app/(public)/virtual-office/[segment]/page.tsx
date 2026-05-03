import type { Metadata } from "next";

import { notFound } from "next/navigation";

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
import { buildMetadata } from "@/utils/metadata";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ segment: string }>;
}): Promise<Metadata> {
  const { segment } = await params;
  const cityPage = await getVerticalCityPageContent("virtual-office", segment);

  if (cityPage) {
    return buildMetadata(
      cityPage.title,
      cityPage.subtitle,
      `/virtual-office/${cityPage.city.slug}`,
    );
  }

  const space = await getVerticalSpaceBySlug("virtual-office", segment);

  if (space) {
    const voStart = getVirtualOfficeStartingMonthlyPrice(space);
    return buildMetadata(
      `${space.name} | Virtual Office`,
      `${space.description} Business Address from ${formatCurrency(voStart)}/month in ${toTitleCase(space.city)}.`,
      `/virtual-office/${space.slug}`,
    );
  }

  return buildMetadata(
    `${toTitleCase(segment)} | Virtual Office`,
    "Compare virtual office providers and compliance-ready plans across India.",
    `/virtual-office/${segment}`,
  );
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
