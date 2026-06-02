import { coworkingPlanCategoryLabel } from "@/services/workspace-plan-pricing";
import type { CoworkingModel } from "@/types/coworking-workspace.model";

export type VirtualOfficePricingSlot = "business-address" | "gst-registration" | "company-registration";

export const VIRTUAL_OFFICE_PRICING_ORDER: ReadonlyArray<{
  slot: VirtualOfficePricingSlot;
  label: string;
}> = [
  { slot: "business-address", label: "Business Address" },
  { slot: "gst-registration", label: "GST Registration" },
  { slot: "company-registration", label: "Company Registration" },
] as const;

/** Maps API plan category text to one of the three virtual-office pricing rows (or skip). */
export function virtualOfficePlanSlotFromCategoryLabel(
  rawLabel: string,
): VirtualOfficePricingSlot | null {
  const n = rawLabel.trim().toLowerCase().replace(/\s+/g, " ");
  if (
    n.includes("company registration") ||
    n.includes("company incorporation") ||
    (n.includes("incorporation") && !n.includes("gst"))
  ) {
    return "company-registration";
  }
  if (n.includes("gst registration") || n.includes("gst address") || /^gst\b/.test(n)) {
    return "gst-registration";
  }
  if (n.includes("business address")) {
    return "business-address";
  }
  return null;
}

export function virtualOfficePlanRows(
  workspace: CoworkingModel.WorkSpace,
): { label: string; price: number }[] {
  const plans = workspace.plans ?? [];
  const bestPriceBySlot = new Map<VirtualOfficePricingSlot, number>();

  for (const p of plans) {
    if (p.should_show === false) continue;
    const wireLabel = coworkingPlanCategoryLabel(p);
    const slot = virtualOfficePlanSlotFromCategoryLabel(wireLabel);
    if (!slot) continue;
    const raw = p.price;
    const n = typeof raw === "number" ? raw : Number(raw);
    if (!Number.isFinite(n)) continue;
    const prev = bestPriceBySlot.get(slot);
    if (prev === undefined || n < prev) bestPriceBySlot.set(slot, n);
  }

  return VIRTUAL_OFFICE_PRICING_ORDER.filter(({ slot }) => bestPriceBySlot.has(slot)).map(
    ({ slot, label }) => ({ label, price: bestPriceBySlot.get(slot)! }),
  );
}
