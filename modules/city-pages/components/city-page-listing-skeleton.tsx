import { Container } from "@/components/ui/container";
import { SpaceGridSkeleton } from "@/modules/spaces/components/space-grid-skeleton";
import { cn } from "@/utils/cn";

type CityPageListingSkeletonProps = {
  /** Office city pages use square card placeholders; coworking / virtual use workspace card shape. */
  gridVariant?: "coworking" | "office";
  className?: string;
};

/**
 * Loading UI for vertical **city** listing routes (hero + optional localities rail + card grid).
 * Do not use for single space detail pages.
 */
export function CityPageListingSkeleton({
  gridVariant = "coworking",
  className,
}: CityPageListingSkeletonProps) {
  return (
    <div className={cn(className)} aria-busy="true" aria-label="Loading city">
      <section className="relative overflow-hidden pb-10 pt-10 sm:pb-14 sm:pt-14">
        <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top_left,rgba(48,88,215,0.12),transparent_32%),linear-gradient(180deg,#f8fbff_0%,#ffffff_92%)]" />
        <Container>
          <div className="max-w-4xl space-y-4">
            <div className="h-7 w-36 animate-pulse rounded-full bg-slate-200/90 sm:h-8 sm:w-44" />
            <div className="h-10 max-w-3xl animate-pulse rounded-lg bg-slate-200/85 sm:h-12" />
            <div className="h-10 max-w-xl animate-pulse rounded-lg bg-slate-200/70 sm:h-12" />
          </div>
        </Container>
      </section>

      <section className="pb-14 sm:pb-20">
        <Container>
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="h-6 w-40 animate-pulse rounded-md bg-slate-200/80 sm:h-7" />
            <div className="flex min-w-0 flex-1 gap-2 overflow-hidden py-0.5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 shrink-0 animate-pulse rounded-full bg-slate-200/70 px-8"
                  style={{ width: `${4.5 + (i % 4) * 1.25}rem` }}
                />
              ))}
            </div>
          </div>
          <SpaceGridSkeleton count={8} variant={gridVariant} />
        </Container>
      </section>
    </div>
  );
}
