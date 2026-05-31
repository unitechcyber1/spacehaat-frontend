import type { PgListParams } from "@/types/pg.model";

function pickParam(v: string | string[] | undefined): string {
  if (Array.isArray(v)) return v[0] ?? "";
  return v ?? "";
}

export function buildPgListParamsFromSearchParams(
  sp: Record<string, string | string[] | undefined>,
): PgListParams {
  const page = Math.max(1, Number.parseInt(pickParam(sp.page), 10) || 1);
  const params: PgListParams = {
    page,
    limit: 20,
    sortBy: pickParam(sp.sortBy) || "added_on",
    orderBy: pickParam(sp.orderBy) === "1" ? 1 : -1,
  };
  const city = pickParam(sp.city);
  const locality = pickParam(sp.locality);
  const name = pickParam(sp.name);
  if (city) params.city = city;
  if (locality) params.locality = locality;
  if (name) params.name = name;
  const min = Number(pickParam(sp.minPrice));
  const max = Number(pickParam(sp.maxPrice));
  if (Number.isFinite(min) && min > 0) params.minPrice = min;
  if (Number.isFinite(max) && max > 0) params.maxPrice = max;
  if (pickParam(sp.verified) === "true") params.verified = true;
  if (pickParam(sp.foodIncluded) === "true") params.foodIncluded = true;
  if (pickParam(sp.parking) === "true") params.parking = true;
  const preferredGuest = pickParam(sp.preferredGuest);
  const type = pickParam(sp.type);
  if (preferredGuest) params.preferredGuest = preferredGuest;
  if (type) params.type = type;
  return params;
}
