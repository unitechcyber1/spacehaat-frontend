import type { SpaceVertical } from "@/types";

export const BLOG_VERTICAL_LABELS: Record<SpaceVertical, string> = {
  coworking: "Coworking",
  coliving: "Coliving & PG",
  "virtual-office": "Virtual Office",
  "office-space": "Office Space",
};

export const BLOG_VERTICAL_HREF: Record<SpaceVertical, string> = {
  coworking: "/coworking",
  coliving: "/coliving",
  "virtual-office": "/virtual-office",
  "office-space": "/office-space",
};

export function formatBlogDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}
