"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { isGtmEnabled, pushDataLayer } from "@/lib/gtm";

/**
 * Fires a `page_view` dataLayer event on client-side route changes so GTM/GA4
 * counts Next.js soft navigations (not just full page loads).
 */
export function GtmPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isGtmEnabled() || !pathname) return;

    const query = searchParams?.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    pushDataLayer({
      event: "page_view",
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}
