// TODO: update SITE_URL when real domain is confirmed
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.jesuke.ink';

export const SITE_NAME = 'Jesuke';

export const SITE_DESCRIPTION =
  'Anime and manga-inspired custom tattoo work. Bold contour lines, dramatic motion — set in ink.';

export const SOCIAL = {
  instagram: 'https://www.instagram.com/jesuke_anime',
  instagramHandle: '@jesuke_anime',
  facebook: 'https://www.facebook.com/jesuke',
} as const;

export const CONTACT = {
  // TODO: replace with real contact/security email
  security: 'security@jesuke.ink',
} as const;

export const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Commission', href: '/booking' },
  { label: 'Professional', href: '/professional' },
] as const;

export const OG_DEFAULTS = {
  // TODO: replace with a real 1200×630 PNG/JPEG for production OG image
  image: '/og/default.svg',
  imageWidth: 1200,
  imageHeight: 630,
  imageAlt: 'Jesuke — anime and manga-inspired tattoo work',
} as const;
