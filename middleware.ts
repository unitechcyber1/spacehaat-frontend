import { NextResponse, type NextRequest } from "next/server";

import { LISTING_TOKEN_COOKIE } from "@/lib/listing-auth-constants";

/**
 * Host / listing panel: require vendor session (httpOnly JWT cookie) for `/add` routes.
 * Login / signup live at `/list-your-space` (not matched here).
 */
export function middleware(request: NextRequest) {
  const token = request.cookies.get(LISTING_TOKEN_COOKIE)?.value?.trim();
  if (token) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/list-your-space";
  url.searchParams.set("reason", "login-required");
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/add", "/add/:path*"],
};
