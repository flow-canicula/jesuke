import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPersonSchema, buildWebSiteSchema } from '@/lib/jsonld';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, OG_DEFAULTS } from '@/content/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
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

const CSP = [
  "default-src 'none'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "connect-src 'self' https://formspree.io",
  "img-src 'self' data:",
  "base-uri 'self'",
  "form-action https://formspree.io",
  "frame-src 'none'",
].join('; ');

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta httpEquiv="Content-Security-Policy" content={CSP} />
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
