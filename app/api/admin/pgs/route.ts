import { NextResponse } from "next/server";

import { getVendorPgListings } from "@/services/listing-api";
import { getListingSession, respondListing } from "@/services/listing-session";

const DEFAULT_LIMIT = 100;

/**
 * Vendor PG / co-living listings for the logged-in host.
 * Proxies `GET /api/admin/pgs?userId=&limit=` (userId must match session).
 */
export async function GET(request: Request) {
  const session = await getListingSession();
  if (!session?.token || !session.userId) {
    return NextResponse.json(
      { message: "Please sign in to view your listings.", session_expired: true },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(request.url);
  const limit = Math.min(
    200,
    Math.max(1, Number(searchParams.get("limit")) || DEFAULT_LIMIT),
  );

  const requestedUserId = searchParams.get("userId")?.trim();
  if (requestedUserId && requestedUserId !== session.userId) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const result = await getVendorPgListings(session.userId, limit, session.token);
  return respondListing(result);
}
