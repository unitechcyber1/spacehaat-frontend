import { generateMetadataForPublicRoute } from "@/lib/generate-public-seo-metadata";
import { Homepage } from "@/modules/home/homepage";
import { getHomepageContent } from "@/services/home";

export const generateMetadata = generateMetadataForPublicRoute;

export default async function HomePage() {
  const data = await getHomepageContent();

  return <Homepage data={data} />;
}
