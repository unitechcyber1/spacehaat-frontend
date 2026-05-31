import { generateMetadataForPublicRoute } from "@/lib/generate-public-seo-metadata";
import { ColivingHomepage } from "@/modules/verticals/coliving-homepage";
import { getVerticalLandingContent } from "@/services/verticals";

export const generateMetadata = generateMetadataForPublicRoute;

export default async function ColivingPage() {
  const data = await getVerticalLandingContent("coliving");

  return <ColivingHomepage data={data} />;
}
