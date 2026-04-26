import { NextResponse } from "next/server";

import { listingCookieNames } from "@/services/listing-session";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  const { COOKIE_TOKEN, COOKIE_USER } = listingCookieNames();
  res.cookies.set(COOKIE_TOKEN, "", { path: "/", maxAge: 0 });
  res.cookies.set(COOKIE_USER, "", { path: "/", maxAge: 0 });
  return res;
}

