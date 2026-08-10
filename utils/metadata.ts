import type { Metadata } from "next";

import { resolveCanonicalUrl } from "@/lib/canonical-url";
import { resolveAppUrl } from "@/services/env-config";
import { APP_NAME } from "@/utils/constants";

export function buildMetadata(
  title: string,
  description: string,
  path = "",
): Metadata {
  const origin = resolveAppUrl();
  const pathname = path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;
  const url = resolveCanonicalUrl(pathname, null);

  return {
    title: { absolute: title },
    description,
    metadataBase: new URL(origin),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: APP_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
