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
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-soft">
        <div className="relative aspect-[16/10] sm:aspect-[16/9]">
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
        <h2 className="font-display text-3xl tracking-[-0.03em] text-ink sm:text-4xl">
          Is Virtual Office right for you?
        </h2>
        <a
          href="#faq"
          className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-brand)]"
        >
          <Info className="h-4 w-4" />
          New to Virtual Offices?
        </a>

        <div className="mt-8 grid gap-5">
          {rows.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.title} className="flex gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{r.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{r.body}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white shadow-soft">
          <div className="flex items-center justify-between gap-4 px-5 pt-5">
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
            className="no-scrollbar flex snap-x snap-mandatory overflow-x-scroll overscroll-x-contain pb-5 pt-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-x scroll-px-4"
            aria-label="Testimonials"
          >
            {testimonials.map((t) => (
              <div key={t.by} className="min-w-full shrink-0 snap-start px-4">
                <p className="text-sm font-medium leading-7 text-slate-700">“{t.quote}”</p>
                <p className="mt-2 text-xs text-slate-500">— {t.by}</p>
              </div>
            ))}
            <div className="min-w-4 shrink-0" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

