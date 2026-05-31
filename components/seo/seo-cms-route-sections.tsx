"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Footer } from "@/components/layout/footer";
import { FooterMarketingSection } from "@/components/layout/footer-marketing-section";
import { SeoFaqsSection } from "@/components/seo/seo-faqs-section";
import { SeoFooterContentSection } from "@/components/seo/seo-footer-content-section";
import { SeoStructuredData } from "@/components/seo/seo-structured-data";
import { resolveCanonicalUrl } from "@/lib/canonical-url";
import { pathnameToSeoSlug } from "@/lib/pathname-to-seo-slug";
import { normalizeSeoFromResponse } from "@/lib/seo-normalize";
import { getFallbackSeoContent } from "@/lib/seo-fallbacks";
import type { SeoContent } from "@/types/seo.model";

const seoBySlugMemory = new Map<string, SeoContent>();

function isAddListingRoute(pathname: string) {
  return pathname === "/add" || pathname.startsWith("/add/");
}

async function fetchSeoForSlug(slug: string, pathname: string): Promise<SeoContent> {
  const cached = seoBySlugMemory.get(slug);
  if (cached) return cached;

  try {
    const res = await fetch(`/api/user/seo/${encodeURIComponent(slug)}`);
    if (res.ok) {
      const json = (await res.json().catch(() => null)) as unknown;
      const fromApi = normalizeSeoFromResponse(json);
      if (fromApi) {
        seoBySlugMemory.set(slug, fromApi);
        return fromApi;
      }
    }
  } catch {
    // fall through to vertical fallback
  }

  const fallback = getFallbackSeoContent(pathname, slug);
  seoBySlugMemory.set(slug, fallback);
  return fallback;
}

/**
 * CMS footer/FAQ/JSON-LD keyed off the **client** pathname so soft navigations
 * do not need a full `router.refresh()` (which doubled every page transition).
 */
export function SeoCmsRouteSections() {
  const pathname = usePathname() || "/";
  const pathSeg = pathname.split("?")[0] ?? "/";
  const slug = useMemo(() => pathnameToSeoSlug(pathSeg), [pathSeg]);
  const [seo, setSeo] = useState<SeoContent | null>(() => seoBySlugMemory.get(slug) ?? null);

  useEffect(() => {
    if (isAddListingRoute(pathSeg)) {
      setSeo(null);
      return;
    }

    let cancelled = false;
    const cached = seoBySlugMemory.get(slug);
    if (cached) {
      setSeo(cached);
      return;
    }

    setSeo(null);
    void fetchSeoForSlug(slug, pathSeg).then((doc) => {
      if (!cancelled) setSeo(doc);
    });

    return () => {
      cancelled = true;
    };
  }, [pathSeg, slug]);

  if (isAddListingRoute(pathSeg)) {
    return null;
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
