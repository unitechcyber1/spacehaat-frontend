import { NextRequest, NextResponse } from "next/server";

import { getUserWorkSpaceById } from "@/services/listing-api";
import { getListingSession, respondListing } from "@/services/listing-session";

type Ctx = { params: Promise<{ id: string }> };

/**
 * Read one coworking workspace as the owner (Angular `userworkSpace/:id` GET).
 */
export async function GET(_request: NextRequest, context: Ctx) {
  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }

  const session = await getListingSession();
  if (!session?.token) {
    return NextResponse.json(
      { message: "Please sign in again.", session_expired: true },
      { status: 401 },
    );
  }

  const result = await getUserWorkSpaceById(id, session.token);
  return respondListing(result);
}
