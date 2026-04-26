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
