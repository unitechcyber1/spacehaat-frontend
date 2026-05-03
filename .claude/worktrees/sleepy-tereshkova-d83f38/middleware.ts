import { NextResponse, type NextRequest } from "next/server";

import { LISTING_TOKEN_COOKIE } from "@/lib/listing-auth-constants";
import { pathnameToSeoSlug } from "@/lib/pathname-to-seo-slug";

function withPathnameHeader(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const pathname = request.nextUrl.pathname;
  requestHeaders.set("x-pathname", pathname);
  requestHeaders.set("x-seo-slug", pathnameToSeoSlug(pathname));
  return NextResponse.next({ request: { headers: requestHeaders } });
}

/**
 * 1) Passes `x-pathname` to Server Components (SEO) for every page request.
 * 2) Host / listing panel: require vendor session for `/add` routes.
 */
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/add")) {
    const token = request.cookies.get(LISTING_TOKEN_COOKIE)?.value?.trim();
    if (token) {
      return withPathnameHeader(request);
    }
    const url = request.nextUrl.clone();
    url.pathname = "/list-your-space";
    url.searchParams.set("reason", "login-required");
    return NextResponse.redirect(url);
  }

  return withPathnameHeader(request);
}

export const config = {
  matcher: [
    /*
     * Run on all page routes; skip Next internals, API routes, and static
     * files with an extension.
     */
    "/((?!api/|_next/|_vercel/|favicon\\.ico|.*\\..*).*)",
  ],
};
