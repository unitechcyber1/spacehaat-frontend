import { FAQItem } from "@/types";

type FAQSectionProps = {
  faqs: FAQItem[];
  locationName: string;
};

export function FAQSection({ faqs, locationName }: FAQSectionProps) {
  return (
    <section className="pb-14 sm:pb-20">
      <div className="max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-brand)]">
          FAQs
        </p>
        <h2 className="mt-4 font-display text-4xl leading-tight text-ink">
          Frequently asked questions for {locationName}
        </h2>
      </div>
      <div className="mt-8 grid gap-4">
        {faqs.map((faq) => (
          <details
            key={faq.id}
            className="group rounded-[1.4rem] border border-slate-200/80 bg-white p-5 shadow-soft"
          >
            <summary className="cursor-pointer list-none text-lg font-semibold text-ink">
              {faq.question}
            </summary>
            <p className="mt-4 text-sm leading-7 text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
