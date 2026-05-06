import { sitemapXmlResponse } from "@/lib/sitemap-route-response";
import { collectCityPagesSitemapUrls } from "@/lib/sitemap-public-urls";

export const dynamic = "force-static";

export function GET() {
  return sitemapXmlResponse(collectCityPagesSitemapUrls());
}
