import Image from "next/image";
import type { ComponentType } from "react";

import type { HowItWorksStep } from "@/types";
import { cn } from "@/utils/cn";

type HowItWorksCardsProps = {
  steps: HowItWorksStep[];
  icons: ComponentType<{ className?: string }>[];
  className?: string;
};

export function HowItWorksCards({ steps, icons, className }: HowItWorksCardsProps) {
  return (
    <div className={cn("grid gap-5 sm:gap-6 lg:grid-cols-3 lg:gap-8", className)}>
      {steps.map((step, index) => {
          const Icon = icons[index % icons.length];
          const hasImage = Boolean(step.imageSrc);

        return (
            <article
              key={step.id}
              tabIndex={hasImage ? 0 : undefined}
              className={cn(
                "group relative flex min-h-[22rem] flex-col overflow-hidden rounded-[1rem] p-8 sm:min-h-[24rem]",
                "bg-[#F9F8F4] shadow-[0_1px_0_rgba(15,23,42,0.06)]",
                "transition-[box-shadow,transform] duration-300",
                "hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]",
                "focus-within:shadow-[0_24px_60px_rgba(15,23,42,0.12)]",
                hasImage && "outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand)] focus-visible:ring-offset-2",
              )}
            >
              {/* Hover: full-bleed image + bottom-weighted overlay (reference layout) */}
              {hasImage && step.imageSrc ? (
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 ease-out",
                    "group-hover:opacity-100 group-focus-within:opacity-100",
                  )}
                  aria-hidden
                >
                  <Image
                    src={step.imageSrc}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.45)_42%,rgba(0,0,0,0.22)_72%,rgba(0,0,0,0.12)_100%)]"
                    aria-hidden
                  />
                </div>
              ) : null}

              <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                <div
                  className={cn(
                    "text-ink transition-colors duration-300",
                    hasImage && "group-hover:text-white group-focus-within:text-white",
                  )}
                >
                  <Icon
                    className="h-8 w-8 stroke-[1.5] sm:h-9 sm:w-9"
                    aria-hidden
                  />
                </div>

                {/* Default: breathing room; hover: image shows behind full card */}
                <div className="min-h-[9rem] flex-1 sm:min-h-[10rem]" aria-hidden />

                <div className="mt-auto space-y-2">
                  <h3
                    className={cn(
                      "text-lg font-bold leading-snug tracking-[-0.02em] transition-colors duration-300 sm:text-xl",
                      "text-ink",
                      hasImage &&
                        "group-hover:text-white group-focus-within:text-white",
                    )}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={cn(
                      "text-sm leading-relaxed transition-colors duration-300 sm:text-[0.9375rem]",
                      "text-muted",
                      hasImage &&
                        "group-hover:text-white/80 group-focus-within:text-white/80",
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </article>
        );
      })}
    </div>
  );
}
