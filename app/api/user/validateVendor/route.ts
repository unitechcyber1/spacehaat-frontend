import { NextResponse } from "next/server";

import { jsonWithVendorSession } from "@/lib/listing-vendor-auth-response";
import { validateVendor } from "@/services/listing-api";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as null | {
    phone_number?: string;
    otp?: string | number;
  };

  const phone_number = String(body?.phone_number ?? "").trim();
  const otp = String(body?.otp ?? "").trim();

  if (!phone_number || !otp) {
    return NextResponse.json(
      { message: "phone_number and otp are required" },
      { status: 400 },
    );
  }

  const result = await validateVendor({ phone_number, otp });

  if (!result.ok || !result.data) {
    return NextResponse.json(result.data ?? { message: result.message }, {
      status: result.status,
    });
  }

  const { token, data: user } = result.data;

  if (!token) {
    return NextResponse.json(
      { message: "No token returned from upstream" },
      { status: 502 },
    );
  }

  return jsonWithVendorSession(user, token);
}
