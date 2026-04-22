import { Container } from "@/components/ui/container";
import { SpaceGridSkeleton } from "@/modules/spaces/components/space-grid-skeleton";
import { cn } from "@/utils/cn";

type LocationListingPageSkeletonProps = {
  gridVariant?: "coworking" | "office";
  className?: string;
};

/**
 * Loading UI for **location** listing routes (breadcrumb + title + rail + grid).
 */
export function LocationListingPageSkeleton({
  gridVariant = "coworking",
  className,
}: LocationListingPageSkeletonProps) {
  return (
    <div className={cn(className)} aria-busy="true" aria-label="Loading location">
      <section className="relative overflow-hidden pb-10 pt-10 sm:pb-14 sm:pt-14">
        <div className="absolute inset-x-0 top-0 -z-10 h-[24rem] bg-[radial-gradient(circle_at_top_left,rgba(48,88,215,0.12),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#ffffff_94%)]" />
        <Container>
          <div className="flex flex-wrap items-center gap-2 gap-y-2">
            <div className="h-4 w-20 animate-pulse rounded bg-slate-200/75" />
            <div className="text-slate-300">/</div>
            <div className="h-4 w-24 animate-pulse rounded bg-slate-200/70" />
            <div className="text-slate-300">/</div>
            <div className="h-4 w-32 animate-pulse rounded bg-slate-200/65" />
          </div>
          <div className="mt-6 h-3 w-52 animate-pulse rounded-full bg-slate-200/80" />
          <div className="mt-4 h-12 max-w-5xl animate-pulse rounded-lg bg-slate-200/85 sm:h-14" />
          <div className="mt-3 h-12 max-w-3xl animate-pulse rounded-lg bg-slate-200/70 sm:h-14" />
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
