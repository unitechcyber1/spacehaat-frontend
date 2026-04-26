import type { ReactNode } from "react";

import { generateMetadataForPublicRoute } from "@/lib/generate-public-seo-metadata";

export const generateMetadata = generateMetadataForPublicRoute;

/**
 * The page is `use client` only, so it cannot export `generateMetadata` here.
 * This leaf layout re-runs per navigation to keep `<head>` in sync with the CMS.
 */
export default function ListYourSpaceLayout({ children }: { children: ReactNode }) {
  return children;
}
