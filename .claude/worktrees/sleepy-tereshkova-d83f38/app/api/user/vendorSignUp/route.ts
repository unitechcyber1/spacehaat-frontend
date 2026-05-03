import { NextResponse } from "next/server";

import { registerVendor } from "@/services/listing-api";
import type { ListingModel } from "@/types/listing.model";

/**
 * Angular reference: `RegisterService.register` → POST `{base}user/vendorSignUp`
 * Incoming client payload accepts either `name` or (`first_name`, `last_name`).
 */
type IncomingPayload = {
  first_name?: string;
  last_name?: string;
  name?: string;
  email?: string;
  phone_number?: string;
  dial_code?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as IncomingPayload | null;
  if (!body) {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const first = String(body.first_name ?? "").trim();
  const last = String(body.last_name ?? "").trim();
  const composedName = String(body.name ?? `${first} ${last}`).trim();
  const email = String(body.email ?? "").trim();
  const phone_number = String(body.phone_number ?? "").trim();
  const dial_code = String(body.dial_code ?? "+91").trim();

  if (!composedName || !email || !phone_number) {
    return NextResponse.json(
      { message: "name, email and phone_number are required" },
      { status: 400 },
    );
  }

  const payload: ListingModel.VendorRegisterRequest = {
    name: composedName,
    email,
    phone_number,
    dial_code,
  };

  const result = await registerVendor(payload);
  return NextResponse.json(result.data ?? { message: result.message }, {
    status: result.status,
  });
}
