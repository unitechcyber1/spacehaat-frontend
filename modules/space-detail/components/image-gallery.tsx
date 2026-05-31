"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { Grid3X3, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type ImageGalleryAdjustment = {
  brightness?: number;
  contrast?: number;
};

type ImageGalleryProps = {
  name: string;
  images: string[];
  /** Per-image brightness/contrast from API (same length as `images`; sparse when only some slots are set). */
  imageAdjustments?: Array<ImageGalleryAdjustment | undefined>;
};

type ImageEntry = { src: string; originalIndex: number };

function buildImageEntries(images: string[]): ImageEntry[] {
  return images
    .map((raw, originalIndex) => ({
      src: (raw ?? "").trim(),
      originalIndex,
    }))
    .filter((e): e is ImageEntry => Boolean(e.src));
}

function filterStyleForImageIndex(
  originalIndex: number,
  imageCount: number,
  adjustments?: Array<ImageGalleryAdjustment | undefined>,
): CSSProperties | undefined {
  if (originalIndex < 0 || originalIndex >= imageCount) return undefined;
  const adj = adjustments?.[originalIndex];
  if (!adj) return undefined;
  const b = adj.brightness ?? 1;
  const c = adj.contrast ?? 1;
  if (b === 1 && c === 1) return undefined;
  return { filter: `brightness(${b}) contrast(${c})` };
}

export function ImageGallery({ name, images, imageAdjustments }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const mobileRailRef = useRef<HTMLDivElement | null>(null);
  const thumbRailRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const entries = buildImageEntries(images);
  const imageCount = images.length;
  const displayImages = entries.map((e) => e.src);
  const gridImages = displayImages.slice(0, 5);
  const primary = gridImages[0];

  if (!primary) {
    return null;
  }

  const styleAt = (displayIndex: number) => {
    const orig = entries[displayIndex]?.originalIndex ?? displayIndex;
    return filterStyleForImageIndex(orig, imageCount, imageAdjustments);
  };

  useEffect(() => {
    const el = mobileRailRef.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth || 1;
      const idx = Math.round(el.scrollLeft / w);
      const clamped = Math.max(0, Math.min(gridImages.length - 1, idx));
      setMobileIndex(clamped);
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      el.removeEventListener("scroll", onScroll);
    };
  }, [gridImages.length]);

  /** Keep active thumbnail in view when opening / changing selection in the modal. */
  useEffect(() => {
    if (activeIndex === null) return;
    const rail = thumbRailRef.current;
    if (!rail) return;
    const thumb = rail.querySelector<HTMLElement>(`[data-thumb-index="${activeIndex}"]`);
    thumb?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeIndex]);

  return (
    <>
      <div className="space-y-3">
        <div className="relative hidden h-[28rem] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-[1.5rem] md:grid lg:h-[32rem]">
          <button
            type="button"
            onClick={() => setActiveIndex(0)}
            className="group relative col-span-2 row-span-2 overflow-hidden"
          >
            <Image
              src={primary}
              alt={`${name} image 1`}
              fill
              priority
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 52vw"
              style={styleAt(0)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08111f]/40 via-transparent to-transparent" />
          </button>

          {gridImages.slice(1).map((image, index) => {
            const idx = index + 1;
            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className="group relative overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`${name} image ${idx + 1}`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 1280px) 24vw, 18vw"
                  style={styleAt(idx)}
                />
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setActiveIndex(0)}
            className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-2xl border border-slate-300/80 bg-white px-4 py-2 text-sm font-medium text-ink shadow-soft transition hover:bg-slate-50"
          >
            <Grid3X3 className="h-4 w-4" />
            Show all photos
          </button>
        </div>

        <div className="relative md:hidden">
          <div
            ref={mobileRailRef}
            className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
            aria-label="Image carousel"
          >
            {gridImages.map((image, index) => (
              <button
                key={`${image}-${index}-mobile`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative w-full shrink-0 snap-start overflow-hidden rounded-[1.2rem] border border-slate-200/80"
              >
                <div className="relative aspect-[16/11]">
                  <Image
                    src={image}
                    alt={`${name} image ${index + 1}`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="100vw"
                    style={styleAt(index)}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
                </div>
              </button>
            ))}
          </div>

          {gridImages.length > 1 ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-center">
              <div className="flex items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1.5 backdrop-blur">
                {gridImages.map((_, i) => (
                  <span
                    key={`dot-${i}`}
                    className={[
                      "h-1.5 rounded-full transition-all",
                      i === mobileIndex ? "w-5 bg-white" : "w-1.5 bg-white/55",
                    ].join(" ")}
                  />
                ))}
              </div>
            </div>
          ) : null}

          <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/35 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
            {mobileIndex + 1}/{gridImages.length}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActiveIndex(0)}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-300/80 bg-white px-4 py-2 text-sm font-medium text-ink shadow-soft transition hover:bg-slate-50 md:hidden"
        >
          <Grid3X3 className="h-4 w-4" />
          Show all photos
        </button>
      </div>

      {activeIndex !== null ? (
        <div className="fixed inset-0 z-[90] flex flex-col bg-[#020617]/95 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm sm:p-4">
          <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col">
            <div className="mb-2 flex shrink-0 justify-end sm:mb-3">
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm text-white transition hover:bg-white/20"
              >
                <X className="h-4 w-4" aria-hidden />
                Close
              </button>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden rounded-[1.25rem] border border-white/10">
              <Image
                src={displayImages[activeIndex] ?? primary}
                alt={`${name} enlarged image`}
                fill
                className="object-contain p-1 sm:p-2"
                sizes="100vw"
                priority
                style={styleAt(activeIndex)}
              />
            </div>

            <div
              ref={thumbRailRef}
              className="no-scrollbar mt-3 flex max-h-[5.5rem] shrink-0 gap-2 overflow-x-auto overflow-y-hidden pb-1 pt-0.5 [-webkit-overflow-scrolling:touch]"
              aria-label="Photo thumbnails"
            >
              {displayImages.map((image, index) => (
                <button
                  key={`${image}-${index}-thumb`}
                  type="button"
                  data-thumb-index={index}
                  onClick={() => setActiveIndex(index)}
                  className={[
                    "relative h-16 w-28 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-[4.5rem] sm:w-32",
                    index === activeIndex
                      ? "border-white ring-2 ring-white/40"
                      : "border-transparent opacity-75 hover:opacity-100",
                  ].join(" ")}
                >
                  <Image
                    src={image}
                    alt={`${name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="128px"
                    style={styleAt(index)}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
