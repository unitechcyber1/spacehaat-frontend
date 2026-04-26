import { resolveApiBaseUrl, resolveListingApiTimeoutMs } from "@/services/env-config";

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
  const timeoutMs = resolveListingApiTimeoutMs();

  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: "POST",
      signal: ac.signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { token } : {}),
      },
      body: JSON.stringify(body),
    });

    const data = (await res.json().catch(() => ({}))) as unknown;
    return { ok: res.ok, status: res.status, data };
  } catch (e) {
    const message =
      e instanceof Error
        ? e.name === "AbortError"
          ? "Request timed out"
          : e.message
        : "Network error";
    return { ok: false, status: 502, data: { message } };
  } finally {
    clearTimeout(t);
  }
}
