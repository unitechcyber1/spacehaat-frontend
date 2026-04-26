"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  loadMicroLocationsByCitySpaceType,
  type MicroLocation,
} from "@/services/location-api";
import { cn } from "@/utils/cn";

type PopularLocalitiesRailProps = {
  catalogCityId: string;
  citySlug: string;
  /** Shown when the API returns nothing or while loading (seed popular locations). */
  fallbackLocations: Array<{ name: string; slug: string }>;
  /** Route prefix for locality pages (e.g. "/coworking" | "/office-space"). Defaults to "/coworking". */
  hrefPrefix?: string;
};

function fallbackToHits(
  fallback: PopularLocalitiesRailProps["fallbackLocations"],
): MicroLocation[] {
  return fallback.map((loc) => ({
    id: loc.slug,
    icon: "",
    name: loc.name,
    for_coWorking: true,
    for_office: false,
    for_coLiving: false,
    slug: loc.slug,
    key: loc.slug,
  }));
}

function localityPath(
  hrefPrefix: string,
  citySlug: string,
  loc: MicroLocation,
): string | null {
  const segment = (loc.key ?? loc.slug ?? loc.id).trim();
  if (!segment) return null;
  return `${hrefPrefix}/${citySlug}/${encodeURIComponent(segment)}`;
}

export function PopularLocalitiesRail({
  catalogCityId,
  citySlug,
  fallbackLocations,
  hrefPrefix = "/coworking",
}: PopularLocalitiesRailProps) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef(fallbackLocations);
  fallbackRef.current = fallbackLocations;

  const [items, setItems] = useState<MicroLocation[]>(() =>
    fallbackToHits(fallbackLocations),
  );
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const syncScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(maxScroll > 6 && scrollLeft < maxScroll - 6);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    loadMicroLocationsByCitySpaceType(catalogCityId, true)
      .then((hits) => {
        if (cancelled) return;
        const fb = fallbackRef.current;
        setItems(hits.length > 0 ? hits : fallbackToHits(fb));
      })
      .catch(() => {
        if (!cancelled) setItems(fallbackToHits(fallbackRef.current));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [catalogCityId]);

  useEffect(() => {
    if (loading) return;
    const t = requestAnimationFrame(syncScrollButtons);
    return () => cancelAnimationFrame(t);
  }, [items, loading, syncScrollButtons]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    syncScrollButtons();
    el.addEventListener("scroll", syncScrollButtons, { passive: true });
    const ro = new ResizeObserver(syncScrollButtons);
    ro.observe(el);
    window.addEventListener("resize", syncScrollButtons);
    return () => {
      el.removeEventListener("scroll", syncScrollButtons);
      ro.disconnect();
      window.removeEventListener("resize", syncScrollButtons);
    };
  }, [items, loading, syncScrollButtons]);

  const scrollByDir = useCallback((dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const delta = Math.min(280, Math.floor(el.clientWidth * 0.75));
    el.scrollBy({ left: dir * delta, behavior: "smooth" });
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="mb-5 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center">
      <h2 className="shrink-0 text-base font-semibold tracking-tight text-ink sm:pt-0.5 sm:text-lg">
        Popular localities
      </h2>
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <button
          type="button"
          aria-label="Scroll localities left"
          disabled={!canScrollLeft}
          onClick={() => scrollByDir(-1)}
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition",
            canScrollLeft
              ? "hover:border-slate-300 hover:bg-slate-50"
              : "cursor-default opacity-35",
          )}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div
          ref={scrollRef}
          className={cn(
            "relative z-10 flex min-h-[2.75rem] min-w-0 flex-1 gap-2 overflow-x-auto py-0.5",
            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          )}
        >
          {items
            .map((loc) => ({ loc, href: localityPath(hrefPrefix, citySlug, loc) }))
            .filter(
              (row): row is { loc: MicroLocation; href: string } =>
                row.href !== null,
            )
            .map(({ loc, href }) => (
              <a
                key={loc.id}
                href={href}
                draggable={false}
                className={cn(
                  "shrink-0 touch-manipulation rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 no-underline transition",
                  "hover:border-slate-300 hover:bg-slate-50",
                  "cursor-pointer select-none",
                )}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                  e.preventDefault();
                  router.push(href);
                }}
              >
                {loc.name}
              </a>
            ))}
        </div>

        <button
          type="button"
          aria-label="Scroll localities right"
          disabled={!canScrollRight}
          onClick={() => scrollByDir(1)}
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-800 text-white shadow-sm transition",
            canScrollRight
              ? "hover:bg-slate-900"
              : "cursor-default opacity-35",
          )}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
