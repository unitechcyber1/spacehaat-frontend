import Image from "next/image";
import Link from "next/link";

import { City } from "@/types";
import { cn } from "@/utils/cn";

type CityCardProps = {
  city: City;
  basePath?: string;
  /** `railGrid` — 2-up mobile city tiles; `rail` — desktop horizontal scroller. */
  variant?: "grid" | "rail" | "railGrid" | "compact";
};

export function CityCard({
  city,
  basePath = "/coworking",
  variant = "grid",
}: CityCardProps) {
  const isRailGrid = variant === "railGrid";
  const isRail = variant === "rail";

  return (
    <Link
      href={`${basePath}/${city.slug}`}
      className={cn(
        "group relative block overflow-hidden border border-transparent bg-transparent transition duration-300",
        isRailGrid && "rounded-xl shadow-sm ring-1 ring-slate-200/60",
        isRail && "rounded-[1.25rem] shadow-none",
        !isRailGrid && !isRail && "shadow-soft",
        !isRailGrid && !isRail && variant === "compact" && "rounded-xl",
        !isRailGrid && !isRail && variant === "grid" && "rounded-[1.5rem]",
        "hover:-translate-y-0.5 hover:shadow-[0_28px_80px_rgba(15,23,42,0.22)]",
        isRailGrid && "hover:ring-slate-300/80",
      )}
    >
      <div
        className={cn(
          "relative",
          variant === "compact" && "aspect-[21/10] sm:aspect-[16/10]",
          variant === "grid" && "aspect-[5/6] sm:aspect-[4/5]",
          isRail && "aspect-[5/6] sm:aspect-[4/5] lg:aspect-[4/5]",
          isRailGrid && "aspect-[5/6] sm:aspect-[4/5]",
        )}
      >
        <Image
          src={city.image}
          alt={city.name}
          fill
          className="bg-slate-100 object-cover transition duration-700 group-hover:scale-[1.04] group-hover:brightness-[1.05] group-hover:saturate-[1.05]"
          sizes={
            isRailGrid
              ? "(max-width: 1023px) 45vw, 0px"
              : isRail
                ? "(min-width: 1024px) 28vw, 0px"
                : variant === "compact"
                  ? "(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 22vw"
                  : "(max-width: 768px) 70vw, (max-width: 1280px) 33vw, 20vw"
          }
        />
        <div
          className={cn(
            "absolute inset-0 transition duration-300",
            isRailGrid &&
              "bg-gradient-to-t from-black/80 via-black/15 to-black/0 group-hover:from-black/75",
            variant === "compact" &&
              "bg-gradient-to-t from-black/80 via-black/30 to-black/5 group-hover:from-black/72",
            (isRail || variant === "grid") &&
              "bg-gradient-to-t from-black/85 via-black/40 to-black/4 group-hover:from-black/82",
          )}
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end">
          <div
            className={cn(
              "w-full text-white",
              isRailGrid && "p-2.5 sm:p-3",
              variant === "compact" &&
                "bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_45%,rgba(0,0,0,0.78)_100%)] px-3 pb-2.5 pt-4 sm:px-3.5 sm:pb-3 sm:pt-4 backdrop-blur-[1px]",
              (isRail || variant === "grid") &&
                "bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_52%,rgba(0,0,0,0.82)_100%)] px-4 pb-4 pt-6 sm:px-5 sm:pb-4 sm:pt-6 backdrop-blur-[1px]",
            )}
          >
            <p
              className={cn(
                "leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]",
                isRailGrid && "text-sm font-bold tracking-tight sm:text-[0.95rem]",
                variant === "compact" &&
                  "text-sm font-semibold sm:text-base",
                (isRail || variant === "grid") && "text-lg font-semibold sm:text-xl",
              )}
            >
              {city.name}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
