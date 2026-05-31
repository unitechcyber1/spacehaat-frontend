import NextImage, { type ImageProps } from "next/image";

import { shouldBypassImageOptimizer } from "@/lib/remote-image";

type RemoteImageProps = ImageProps;

/** next/image wrapper — skips the optimizer for CDN/S3 URLs that often time out upstream. */
export function RemoteImage({ src, unoptimized, ...props }: RemoteImageProps) {
  const srcStr = typeof src === "string" ? src : "";
  const bypass = srcStr ? shouldBypassImageOptimizer(srcStr) : false;

  return <NextImage src={src} unoptimized={unoptimized ?? bypass} {...props} />;
}
