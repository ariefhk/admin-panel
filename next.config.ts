import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
