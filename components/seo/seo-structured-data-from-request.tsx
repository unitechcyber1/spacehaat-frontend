import { SeoStructuredData } from "@/components/seo/seo-structured-data";
import { resolveCanonicalUrl } from "@/lib/canonical-url";
import { getResolvedSeoForRequest } from "@/lib/seo-for-request";

function isAddListingRoute(pathname: string) {
  return pathname === "/add" || pathname.startsWith("/add/");
}

/**
 * Server-rendered JSON-LD for the current request. Must stay in the initial HTML
 * so crawlers (Google) receive structured data without waiting for client JS.
 */
export async function SeoStructuredDataFromRequest() {
  const { seo, pathname } = await getResolvedSeoForRequest();
  const pathSeg = (pathname && pathname.length > 0 ? pathname : "/").split("?")[0] ?? "/";

  if (isAddListingRoute(pathSeg)) return null;

  const hasJsonLd = Boolean(seo.script?.trim() || (seo.faqs && seo.faqs.length > 0));
  if (!hasJsonLd) return null;

  const pageUrl = resolveCanonicalUrl(pathname || "/", seo.url);

  return (
    <SeoStructuredData scriptJson={seo.script} faqs={seo.faqs} pageUrl={pageUrl} />
  );
}
