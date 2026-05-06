/** Sitemap urlset row. */
export type SitemapUrlEntry = {
  loc: string;
  lastmod?: Date;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  /** 0–1, rendered with two decimals (e.g. 0.80). */
  priority?: number;
};

/** Sitemap index row (child sitemap document). */
export type SitemapIndexEntry = {
  loc: string;
  lastmod: Date;
};

export function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Match common public sitemap generators: no fractional seconds, `+00:00` zone. */
export function formatSitemapLastmod(d: Date): string {
  const iso = d.toISOString();
  const withoutMs = iso.replace(/\.\d{3}Z$/, "Z");
  return withoutMs.replace(/Z$/, "+00:00");
}

function formatPriority(p: number): string {
  return p.toFixed(2);
}

const URLSET_OPEN_FULL = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

const URLSET_OPEN_MINIMAL = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

const URLSET_CLOSE = `</urlset>
`;

const SITEMAPINDEX_OPEN = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

const SITEMAPINDEX_CLOSE = `</sitemapindex>
`;

function renderUrlBlock(entry: SitemapUrlEntry, fallbackLastmod: Date): string {
  const lastmod = formatSitemapLastmod(entry.lastmod ?? fallbackLastmod);
  let inner = `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${lastmod}</lastmod>`;
  if (entry.changefreq !== undefined) {
    inner += `
    <changefreq>${entry.changefreq}</changefreq>`;
  }
  if (entry.priority !== undefined) {
    inner += `
    <priority>${formatPriority(entry.priority)}</priority>`;
  }
  inner += `
  </url>`;
  return inner;
}

function renderSitemapIndexBlock(entry: SitemapIndexEntry): string {
  return `  <sitemap>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${formatSitemapLastmod(entry.lastmod)}</lastmod>
  </sitemap>`;
}

export function buildUrlsetXml(
  entries: SitemapUrlEntry[],
  fallbackLastmod = new Date(),
  options?: { sortByLoc?: boolean; minimalNamespace?: boolean },
): string {
  const sortByLoc = options?.sortByLoc !== false;
  const list = sortByLoc
    ? [...entries].sort((a, b) => a.loc.localeCompare(b.loc))
    : [...entries];
  const open = options?.minimalNamespace ? URLSET_OPEN_MINIMAL : URLSET_OPEN_FULL;
  const body = list.map((e) => renderUrlBlock(e, fallbackLastmod)).join("\n");
  return `${open}${body}
${URLSET_CLOSE}`;
}

export function buildSitemapIndexXml(
  entries: SitemapIndexEntry[],
  options?: { preserveOrder?: boolean },
): string {
  const preserve = options?.preserveOrder === true;
  const list = preserve
    ? [...entries]
    : [...entries].sort((a, b) => a.loc.localeCompare(b.loc));
  const body = list.map((e) => renderSitemapIndexBlock(e)).join("\n");
  return `${SITEMAPINDEX_OPEN}${body}
${SITEMAPINDEX_CLOSE}`;
}

/** Simple url-only lists (child sitemaps): uniform lastmod, no priority. */
export function mapLocsToEntries(urls: string[], lastmod = new Date()): SitemapUrlEntry[] {
  return dedupeSorted(urls).map((loc) => ({ loc, lastmod }));
}

function dedupeSorted(urls: string[]): string[] {
  return Array.from(new Set(urls)).sort((a, b) => a.localeCompare(b));
}
