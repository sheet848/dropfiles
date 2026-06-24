import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "filegarden.com",
      },
    ],
  },
};

export default nextConfig;
