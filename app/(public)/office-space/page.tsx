import { OfficeSpaceHomepage } from "@/modules/verticals/office-space-homepage";
import { getVerticalLandingContent } from "@/services/verticals";
import { buildMetadata } from "@/utils/metadata";

export const metadata = buildMetadata(
  "Office Spaces",
  "Explore managed and traditional office spaces across India's top markets.",
  "/office-space",
);

export default async function OfficeSpacePage() {
  const data = await getVerticalLandingContent("office-space");

  return <OfficeSpaceHomepage data={data} />;
}
