/**
 * `GET /api/user/microLocationByCitySpaceType` — returns {@link CoworkingModel.MicroLocation} rows.
 */

import axios, { type AxiosInstance } from "axios";
import { cache } from "react";

import { resolveCatalogIdToSlug } from "@/services/catalog-city-id";
import {
  isCoworkingUserApiProxyEnabled,
  resolveCoworkingApiBaseUrl,
  resolveCoworkingApiTimeoutMs,
} from "@/services/env-config";
import { listSpaces } from "@/services/mock-db";
import { CoworkingModel } from "@/types/coworking-workspace.model";
import { toTitleCase } from "@/utils/format";

export const microLocationByCitySpaceTypePath = "/api/user/microLocationByCitySpaceType" as const;

export type MicroLocation = CoworkingModel.MicroLocation;

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function slugifyMicroLocationName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/** Wire: `{ message, data: microLocations[], totleRecords }`. */
function microLocationsFromWire(raw: unknown): MicroLocation[] {
  if (!isRecord(raw) || !Array.isArray(raw.data)) return [];
  const out: MicroLocation[] = [];
  for (const row of raw.data) {
    if (!isRecord(row)) continue;
    const name =
      (typeof row.name === "string" && row.name.trim()) ||
      (typeof row.microLocationName === "string" && row.microLocationName.trim()) ||
      (typeof row.label === "string" && row.label.trim()) ||
      "";
    if (!name) continue;
    const slugRaw =
      (typeof row.slug === "string" && row.slug.trim()) ||
      (typeof row.micro_location_slug === "string" && row.micro_location_slug.trim()) ||
      "";
    const slug = slugRaw || slugifyMicroLocationName(name);
    const id = String(row._id ?? row.id ?? slug);
    const key =
      (typeof row.key === "string" && row.key.trim()) ||
      (typeof row.micro_location_key === "string" && row.micro_location_key.trim()) ||
      undefined;
    const icon = typeof row.icon === "string" ? row.icon : "";
    out.push({
      id,
      icon,
      name,
      for_coWorking: true,
      for_office: false,
      for_coLiving: false,
      slug,
      key: key || undefined,
    });
  }
  return out;
}

function mockMicroLocationsForCity(cityCatalogId: string): MicroLocation[] {
  const slug = resolveCatalogIdToSlug(cityCatalogId.trim());
  if (!slug) return [];
  const spaces = listSpaces({ vertical: "coworking", city: slug });
  const seen = new Map<string, MicroLocation>();
  for (const s of spaces) {
    const locSlug = (s.location ?? "central").trim() || "central";
    if (seen.has(locSlug)) continue;
    seen.set(locSlug, {
      id: locSlug,
      icon: "",
      name: toTitleCase(locSlug.replace(/_/g, "-")),
      for_coWorking: true,
      for_office: false,
      for_coLiving: false,
      slug: locSlug,
      key: locSlug,
    });
  }
  return Array.from(seen.values());
}

let locationApiAxios: AxiosInstance | null = null;

function getLocationApiAxios(): AxiosInstance {
  const ms = resolveCoworkingApiTimeoutMs();
  if (!locationApiAxios) {
    locationApiAxios = axios.create({
      baseURL: resolveCoworkingApiBaseUrl(),
      timeout: ms,
      headers: { Accept: "application/json" },
    });
  } else {
    locationApiAxios.defaults.baseURL = resolveCoworkingApiBaseUrl();
    locationApiAxios.defaults.timeout = ms;
  }
  return locationApiAxios;
}

async function fetchMicroLocationsByCitySpaceType(
  cityCatalogId: string,
  forCoworking: boolean,
): Promise<MicroLocation[]> {
  const id = cityCatalogId.trim();
  if (!id || !forCoworking) return [];

  if (!isCoworkingUserApiProxyEnabled()) {
    return mockMicroLocationsForCity(id);
  }

  try {
    const { data } = await getLocationApiAxios().get<unknown>(microLocationByCitySpaceTypePath, {
      params: { cityId: id, for_coworking: true },
    });
    const parsed = microLocationsFromWire(data);
    return parsed.length > 0 ? parsed : mockMicroLocationsForCity(id);
  } catch {
    return mockMicroLocationsForCity(id);
  }
}

export const loadMicroLocationsByCitySpaceType: typeof fetchMicroLocationsByCitySpaceType =
  typeof window === "undefined"
    ? cache(fetchMicroLocationsByCitySpaceType)
    : fetchMicroLocationsByCitySpaceType;
