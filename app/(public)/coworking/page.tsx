import { CoworkingHomepage } from "@/modules/verticals/coworking-homepage";
import { getVerticalLandingContent } from "@/services/verticals";
import { buildMetadata } from "@/utils/metadata";

export const metadata = buildMetadata(
  "Coworking Spaces",
  "Discover premium coworking spaces across India's leading cities.",
  "/coworking",
);

export default async function CoworkingPage() {
  const data = await getVerticalLandingContent("coworking");

  return <CoworkingHomepage data={data} />;
}
