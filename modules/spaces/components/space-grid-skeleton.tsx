import { OfficeSpaceCardSkeleton } from "@/modules/office-space/components/office-space-card-skeleton";
import { SpaceCardSkeleton } from "@/modules/spaces/components/space-card-skeleton";
import { cn } from "@/utils/cn";

type SpaceGridSkeletonProps = {
  count?: number;
  className?: string;
  variant?: "coworking" | "office";
};

export function SpaceGridSkeleton({
  count = 6,
  className,
  variant = "coworking",
}: SpaceGridSkeletonProps) {
  const Card = variant === "office" ? OfficeSpaceCardSkeleton : SpaceCardSkeleton;
  const label = variant === "office" ? "Loading office spaces" : "Loading spaces";

  return (
    <div
      className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}
      aria-busy="true"
      aria-label={label}
    >
      {Array.from({ length: count }, (_, i) => (
        <Card key={i} />
      ))}
    </div>
  );
}
