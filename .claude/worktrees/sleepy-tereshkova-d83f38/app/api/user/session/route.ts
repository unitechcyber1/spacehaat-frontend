import { NextResponse } from "next/server";

/**
 * Placeholder: extend when you persist end-user sessions for enquiry flows.
 * Prevents broken `.next/types` references when the route is imported elsewhere.
 */
export async function GET() {
  return NextResponse.json({ authenticated: false });
}
