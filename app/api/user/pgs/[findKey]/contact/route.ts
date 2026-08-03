import { type NextRequest, NextResponse } from "next/server";

import { normalizePgOwnerContact } from "@/lib/pg-owner-contact";
import { buildApiClientHeaders } from "@/services/api-client-headers";
import { resolveApiBaseUrl } from "@/services/env-config";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ findKey: string }> };

/**
 * Unlocks PG owner contact after an enquiry.
 * Proxies: `GET /api/user/pgs/:findKey/contact`
 *
 * Backend should return phone only for this route (not on list/detail), e.g.:
 * `{ "phone": "9876543210", "name": "Owner Name" }`
 * or `{ "data": { "phone": "...", "name": "..." } }`
 */
export async function GET(_request: NextRequest, context: Ctx) {
  const { findKey } = await context.params;
  const key = findKey?.trim();
  if (!key) {
    return NextResponse.json({ message: "findKey is required" }, { status: 400 });
  }

  const base = resolveApiBaseUrl();
  if (!base) {
    return NextResponse.json({ message: "API base URL is not configured" }, { status: 503 });
  }

  const url = `${base}/api/user/pgs/${encodeURIComponent(key)}/contact`;
  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: buildApiClientHeaders(),
    });

    const json = (await res.json().catch(() => null)) as unknown;
    if (!res.ok) {
      return NextResponse.json(
        { message: "Owner contact is not available for this listing." },
        { status: res.status === 404 ? 404 : res.status },
      );
    }

    const contact = normalizePgOwnerContact(json);
    if (!contact) {
      return NextResponse.json(
        { message: "Owner contact is not available for this listing." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { phone: contact.phone, name: contact.name ?? null },
      {
        headers: {
          "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
        },
      },
    );
  } catch {
    return NextResponse.json({ message: "Could not load owner contact." }, { status: 502 });
  }
}
