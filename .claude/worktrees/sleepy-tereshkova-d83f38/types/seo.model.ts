/**
 * Mirrors upstream Mongo `Seo` schema: `/api/user/seo/:pathSlug` (e.g. `home`,
 * `sector-42-gurugram-co-living` where path segments are joined with `-`).
 */
export type SeoFaq = {
  question: string;
  answer: string;
};

export type SeoReview = {
  name?: string;
  review?: string;
  rating?: number;
  company_name?: string;
  designation?: string;
};

/** When populated, image may be a URL or an object with `s3_link` / `url`. */
export type SeoImageRef = string | { s3_link?: string; url?: string; _id?: string } | null;

export type SeoSocialBlock = {
  title?: string;
  description?: string;
  image?: SeoImageRef;
};

export type SeoContent = {
  page_title?: string;
  title: string;
  description: string;
  robots?: string;
  keywords?: string;
  url?: string;
  footer_title?: string;
  footer_description?: string;
  /** Raw JSON-LD (or other JSON) string to inject as a script tag */
  script?: string;
  status?: boolean;
  faqs?: SeoFaq[];
  reviews?: SeoReview[];
  /** URL path this row maps to, e.g. `/sector-42/gurugram/co-living` */
  path?: string;
  twitter?: SeoSocialBlock;
  open_graph?: SeoSocialBlock;
};
