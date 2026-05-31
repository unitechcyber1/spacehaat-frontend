import { NextResponse } from "next/server";

import { listingCookieNames } from "@/services/listing-session";
import type { ListingModel } from "@/types/listing.model";

export function jsonWithVendorSession(
  user: ListingModel.VendorUser,
  token: string,
  extra: Record<string, unknown> = {},
): NextResponse {
  const res = NextResponse.json(
    {
      ok: true,
      sessionReady: true,
      user: {
        id: user?.id,
        name: user?.name,
        phone_number: user?.phone_number,
        role: user?.role,
        email: user?.email,
        profile_pic: user?.profile_pic?.s3_link,
      },
      ...extra,
    },
    { status: 200 },
  );

  const { COOKIE_TOKEN, COOKIE_USER } = listingCookieNames();
  const secure = process.env.NODE_ENV === "production";

  res.cookies.set(COOKIE_TOKEN, token, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  res.cookies.set(
    COOKIE_USER,
    JSON.stringify({
      userId: user?.id,
      name: user?.name,
      phoneNumber: user?.phone_number,
    }),
    {
      httpOnly: true,
      sameSite: "lax",
      secure,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    },
  );

  return res;
}
