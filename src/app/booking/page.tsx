import type { Metadata } from 'next';
import { CommissionForm } from '@/components/forms/CommissionForm';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Commission inquiry',
  description:
    "Book a custom anime and manga-inspired tattoo piece with Jesuke. Describe your idea, size, and placement — we'll take it from there.",
  canonical: '/booking',
});

const breadcrumbs = [
  { name: 'Jesuke', href: '/' },
  { name: 'Commission', href: '/booking' },
];

export default function BookingPage() {
  return (
    <div className="section-paper min-h-screen py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-12">
          <p className="eyebrow text-paper-700 opacity-50 mb-4">Personal commission</p>
          <h1 className="text-[clamp(2rem,6vw,4.5rem)] font-display text-paper-700 leading-none mb-6">
            Commission a piece.
          </h1>
          <p className="text-paper-700 opacity-70 text-sm leading-relaxed max-w-xl">
            Describe your idea. You do not need a finished brief — a direction,
            a mood, a placement. We will develop the design together before
            anything is finalised.
          </p>
        </header>

        <CommissionForm />
      </div>

      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
    </div>
  );
}
