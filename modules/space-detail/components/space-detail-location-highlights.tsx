import type { LucideIcon } from "lucide-react";

import { cn } from "@/utils/cn";

export type SpaceDetailLocationHighlight = {
  icon: LucideIcon;
  title: string;
  sub: string;
  tag?: string | null;
};

export function SpaceDetailLocationHighlights({
  rows,
  className,
}: {
  rows: SpaceDetailLocationHighlight[];
  className?: string;
}) {
  if (!rows.length) return null;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {rows.map((row) => {
        const Icon = row.icon;
        return (
          <div
            key={`${row.title}-${row.sub}`}
            className="flex items-center gap-3.5 rounded-[13px] border border-[#E7E9E6] bg-white px-4 py-4 sm:px-[18px]"
          >
            <div className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-[11px] bg-[#EDF7EE] text-[#2f8035]">
              <Icon className="h-5 w-5" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-bold text-ink">{row.title}</p>
              <p className="text-[13.5px] text-muted">{row.sub}</p>
            </div>
            {row.tag ? (
              <span className="ml-auto shrink-0 rounded-full bg-[#EDF7EE] px-2.5 py-1 text-xs font-bold text-[#2f8035]">
                {row.tag}
              </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
