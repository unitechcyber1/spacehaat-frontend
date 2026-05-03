import { NextResponse } from "next/server";

import { getListingSession } from "@/services/listing-session";

/**
 * Tells the client whether the current browser has a valid host (vendor) session.
 * Used by the public header to route "List your space" → `/add/dashboard` when signed in.
 */
export async function GET() {
  const session = await getListingSession();
  const isHost = Boolean(session?.token && session.userId);
  return NextResponse.json({ isHost });
}
