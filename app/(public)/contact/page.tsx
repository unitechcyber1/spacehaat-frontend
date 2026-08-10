import type { Metadata } from "next";

import { ContactPage } from "@/modules/contact/contact-page";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata(
  "Contact Us | SpaceHaat",
  "Get in touch with SpaceHaat for coworking, coliving, virtual office, and office space guidance across India.",
  "/contact",
);

export default function ContactRoutePage() {
  return <ContactPage />;
}
