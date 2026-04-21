/**
 * Runtime-safe URL/timeout helpers.
 *
 * This project should run without requiring local env vars for core browsing UX.
 * (Deployments can still override via standard `API_BASE_URL` / `NEXT_PUBLIC_API_BASE_URL` etc.)
 */

function trimUrl(value: string): string {
  return value.trim().replace(/\/$/, "");
}

/** Default leads path appended to `resolveApiBaseUrl()` when no explicit leads URL is set. */
const LEADS_SUBMIT_PATH = "/api/leads";
const DEFAULT_APP_ORIGIN_DEV = "http://localhost:3000";
const DEFAULT_API_ORIGIN_DEV = "http://localhost:8000";
const DEFAULT_COWORKING_TIMEOUT_MS = 3500;
const DEFAULT_LEADS_TIMEOUT_MS = 8000;

/** Site origin for metadata and absolute URLs. */
export function resolveAppUrl(): string {
  if (typeof window !== "undefined") {
    return trimUrl(window.location.origin);
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return trimUrl(`https://${vercel}`);

  const explicit = process.env.APP_URL?.trim();
  if (explicit) return trimUrl(explicit);

  return DEFAULT_APP_ORIGIN_DEV;
}

function resolveServerApiBase(): string {
  for (const raw of [
    process.env.API_BASE_URL,
    process.env.NEXT_PUBLIC_API_BASE_URL,
  ]) {
    const t = raw?.trim();
    if (t) return trimUrl(t);
  }
  return "";
}

function resolveClientApiBase(): string {
  for (const raw of [
    process.env.NEXT_PUBLIC_API_BASE_URL,
  ]) {
    const t = raw?.trim();
    if (t) return trimUrl(t);
  }
  return "";
}

/**
 * Shared backend origin for coworking, leads, and any future API calls.
 * Local: `http://localhost:8000` — production: `https://api.spacehaat.com` (no trailing slash).
 */
export function resolveApiBaseUrl(): string {
  const origin = typeof window === "undefined" ? resolveServerApiBase() : resolveClientApiBase();
  if (origin) return origin;
  return DEFAULT_API_ORIGIN_DEV;
}

/**
 * Coworking workspaces client: same origin as `resolveApiBaseUrl()`, paths `/api/user/workSpaces`, etc.
 */
export function resolveCoworkingApiBaseUrl(): string {
  return resolveApiBaseUrl();
}

/** If there is an API base URL, we can call the user API proxy. */
export function isCoworkingUserApiProxyEnabled(): boolean {
  const base = (typeof window === "undefined" ? resolveServerApiBase() : resolveClientApiBase()).trim();
  return Boolean(base) || process.env.NODE_ENV !== "production";
}

/** Coworking axios timeout with safe defaults. */
export function resolveCoworkingApiTimeoutMs(): number {
  const raw = process.env.COWORKING_API_TIMEOUT_MS?.trim();
  const n = raw ? Number.parseInt(raw, 10) : DEFAULT_COWORKING_TIMEOUT_MS;
  return Number.isFinite(n) && n > 0 ? n : DEFAULT_COWORKING_TIMEOUT_MS;
}

/**
 * Lead form POST URL. Defaults to `{API_BASE_URL}/api/leads`.
 * Override with `NEXT_PUBLIC_LEADS_API_URL` / `LEADS_API_URL` if the path differs.
 */
export function resolveLeadsSubmitUrl(): string {
  const explicitPub = process.env.NEXT_PUBLIC_LEADS_API_URL?.trim();
  const explicitServer = process.env.LEADS_API_URL?.trim();

  if (typeof window === "undefined") {
    const explicit = explicitPub || explicitServer;
    if (explicit) return trimUrl(explicit);
    return `${resolveApiBaseUrl()}${LEADS_SUBMIT_PATH}`;
  }

  if (explicitPub) return trimUrl(explicitPub);
  return `${resolveApiBaseUrl()}${LEADS_SUBMIT_PATH}`;
}

/** Lead POST timeout with safe defaults. */
export function resolveLeadsSubmitTimeoutMs(): number {
  const raw = process.env.LEADS_API_TIMEOUT_MS?.trim();
  const n = raw ? Number.parseInt(raw, 10) : DEFAULT_LEADS_TIMEOUT_MS;
  return Number.isFinite(n) && n > 0 ? n : DEFAULT_LEADS_TIMEOUT_MS;
}
