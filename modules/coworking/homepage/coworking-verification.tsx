import { Calendar, CheckSquare, IndianRupee, Wifi } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { CoworkingSectionHeader } from "@/modules/coworking/homepage/coworking-section-header";

const TILES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Wifi,
    title: "Internet tested at load",
    description:
      "During a real Tuesday at 11 AM, not a press preview. Below 50 Mbps under normal occupancy is a fail.",
  },
  {
    icon: Calendar,
    title: "Meeting rooms actually bookable",
    description:
      "We attempt to book one — not ask whether it's possible. Broken portals and unreachable staff disqualify a space.",
  },
  {
    icon: IndianRupee,
    title: "Price confirmed with the operator",
    description:
      "What you see is what you hear on the phone. Not a starting point. Not a promo rate from last quarter.",
  },
  {
    icon: CheckSquare,
    title: "Walked, not photographed",
    description:
      "The space had to hold up on a random Wednesday morning — not just a staged broker walkthrough.",
  },
];

export function CoworkingVerification() {
  return (
    <section className="border-y border-slate-200/90 bg-white py-16 sm:py-[104px]">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-10">
        <CoworkingSectionHeader
          eyebrow="Our Standard"
          title={
            <>
              Every listing is verified.
              <br />
              Here&apos;s what that means.
            </>
          }
          className="max-w-[640px]"
        />

        <div className="grid gap-px overflow-hidden rounded-[20px] border border-slate-200/90 bg-slate-200/90 sm:grid-cols-2 lg:grid-cols-4">
          {TILES.map((tile) => {
            const Icon = tile.icon;
            return (
              <div key={tile.title} className="bg-white p-7 sm:px-7 sm:py-[34px]">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl border border-[color:var(--color-brand)]/25 bg-[color:var(--color-brand-soft)] text-[color:var(--color-accent)]">
                  <Icon className="h-[23px] w-[23px]" strokeWidth={1.7} aria-hidden />
                </div>
                <h3 className="text-base font-bold tracking-tight text-ink">{tile.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{tile.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
