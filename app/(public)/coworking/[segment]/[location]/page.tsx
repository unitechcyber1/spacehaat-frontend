import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { buildMetadataWithCmsSeoFallback } from "@/lib/metadata-with-cms-seo";
import { pathnameToSeoSlug } from "@/lib/pathname-to-seo-slug";
import { seoFaqsOrFallback } from "@/lib/seo-page-faqs";
import { seoPageTitleOrFallback } from "@/lib/seo-page-title";
import { VerticalLocationPage } from "@/modules/location-pages/vertical-location-page";
import { getVerticalLocationPageContent } from "@/services/coworking-api";
import { getSeoBySlug } from "@/services/seo-content";
import { toTitleCase } from "@/utils/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ segment: string; location: string }>;
}): Promise<Metadata> {
  const { segment, location } = await params;
  const page = await getVerticalLocationPageContent("coworking", segment, location);

  if (!page) {
    return buildMetadataWithCmsSeoFallback(`/coworking/${segment}/${location}`, {
      title: `Coworking in ${toTitleCase(location)}, ${toTitleCase(segment)}`,
      description: "Discover coworking spaces in this location.",
    });
  }

  return buildMetadataWithCmsSeoFallback(`/coworking/${segment}/${location}`, {
    title: page.title,
    description: page.subtitle,
  });
}

export default async function CoworkingLocationPage({
  params,
}: {
  params: Promise<{ segment: string; location: string }>;
}) {
  const { segment, location } = await params;
  const data = await getVerticalLocationPageContent("coworking", segment, location);

  if (!data) {
    notFound();
  }

  const pathname = `/coworking/${segment}/${location}`;
  const seo = await getSeoBySlug(pathnameToSeoSlug(pathname));
  return (
    <VerticalLocationPage
      data={{
        ...data,
        title: seoPageTitleOrFallback(seo, data.title),
        faqs: seoFaqsOrFallback(seo, data.faqs),
      }}
    />
  );
}
