import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { LISTING_TOKEN_COOKIE, LISTING_USER_COOKIE } from "@/lib/listing-auth-constants";

export type ListingSession = {
  token: string;
  userId?: string;
  name?: string;
  phoneNumber?: string;
};

const COOKIE_TOKEN = LISTING_TOKEN_COOKIE;
const COOKIE_USER = LISTING_USER_COOKIE;

export async function getListingSession(): Promise<ListingSession | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE_TOKEN)?.value?.trim();
  if (!token) return null;

  const rawUser = jar.get(COOKIE_USER)?.value;
  if (!rawUser) return { token };

  try {
    const parsed = JSON.parse(rawUser) as Omit<ListingSession, "token">;
    return { token, ...parsed };
  } catch {
    return { token };
  }
}

export function listingCookieNames() {
  return { COOKIE_TOKEN, COOKIE_USER } as const;
}

/** Drop the listing session cookies from the given response. */
export function clearListingCookies<T extends NextResponse>(res: T): T {
  res.cookies.set(COOKIE_TOKEN, "", { path: "/", maxAge: 0 });
  res.cookies.set(COOKIE_USER, "", { path: "/", maxAge: 0 });
  return res;
}

/**
 * Builds a JSON response for a listing proxy call. When the upstream returned
 * 401, the vendor token is stale (often because the user logged in against a
 * different backend origin), so we wipe the session cookies and add a
 * `session_expired` flag the client can use to bounce the user back to
 * `/list-your-space`.
 */
export function respondListing(
  result: { ok: boolean; status: number; data: unknown; message?: string },
): NextResponse {
  if (result.status === 401) {
    const upstreamMsg =
      typeof (result.data as { message?: unknown } | null)?.message === "string"
        ? (result.data as { message: string }).message
        : result.message;
    const res = NextResponse.json(
      {
        message: upstreamMsg || "Your session expired — please sign in again.",
        session_expired: true,
      },
      { status: 401 },
    );
    clearListingCookies(res);
    return res;
  }

  const body = (result.data ?? { message: result.message ?? "Upstream error" }) as object;
  return NextResponse.json(body, { status: result.status });
}

