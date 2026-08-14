import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.upbit.com',
        pathname: '/logos/**'
      }
    ]
  }
};

export default nextConfig;
