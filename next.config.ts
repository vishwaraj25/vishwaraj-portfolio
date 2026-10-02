import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/case-studies/expedition-33",
        destination: "/#work",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
