import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { VerticalLocationPage } from "@/modules/location-pages/vertical-location-page";
import { getVerticalLocationPageContent } from "@/services/coworking-api";
import { toTitleCase } from "@/utils/format";
import { buildMetadata } from "@/utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ segment: string; location: string }>;
}): Promise<Metadata> {
  const { segment, location } = await params;
  const page = await getVerticalLocationPageContent("office-space", segment, location);

  if (!page) {
    return buildMetadata(
      `Office Space in ${toTitleCase(location)}, ${toTitleCase(segment)}`,
      "Discover office space options in this location.",
      `/office-space/${segment}/${location}`,
    );
  }

  return buildMetadata(
    page.title,
    page.subtitle,
    `/office-space/${segment}/${location}`,
  );
}

export default async function OfficeSpaceLocationPage({
  params,
}: {
  params: Promise<{ segment: string; location: string }>;
}) {
  const { segment, location } = await params;
  const data = await getVerticalLocationPageContent("office-space", segment, location);

  if (!data) {
    notFound();
  }

  return <VerticalLocationPage data={data} />;
}
