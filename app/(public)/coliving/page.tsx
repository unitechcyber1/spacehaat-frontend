import { generateMetadataForPublicRoute } from "@/lib/generate-public-seo-metadata";
import { ColivingHomepage } from "@/modules/verticals/coliving-homepage";
import { loadColivingHomepageFeaturedPgs } from "@/services/pg-api";
import { getVerticalLandingContent } from "@/services/verticals";

export const generateMetadata = generateMetadataForPublicRoute;

export default async function ColivingPage() {
  const [data, featuredPgs] = await Promise.all([
    getVerticalLandingContent("coliving"),
    loadColivingHomepageFeaturedPgs(8),
  ]);

  return <ColivingHomepage data={data} featuredPgs={featuredPgs} />;
}
