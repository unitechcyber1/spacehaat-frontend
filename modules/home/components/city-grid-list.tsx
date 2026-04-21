import Image from "next/image";
import Link from "next/link";

import type { City } from "@/types";

type CityGridListProps = {
  cities: City[];
  basePath?: string;
  viewAllHref?: string;
};

export function CityGridList({
  cities,
  basePath = "/coworking",
  viewAllHref = "/coworking",
}: CityGridListProps) {
  const rows: Array<{ left: City; right: City | "view-all" | null }> = [];
  for (let i = 0; i < cities.length; i += 2) {
    const left = cities[i];
    const next = cities[i + 1];
    if (next) {
      rows.push({ left, right: next });
    } else {
      rows.push({ left, right: "view-all" });
    }
  }

  return (
    <div className="mt-10 border-t border-slate-200">
      {rows.map((row, rowIndex) => (
        <div
          key={`${row.left.id}-${rowIndex}`}
          className="grid grid-cols-2 border-b border-slate-200 last:border-b-0"
        >
          <CityGridCell city={row.left} basePath={basePath} />
          {row.right === "view-all" ? (
            <div className="flex items-center justify-start py-4 pl-2 sm:pl-4">
              <Link
                href={viewAllHref}
                className="text-sm font-semibold text-[color:var(--color-brand)] transition hover:underline"
              >
                View All
              </Link>
            </div>
          ) : row.right ? (
            <CityGridCell city={row.right} basePath={basePath} />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function CityGridCell({ city, basePath }: { city: City; basePath: string }) {
  return (
    <Link
      href={`${basePath}/${city.slug}`}
      className="flex items-center gap-3 py-4 pr-2 transition hover:opacity-90 sm:gap-4 sm:pr-4"
    >
      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full sm:h-12 sm:w-12">
        <Image
          src={city.image}
          alt={city.name}
          fill
          className="object-cover"
          sizes="48px"
        />
      </span>
      <span className="text-[0.95rem] font-medium text-ink sm:text-base">{city.name}</span>
    </Link>
  );
}
