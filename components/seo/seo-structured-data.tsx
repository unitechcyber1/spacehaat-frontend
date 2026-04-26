import type { SeoFaq } from "@/types/seo.model";

import { buildFaqPageJsonLd } from "./seo-json-ld-helpers";

type Props = {
  /** Raw JSON-LD string from CMS (`script` field) */
  scriptJson?: string | null;
  faqs?: SeoFaq[] | null;
  /** Public URL of the current page for FAQ schema */
  pageUrl: string;
};

/**
 * Renders one or more `<script type="application/ld+json">` blocks in the body.
 * Uses `script` from API when it parses as JSON; otherwise builds FAQPage from `faqs`.
 */
export function SeoStructuredData({ scriptJson, faqs, pageUrl }: Props) {
  const pieces: string[] = [];

  const raw = scriptJson?.trim();
  if (raw) {
    if (raw.startsWith("{") || raw.startsWith("[")) {
      try {
        JSON.parse(raw);
        pieces.push(raw);
      } catch {
        // If script is not valid JSON, skip (avoid broken LD)
      }
    }
  }

  if (pieces.length === 0 && faqs && faqs.length > 0) {
    pieces.push(
      buildFaqPageJsonLd(
        pageUrl,
        faqs.map((f) => ({ question: f.question, answer: f.answer })),
      ),
    );
  }

  if (pieces.length === 0) return null;

  return (
    <>
      {pieces.map((json, i) => (
        <script
          // eslint-disable-next-line react/no-danger
          key={i}
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: json }}
        />
      ))}
    </>
  );
}
