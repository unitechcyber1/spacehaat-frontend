"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * After client-side navigation, the first RSC payload can miss correct middleware
 * `x-pathname` / `x-seo-slug` headers, so server-rendered SEO and metadata can
 * show the *previous* route. A one-time `router.refresh()` re-fetches the server
 * tree for the *current* URL with headers aligned to that navigation.
 */
export function RscSyncOnPathnameChange() {
  const pathname = usePathname();
  const router = useRouter();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    router.refresh();
  }, [pathname, router]);

  return null;
}
