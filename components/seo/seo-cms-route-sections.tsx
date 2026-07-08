"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Footer } from "@/components/layout/footer";
import { FooterMarketingSection } from "@/components/layout/footer-marketing-section";
import { SeoFaqsSection } from "@/components/seo/seo-faqs-section";
import { SeoFooterContentSection } from "@/components/seo/seo-footer-content-section";
import { SeoStructuredData } from "@/components/seo/seo-structured-data";
import { resolveCanonicalUrl } from "@/lib/canonical-url";
import { getFallbackSeoContent } from "@/lib/seo-fallbacks";
import { pathnameToSeoSlug } from "@/lib/pathname-to-seo-slug";
import { normalizeSeoFromResponse } from "@/lib/seo-normalize";
import { isVerticalDetailPagePath } from "@/lib/vertical-detail-route";
import type { SeoContent } from "@/types/seo.model";

function isAddListingRoute(pathname: string) {
  return pathname === "/add" || pathname.startsWith("/add/");
}

async function fetchSeoForSlug(slug: string, pathname: string): Promise<SeoContent> {
  try {
    const res = await fetch(`/api/user/seo/${encodeURIComponent(slug)}`, { cache: "no-store" });
    if (res.ok) {
      const json = (await res.json().catch(() => null)) as unknown;
      const fromApi = normalizeSeoFromResponse(json);
      if (fromApi) return fromApi;
    }
  } catch {
    // fall through to vertical fallback
  }

  return getFallbackSeoContent(pathname, slug);
}

/**
 * CMS footer/FAQ/JSON-LD keyed off the **client** pathname so soft navigations
 * do not need a full `router.refresh()` (which doubled every page transition).
 */
export function SeoCmsRouteSections() {
  const pathname = usePathname() || "/";
  const pathSeg = pathname.split("?")[0] ?? "/";
  const slug = useMemo(() => pathnameToSeoSlug(pathSeg), [pathSeg]);
  const isDetailPage = useMemo(() => isVerticalDetailPagePath(pathSeg), [pathSeg]);
  const [seo, setSeo] = useState<SeoContent | null>(null);

  useEffect(() => {
    if (isAddListingRoute(pathSeg) || isDetailPage) {
      setSeo(null);
      return;
    }

    let cancelled = false;
    setSeo(null);

    void fetchSeoForSlug(slug, pathSeg).then((doc) => {
      if (!cancelled) setSeo(doc);
    });

    return () => {
      cancelled = true;
    };
  }, [pathSeg, slug, isDetailPage]);

  if (isAddListingRoute(pathSeg)) {
    return null;
  }

  if (isDetailPage) {
    return (
      <>
        <Footer />
        <FooterMarketingSection />
      </>
    );
  }

  const pageUrl = resolveCanonicalUrl(pathname, seo?.url);
  const hasFaqs = Boolean(seo?.faqs?.length);
  const hasJsonLd = Boolean(seo?.script?.trim() || hasFaqs);

  return (
    <>
      {seo ? (
        <SeoFooterContentSection title={seo.footer_title} description={seo.footer_description} />
      ) : null}
      <Footer />
      <FooterMarketingSection />
      {hasFaqs && seo ? <SeoFaqsSection faqs={seo.faqs} /> : null}
      {hasJsonLd && seo ? (
        <SeoStructuredData scriptJson={seo.script} faqs={seo.faqs} pageUrl={pageUrl} />
      ) : null}
    </>
  );
}
