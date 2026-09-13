"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/utils/cn";
import { siteCities, verticals } from "@/utils/constants";

const EASE = [0.22, 1, 0.36, 1] as const;
/** Short open delay keeps the panel calm while the pointer sweeps across the nav. */
const OPEN_DELAY_MS = 70;
/** Close delay bridges the gap between trigger and panel so hover never flickers. */
const CLOSE_DELAY_MS = 160;

type HeaderVerticalNavProps = {
  /** Solid header (scrolled / inner pages) uses dark text; hero uses cream. */
  useSolidHeader: boolean;
  /** Closes the panel whenever the route changes. */
  pathname: string;
};

export function HeaderVerticalNav({ useSolidHeader, pathname }: HeaderVerticalNavProps) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const openKeyRef = useRef<string | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

  const clearTimers = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  }, []);

  const applyOpenKey = useCallback((key: string | null) => {
    openKeyRef.current = key;
    setOpenKey(key);
  }, []);

  /** Swap instantly when a panel is already open, otherwise wait out the open delay. */
  const scheduleOpen = useCallback(
    (key: string) => {
      clearTimers();
      if (openKeyRef.current) {
        applyOpenKey(key);
        return;
      }
      openTimer.current = setTimeout(() => applyOpenKey(key), OPEN_DELAY_MS);
    },
    [clearTimers, applyOpenKey],
  );

  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimer.current = setTimeout(() => applyOpenKey(null), CLOSE_DELAY_MS);
  }, [clearTimers, applyOpenKey]);

  const closeNow = useCallback(() => {
    clearTimers();
    applyOpenKey(null);
  }, [clearTimers, applyOpenKey]);

  useEffect(() => closeNow(), [pathname, closeNow]);
  useEffect(() => clearTimers, [clearTimers]);

  useEffect(() => {
    if (!openKey) return undefined;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeNow();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openKey, closeNow]);

  return (
    <>
      {verticals.map((vertical) => {
        const isOpen = openKey === vertical.key;
        const panelId = `header-cities-${vertical.key}`;

        return (
          <div
            key={vertical.key}
            className="relative"
            onMouseEnter={() => scheduleOpen(vertical.key)}
            onMouseLeave={scheduleClose}
          >
            <Link
              href={vertical.href}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onFocus={() => scheduleOpen(vertical.key)}
              onClick={closeNow}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200",
                useSolidHeader
                  ? cn("text-muted hover:text-ink", isOpen && "bg-slate-100/90 text-ink")
                  : cn(
                      "text-[#e8dcc8]/90 hover:text-[#faf6ee]",
                      isOpen && "bg-[rgba(22,18,14,0.38)] text-[#faf6ee] backdrop-blur-md",
                    ),
              )}
            >
              {vertical.label}
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 shrink-0 transition-transform duration-200",
                  isOpen && "-rotate-180",
                )}
                aria-hidden
              />
            </Link>

            <AnimatePresence>
              {isOpen ? (
                /*
                  Positioning stays on this static wrapper — Framer Motion writes an inline
                  `transform`, which would otherwise cancel a Tailwind translate class.
                  `w-max` stops the panel shrinking to the trigger width; the top padding
                  keeps the trigger-to-panel gap hoverable.
                */
                <div className="absolute left-1/2 top-full z-50 w-max -translate-x-1/2 pt-2.5">
                  <motion.div
                    id={panelId}
                    className="relative rounded-2xl border border-slate-200/80 bg-white p-2 shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.985 }}
                    transition={{ duration: reduceMotion ? 0.01 : 0.18, ease: EASE }}
                    style={{ transformOrigin: "top center" }}
                  >
                    <span
                      className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-[3px] border-l border-t border-slate-200/80 bg-white"
                      aria-hidden
                    />
                    <ul className="relative grid grid-cols-2 gap-x-1 gap-y-0.5">
                      {siteCities.map((city) => (
                        <li key={city.slug}>
                          <Link
                            href={`${vertical.href}/${city.slug}`}
                            onClick={closeNow}
                            className="block whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-medium text-ink/80 transition-colors duration-150 hover:bg-[color:var(--color-brand-soft)] hover:text-[color:var(--color-brand)] focus-visible:bg-[color:var(--color-brand-soft)] focus-visible:text-[color:var(--color-brand)] focus-visible:outline-none"
                          >
                            {city.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </>
  );
}
