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
    'The full flash catalogue — anime and manga-inspired blackwork and fine-line tattoos. Browse available pieces and custom commissions.',
  canonical: '/work',
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

        <GalleryGrid pieces={FLASH} basePath={process.env.NEXT_PUBLIC_BASE_PATH ?? ''} />
      </div>

      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
    </div>
  );
}
