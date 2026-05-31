import type { FAQItem } from "@/types";

import { VoEyebrow, VoSection, VoSectionTitle } from "@/modules/virtual-office/components/city-page/vo-city-ui";

export function VoCityFaqSection({ cityDisplay, faqs }: { cityDisplay: string; faqs: FAQItem[] }) {
  if (!faqs.length) return null;

  return (
    <VoSection id="faqs">
      <VoEyebrow>Answers</VoEyebrow>
      <VoSectionTitle>Frequently Asked Questions</VoSectionTitle>
      <p className="sr-only">Virtual office in {cityDisplay}</p>

      <div className="mt-6 flex flex-col gap-1.5">
        {faqs.map((faq, index) => (
          <details
            key={faq.id}
            className="group rounded-xl border border-[#EAE7E0] bg-white open:border-[#d8d2c5]"
            open={index === 0}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-base font-semibold text-ink [&::-webkit-details-marker]:hidden">
              {faq.question}
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#EDF7EE] text-sm font-bold text-[color:var(--color-brand)] transition group-open:rotate-45 group-open:bg-[color:var(--color-brand)] group-open:text-white">
                +
              </span>
            </summary>
            <div className="max-w-[75ch] px-5 pb-5 text-[15px] leading-relaxed text-[#444]">{faq.answer}</div>
          </details>
        ))}
      </div>
    </VoSection>
  );
}
