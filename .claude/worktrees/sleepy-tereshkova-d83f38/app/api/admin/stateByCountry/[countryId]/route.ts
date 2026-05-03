import { NextResponse } from "next/server";

import { getListingStatesByCountry } from "@/services/listing-api";
import { getListingSession } from "@/services/listing-session";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ countryId: string }> },
) {
  const { countryId } = await params;
  if (!countryId) {
    return NextResponse.json({ message: "countryId required" }, { status: 400 });
  }

  const session = await getListingSession();
  const result = await getListingStatesByCountry(countryId, session?.token ?? null);
  return NextResponse.json(result.data ?? { message: result.message }, {
    status: result.status,
  });
}
