import { buildUrlsetXml } from "@/lib/sitemap-xml";
import { buildMainPagesSitemapEntries } from "@/lib/sitemap-public-urls";

export const dynamic = "force-static";

export function GET() {
  const lastmod = new Date();
  const xml = buildUrlsetXml(buildMainPagesSitemapEntries(lastmod), lastmod, {
    sortByLoc: false,
    minimalNamespace: true,
  });
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
