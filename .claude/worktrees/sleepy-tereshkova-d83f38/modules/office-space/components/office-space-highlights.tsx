"use client";

import {
  Building2,
  CircleDollarSign,
  Layers,
  Ruler,
  ShieldCheck,
  Tag,
} from "lucide-react";

import type { OfficeSpaceModel } from "@/types/office-space.model";
import { formatCurrency } from "@/utils/format";

function asNumberLike(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const t = value.replace(/[,₹\s]/g, "").trim();
    const n = t ? Number(t) : NaN;
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function resolveMaintenanceText(other: OfficeSpaceModel.OfficeSpaceOtherDetail | undefined): string {
  const flag = other?.monthly_maintenance;
  if (flag === "No") return "No";

  const amount = asNumberLike(other?.monthly_maintenance_amount);
  if (flag === "Yes") return amount != null ? formatCurrency(amount) : "Yes";

  if (!flag) {
    // Competitor UI defaults to “Yes” when unknown.
    return amount != null ? formatCurrency(amount) : "Yes";
  }

  return String(flag);
}

function resolveSecurityDepositText(other: OfficeSpaceModel.OfficeSpaceOtherDetail | undefined): string {
  const raw = other?.security_deposit;
  if (typeof raw === "string" && raw.trim().toLowerCase() === "no") return "No";
  const n = asNumberLike(raw);
  if (n != null) return formatCurrency(n);
  if (typeof raw === "string" && raw.trim()) return raw.trim();
  return "—";
}

export function OfficeSpaceHighlights({
  office,
}: {
  office: OfficeSpaceModel.OfficeSpace;
}) {
  const other = office.other_detail;
  const rentSqFt = asNumberLike(other?.rent_in_sq_ft) ?? 0;
  const areaSqFt = asNumberLike(other?.area_for_lease_in_sq_ft) ?? 0;
  const rent = rentSqFt > 0 && areaSqFt > 0 ? rentSqFt * areaSqFt : null;

  const items = [
    {
      label: "Rent",
      value: rent != null ? formatCurrency(rent) : "On request",
      icon: Tag,
    },
    {
      label: "Area",
      value: areaSqFt > 0 ? `${areaSqFt.toLocaleString("en-IN")} Sq. Ft.` : "—",
      icon: Ruler,
    },
    {
      label: "Status",
      value: other?.office_type?.trim() ? other.office_type : "—",
      icon: Building2,
    },
    {
      label: "Security Deposit",
      value: resolveSecurityDepositText(other),
      icon: ShieldCheck,
    },
    {
      label: "Maintenance",
      value: resolveMaintenanceText(other),
      icon: CircleDollarSign,
    },
    {
      label: "Floor",
      value: other?.floor?.trim() ? other.floor : "—",
      icon: Layers,
    },
  ] as const;

  return (
    <section className="mt-6 rounded-[1.6rem] border border-slate-200/80 bg-white p-6 shadow-soft sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-start gap-3">
              <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {item.label}
                </p>
                <p className="mt-1 text-[0.98rem] font-semibold tracking-[-0.02em] text-ink">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

