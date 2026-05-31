import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.spacehaat.com",
      },
      {
        protocol: "https",
        hostname: "spacehaat-bucket.s3.ap-south-1.amazonaws.com",
      }
    ],
  },
};

export default nextConfig;
