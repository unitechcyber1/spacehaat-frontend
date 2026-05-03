import { NextResponse } from "next/server";

import { getListingAmenities } from "@/services/listing-api";
import { getListingSession } from "@/services/listing-session";

export async function GET() {
  const session = await getListingSession();
  const result = await getListingAmenities(session?.token ?? null);
  return NextResponse.json(result.data ?? { message: result.message }, {
    status: result.status,
  });
}
