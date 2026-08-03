import { buildApiClientHeaders } from "@/services/api-client-headers";
import {
  resolveApiBaseUrl,
  resolveLeadsSubmitTimeoutMs,
  resolveListingApiTimeoutMs,
} from "@/services/env-config";

const PATH = "/api/user/enquiry";

export type UpstreamUserEnquiryResult = {
  ok: boolean;
  status: number;
  data: unknown;
};

/**
 * Server-only: `POST` merged enquiry JSON to the Node API (expects `req.user` when
 * a valid `token` header is present).
 */
export async function postUpstreamUserEnquiry(
  body: Record<string, unknown>,
  token: string | undefined,
): Promise<UpstreamUserEnquiryResult> {
  const base = resolveApiBaseUrl();
  if (!base) {
    return {
      ok: false,
      status: 503,
      data: { message: "API base URL is not configured (set API_BASE_URL)." },
    };
  }

  const url = `${base.replace(/\/$/, "")}${PATH}`;
  // Prefer leads timeout, fall back to listing timeout (default 15s).
  const timeoutMs = Math.max(resolveLeadsSubmitTimeoutMs(), resolveListingApiTimeoutMs(), 20000);

  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: "POST",
      signal: ac.signal,
      headers: buildApiClientHeaders(token ? { token } : undefined),
      body: JSON.stringify(body),
    });

    const data = (await res.json().catch(() => ({}))) as unknown;
    return { ok: res.ok, status: res.status, data };
  } catch (e) {
    const timedOut = e instanceof Error && e.name === "AbortError";
    const message = timedOut
      ? `Enquiry timed out after ${timeoutMs}ms while calling ${url}. Is the backend running at API_BASE_URL?`
      : e instanceof Error
        ? `Could not reach enquiry API at ${url}: ${e.message}`
        : `Could not reach enquiry API at ${url}`;
    return { ok: false, status: timedOut ? 504 : 502, data: { message } };
  } finally {
    clearTimeout(t);
  }
}
