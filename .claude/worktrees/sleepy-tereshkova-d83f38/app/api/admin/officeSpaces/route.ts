import { NextResponse } from "next/server";

import {
  buildOfficeSpaceUpstreamPayload,
  saveListingOfficeSpace,
} from "@/services/listing-api";
import {
  clearListingCookies,
  getListingSession,
  respondListing,
} from "@/services/listing-session";
import type { ListingModel } from "@/types/listing.model";

/**
 * Angular reference: `OfficeServiceService.saveOfficeSpace` →
 *   POST `{base}admin/officeSpaces` (create) or PUT `{base}admin/officeSpaces/:id` (edit)
 * Request body may be partial; missing fields are filled by {@link buildOfficeSpaceUpstreamPayload}.
 */
type IncomingPayload = Partial<ListingModel.OfficeSpacePayload> & {
  Property_name?: string;
  area_for_lease_in_sq_ft?: number | string;
  rent_in_sq_ft?: number | string;
  office_type?: string;
};

export async function POST(request: Request) {
  const session = await getListingSession();
  const payload = (await request.json().catch(() => null)) as IncomingPayload | null;
  if (!payload) {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const upstreamBody = buildOfficeSpaceUpstreamPayload(payload, session?.userId);
  const result = await saveListingOfficeSpace(upstreamBody, session?.token ?? null);
  return respondListing(result);
}

export async function PUT(request: Request) {
  const session = await getListingSession();
  if (!session?.token) {
    const res = NextResponse.json(
      { message: "Please sign in again.", session_expired: true },
      { status: 401 },
    );
    return clearListingCookies(res);
  }

  const payload = (await request.json().catch(() => null)) as IncomingPayload | null;
  if (!payload?.id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }

  const upstreamBody: ListingModel.OfficeSpacePayload = {
    ...buildOfficeSpaceUpstreamPayload(payload, session.userId),
    id: payload.id,
  };
  const result = await saveListingOfficeSpace(upstreamBody, session.token);
  return respondListing(result);
}
