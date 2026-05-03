import { Container } from "@/components/ui/container";
import { cn } from "@/utils/cn";

function Skeleton({ className }: { className: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-slate-200/70", className)} />;
}

export function SpaceDetailSkeleton() {
  return (
    <section className="pb-14 pt-8 sm:pb-20 sm:pt-12" aria-busy="true" aria-label="Loading space details">
      <Container>
        <div className="space-y-6">
          {/* Gallery */}
          <div className="hidden overflow-hidden rounded-[1.5rem] md:block">
            <div className="grid h-[28rem] grid-cols-4 grid-rows-2 gap-2 lg:h-[32rem]">
              <Skeleton className="col-span-2 row-span-2 h-full w-full rounded-[1.5rem]" />
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-full w-full rounded-[1.5rem]" />
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <Skeleton className="aspect-[16/11] w-full rounded-[1.2rem]" />
          </div>

          {/* Header */}
          <div className="rounded-[1.6rem] border border-slate-200/80 bg-white p-6 shadow-soft sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="min-w-0 flex-1 space-y-4">
                <Skeleton className="h-3 w-28 rounded-full" />
                <Skeleton className="h-10 w-4/5 max-w-2xl" />
                <Skeleton className="h-10 w-3/5 max-w-xl" />
                <div className="flex flex-wrap gap-3">
                  <Skeleton className="h-8 w-64 rounded-full" />
                  <Skeleton className="h-8 w-20 rounded-full" />
                </div>
              </div>
              <div className="w-full max-w-[260px] rounded-[1rem] border border-slate-200 bg-slate-50 px-5 py-4">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="mt-3 h-8 w-36" />
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="rounded-[1.6rem] border border-slate-200/80 bg-white p-6 shadow-soft sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Skeleton className="h-10 w-10 rounded-2xl" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-5 w-44" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content + sidebar */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
            <div className="space-y-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-soft sm:p-8"
                >
                  <Skeleton className="h-3 w-32" />
                  <div className="mt-6 space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-11/12" />
                    <Skeleton className="h-4 w-10/12" />
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[1.6rem] border border-slate-200/80 bg-white p-6 shadow-soft sm:p-7">
                <Skeleton className="h-6 w-40" />
                <div className="mt-5 space-y-3">
                  <Skeleton className="h-12 w-full rounded-2xl" />
                  <Skeleton className="h-12 w-full rounded-2xl" />
                  <Skeleton className="h-12 w-full rounded-2xl" />
                </div>
                <Skeleton className="mt-5 h-12 w-full rounded-2xl" />
                <div className="mt-6 grid gap-2">
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

