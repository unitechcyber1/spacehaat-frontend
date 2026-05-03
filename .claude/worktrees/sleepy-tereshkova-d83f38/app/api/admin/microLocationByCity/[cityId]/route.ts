import { NextResponse } from "next/server";

import {
  getListingMicroLocationsByCity,
  type ListMicroLocationsQuery,
} from "@/services/listing-api";
import { getListingSession, respondListing } from "@/services/listing-session";

/**
 * Proxies `GET /api/admin/microLocationByCity/:cityId` to the listing
 * upstream. Supports the same pagination + name-search params as the
 * cities endpoint:
 *
 *   /api/admin/microLocationByCity/:cityId?page=1&limit=10&name=sector
 *
 * Unknown/empty params are dropped so the upstream gets a tidy request.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ cityId: string }> },
) {
  const { cityId } = await params;
  if (!cityId) {
    return NextResponse.json({ message: "cityId required" }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);

  const query: ListMicroLocationsQuery = {};
  const rawPage = searchParams.get("page");
  const rawLimit = searchParams.get("limit");
  const rawName = searchParams.get("name");
  if (rawPage) {
    const n = Number.parseInt(rawPage, 10);
    if (Number.isFinite(n) && n > 0) query.page = n;
  }
  if (rawLimit) {
    const n = Number.parseInt(rawLimit, 10);
    if (Number.isFinite(n) && n > 0) query.limit = n;
  }
  if (rawName && rawName.trim().length > 0) {
    query.name = rawName.trim();
  }

  const session = await getListingSession();
  const result = await getListingMicroLocationsByCity(
    cityId,
    session?.token ?? null,
    query,
  );
  return respondListing(result);
}
