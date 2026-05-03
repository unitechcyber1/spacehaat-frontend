import { NextResponse } from "next/server";

import {
  getListingCitiesByCountry,
  type ListCitiesQuery,
} from "@/services/listing-api";
import { getListingSession, respondListing } from "@/services/listing-session";

/**
 * Proxies `GET /api/admin/city/getCityByCountryOnly/:countryId` to the listing
 * upstream. Supports the upstream's pagination + name-search query params:
 *
 *   /api/admin/city/getCityByCountryOnly/:countryId?page=1&limit=20&name=delhi
 *
 * Unknown/empty params are dropped so the upstream gets a tidy request.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ countryId: string }> },
) {
  const { countryId } = await params;
  if (!countryId) {
    return NextResponse.json({ message: "countryId required" }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);

  const query: ListCitiesQuery = {};
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
  const result = await getListingCitiesByCountry(
    countryId,
    session?.token ?? null,
    query,
  );
  return respondListing(result);
}
