import type { Metadata } from 'next';
import { ProfessionalForm } from '@/components/forms/ProfessionalForm';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Professional inquiry',
  description:
    'Studio guest spots, conventions, collaborations, flash licensing, press. Reach Jesuke through the professional inquiry form.',
  canonical: '/professional',
});

const breadcrumbs = [
  { name: 'Jesuke', href: '/' },
  { name: 'Professional', href: '/professional' },
];

export default function ProfessionalPage() {
  return (
    <div className="section-paper min-h-screen py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-12">
          <p className="eyebrow text-paper-700 opacity-50 mb-4">Professional / trade</p>
          <h1 className="text-[clamp(2rem,6vw,4.5rem)] font-display text-paper-700 leading-none mb-6">
            Work together.
          </h1>
          <p className="text-paper-700 opacity-70 text-sm leading-relaxed max-w-xl">
            For studios, convention organisers, collaborators, licensing enquiries,
            and press. Use this form — not the commission form.
          </p>
        </header>

        <ProfessionalForm />
      </div>

      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
    </div>
  );
}
