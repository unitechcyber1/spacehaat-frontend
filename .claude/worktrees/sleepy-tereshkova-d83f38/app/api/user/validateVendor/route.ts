import { NextResponse } from "next/server";

import { validateVendor } from "@/services/listing-api";
import { listingCookieNames } from "@/services/listing-session";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as null | {
    phone_number?: string;
    otp?: string | number;
  };

  const phone_number = String(body?.phone_number ?? "").trim();
  const otp = String(body?.otp ?? "").trim();

  if (!phone_number || !otp) {
    return NextResponse.json(
      { message: "phone_number and otp are required" },
      { status: 400 },
    );
  }

  const result = await validateVendor({ phone_number, otp });

  if (!result.ok || !result.data) {
    return NextResponse.json(result.data ?? { message: result.message }, {
      status: result.status,
    });
  }

  const { token, data: user } = result.data;

  if (!token) {
    return NextResponse.json(
      { message: "No token returned from upstream" },
      { status: 502 },
    );
  }

  const res = NextResponse.json(
    {
      ok: true,
      user: {
        id: user?.id,
        name: user?.name,
        phone_number: user?.phone_number,
        role: user?.role,
        email: user?.email,
        profile_pic: user?.profile_pic?.s3_link,
      },
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
