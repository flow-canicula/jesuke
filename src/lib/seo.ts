import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, OG_DEFAULTS } from '@/content/site';

type BuildMetadataOptions = {
  title?: string;
  description?: string;
  canonical: string;
  ogImage?: string;
  ogImageAlt?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  canonical,
  ogImage,
  ogImageAlt,
  keywords,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const resolvedTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
  const resolvedDescription = description ?? SITE_DESCRIPTION;
  const rawImage = ogImage ?? OG_DEFAULTS.image;
  // Always use an absolute URL so scrapers (Facebook, Twitter, Slack) never get a relative path
  const resolvedImage = rawImage.startsWith('http') ? rawImage : `${SITE_URL}${rawImage}`;
  const resolvedImageAlt = ogImageAlt ?? OG_DEFAULTS.imageAlt;
  const canonicalUrl = `${SITE_URL}${canonical}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: resolvedTitle,
    description: resolvedDescription,
    ...(keywords && { keywords }),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: 'website',
      images: [
        {
          url: resolvedImage,
          width: OG_DEFAULTS.imageWidth,
          height: OG_DEFAULTS.imageHeight,
          alt: resolvedImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
      images: [resolvedImage],
    },
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}
