import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  /* keep dev previews clean — hide the floating dev-tools indicator */
  devIndicators: false,
};

export default nextConfig;
