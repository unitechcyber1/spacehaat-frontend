import { VerticalSpaceCard } from "@/modules/spaces/components/vertical-space-card";
import { Space } from "@/types";

type SimilarSpacesProps = {
  spaces: Space[];
};

export function SimilarSpaces({ spaces }: SimilarSpacesProps) {
  if (spaces.length === 0) {
    return null;
  }

  return (
    <div className="no-scrollbar mt-8 flex snap-x gap-5 overflow-x-auto pb-2">
      {spaces.map((space) => (
        <div key={space.id} className="w-[18.5rem] shrink-0 snap-start sm:w-[21rem]">
          <VerticalSpaceCard space={space} />
        </div>
      ))}
    </div>
  );
}
