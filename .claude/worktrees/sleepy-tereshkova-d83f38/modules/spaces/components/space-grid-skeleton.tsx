import { SpaceCardSkeleton } from "@/modules/spaces/components/space-card-skeleton";
import { cn } from "@/utils/cn";

type SpaceGridSkeletonProps = {
  count?: number;
  className?: string;
};

export function SpaceGridSkeleton({ count = 6, className }: SpaceGridSkeletonProps) {
  return (
    <div
      className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}
      aria-busy="true"
      aria-label="Loading spaces"
    >
      {Array.from({ length: count }, (_, i) => (
        <SpaceCardSkeleton key={i} />
      ))}
    </div>
  );
}
