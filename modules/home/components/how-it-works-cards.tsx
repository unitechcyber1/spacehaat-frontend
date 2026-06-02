import type { ComponentType } from "react";

import { RemoteImage } from "@/components/ui/remote-image";
import type { HowItWorksStep } from "@/types";
import { cn } from "@/utils/cn";

type HowItWorksCardsProps = {
  steps: HowItWorksStep[];
  icons: ComponentType<{ className?: string }>[];
  className?: string;
};

export function HowItWorksCards({ steps, icons, className }: HowItWorksCardsProps) {
  return (
    <div
      className={cn(
        "no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        "max-lg:-mr-4 max-lg:pr-4",
        "sm:max-lg:-mr-6 sm:max-lg:pr-6",
        "sm:gap-3.5",
        "lg:mr-0 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:pr-0 lg:pb-0",
        className,
      )}
      role="list"
    >
      {steps.map((step, index) => {
        const Icon = icons[index % icons.length];
        const hasImage = Boolean(step.imageSrc);

        return (
          <article
            key={step.id}
            role="listitem"
            className={cn(
              "relative flex w-[min(15.5rem,78vw)] shrink-0 snap-start flex-col overflow-hidden rounded-xl",
              "h-[14.75rem] sm:h-[15.5rem]",
              "lg:h-auto lg:w-auto lg:min-h-[20rem] lg:rounded-[1rem]",
              !hasImage && "bg-[#F9F8F4] shadow-[0_1px_0_rgba(15,23,42,0.06)]",
              hasImage && "shadow-[0_10px_32px_rgba(15,23,42,0.14)]",
            )}
          >
            {hasImage && step.imageSrc ? (
              <>
                <RemoteImage
                  src={step.imageSrc}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 78vw, 33vw"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.5)_38%,rgba(0,0,0,0.12)_68%,transparent_100%)]"
                  aria-hidden
                />
              </>
            ) : null}

            <div className="relative z-10 flex min-h-0 flex-1 flex-col p-4 sm:p-5 lg:p-7">
              <div className={cn(hasImage ? "text-white" : "text-ink")}>
                <Icon className="h-6 w-6 stroke-[1.5] lg:h-8 lg:w-8" aria-hidden />
              </div>

              <div className="mt-auto space-y-1 pt-3 lg:space-y-2 lg:pt-5">
                <h3
                  className={cn(
                    "text-[0.9375rem] font-bold leading-snug tracking-[-0.02em] lg:text-lg xl:text-xl",
                    hasImage ? "text-white" : "text-ink",
                  )}
                >
                  {step.title}
                </h3>
                <p
                  className={cn(
                    "line-clamp-3 text-xs leading-relaxed lg:line-clamp-none lg:text-sm lg:leading-relaxed",
                    hasImage ? "text-white/85" : "text-muted",
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
