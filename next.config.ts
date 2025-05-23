import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ignore ESLint errors during builds
    ignoreDuringBuilds: true,
  },
  images: {
    // Disable image optimization warnings
    unoptimized: true,
  }
};

export default nextConfig;
