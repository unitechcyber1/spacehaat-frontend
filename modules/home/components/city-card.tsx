import Image from "next/image";
import Link from "next/link";

import { City } from "@/types";
import { cn } from "@/utils/cn";

type CityCardProps = {
  city: City;
  basePath?: string;
  variant?: "grid" | "rail" | "compact";
};

export function CityCard({
  city,
  basePath = "/coworking",
  variant = "grid",
}: CityCardProps) {
  return (
    <Link
      href={`${basePath}/${city.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-[1.5rem] border border-transparent bg-transparent transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_80px_rgba(15,23,42,0.22)]",
        variant === "rail" ? "shadow-none" : "shadow-soft",
      )}
    >
      <div
        className={cn(
          "relative",
          variant === "compact" ? "aspect-[16/10]" : "aspect-[4/5]",
        )}
      >
        <Image
          src={city.image}
          alt={city.name}
          fill
          className="bg-transparent object-cover transition duration-700 group-hover:scale-[1.04] group-hover:brightness-[1.05] group-hover:saturate-[1.05]"
          sizes={
            variant === "rail"
              ? "(max-width: 768px) 60vw, (max-width: 1280px) 28vw, 18vw"
              : variant === "compact"
                ? "(max-width: 768px) 92vw, (max-width: 1280px) 36vw, 22vw"
              : "(max-width: 768px) 70vw, (max-width: 1280px) 33vw, 20vw"
          }
        />
        <div
          className={cn(
            "absolute inset-0 transition duration-300",
            variant === "compact"
              ? "bg-gradient-to-t from-black/80 via-black/30 to-black/5 group-hover:from-black/72"
              : "bg-gradient-to-t from-black/85 via-black/40 to-black/4 group-hover:from-black/82",
          )}
        />
        <div className="absolute inset-x-0 bottom-0">
          <div
            className={cn(
              "text-white",
              "bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_52%,rgba(0,0,0,0.82)_100%)]",
              "backdrop-blur-[1px]",
              variant === "compact" ? "px-4 pb-4 pt-6" : "px-5 pb-5 pt-7",
            )}
          >
            <p
              className={cn(
                "font-semibold leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]",
                variant === "compact" ? "text-lg" : "text-xl",
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
