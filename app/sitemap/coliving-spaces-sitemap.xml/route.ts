import { collectColivingSpacesSitemapUrls } from "@/lib/sitemap-public-urls";
import { sitemapXmlResponse } from "@/lib/sitemap-route-response";
import { loadColivingDetailSitemapUrls } from "@/services/pg-api";

export const dynamic = "force-dynamic";

export async function GET() {
  const urls = await loadColivingDetailSitemapUrls();
  return sitemapXmlResponse(urls.length ? urls : collectColivingSpacesSitemapUrls());
}
