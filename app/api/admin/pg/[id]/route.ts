import { NextResponse } from "next/server";

import { buildPgCreatePayload } from "@/lib/pg-listing-payload";
import { getAdminPgById, saveListingPg } from "@/services/listing-api";
import {
  clearListingCookies,
  getListingSession,
  respondListing,
} from "@/services/listing-session";

type IncomingBody = {
  draft?: Parameters<typeof buildPgCreatePayload>[0]["draft"];
  location?: Parameters<typeof buildPgCreatePayload>[0]["location"];
  images?: Parameters<typeof buildPgCreatePayload>[0]["images"];
  contactNumber?: string;
  contactEmail?: string;
  payload?: Record<string, unknown>;
};

/**
 * `GET /api/admin/pg/:id` — load listing for edit.
 * `PUT /api/admin/pg/:id` — update listing.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id?.trim()) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }

  const session = await getListingSession();
  if (!session?.token) {
    return NextResponse.json(
      { message: "Please sign in to view this listing.", session_expired: true },
      { status: 401 },
    );
  }

  const result = await getAdminPgById(id.trim(), session.token);
  return respondListing(result);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id?.trim()) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }

  const session = await getListingSession();
  if (!session?.token || !session.userId) {
    const res = NextResponse.json(
      { message: "Please sign in again.", session_expired: true },
      { status: 401 },
    );
    return clearListingCookies(res);
  }

  const body = (await request.json().catch(() => null)) as IncomingBody | null;
  if (!body) {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const pgId = id.trim();
  let upstreamPayload: Record<string, unknown>;

  if (body.payload && typeof body.payload === "object") {
    upstreamPayload = {
      ...body.payload,
      userId:
        typeof body.payload.userId === "string" && body.payload.userId.trim()
          ? body.payload.userId
          : session.userId,
      id: pgId,
    };
  } else if (body.draft && body.location && Array.isArray(body.images)) {
    upstreamPayload = {
      ...buildPgCreatePayload({
        draft: body.draft,
        location: body.location,
        images: body.images,
        userId: session.userId,
        contactNumber: body.contactNumber ?? session.phoneNumber,
        contactEmail: body.contactEmail ?? "",
      }),
      id: pgId,
    };
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

  const result = await saveListingPg(upstreamPayload, session.token);
  return respondListing(result);
}
