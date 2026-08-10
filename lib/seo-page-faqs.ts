import type { FAQItem } from "@/types";
import type { SeoContent, SeoFaq } from "@/types/seo.model";

function toFaqItem(faq: SeoFaq, index: number): FAQItem | null {
  const question = faq.question?.trim();
  const answer = faq.answer?.trim();
  if (!question || !answer) return null;
  return {
    id: `seo-faq-${index}`,
    question,
    answer,
  };
}

/** Prefer CMS SEO `faqs` for on-page FAQ sections; keep local fallbacks when empty. */
export function seoFaqsOrFallback(
  seo: SeoContent | null | undefined,
  fallback: FAQItem[],
): FAQItem[] {
  const fromSeo = (seo?.faqs ?? [])
    .map((faq, index) => toFaqItem(faq, index))
    .filter((faq): faq is FAQItem => faq != null);
  return fromSeo.length > 0 ? fromSeo : fallback;
}
