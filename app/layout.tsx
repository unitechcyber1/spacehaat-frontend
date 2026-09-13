import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { Suspense, type ReactNode } from "react";

import "./globals.css";

import { GtmPageView } from "@/components/analytics/gtm-page-view";
import { GTM_ID, isGtmEnabled } from "@/lib/gtm";
import { resolveAppUrl } from "@/services/env-config";
import { APP_NAME } from "@/utils/constants";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(resolveAppUrl()),
  title: {
    default: `${APP_NAME} | Premium Workspace Discovery`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    "Discover coworking spaces, virtual offices, and office spaces across India with a premium lead-generation experience.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      {isGtmEnabled() ? <GoogleTagManager gtmId={GTM_ID} /> : null}
      <body className={inter.variable}>
        {isGtmEnabled() ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        ) : null}
        <Suspense fallback={null}>
          <GtmPageView />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
