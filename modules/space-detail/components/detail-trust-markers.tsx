import { BadgeCheck, ShieldCheck, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/container";

const trustItems = [
  { label: "Verified listing quality", icon: BadgeCheck },
  { label: "Trusted operator network", icon: ShieldCheck },
  { label: "Guided and secure process", icon: Sparkles },
];

export function DetailTrustMarkers() {
  return (
    <section className="pb-14 sm:pb-20">
      <Container>
        <div className="rounded-[1.8rem] border border-slate-200/80 bg-white p-6 shadow-soft sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-brand)]">
            Trust markers
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            Built for a secure and reliable workspace decision
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-[1.2rem] border border-slate-200/80 bg-slate-50 px-4 py-4"
                >
                  <Icon className="h-5 w-5 text-[color:var(--color-brand)]" />
                  <p className="mt-3 text-sm text-slate-700">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
