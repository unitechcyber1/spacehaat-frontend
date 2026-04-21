import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

import { APP_NAME } from "@/utils/constants";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} | Premium Workspace Discovery`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    "Discover coworking spaces, virtual offices, and office spaces across India with a premium lead-generation experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
