import type { SeoContent } from "@/types/seo.model";

/** Visible H1 from CMS `page_title`, with a local fallback when missing. */
export function seoPageTitleOrFallback(
  seo: SeoContent | null | undefined,
  fallback: string,
): string {
  return seo?.page_title?.trim() || fallback;
}
