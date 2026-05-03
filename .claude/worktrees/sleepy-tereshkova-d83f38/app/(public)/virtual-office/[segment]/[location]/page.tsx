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
  const page = await getVerticalLocationPageContent("virtual-office", segment, location);

  if (!page) {
    return buildMetadata(
      `Virtual Office in ${toTitleCase(location)}, ${toTitleCase(segment)}`,
      "Discover virtual office options in this location.",
      `/virtual-office/${segment}/${location}`,
    );
  }

  return buildMetadata(
    page.title,
    page.subtitle,
    `/virtual-office/${segment}/${location}`,
  );
}

export default async function VirtualOfficeLocationPage({
  params,
}: {
  params: Promise<{ segment: string; location: string }>;
}) {
  const { segment, location } = await params;
  const data = await getVerticalLocationPageContent("virtual-office", segment, location);

  if (!data) {
    notFound();
  }

  return <VerticalLocationPage data={data} />;
}
