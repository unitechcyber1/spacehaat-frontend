import { NextResponse } from "next/server";

import { getVendorCoworkingListings, getVendorOfficeListings } from "@/services/listing-api";
import { getListingSession, respondListing } from "@/services/listing-session";

const DEFAULT_LIMIT = 100;

/**
 * Logged-in vendor: coworking + office listings for the current session user
 * (mirrors Angular `listing.component` + `listing.service` forkJoin).
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

  const [co, of] = await Promise.all([
    getVendorCoworkingListings(session.userId, limit, session.token),
    getVendorOfficeListings(session.userId, limit, session.token),
  ]);

  if (!co.ok) return respondListing(co);
  if (!of.ok) return respondListing(of);

  return NextResponse.json(
    {
      coworking: co.data?.data ?? [],
      office: of.data?.data ?? [],
    },
    { status: 200 },
  );
}
