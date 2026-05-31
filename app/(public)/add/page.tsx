import { AddVerticalChooser } from "@/modules/listing/components/add-vertical-chooser";
import { generateMetadataForPublicRoute } from "@/lib/generate-public-seo-metadata";
import {
  getVendorCoworkingListings,
  getVendorOfficeListings,
  getVendorPgListings,
} from "@/services/listing-api";
import { getListingSession } from "@/services/listing-session";

export const generateMetadata = generateMetadataForPublicRoute;

export default async function AddVerticalChooserPage() {
  const session = await getListingSession();
  let hasListings = false;
  if (session?.userId && session?.token) {
    const [c, o, p] = await Promise.all([
      getVendorCoworkingListings(session.userId, 1, session.token),
      getVendorOfficeListings(session.userId, 1, session.token),
      getVendorPgListings(session.userId, 1, session.token),
    ]);
    if (c.ok && Array.isArray(c.data?.data) && c.data.data.length > 0) {
      hasListings = true;
    }
    if (o.ok && Array.isArray(o.data?.data) && o.data.data.length > 0) {
      hasListings = true;
    }
    if (p.ok && Array.isArray(p.data?.data) && p.data.data.length > 0) {
      hasListings = true;
    }
  }

  return <AddVerticalChooser hostName={session?.name} hasListings={hasListings} />;
}
