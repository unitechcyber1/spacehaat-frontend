import { NextResponse } from "next/server";

import { resolveAppUrl } from "@/services/env-config";

/** Alias for `/sitemap.xml` (sitemap index). */
export function GET() {
  const base = resolveAppUrl().replace(/\/$/, "");
  return NextResponse.redirect(`${base}/sitemap.xml`, 308);
}
