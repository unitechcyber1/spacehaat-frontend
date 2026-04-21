import { cn } from "@/utils/cn";

type SpaceCardSkeletonProps = {
  className?: string;
};

/**
 * Layout mirror of listing cards for city listing load states.
 */
export function SpaceCardSkeleton({ className }: SpaceCardSkeletonProps) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-[1.4rem] border border-slate-200/60 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]",
        className,
      )}
      aria-hidden
    >
      <div className="relative aspect-[1.18] overflow-hidden rounded-[1.4rem] bg-slate-100">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-100 via-slate-200/80 to-slate-100" />
        <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
          <div className="flex gap-2">
            <div className="h-8 w-[4.5rem] rounded-full bg-white/90 shadow-sm sm:h-9 sm:w-24" />
            <div className="hidden h-8 w-16 rounded-full bg-white/80 shadow-sm sm:block sm:h-9 sm:w-20" />
          </div>
          <div className="h-10 w-10 shrink-0 rounded-full bg-white/95 shadow-sm sm:h-12 sm:w-12" />
        </div>
      </div>

      <div className="space-y-3 px-1 pb-1 pt-3">
        <div className="flex items-start justify-between gap-3">
          <div className="h-5 flex-1 animate-pulse rounded-md bg-slate-200/90 sm:h-[1.15rem]" />
          <div className="h-4 w-12 shrink-0 animate-pulse rounded bg-slate-200/80" />
        </div>
        <div className="space-y-2 pl-0.5">
          <div className="h-3.5 w-[92%] animate-pulse rounded bg-slate-200/70" />
          <div className="h-3.5 w-[72%] animate-pulse rounded bg-slate-200/60" />
        </div>
        <div className="flex items-end justify-between gap-3 pt-1">
          <div className="space-y-1">
            <div className="h-5 w-28 animate-pulse rounded bg-slate-200/90 sm:h-[1.15rem] sm:w-32" />
            <div className="h-3 w-16 animate-pulse rounded bg-slate-200/50" />
          </div>
          <div className="h-8 w-[5.5rem] shrink-0 animate-pulse rounded-full bg-slate-200/80 sm:h-9 sm:w-24" />
        </div>
      </div>
    </article>
  );
}
