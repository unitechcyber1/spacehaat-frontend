const FAQ_CONTEXT = "https://schema.org" as const;

export function buildFaqPageJsonLd(
  pageUrl: string,
  items: { question: string; answer: string }[],
): string {
  const mainEntity = items.map((f) => ({
    "@type": "Question" as const,
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: f.answer,
    },
  }));

  return JSON.stringify({
    "@context": FAQ_CONTEXT,
    "@type": "FAQPage",
    mainEntity,
    url: pageUrl,
  });
}
