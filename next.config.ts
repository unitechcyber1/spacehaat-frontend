import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.cofynd.com",
      },
      {
        protocol: "https",
        hostname: "img.spacehaat.com",
      },
    ],
  },
};

export default nextConfig;
