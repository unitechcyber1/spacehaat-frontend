import { NextResponse } from "next/server";

import {
  buildWorkSpaceUpstreamPayload,
  saveListingWorkSpace,
} from "@/services/listing-api";
import {
  clearListingCookies,
  getListingSession,
  respondListing,
} from "@/services/listing-session";
import type { ListingModel } from "@/types/listing.model";

/**
 * Angular reference: `CoworkingserviceService.saveWorkSpace` →
 *   POST `{base}admin/workSpace` (create) or PUT `{base}admin/workSpace/:id` (edit)
 * Request body may be partial; missing fields are filled with Angular-compatible defaults
 * by {@link buildWorkSpaceUpstreamPayload}.
 */
type IncomingPayload = Partial<ListingModel.WorkSpacePayload> & {
  Property_name?: string;
  no_of_seats?: number | string;
};

export async function POST(request: Request) {
  const session = await getListingSession();
  const payload = (await request.json().catch(() => null)) as IncomingPayload | null;
  if (!payload) {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const upstreamBody = buildWorkSpaceUpstreamPayload(payload, session?.userId);
  const result = await saveListingWorkSpace(upstreamBody, session?.token ?? null);
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

  const upstreamBody: ListingModel.WorkSpacePayload = {
    ...buildWorkSpaceUpstreamPayload(payload, session.userId),
    id: payload.id,
  };
  const result = await saveListingWorkSpace(upstreamBody, session.token);
  return respondListing(result);
}
