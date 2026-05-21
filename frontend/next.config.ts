import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Allows opening the dev server from a phone/tablet on the same Wi‑Fi.
   * Without this, some /_next assets may be blocked as cross-origin in dev.
   */
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.1.103", "192.168.0.114"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
