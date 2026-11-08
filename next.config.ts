import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* PDF text extraction (Custom Book Builder) runs server-side in Node */
  serverExternalPackages: ["pdfjs-dist"],
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  /* keep dev previews clean — hide the floating dev-tools indicator */
  devIndicators: false,
};

export default nextConfig;
