import { toPhone10 } from "@/lib/phone-norm";

export type PgOwnerContact = {
  phone: string;
  name?: string;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return v != null && typeof v === "object" && !Array.isArray(v);
}

function readPhone(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) {
    return toPhone10(value) ? value.trim() : null;
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    const asStr = String(value);
    return toPhone10(asStr) ? asStr : null;
  }
  return null;
}

/** Normalize unlock/contact API payloads into a phone + optional owner name. */
export function normalizePgOwnerContact(raw: unknown): PgOwnerContact | null {
  if (!isRecord(raw)) return null;

  const nested =
    (isRecord(raw.data) && raw.data) ||
    (isRecord(raw.contact) && raw.contact) ||
    (isRecord(raw.owner) && raw.owner) ||
    raw;

  if (!isRecord(nested)) return null;

  const phone =
    readPhone(nested.phone) ||
    readPhone(nested.contactPhone) ||
    readPhone(nested.contact_phone) ||
    readPhone(nested.mobile) ||
    readPhone(nested.owner_phone) ||
    readPhone(nested.ownerPhone) ||
    readPhone(nested.contactNumber) ||
    readPhone(nested.contact_number) ||
    readPhone(nested.phone_number);

  if (!phone) return null;

  const nameRaw =
    nested.name ?? nested.ownerName ?? nested.owner_name ?? nested.postedBy ?? nested.posted_by;
  const name = typeof nameRaw === "string" && nameRaw.trim() ? nameRaw.trim() : undefined;

  return { phone, name };
}
