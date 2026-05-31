import { toPhone10 } from "@/lib/phone-norm";
import type { PgDetail } from "@/types/pg.model";

const PHONE_FIELD_KEYS = [
  "contactPhone",
  "phone",
  "phone_number",
  "phoneNumber",
  "contact_number",
  "contactNumber",
  "mobile",
  "owner_phone",
  "ownerPhone",
  "contact_phone",
] as const;

function readPhoneCandidate(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return null;
}

function readNestedContactPhone(raw: Record<string, unknown>): string | null {
  const contact = raw.contact ?? raw.contact_details ?? raw.contactDetails;
  if (!contact || typeof contact !== "object") return null;
  const nested = contact as Record<string, unknown>;
  for (const key of ["phone", "mobile", "number", "phone_number"] as const) {
    const v = readPhoneCandidate(nested[key]);
    if (v) return v;
  }
  return null;
}

/** Resolve operator phone from PG payload (typed field + common API aliases). */
export function resolvePgContactPhone(pg: PgDetail): string | null {
  if (pg.contactPhone?.trim()) {
    return toPhone10(pg.contactPhone) ? pg.contactPhone.trim() : null;
  }

  const raw = pg as PgDetail & Record<string, unknown>;
  for (const key of PHONE_FIELD_KEYS) {
    const v = readPhoneCandidate(raw[key]);
    if (v && toPhone10(v)) return v;
  }

  return readNestedContactPhone(raw);
}

export function formatPgPhoneDisplay(phone: string): string {
  const ten = toPhone10(phone);
  if (!ten) return phone.trim();
  return `+91 ${ten.slice(0, 5)} ${ten.slice(5)}`;
}

export function pgPhoneTelHref(phone: string): string {
  const ten = toPhone10(phone);
  if (ten) return `tel:+91${ten}`;
  const digits = phone.replace(/\D/g, "");
  if (digits) return `tel:+${digits}`;
  return `tel:${phone.trim()}`;
}
