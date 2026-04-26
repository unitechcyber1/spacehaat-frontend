import { generateMetadataForPublicRoute } from "@/lib/generate-public-seo-metadata";
import { CoworkingHomepage } from "@/modules/verticals/coworking-homepage";
import { getVerticalLandingContent } from "@/services/verticals";

export const generateMetadata = generateMetadataForPublicRoute;

export default async function CoworkingPage() {
  const data = await getVerticalLandingContent("coworking");

  return <CoworkingHomepage data={data} />;
}
