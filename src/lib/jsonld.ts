import { SITE_NAME, SITE_URL, SOCIAL } from '@/content/site';
import type { FaqEntry } from '@/content/faq';

type JsonLdObject = Record<string, unknown>;

export function buildPersonSchema(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_NAME,
    jobTitle: 'Tattoo artist',
    knowsAbout: [
      'Custom tattoo design',
      'Blackwork tattooing',
      'Anime-inspired illustration',
      'Manga-inspired linework',
    ],
    sameAs: [SOCIAL.instagram, SOCIAL.facebook],
    url: SITE_URL,
  };
}

export function buildWebSiteSchema(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function buildServiceSchema(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Custom tattoo commission',
    provider: {
      '@type': 'Person',
      name: SITE_NAME,
    },
    serviceType: 'Custom tattooing',
    description:
      'Original anime and manga-inspired tattoo pieces designed to specification. Blackwork and fine-line styles. Commissions open via inquiry form.',
    url: `${SITE_URL}/booking`,
  };
}

export function buildFaqSchema(entries: FaqEntry[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; href: string }>
): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}
