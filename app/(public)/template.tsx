import type { ReactNode } from "react";

import { SeoCmsRouteSections } from "@/components/seo/seo-cms-route-sections";
import { SeoStructuredDataFromRequest } from "@/components/seo/seo-structured-data-from-request";

/**
 * JSON-LD is server-rendered for crawlers; CMS footer/FAQ load on the client
 * pathname so soft navigations stay fast without `router.refresh()`.
 */
export default function PublicTemplate({ children }: { children: ReactNode }) {
  return (
    <>
      <main>{children}</main>
      <SeoCmsRouteSections />
      <SeoStructuredDataFromRequest />
    </>
  );
}
