/** Hosts that already serve CDN assets — skip Next.js optimizer to avoid upstream 504 timeouts. */
const BYPASS_OPTIMIZER_HOSTS = new Set([
  "images.unsplash.com",
  "img.spacehaat.com",
  "spacehaat-bucket.s3.ap-south-1.amazonaws.com",
]);

export function shouldBypassImageOptimizer(src: string): boolean {
  const trimmed = src.trim();
  if (!trimmed) return false;

  try {
    const { hostname } = new URL(trimmed);
    if (BYPASS_OPTIMIZER_HOSTS.has(hostname)) return true;
    // Any S3 / SpaceHaat asset bucket
    if (hostname.endsWith(".amazonaws.com") || hostname.endsWith(".spacehaat.com")) return true;
    return false;
  } catch {
    return false;
  }
}
