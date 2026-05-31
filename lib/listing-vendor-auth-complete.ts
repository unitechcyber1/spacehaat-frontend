import type { NextResponse } from "next/server";

import { jsonWithVendorSession } from "@/lib/listing-vendor-auth-response";
import { isListingOtpSkipped, listingBypassOtp } from "@/lib/listing-skip-otp";
import { validateVendor } from "@/services/listing-api";

/**
 * When OTP is disabled, validate with the configured bypass code and return a
 * response that already has listing session cookies set.
 */
export async function completeVendorAuthWithoutOtpStep(
  phone_number: string,
): Promise<NextResponse | null> {
  if (!isListingOtpSkipped()) return null;

  const result = await validateVendor({
    phone_number,
    otp: listingBypassOtp(),
  });

  if (!result.ok || !result.data?.token) {
    return null;
  }

  const { token, data: user } = result.data;
  return jsonWithVendorSession(user, token);
}
