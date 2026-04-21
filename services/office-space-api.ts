/**
 * `GET /api/user/officeSpaces?city=&limit=`
 * Response: `{ message, data: officeSpaces[], totalRecords, locations }`
 */

import axios, { type AxiosInstance } from "axios";

import {
  isCoworkingUserApiProxyEnabled,
  resolveCoworkingApiBaseUrl,
  resolveCoworkingApiTimeoutMs,
} from "@/services/env-config";
import type { OfficeSpaceModel } from "@/types/office-space.model";

const DEFAULT_LIMIT = 36;

let client: AxiosInstance | null = null;

function getClient(): AxiosInstance {
  const ms = resolveCoworkingApiTimeoutMs();
  if (!client) {
    client = axios.create({
      baseURL: resolveCoworkingApiBaseUrl(),
      timeout: ms,
      headers: { Accept: "application/json" },
    });
  } else {
    client.defaults.baseURL = resolveCoworkingApiBaseUrl();
    client.defaults.timeout = ms;
  }
  return client;
}

type OfficeListResponse = {
  message?: string;
  data?: unknown[];
  totalRecords?: number;
  locations?: unknown;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function wireId(row: Record<string, unknown>): string {
  const a = row._id;
  const b = row.id;
  if (typeof a === "string" && a.trim()) return a.trim();
  if (typeof b === "string" && b.trim()) return b.trim();
  if (a != null && typeof a === "object" && "$oid" in a) {
    const oid = (a as { $oid?: unknown }).$oid;
    if (typeof oid === "string" && oid.trim()) return oid.trim();
  }
  return "";
}

/**
 * Client-side list for city page. Returns `null` if the API is unavailable or the request fails (caller keeps seed data).
 */
export async function officeSpacesAsSpaces(
  catalogCityId: string,
  limit = DEFAULT_LIMIT,
): Promise<OfficeSpaceModel.OfficeSpace[] | null> {
  if (!isCoworkingUserApiProxyEnabled()) return null;

  try {
    const { data } = await getClient().get<OfficeListResponse>("/api/user/officeSpaces", {
      params: { city: catalogCityId.trim(), limit },
    });

    const rows = Array.isArray(data?.data) ? data.data : [];
    const officeSpaces: OfficeSpaceModel.OfficeSpace[] = [];
    for (const row of rows) {
      if (!isRecord(row)) continue;
      const _id = wireId(row);
      const slug = typeof row.slug === "string" ? row.slug.trim() : "";
      if (!_id || !slug) continue;
      const id = typeof row.id === "string" && row.id.trim() ? row.id.trim() : _id;
      officeSpaces.push({ ...(row as any), _id, id } as OfficeSpaceModel.OfficeSpace);
    }
    return officeSpaces;
  } catch {
    return null;
  }
}
