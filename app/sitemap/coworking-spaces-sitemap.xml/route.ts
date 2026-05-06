import { sitemapXmlResponse } from "@/lib/sitemap-route-response";
import { collectCoworkingSpacesSitemapUrls } from "@/lib/sitemap-public-urls";

export const dynamic = "force-static";

export function GET() {
  return sitemapXmlResponse(collectCoworkingSpacesSitemapUrls());
}
