import { NextResponse } from "next/server";

import { resendVendorOtp } from "@/services/listing-api";

/**
 * Resend host/vendor OTP (Angular: `RegisterService.resendOtp` → `user/resendOTP`).
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as null | {
    phone_number?: string;
    dial_code?: string;
  };

  const phone_number = String(body?.phone_number ?? "").trim();
  const dial_code = String(body?.dial_code ?? "+91").trim() || "+91";

  if (!phone_number) {
    return NextResponse.json(
      { message: "phone_number is required" },
      { status: 400 },
    );
  }

  const result = await resendVendorOtp({ phone_number, dial_code });
  return NextResponse.json(result.data ?? { message: result.message }, {
    status: result.status,
  });
}
