import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { VerticalCityPage } from "@/modules/city-pages/vertical-city-page";
import { CoworkingDetailPage } from "@/modules/coworking/coworking-detail-page";
import { getVerticalCityPageContent } from "@/services/cities";
import { loadCoworkingWorkspaceDetail, loadCoworkingWorkspacesList } from "@/services/coworking-api";
import { resolveVerticalSegment } from "@/services/spaces";
import { buildMetadataWithCmsSeoFallback } from "@/lib/metadata-with-cms-seo";
import { pathnameToSeoSlug } from "@/lib/pathname-to-seo-slug";
import { seoFaqsOrFallback } from "@/lib/seo-page-faqs";
import { seoPageTitleOrFallback } from "@/lib/seo-page-title";
import { getSeoBySlug } from "@/services/seo-content";
import { formatCurrency, toTitleCase } from "@/utils/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ segment: string }>;
}): Promise<Metadata> {
  const { segment } = await params;

  const cityPage = await getVerticalCityPageContent("coworking", segment);
  if (cityPage) {
    return buildMetadataWithCmsSeoFallback(`/coworking/${cityPage.city.slug}`, {
      title: cityPage.title,
      description: cityPage.subtitle,
    });
  }

  const workspace = await loadCoworkingWorkspaceDetail(segment);
  if (workspace) {
    return buildMetadataWithCmsSeoFallback(`/coworking/${workspace.slug}`, {
      title: `${workspace.name} | Coworking Space`,
      description: `${workspace.description} Starting from ${formatCurrency(workspace.starting_price ?? 0)} in ${toTitleCase(
        workspace.location?.city?.name || "India",
      )}.`,
    });
  }

  return buildMetadataWithCmsSeoFallback(`/coworking/${segment}`, {
    title: `${toTitleCase(segment)} | Coworking`,
    description: "Discover premium coworking spaces across top cities in India.",
  });
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
    const pathname = `/coworking/${cityData.city.slug}`;
    const seo = await getSeoBySlug(pathnameToSeoSlug(pathname));
    return (
      <VerticalCityPage
        data={{
          ...cityData,
          title: seoPageTitleOrFallback(seo, cityData.title),
          faqs: seoFaqsOrFallback(seo, cityData.faqs),
        }}
      />
    );
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
