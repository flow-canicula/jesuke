export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jesukeanimetattoo.skaldris.com';


export const SITE_NAME = 'Jesuke';

export const SITE_DESCRIPTION =
  'Jesuke — anime, manga & manhwa tattoo artist in Metro Manila and Bulacan, Philippines. Blackwork and fine-line only. Custom pieces and flash. Book a commission or browse the catalogue.';

export const SOCIAL = {
  instagram: 'https://www.instagram.com/jesuke_anime',
  instagramHandle: '@jesuke_anime',
  facebook: 'https://www.facebook.com/jesukeanime',
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
  image: '/og/og-image.jpg',
  imageWidth: 1200,
  imageHeight: 630,
  imageAlt: 'Jesuke — anime, manga, and manhwa tattoo artist, Philippines',
} as const;
