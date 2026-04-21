import { notFound } from "next/navigation";

import { canonicalCoworkingCitySlug } from "@/services/catalog-city-id";
import { loadCoworkingWorkspaceDetail } from "@/services/coworking-api";
import {
  coworkingApiWorkspaceToSpace,
  deriveAppCitySlugFromWorkspace,
  virtualOfficeApiWorkspaceToSpace,
} from "@/services/coworking-workspace-mapper";
import { getCityPageData, getSpaceBySlug, listSpaces } from "@/services/mock-db";
import type { Space } from "@/types";
import { SpaceVertical } from "@/types";

export async function getFeaturedSpaces() {
  return listSpaces({ featured: true });
}

export async function getVerticalSpaces(vertical: SpaceVertical) {
  return listSpaces({ vertical });
}

export async function getCitySpaces(vertical: SpaceVertical, city: string) {
  return listSpaces({ vertical, city });
}

export async function getLocationSpaces(
  vertical: SpaceVertical,
  city: string,
  location: string,
) {
  return listSpaces({ vertical, city, location });
}

export async function getVerticalSpaceBySlug(vertical: SpaceVertical, slug: string) {
  if (vertical === "coworking") {
    const ws = await loadCoworkingWorkspaceDetail(slug);
    if (ws) return coworkingApiWorkspaceToSpace(ws, deriveAppCitySlugFromWorkspace(ws));
  }
  if (vertical === "virtual-office") {
    const ws = await loadCoworkingWorkspaceDetail(slug);
    if (ws) return virtualOfficeApiWorkspaceToSpace(ws, deriveAppCitySlugFromWorkspace(ws));
  }
  return getSpaceBySlug(slug, vertical);
}

export async function getSimilarSpaces(
  vertical: SpaceVertical,
  city: string,
  excludeSpaceId: string,
) {
  return listSpaces({ vertical, city })
    .filter((space) => space.id !== excludeSpaceId)
    .slice(0, 6);
}

export async function resolveVerticalSegment(vertical: SpaceVertical, segment: string) {
  const cityKey =
    vertical === "coworking" || vertical === "virtual-office" || vertical === "office-space"
      ? canonicalCoworkingCitySlug(segment.trim())
      : segment.trim();

  const spacesByCity = await getCitySpaces(vertical, cityKey);

  if (spacesByCity.length > 0) {
    return { type: "city" as const, city: cityKey, spaces: spacesByCity };
  }

  if (getCityPageData(vertical, segment)) {
    return { type: "city" as const, city: cityKey, spaces: [] };
  }

  if (vertical === "coworking") {
    const workspace = await loadCoworkingWorkspaceDetail(segment);
    if (!workspace) notFound();
    const space = coworkingApiWorkspaceToSpace(workspace, deriveAppCitySlugFromWorkspace(workspace));
    return { type: "detail" as const, space };
  }

  if (vertical === "virtual-office") {
    const workspace = await loadCoworkingWorkspaceDetail(segment);
    if (workspace) {
      const space = virtualOfficeApiWorkspaceToSpace(workspace, deriveAppCitySlugFromWorkspace(workspace));
      return { type: "detail" as const, space };
    }
  }

  const space = getSpaceBySlug(segment, vertical);
  if (!space) notFound();

  return { type: "detail" as const, space };
}
