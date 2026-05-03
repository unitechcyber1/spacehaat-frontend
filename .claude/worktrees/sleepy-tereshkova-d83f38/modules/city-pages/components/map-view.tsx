import { MapPin } from "lucide-react";

import { Space } from "@/types";
import { toTitleCase } from "@/utils/format";

type MapViewProps = {
  spaces: Space[];
};

export function MapView({ spaces }: MapViewProps) {
  const grouped = Array.from(
    spaces.reduce<Map<string, number>>((acc, space) => {
      acc.set(space.location, (acc.get(space.location) ?? 0) + 1);
      return acc;
    }, new Map()),
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-[linear-gradient(135deg,#eef3ff_0%,#f8fbff_100%)] p-6 shadow-soft">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(48,88,215,0.12),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(124,133,255,0.10),transparent_20%)]" />
        <div className="relative min-h-[26rem] rounded-[1.3rem] border border-dashed border-[color:var(--color-brand)]/22 bg-white/70 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-brand)]">
            Map View
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-ink">
            Explore micro-markets with a cleaner location-first view.
          </h3>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {grouped.map(([location, count], index) => (
              <div
                key={location}
                className="rounded-[1.2rem] border border-slate-200/80 bg-white px-4 py-4 shadow-sm"
                style={{ transform: `translateY(${index % 2 === 0 ? 0 : 10}px)` }}
              >
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="h-4 w-4 text-[color:var(--color-brand)]" />
                  {count} spaces
                </div>
                <p className="mt-3 font-semibold text-ink">{toTitleCase(location)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Location summary
        </p>
        <div className="mt-5 grid gap-4">
          {spaces.slice(0, 5).map((space) => (
            <div
              key={space.id}
              className="rounded-[1.2rem] border border-slate-100 bg-slate-50 px-4 py-4"
            >
              <p className="font-semibold text-ink">{space.name}</p>
              <p className="mt-1 text-sm text-muted">
                {toTitleCase(space.location)} - {space.brand}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
