import type { Metadata } from "next";

import { BlogIndexPage } from "@/modules/blog/blog-index-page";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata(
  "Blog | Workspace insights by SpaceHaat",
  "Read premium guides on coworking, coliving, virtual office, and office space across India.",
  "/blog",
);

export default function BlogPage() {
  return <BlogIndexPage />;
}
