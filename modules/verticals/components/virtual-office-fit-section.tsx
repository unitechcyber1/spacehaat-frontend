"use client";

import Image from "next/image";
import { Building2, ChevronLeft, ChevronRight, Info, Rocket, ShoppingBag, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/utils/cn";

type VirtualOfficeFitSectionProps = {
  imageSrc: string;
  imageAlt: string;
};

export function VirtualOfficeFitSection({ imageSrc, imageAlt }: VirtualOfficeFitSectionProps) {
  const rows = [
    {
      title: "Early-stage startups & SMEs",
      body: "Register your business at a credible address without locking into a long office lease.",
      icon: Rocket,
    },
    {
      title: "E‑commerce sellers",
      body: "Simplify GST registration and add an address that looks professional to partners and marketplaces.",
      icon: ShoppingBag,
    },
    {
      title: "Teams expanding to new cities",
      body: "Enter new markets with mail handling support and compliance-ready documentation.",
      icon: Building2,
    },
  ];

  const testimonials = [
    {
      quote:
        "Quick responses, clear guidance, and a smooth documentation flow. We got set up without any confusion.",
      by: "Monika, Founder",
    },
    {
      quote:
        "Address quality was excellent and the onboarding was faster than expected. Support team stayed proactive throughout.",
      by: "Aman, Business Owner",
    },
    {
      quote:
        "Great for GST setup in a new city. Mail handling was reliable and the paperwork was straightforward.",
      by: "Priya, Operations",
    },
  ];
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const railRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  function getSlideWidth(el: HTMLDivElement): number {
    const first = el.firstElementChild as HTMLElement | null;
    const w = first?.clientWidth;
    return w && w > 0 ? w : el.clientWidth || 1;
  }

  function scrollToIndex(idx: number) {
    const el = railRef.current;
    if (!el) return;
    const w = getSlideWidth(el);
    el.scrollTo({ left: idx * w, behavior: "smooth" });
  }

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const update = () => {
      const w = getSlideWidth(el);
      const idx = Math.round(el.scrollLeft / w);
      setActiveTestimonial(Math.max(0, Math.min(testimonials.length - 1, idx)));
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
  }, [testimonials.length]);

  return (
    <div className="grid items-center gap-4 sm:gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft sm:rounded-3xl lg:rounded-[2rem]">
        <div className="relative aspect-[5/2] sm:aspect-[16/10] md:aspect-[16/9]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 46vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/10 via-transparent to-transparent" />
        </div>
      </div>

      <div>
        <h2 className="font-display text-2xl leading-[1.15] tracking-[-0.03em] text-ink sm:text-3xl sm:leading-tight md:text-4xl">
          Is Virtual Office right for you?
        </h2>
        <a
          href="#faq"
          className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[color:var(--color-brand)] sm:mt-3 sm:gap-2 sm:text-sm"
        >
          <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          New to Virtual Offices?
        </a>

        <div className="mt-4 grid gap-3 sm:mt-6 sm:gap-4 md:mt-8 md:gap-5">
          {rows.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.title} className="flex gap-2.5 sm:gap-4">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)] sm:mt-1 sm:h-10 sm:w-10 sm:rounded-2xl">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">{r.title}</p>
                  <p className="mt-0.5 text-xs leading-5 text-muted sm:mt-1 sm:text-sm sm:leading-6">
                    {r.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft sm:mt-8 sm:rounded-[1.5rem]">
          <div className="flex items-center justify-between gap-3 px-4 pt-4 sm:gap-4 sm:px-5 sm:pt-5">
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollToIndex(Math.max(0, activeTestimonial - 1))}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-soft transition hover:bg-slate-50"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={`dot-${i}`}
                    type="button"
                    onClick={() => scrollToIndex(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      i === activeTestimonial ? "w-7 bg-slate-900/70" : "w-1.5 bg-slate-300 hover:bg-slate-400",
                    )}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => scrollToIndex(Math.min(testimonials.length - 1, activeTestimonial + 1))}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-soft transition hover:bg-slate-50"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            ref={railRef}
            className="no-scrollbar flex snap-x snap-mandatory overflow-x-scroll overscroll-x-contain pb-4 pt-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-x scroll-px-3 sm:pb-5 sm:pt-3 sm:scroll-px-4"
            aria-label="Testimonials"
          >
            {testimonials.map((t) => (
              <div key={t.by} className="min-w-full shrink-0 snap-start px-3 sm:px-4">
                <p className="text-sm font-medium leading-6 text-slate-700 sm:leading-7">“{t.quote}”</p>
                <p className="mt-1.5 text-xs text-slate-500 sm:mt-2">— {t.by}</p>
              </div>
            ))}
            <div className="min-w-4 shrink-0" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

