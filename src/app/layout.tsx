import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPersonSchema, buildWebSiteSchema } from '@/lib/jsonld';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, OG_DEFAULTS } from '@/content/site';
import './globals.css';

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const fontFaceCSS = `
@font-face {
  font-family: 'Anton';
  src: url('${base}/fonts/Anton-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Inter';
  src: url('${base}/fonts/Inter-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'JetBrains Mono';
  src: url('${base}/fonts/JetBrainsMono-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: [
      { url: `${base}/favicon.ico`, sizes: '16x16 32x32 48x64', type: 'image/x-icon' },
    ],
  },
  openGraph: {
    siteName: SITE_NAME,
    type: 'website',
    images: [
      {
        url: OG_DEFAULTS.image,
        width: OG_DEFAULTS.imageWidth,
        height: OG_DEFAULTS.imageHeight,
        alt: OG_DEFAULTS.imageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

// CSP is enforced via .htaccess HTTP headers in production (see public/.htaccess).
// A meta-tag CSP is intentionally omitted — it cannot set frame-ancestors,
// and it blocks React's eval() usage in dev mode.

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* eslint-disable-next-line react/no-danger */}
        <style dangerouslySetInnerHTML={{ __html: fontFaceCSS }} />
      </head>
      <body className="min-h-full flex flex-col bg-ink-900 text-ink-100">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-ink-800 focus:text-paper-50 focus:rounded"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd schema={[buildPersonSchema(), buildWebSiteSchema()]} />
      </body>
    </html>
  );
}
