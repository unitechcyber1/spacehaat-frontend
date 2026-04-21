import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { VerticalCityPage } from "@/modules/city-pages/vertical-city-page";
import { CoworkingDetailPage } from "@/modules/coworking/coworking-detail-page";
import { getVerticalCityPageContent } from "@/services/cities";
import { loadCoworkingWorkspaceDetail, loadCoworkingWorkspacesList } from "@/services/coworking-api";
import { resolveVerticalSegment } from "@/services/spaces";
import { formatCurrency, toTitleCase } from "@/utils/format";
import { buildMetadata } from "@/utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ segment: string }>;
}): Promise<Metadata> {
  const { segment } = await params;

  const cityPage = await getVerticalCityPageContent("coworking", segment);
  if (cityPage) {
    return buildMetadata(cityPage.title, cityPage.subtitle, `/coworking/${cityPage.city.slug}`);
  }

  const workspace = await loadCoworkingWorkspaceDetail(segment);
  if (workspace) {
    return buildMetadata(
      `${workspace.name} | Coworking Space`,
      `${workspace.description} Starting from ${formatCurrency(workspace.starting_price ?? 0)} in ${toTitleCase(
        workspace.location?.city?.name || "India",
      )}.`,
      `/coworking/${workspace.slug}`,
    );
  }

  return buildMetadata(
    `${toTitleCase(segment)} | Coworking`,
    "Discover premium coworking spaces across top cities in India.",
    `/coworking/${segment}`,
  );
}

export default async function CoworkingSegmentPage({
  params,
}: {
  params: Promise<{ segment: string }>;
}) {
  const { segment } = await params;
  const result = await resolveVerticalSegment("coworking", segment);

  if (result.type === "city") {
    const cityData = await getVerticalCityPageContent("coworking", segment);
    if (!cityData) notFound();
    return <VerticalCityPage data={cityData} />;
  }

  const workspace = await loadCoworkingWorkspaceDetail(result.space.slug);
  if (!workspace) notFound();

  const cityId = workspace.location?.city?.id?.trim();
  const similarWorkspaces = cityId
    ? (await loadCoworkingWorkspacesList(cityId, 10)).data
        .filter((w) => w.id !== workspace.id)
        .slice(0, 6)
    : [];

  return (
    <CoworkingDetailPage workspace={workspace} similarWorkspaces={similarWorkspaces} />
  );
}
