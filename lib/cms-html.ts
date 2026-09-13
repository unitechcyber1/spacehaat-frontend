/**
 * Minimal hardening for trusted CMS / editor HTML before `dangerouslySetInnerHTML`.
 * Not a full HTML sanitizer — pair with a proper backend policy for untrusted input.
 */
export function looksLikeEditorHtml(s: string): boolean {
  return /<[a-z][\s\S]*?>/i.test(s.trim());
}

export function escapeHtmlText(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strip common XSS vectors; remove inline event handlers. */
export function sanitizeCmsHtml(html: string): string {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<script\b[^>]*\/>/gi, "")
    .replace(/<iframe\b[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object\b[\s\S]*?<\/object>/gi, "")
    .replace(/<embed\b[^>]*\/?>/gi, "")
    .replace(/on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");
}

function stripInlineColor(style: string): string {
  return style
    .replace(/\bcolor\s*:\s*[^;!"']+(!important)?\s*;?/gi, "")
    .replace(/;\s*;/g, ";")
    .replace(/^;|;$/g, "")
    .trim();
}

function stripStyleColorAttr(tag: string): string {
  return tag.replace(/\sstyle=(["'])([\s\S]*?)\1/gi, (_match, quote: string, style: string) => {
    const cleaned = stripInlineColor(style);
    return cleaned ? ` style=${quote}${cleaned}${quote}` : "";
  });
}

/**
 * SEO footer HTML from the CMS editor often ships with inline blue link colors,
 * embedded `<style>` blocks, or colored spans inside anchors. Normalize so our
 * `.cms-footer-prose` link styles apply consistently.
 */
export function prepareCmsFooterHtml(html: string): string {
  let out = sanitizeCmsHtml(html).replace(/<style\b[\s\S]*?<\/style>/gi, "");

  // Walk each anchor block and strip color from the anchor + nested inline tags.
  out = out.replace(/<a\b[\s\S]*?<\/a>/gi, (anchorBlock) =>
    anchorBlock.replace(/<(a|span|font)\b([^>]*)>/gi, (_m, tag: string, attrs: string) => {
      const withoutColorAttr = attrs.replace(/\scolor=(["'])[^"']*\1/gi, "");
      return `<${tag}${stripStyleColorAttr(withoutColorAttr)}>`;
    }),
  );

  return out;
}
