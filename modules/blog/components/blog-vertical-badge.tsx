import type { SpaceVertical } from "@/types";
import { BLOG_VERTICAL_LABELS } from "@/lib/blog-data";
import { cn } from "@/utils/cn";

const VERTICAL_STYLES: Record<SpaceVertical, string> = {
  coworking: "bg-[#EDF7EE] text-[#2f8035] border-[#c8e6c9]",
  coliving: "bg-[#FFF8E7] text-[#9A6B00] border-[#FFE082]",
  "virtual-office": "bg-[#EEF4FF] text-[#1E4FA3] border-[#BBDEFB]",
  "office-space": "bg-[#F3F0FF] text-[#5E35B1] border-[#D1C4E9]",
};

export function BlogVerticalBadge({
  vertical,
  className,
}: {
  vertical: SpaceVertical;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em]",
        VERTICAL_STYLES[vertical],
        className,
      )}
    >
      {BLOG_VERTICAL_LABELS[vertical]}
    </span>
  );
}
