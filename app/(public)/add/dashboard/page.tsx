import { redirect } from "next/navigation";

import { generateMetadataForPublicRoute } from "@/lib/generate-public-seo-metadata";
import {
  mapCoworkingToHostCard,
  mapOfficeToHostCard,
  mapPgToHostCard,
  type HostListingCard,
} from "@/lib/host-listing-dashboard";
import { HostListingsDashboard } from "@/modules/listing/components/host-listings-dashboard";
import {
  getVendorCoworkingListings,
  getVendorOfficeListings,
  getVendorPgListings,
} from "@/services/listing-api";
import { getListingSession } from "@/services/listing-session";
import type { OfficeSpaceModel } from "@/types/office-space.model";

export const generateMetadata = generateMetadataForPublicRoute;

export default async function HostListingsDashboardPage() {
  const session = await getListingSession();
  if (!session?.userId || !session?.token) {
    redirect("/list-your-space?reason=login-required");
  }

  const [co, of, pg] = await Promise.all([
    getVendorCoworkingListings(session.userId, 100, session.token),
    getVendorOfficeListings(session.userId, 100, session.token),
    getVendorPgListings(session.userId, 100, session.token),
  ]);

  const loadErr =
    !co.ok && co.status !== 401
      ? co.message || "Could not load coworking listings."
      : !of.ok && of.status !== 401
        ? of.message || "Could not load office listings."
        : !pg.ok && pg.status !== 401
          ? pg.message || "Could not load PG & co-living listings."
          : null;

  if (co.status === 401 || of.status === 401 || pg.status === 401) {
    redirect("/list-your-space?reason=session-expired");
  }

  const coworkingRows = (co.ok ? co.data?.data : []) ?? [];
  const officeRows = (of.ok ? of.data?.data : []) ?? [];
  const pgRows = (pg.ok ? pg.data?.data : []) ?? [];

  const listings: HostListingCard[] = [
    ...coworkingRows.map(mapCoworkingToHostCard),
    ...officeRows.map((w) => mapOfficeToHostCard(w as unknown as OfficeSpaceModel.OfficeSpace)),
    ...pgRows.map(mapPgToHostCard),
  ].sort((a, b) => b.sortDate - a.sortDate);

  return (
    <HostListingsDashboard
      hostName={session.name}
      listings={listings}
      loadError={loadErr}
    />
  );
}
