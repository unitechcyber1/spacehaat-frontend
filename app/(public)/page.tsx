import { Homepage } from "@/modules/home/homepage";
import { getHomepageContent } from "@/services/home";
import { buildMetadata } from "@/utils/metadata";

export const metadata = buildMetadata(
  "Premium Workspace Discovery",
  "Explore premium coworking spaces, virtual offices, and office spaces across India.",
  "/",
);

export default async function HomePage() {
  const data = await getHomepageContent();

  return <Homepage data={data} />;
}
