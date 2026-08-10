import type { SpaceVertical } from "@/types";

export type BlogContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] };

export type BlogPost = {
  slug: string;
  vertical: SpaceVertical;
  title: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readMinutes: number;
  tags: string[];
  featured?: boolean;
  body: BlogContentBlock[];
};

export type BlogVerticalFilter = SpaceVertical | "all";
