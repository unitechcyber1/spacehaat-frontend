import { cn } from "@/utils/cn";

/**
 * Layout mirror of {@link OfficeSpaceCard} (square media + meta rows).
 */
export function OfficeSpaceCardSkeleton({ className }: { className?: string }) {
  return (
    <article className={cn("group", className)} aria-hidden>
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-100 via-slate-200/80 to-slate-100" />
      </div>
      <div className="mt-3 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="h-4 flex-1 animate-pulse rounded-md bg-slate-200/90" />
          <div className="h-4 w-10 shrink-0 animate-pulse rounded bg-slate-200/70" />
        </div>
        <div className="flex gap-2">
          <div className="h-3.5 w-3.5 shrink-0 rounded bg-slate-200/60" />
          <div className="h-3.5 flex-1 animate-pulse rounded bg-slate-200/65" />
        </div>
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="h-4 w-32 animate-pulse rounded bg-slate-200/85" />
          <div className="h-3 w-16 animate-pulse rounded bg-slate-200/60" />
        </div>
      </div>
    </article>
  );
}
