"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { CityCard } from "@/modules/home/components/city-card";
import type { City } from "@/types";

type CityRailProps = {
  cities: City[];
  basePath?: string;
};

export function CityRail({ cities, basePath = "/coworking" }: CityRailProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const visibleCities = useMemo(() => cities, [cities]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    function update() {
      if (!viewportRef.current) return;
      const epsilon = 2;
      setCanScrollLeft(viewportRef.current.scrollLeft > epsilon);
      setCanScrollRight(
        viewportRef.current.scrollLeft + viewportRef.current.clientWidth <
          viewportRef.current.scrollWidth - epsilon,
      );
    }

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [visibleCities.length]);

  function scrollByAmount(direction: "prev" | "next") {
    const el = viewportRef.current;
    if (!el) return;
    const delta = Math.max(320, Math.floor(el.clientWidth * 0.85));
    el.scrollBy({ left: direction === "next" ? delta : -delta, behavior: "smooth" });
  }

  function scrollNext() {
    scrollByAmount("next");
  }

  function scrollPrev() {
    scrollByAmount("prev");
  }

  return (
    <div className="relative">
      {/* Mobile & tablet: 2-column grid (see design) */}
      <div className="mt-8 grid grid-cols-2 gap-2.5 min-[480px]:gap-3.5 lg:hidden">
        {visibleCities.map((city) => (
          <div key={`grid-${city.id}`} className="min-w-0">
            <CityCard city={city} basePath={basePath} variant="railGrid" />
          </div>
        ))}
      </div>

      {/* Large screens: horizontal scroll rail + arrows */}
      <div className="relative hidden lg:block">
        <div
          ref={viewportRef}
          className="no-scrollbar mt-8 flex snap-x gap-3 overflow-x-auto pb-2 sm:gap-4"
        >
          {visibleCities.map((city) => (
            <div key={city.id} className="w-[14rem] shrink-0 snap-start sm:w-[15.5rem]">
              <CityCard city={city} basePath={basePath} variant="rail" />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Scroll cities left"
          disabled={!canScrollLeft}
          className="absolute left-2 top-1/2 h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/80 bg-transparent text-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.16)] backdrop-blur transition hover:bg-white/90 disabled:pointer-events-none disabled:opacity-0 inline-flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={scrollNext}
          aria-label="Scroll cities"
          disabled={!canScrollRight}
          className="absolute right-2 top-1/2 h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/80 bg-transparent text-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.16)] backdrop-blur transition hover:bg-white/90 disabled:pointer-events-none disabled:opacity-0 inline-flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

