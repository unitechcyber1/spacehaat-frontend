import type { Metadata } from "next";

import { resolveAppUrl } from "@/services/env-config";
import { APP_NAME } from "@/utils/constants";

export function buildMetadata(
  title: string,
  description: string,
  path = "",
): Metadata {
  const origin = resolveAppUrl();
  const url = `${origin}${path}`;

  return {
    title,
    description,
    metadataBase: new URL(origin),
    openGraph: {
      title: `${title} | ${APP_NAME}`,
      description,
      url,
      siteName: APP_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${APP_NAME}`,
      description,
    },
  };
}
