import { NextResponse } from "next/server";

import { vendorLogin } from "@/services/listing-api";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as null | {
    phone_number?: string;
  };

  const phone_number = String(body?.phone_number ?? "").trim();
  if (!phone_number) {
    return NextResponse.json(
      { message: "phone_number is required" },
      { status: 400 },
    );
  }

  const result = await vendorLogin({ phone_number });
  return NextResponse.json(result.data ?? { message: result.message }, {
    status: result.status,
  });
}
