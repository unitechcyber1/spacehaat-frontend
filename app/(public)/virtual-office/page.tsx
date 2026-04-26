import { generateMetadataForPublicRoute } from "@/lib/generate-public-seo-metadata";
import { VirtualOfficeHomepage } from "@/modules/verticals/virtual-office-homepage";
import { getVerticalLandingContent } from "@/services/verticals";

export const generateMetadata = generateMetadataForPublicRoute;

export default async function VirtualOfficePage() {
  const data = await getVerticalLandingContent("virtual-office");

  return <VirtualOfficeHomepage data={data} />;
}
