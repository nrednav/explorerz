/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "api.ts"],
  images: {
    domains: ["explorerz.vercel.app"],
  },
};

module.exports = nextConfig;
