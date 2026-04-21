import { CheckCircle2 } from "lucide-react";

import { PricingPlan } from "@/types";

type PricingPlanCardProps = {
  plan: PricingPlan;
  featured?: boolean;
};

export function PricingPlanCard({
  plan,
  featured = false,
}: PricingPlanCardProps) {
  return (
    <article
      className={
        featured
          ? "rounded-[1.6rem] border border-[color:var(--color-brand)]/18 bg-[linear-gradient(180deg,#eef3ff_0%,#ffffff_100%)] p-6 shadow-[0_30px_80px_rgba(48,88,215,0.12)]"
          : "rounded-[1.6rem] border border-slate-200/80 bg-white p-6 shadow-soft"
      }
    >
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--color-brand)]">
        {plan.name}
      </p>
      <p className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-ink">
        {plan.price}
      </p>
      <p className="mt-3 text-sm leading-6 text-muted">{plan.description}</p>
      <div className="mt-6 grid gap-3">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-center gap-3 text-sm text-slate-700">
            <CheckCircle2 className="h-4 w-4 text-[color:var(--color-brand)]" />
            {feature}
          </div>
        ))}
      </div>
    </article>
  );
}
