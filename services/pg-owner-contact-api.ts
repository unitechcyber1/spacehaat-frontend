import { normalizePgOwnerContact, type PgOwnerContact } from "@/lib/pg-owner-contact";

/**
 * Fetch owner contact after enquiry submit.
 * Calls Next proxy → backend `GET /api/user/pgs/:findKey/contact`.
 * Returns `null` when the listing has no unlockable contact yet.
 */
export async function fetchPgOwnerContact(findKey: string): Promise<PgOwnerContact | null> {
  const key = findKey.trim();
  if (!key) return null;

  try {
    const res = await fetch(`/api/user/pgs/${encodeURIComponent(key)}/contact`, {
      cache: "no-store",
      credentials: "include",
    });
    if (!res.ok) return null;
    const json = (await res.json().catch(() => null)) as unknown;
    return normalizePgOwnerContact(json);
  } catch {
    return null;
  }
}
