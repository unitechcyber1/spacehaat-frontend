import { type NextRequest, NextResponse } from "next/server";

import { resolveApiBaseUrl } from "@/services/env-config";

type Ctx = { params: Promise<{ slug: string }> };

/**
 * Proxies public SEO docs from the backend: `GET /api/user/seo/:pathSlug` (e.g. `home`).
 * Lets server components use same-origin fetches if needed, matching other `/api/...` patterns.
 */
export async function GET(_request: NextRequest, context: Ctx) {
  const { slug } = await context.params;
  if (!slug?.length) {
    return NextResponse.json({ message: "slug is required" }, { status: 400 });
  }

  const base = resolveApiBaseUrl();
  const url = `${base}/api/user/seo/${encodeURIComponent(slug)}`;
  const res = await fetch(url, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") || "application/json" },
  });
}
