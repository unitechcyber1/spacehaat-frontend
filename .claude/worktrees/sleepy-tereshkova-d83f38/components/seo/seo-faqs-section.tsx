import { Container } from "@/components/ui/container";
import type { SeoFaq } from "@/types/seo.model";

type Props = {
  faqs?: SeoFaq[] | null;
  /** Visible section heading; defaults to "Frequently asked questions" */
  title?: string | null;
};

/**
 * Renders on-page FAQ accordions (in addition to FAQ JSON-LD in {@link SeoStructuredData}).
 */
export function SeoFaqsSection({ faqs, title }: Props) {
  if (!faqs || faqs.length === 0) return null;
  const heading = title?.trim() || "Frequently asked questions";

  return (
    <section
      className="border-t border-slate-200/80 bg-slate-50/80"
      aria-labelledby="page-faq-heading"
    >
      <Container className="py-12 sm:py-16">
        <h2
          id="page-faq-heading"
          className="font-display text-2xl font-semibold text-ink sm:text-3xl"
        >
          {heading}
        </h2>
        <div className="mt-8 grid gap-3 sm:mt-10">
          {faqs.map((f, i) => (
            <details
              key={`${f.question.slice(0, 40)}-${i}`}
              className="group rounded-2xl border border-slate-200/90 bg-white px-4 py-1 shadow-sm open:shadow-md sm:px-5"
            >
              <summary className="cursor-pointer list-none py-4 pr-2 font-semibold text-ink transition marker:content-[''] [&::-webkit-details-marker]:hidden">
                <span className="inline-flex w-full items-center justify-between gap-3 text-left text-base">
                  {f.question}
                  <span
                    className="text-slate-400 transition group-open:rotate-180"
                    aria-hidden
                  >
                    ▼
                  </span>
                </span>
              </summary>
              <div className="border-t border-slate-100 pb-4 pt-1 text-sm leading-relaxed text-ink/80">
                {f.answer}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
