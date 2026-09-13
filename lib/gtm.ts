/** Google Tag Manager container ID (set via NEXT_PUBLIC_GTM_ID). */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim() || "";

export function isGtmEnabled(): boolean {
  return GTM_ID.length > 0;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Push a custom event or variables into the GTM dataLayer. */
export function pushDataLayer(payload: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}
