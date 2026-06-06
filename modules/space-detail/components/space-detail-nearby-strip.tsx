import type { ReactNode } from "react";
import { Clock } from "lucide-react";

import { cn } from "@/utils/cn";

export type SpaceDetailNearbyItem = {
  name: string;
  dist: string;
  icon?: ReactNode;
};

export function SpaceDetailNearbyStrip({
  items,
  className,
}: {
  items: SpaceDetailNearbyItem[];
  className?: string;
}) {
  if (!items.length) return null;

  return (
    <div
      className={cn(
        "mt-4 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none]",
        "max-lg:-mx-4 max-lg:px-4 [&::-webkit-scrollbar]:hidden",
        "lg:grid lg:grid-cols-2 lg:overflow-visible lg:pb-0",
        className,
      )}
    >
      {items.map((item, i) => (
        <div
          key={`${item.name}-${item.dist}-${i}`}
          className="min-w-[10.5rem] shrink-0 rounded-xl border border-slate-200/80 bg-white px-4 py-3 lg:min-w-0"
        >
          <p className="flex items-center gap-1.5 text-sm font-medium text-ink">
            {item.icon ?? <Clock className="h-3.5 w-3.5 text-muted" aria-hidden />}
            {item.name}
          </p>
          <p className="mt-1 font-mono text-xs text-muted">{item.dist}</p>
        </div>
      ))}
    </div>
  );
}
