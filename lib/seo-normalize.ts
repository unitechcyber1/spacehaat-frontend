import type { SeoContent } from "@/types/seo.model";

function toTrimmedString(v: unknown): string | null {
  if (v == null) return null;
  if (typeof v === "string") {
    const t = v.trim();
    return t.length > 0 ? t : null;
  }
  if (typeof v === "number" && Number.isFinite(v)) return String(v);
  return null;
}

function pickRawDoc(json: unknown): Record<string, unknown> | null {
  if (!json || typeof json !== "object") return null;
  const o = json as Record<string, unknown>;
  const keys = ["data", "result", "seo", "doc", "document", "payload"] as const;
  for (const k of keys) {
    const v = o[k];
    if (v && typeof v === "object" && !Array.isArray(v)) {
      return v as Record<string, unknown>;
    }
  }
  if (Array.isArray(o.data) && o.data[0] && typeof o.data[0] === "object") {
    return o.data[0] as Record<string, unknown>;
  }
  return o;
}

function firstNonEmptyString(rec: Record<string, unknown>, fields: string[]): string | null {
  for (const f of fields) {
    const s = toTrimmedString(rec[f]);
    if (s) return s;
  }
  return null;
}

/** Normalize CMS/API SEO payloads for metadata and on-page sections. */
export function normalizeSeoFromResponse(json: unknown): SeoContent | null {
  const raw = pickRawDoc(json);
  if (!raw) return null;
  if (raw.status === false) return null;

  const title = firstNonEmptyString(raw, ["title", "page_title", "pageTitle"]);
  const description = firstNonEmptyString(raw, [
    "description",
    "metaDescription",
    "meta_description",
  ]);
  if (!title || !description) return null;

  return { ...raw, title, description } as SeoContent;
}
