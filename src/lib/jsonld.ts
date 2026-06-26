import { SITE_NAME, SITE_URL, SOCIAL } from '@/content/site';
import type { FaqEntry } from '@/content/faq';

type JsonLdObject = Record<string, unknown>;

export function buildPersonSchema(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_NAME,
    jobTitle: 'Anime, manga, and manhwa tattoo artist',
    knowsAbout: [
      'Anime tattoo design',
      'Manga tattoo design',
      'Manhwa tattoo design',
      'Korean anime tattooing',
      'Blackwork tattooing',
      'Fine-line tattooing',
      'Anime-inspired illustration',
      'Manga-inspired linework',
    ],
    description: 'Tattoo artist based in Metro Manila and Bulacan, Philippines, who exclusively creates anime, manga, and manhwa tattoos. Original blackwork and fine-line pieces only — no other styles accepted.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Metro Manila',
      addressRegion: 'Bulacan',
      addressCountry: 'PH',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Metro Manila' },
      { '@type': 'AdministrativeArea', name: 'National Capital Region' },
      { '@type': 'City', name: 'Bulacan' },
    ],
    sameAs: [SOCIAL.instagram, SOCIAL.facebook],
    url: SITE_URL,
  };
}

export function buildLocalBusinessSchema(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: 'Jesuke Anime Tattoo',
    description: 'Anime, manga, and manhwa tattoo artist based in Metro Manila and Bulacan, Philippines. Custom blackwork and fine-line pieces only.',
    url: SITE_URL,
    image: `${SITE_URL}/og/og-image.jpg`,
    priceRange: '₱₱',
    currenciesAccepted: 'PHP',
    paymentAccepted: 'Cash, GCash',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Metro Manila',
      addressRegion: 'Bulacan',
      addressCountry: 'PH',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Metro Manila' },
      { '@type': 'AdministrativeArea', name: 'National Capital Region' },
      { '@type': 'City', name: 'Bulacan' },
    ],
    sameAs: [SOCIAL.instagram, SOCIAL.facebook],
    hasMap: `https://maps.google.com/?q=Bulacan,Philippines`,
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
    serviceType: 'Anime, manga, and manhwa tattooing',
    description:
      'Anime, manga, and manhwa tattoos only — original pieces designed to specification. Blackwork and fine-line. Based in Bulacan, Philippines. No other tattoo styles accepted. Commissions open via inquiry form.',
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
