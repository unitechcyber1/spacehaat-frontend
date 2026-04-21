import { CoworkingCityPage } from "@/modules/coworking/coworking-city-page";
import { OfficeSpaceCityPage } from "@/modules/office-space/office-space-city-page";
import { VirtualOfficeCityPage } from "@/modules/virtual-office/virtual-office-city-page";
import type { CityPageData } from "@/types";

type VerticalCityPageProps = {
  data: CityPageData;
};

export function VerticalCityPage({ data }: VerticalCityPageProps) {
  switch (data.vertical) {
    case "coworking":
      return <CoworkingCityPage data={data} />;
    case "office-space":
      return <OfficeSpaceCityPage data={data} />;
    case "virtual-office":
      return <VirtualOfficeCityPage data={data} />;
    default: {
      const _exhaustive: never = data.vertical;
      return _exhaustive;
    }
  }
}
