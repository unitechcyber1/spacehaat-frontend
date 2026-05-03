import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { FooterMarketingSection } from "@/components/layout/footer-marketing-section";
import { SeoFooterContentSection } from "@/components/seo/seo-footer-content-section";
import { SeoFaqsSection } from "@/components/seo/seo-faqs-section";
import { SeoStructuredData } from "@/components/seo/seo-structured-data";
import { resolveCanonicalUrl } from "@/lib/canonical-url";
import { getResolvedSeoForRequest } from "@/lib/seo-for-request";

/**
 * Unlike `layout.tsx`, a template **re-renders on every client navigation** so CMS SEO
 * (FAQs, footer copy, JSON-LD) matches the current URL instead of sticking to the first route.
 */
export default async function PublicTemplate({ children }: { children: ReactNode }) {
  const { seo, pathname, fromApi } = await getResolvedSeoForRequest();
  const pathSeg = (pathname && pathname.length > 0 ? pathname : "/").split("?")[0] ?? "/";
  const pageUrl = resolveCanonicalUrl(pathname || "/", seo.url);

  const hasFaqs = Boolean(seo.faqs?.length);
  const hasJsonLd = Boolean(
    fromApi && (seo.script?.trim() || (seo.faqs && seo.faqs.length > 0)),
  );

  /** Host listing panel (`/add/*`): no CMS FAQ/SEO footer/JSON-LD; keep those on `/list-your-space` and elsewhere. */
  const isAddListingRoute = pathSeg === "/add" || pathSeg.startsWith("/add/");
  const showCmsSeoSections = !isAddListingRoute;

  return (
    <>
      <main>
        {children}
        {showCmsSeoSections && hasFaqs ? <SeoFaqsSection faqs={seo.faqs} /> : null}
      </main>
      {showCmsSeoSections ? (
        <SeoFooterContentSection title={seo.footer_title} description={seo.footer_description} />
      ) : null}
      <Footer />
      <FooterMarketingSection />
      {showCmsSeoSections && hasJsonLd ? (
        <SeoStructuredData scriptJson={seo.script} faqs={seo.faqs} pageUrl={pageUrl} />
      ) : null}
    </>
  );
}
