import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const basePath = isGitHubPages ? "/vishwaraj-portfolio" : "";

const nextConfig: NextConfig = {
  ...(isGitHubPages ? { output: "export" as const } : {}),
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: {
    unoptimized: isGitHubPages,
  },
};

export default nextConfig;
