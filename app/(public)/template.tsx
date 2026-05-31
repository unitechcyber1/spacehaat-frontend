import type { ReactNode } from "react";

import { SeoCmsRouteSections } from "@/components/seo/seo-cms-route-sections";

/**
 * Page content streams immediately; CMS footer/FAQ/JSON-LD load from the client
 * pathname (no blocking SEO fetch or `router.refresh()` on every navigation).
 */
export default function PublicTemplate({ children }: { children: ReactNode }) {
  return (
    <>
      <main>{children}</main>
      <SeoCmsRouteSections />
    </>
  );
}
