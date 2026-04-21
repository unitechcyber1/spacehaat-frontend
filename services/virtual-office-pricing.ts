import type { Space } from "@/types";

/**
 * Virtual-office “starting from” price is the **Business Address** plan’s monthly price
 * (lowest matching plan when several exist). Falls back to {@link Space.price} when none match.
 */
export function getVirtualOfficeStartingMonthlyPrice(
  space: Pick<Space, "vertical" | "price" | "plans">,
): number {
  if (space.vertical !== "virtual-office") return space.price;

  let minBa: number | null = null;
  for (const p of space.plans ?? []) {
    const label = p.name.trim().toLowerCase();
    if (!label.includes("business address")) continue;
    const n = typeof p.price === "number" && Number.isFinite(p.price) ? p.price : Number(p.price);
    if (!Number.isFinite(n)) continue;
    if (minBa === null || n < minBa) minBa = n;
  }

  if (minBa != null) return minBa;
  return space.price;
}
