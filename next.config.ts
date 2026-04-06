import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // If deploying to https://<user>.github.io/<repo>/ (not a custom domain),
  // uncomment and set basePath:
  basePath: "/portfolio",
};

export default nextConfig;
