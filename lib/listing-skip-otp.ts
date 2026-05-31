/** When true, list-your-space skips the OTP UI and completes vendor auth server-side. */
export function isListingOtpSkipped(): boolean {
  const env = process.env.LISTING_SKIP_OTP?.trim().toLowerCase();
  if (env === "false") return false;
  if (env === "true") return true;
  // OTP temporarily disabled by default on list-your-space.
  return true;
}

/** OTP sent to upstream when {@link isListingOtpSkipped} (dev/staging bypass). */
export function listingBypassOtp(): string {
  return process.env.LISTING_BYPASS_OTP?.trim() || "000000";
}

/** Client mirror of {@link isListingOtpSkipped}. */
export function isListingOtpSkippedPublic(): boolean {
  const env = process.env.NEXT_PUBLIC_LISTING_SKIP_OTP?.trim().toLowerCase();
  if (env === "false") return false;
  if (env === "true") return true;
  return true;
}
