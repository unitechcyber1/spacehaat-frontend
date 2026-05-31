import { NextResponse } from "next/server";

import { buildPgCreatePayload } from "@/lib/pg-listing-payload";
import { saveListingPg } from "@/services/listing-api";
import { getListingSession, respondListing } from "@/services/listing-session";

type IncomingBody = {
  draft?: Parameters<typeof buildPgCreatePayload>[0]["draft"];
  location?: Parameters<typeof buildPgCreatePayload>[0]["location"];
  images?: Parameters<typeof buildPgCreatePayload>[0]["images"];
  contactNumber?: string;
  contactEmail?: string;
  /** Pre-built upstream body (optional) */
  payload?: Record<string, unknown>;
};

/**
 * Host PG / co-living listing create — proxies to upstream `POST /api/admin/pg`.
 * Updates use `PUT /api/admin/pg/:id` via `app/api/admin/pg/[id]/route.ts`.
 */
export async function POST(request: Request) {
  const session = await getListingSession();
  const body = (await request.json().catch(() => null)) as IncomingBody | null;
  if (!body) {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  let upstreamPayload: Record<string, unknown>;

  if (body.payload && typeof body.payload === "object") {
    if (!session?.userId) {
      return NextResponse.json(
        { message: "Please sign in to list your property.", session_expired: true },
        { status: 401 },
      );
    }
    upstreamPayload = {
      ...body.payload,
      userId:
        typeof body.payload.userId === "string" && body.payload.userId.trim()
          ? body.payload.userId
          : session.userId,
    };
  } else if (body.draft && body.location && Array.isArray(body.images)) {
    if (!session?.userId) {
      return NextResponse.json(
        { message: "Please sign in to list your property.", session_expired: true },
        { status: 401 },
      );
    }
    upstreamPayload = buildPgCreatePayload({
      draft: body.draft,
      location: body.location,
      images: body.images,
      userId: session.userId,
      contactNumber: body.contactNumber ?? session.phoneNumber,
      contactEmail: body.contactEmail ?? "",
    }) as Record<string, unknown>;
  } else {
    return NextResponse.json(
      { message: "Request must include draft, location, and images." },
      { status: 400 },
    );
  }

  const name = typeof upstreamPayload.name === "string" ? upstreamPayload.name.trim() : "";
  if (name.length < 2) {
    return NextResponse.json(
      { message: "Property name is required (min 2 characters)." },
      { status: 400 },
    );
  }

  const hasCity =
    (typeof upstreamPayload.city === "string" && upstreamPayload.city.trim().length > 0) ||
    (typeof upstreamPayload.locationIds === "object" &&
      upstreamPayload.locationIds !== null &&
      typeof (upstreamPayload.locationIds as { city?: string }).city === "string" &&
      (upstreamPayload.locationIds as { city: string }).city.trim().length > 0);

  if (!hasCity) {
    return NextResponse.json(
      { message: "City is required — select a city from the location step." },
      { status: 400 },
    );
  }

  const result = await saveListingPg(upstreamPayload, session?.token ?? null);
  return respondListing(result);
}
