import { VirtualOfficeHomepage } from "@/modules/verticals/virtual-office-homepage";
import { getVerticalLandingContent } from "@/services/verticals";
import { buildMetadata } from "@/utils/metadata";

export const metadata = buildMetadata(
  "Virtual Offices",
  "Compare virtual office listings across India's leading business districts.",
  "/virtual-office",
);

export default async function VirtualOfficePage() {
  const data = await getVerticalLandingContent("virtual-office");

  return <VirtualOfficeHomepage data={data} />;
}
