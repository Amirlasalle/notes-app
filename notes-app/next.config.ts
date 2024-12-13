// next.config.ts (or next.config.js)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    // Ensure proper chunking
    config.optimization.splitChunks = {
      chunks: "all", // Ensures chunk splitting happens for all modules
    };
    return config;
  },
};

export default nextConfig;
