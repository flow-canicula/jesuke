import type { NextConfig } from 'next';

// GitHub Pages needs a /jesuke basePath and a forced static export.
// Vercel runs Next.js natively — no static export, no basePath.
const isGithubPages = process.env.NEXT_PUBLIC_SITE_URL?.includes('github.io');
const basePath = isGithubPages ? '/jesuke' : '';

const nextConfig: NextConfig = {
  ...(isGithubPages && { output: 'export' }),
  trailingSlash: true,
  images: {
    // Keep unoptimized on GitHub Pages (no server); Vercel Image Optimization works natively.
    unoptimized: isGithubPages,
  },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isGithubPages && {
    basePath,
    assetPrefix: basePath,
  }),
};

export default nextConfig;
