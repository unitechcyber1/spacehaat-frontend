import { VerticalSpaceCard } from "@/modules/spaces/components/vertical-space-card";
import { Space } from "@/types";

type SpaceRailProps = {
  spaces: Space[];
};

export function SpaceRail({ spaces }: SpaceRailProps) {
  return (
    <div className="no-scrollbar mt-10 flex snap-x items-stretch gap-5 overflow-x-auto pb-2">
      {spaces.map((space) => (
        <div
          key={space.id}
          className="flex h-full w-[18.5rem] shrink-0 snap-start flex-col sm:w-[21rem]"
        >
          <VerticalSpaceCard space={space} className="min-h-0 flex-1" />
        </div>
      ))}
    </div>
  );
}
