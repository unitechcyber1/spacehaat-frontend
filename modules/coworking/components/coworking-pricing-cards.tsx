import type { CoworkingModel } from "@/types/coworking-workspace.model";
import { formatCurrency } from "@/utils/format";

type PlanCategory = {
  name?: string;
  description?: string;
  icons?: { s3_link?: string };
};

type WorkspacePlanLike = CoworkingModel.Plan & {
  image?: { s3_link?: string };
  category?: PlanCategory;
};

const EXCLUDED_CATEGORIES = new Set([
  "business address",
  "gst registration",
  "virtual office",
  "company registration",
  "day pass",
]);

function planCategoryName(plan: WorkspacePlanLike): string {
  return plan.category?.name?.trim() || "Plan";
}

function planUnitForCategoryName(categoryName: string): "day" | "seat" | "year" {
  const n = categoryName.toLowerCase();
  if (n === "day pass") return "day";
  if (n === "virtual office") return "year";
  return "seat";
}

export function CoworkingPricingCards({ workspace }: { workspace: CoworkingModel.WorkSpace }) {
  const plans = ((workspace.plans ?? []) as WorkspacePlanLike[]).filter((p) => {
    const name = planCategoryName(p).toLowerCase();
    return !EXCLUDED_CATEGORIES.has(name);
  });

  if (plans.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {plans.map((plan, index) => {
          const categoryName = planCategoryName(plan);
          const unit = planUnitForCategoryName(categoryName);
          const showPrice = plan.should_show !== false;

          return (
            <button
              key={`${categoryName}-${index}`}
              type="button"
              className="group w-full rounded-[1.5rem] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#fbfbfb_100%)] p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_30px_70px_rgba(15,23,42,0.12)] sm:p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base font-semibold text-ink sm:text-lg">{categoryName}</h4>
                    </div>

                    {categoryName === "Dedicated Desk" ? (
                      <p className="mt-2 text-sm text-slate-600">
                        <span className="font-semibold">Seating:</span> 1 - 100+ Seats
                      </p>
                    ) : null}
                    {categoryName === "Private Cabin" ? (
                      <p className="mt-2 text-sm text-slate-600">
                        <span className="font-semibold">Seating:</span> 4, 6, 8, 10+{" "}
                        <span className="hidden sm:inline">(Customization Available)</span>
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <div className="text-right">
                    {showPrice ? (
                      <div className="text-lg font-semibold text-ink sm:text-xl">
                        {formatCurrency(plan.price)}
                        <span className="text-sm font-medium text-muted"> / </span>{" "}
                        <span className="text-sm font-medium text-muted">{unit}</span>
                      </div>
                    ) : (
                      <div className="text-sm font-semibold text-slate-700">On request</div>
                    )}
                  </div>

                  <span className="hidden text-sm font-semibold text-[color:var(--color-brand)] sm:inline-flex">
                    Enquire Now
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
                  High-speed WiFi
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
                  Meeting rooms
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
                  Reception support
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-xs text-slate-500">
        *Prices mentioned above are starting prices &amp; as per availability
      </p>
    </div>
  );
}
