import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
    //  ? {exclude : ['error']} : false
  },
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
