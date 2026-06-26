import type { Metadata } from 'next';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { FLASH } from '@/content/work';

export const metadata: Metadata = buildMetadata({
  title: 'Work',
  description:
    'Browse the full catalogue of anime, manga & manhwa tattoos by Jesuke — Philippines. Blackwork, fine-line, healed results, and available flash. Every piece, one artist.',
  canonical: '/work',
  keywords: [
    'anime tattoo portfolio',
    'manga tattoo gallery',
    'anime blackwork tattoo',
    'fine line anime tattoo',
    'manga blackwork Philippines',
    'anime flash tattoo',
    'manhwa tattoo art',
    'dark manga tattoo',
    'blackwork tattoo Philippines',
    'anime tattoo Metro Manila',
    'anime tattoo Bulacan',
    'manga tattoo Metro Manila',
    'anime tattoo catalogue',
    'Jesuke work',
    'healed anime tattoo',
    'anime tattoo design',
  ],
});

const breadcrumbs = [
  { name: 'Jesuke', href: '/' },
  { name: 'Work', href: '/work' },
];

export default function WorkPage() {
  return (
    <div className="section-ink min-h-screen py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-12">
          <p className="eyebrow text-ink-100 opacity-50 mb-4">Flash catalogue</p>
          <h1 className="text-[clamp(2rem,6vw,4.5rem)] font-display text-paper-50 leading-none">
            All work.
          </h1>
        </header>

        <GalleryGrid pieces={FLASH} basePath={process.env.NEXT_PUBLIC_BASE_PATH ?? ''} animate />
      </div>

      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
    </div>
  );
}
