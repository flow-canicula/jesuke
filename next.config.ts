import type { NextConfig } from 'next';

const isGithubPages = process.env.NEXT_PUBLIC_SITE_URL?.includes('github.io');
const basePath = isGithubPages ? '/jesuke' : '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  ...(isGithubPages && {
    basePath,
    assetPrefix: basePath,
  }),
};

export default nextConfig;
