import { redirect } from "next/navigation";

import { ColivingListingForm } from "@/modules/listing/coliving";
import { generateMetadataForPublicRoute } from "@/lib/generate-public-seo-metadata";
import { getListingSession } from "@/services/listing-session";

type PageProps = {
  searchParams: Promise<{ edit?: string }>;
};

export const generateMetadata = generateMetadataForPublicRoute;

export default async function AddColivingSpacePage({ searchParams }: PageProps) {
  const session = await getListingSession();
  if (!session?.token) {
    redirect("/list-your-space");
  }

  const { edit } = await searchParams;
  const editId = edit?.trim() || null;

  return (
    <div className="min-h-dvh bg-[#f9f8f5]">
      <ColivingListingForm editId={editId} />
    </div>
  );
}
