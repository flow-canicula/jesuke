import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/content/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/work`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/booking`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/professional`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    // /booking/thanks and /professional/thanks are noindex — excluded from sitemap
    // /privacy is noindex — excluded from sitemap
  ];
}
