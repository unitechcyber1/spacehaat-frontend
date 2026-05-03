import { NextResponse } from "next/server";

import { getListingCitiesByState } from "@/services/listing-api";
import { getListingSession } from "@/services/listing-session";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ stateId: string }> },
) {
  const { stateId } = await params;
  if (!stateId) {
    return NextResponse.json({ message: "stateId required" }, { status: 400 });
  }

  const session = await getListingSession();
  const result = await getListingCitiesByState(stateId, session?.token ?? null);
  return NextResponse.json(result.data ?? { message: result.message }, {
    status: result.status,
  });
}
