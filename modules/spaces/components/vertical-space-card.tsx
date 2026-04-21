"use client";

import { CoworkingCard } from "@/modules/coworking/components/coworking-card";
import { OfficeSpaceSeedCard } from "@/modules/office-space/components/office-space-seed-card";
import { VirtualOfficeCard } from "@/modules/virtual-office/components/virtual-office-card";
import { getCatalogCityIdBySlug } from "@/services/catalog-city-id";
import { mapSeedSpaceToCoworkingWorkspace } from "@/services/coworking-workspace-mapper";
import type { Space } from "@/types";

export function VerticalSpaceCard({
  space,
  className,
}: {
  space: Space;
  className?: string;
}) {
  if (space.vertical === "office-space") {
    return <OfficeSpaceSeedCard space={space} className={className} />;
  }

  if (space.vertical === "virtual-office") {
    return <VirtualOfficeCard space={space} className={className} />;
  }

  const catalogId = getCatalogCityIdBySlug(space.city) ?? space.city;
  const workspace = mapSeedSpaceToCoworkingWorkspace(space, catalogId);
  return <CoworkingCard workspace={workspace} className={className} />;
}

