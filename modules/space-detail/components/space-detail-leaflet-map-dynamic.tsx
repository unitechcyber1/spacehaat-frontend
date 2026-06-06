"use client";

import dynamic from "next/dynamic";

import { cn } from "@/utils/cn";

export type { SpaceDetailLeafletMapProps } from "@/modules/space-detail/components/space-detail-leaflet-map";

function MapLoading({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "min-h-[260px] animate-pulse rounded-2xl border border-[#E7E9E6] bg-[#ebe6dc] sm:min-h-[330px]",
        className,
      )}
      aria-hidden
    />
  );
}

export const SpaceDetailLeafletMap = dynamic(
  () =>
    import("@/modules/space-detail/components/space-detail-leaflet-map").then(
      (m) => m.SpaceDetailLeafletMap,
    ),
  {
    ssr: false,
    loading: () => <MapLoading />,
  },
);

export { MapLoading as SpaceDetailLeafletMapLoading };
