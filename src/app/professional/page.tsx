import type { Metadata } from 'next';
import Image from 'next/image';
import { img } from '@/lib/imageLoader';
import { ProfessionalForm } from '@/components/forms/ProfessionalForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Professional inquiry',
  description:
    'Collaborate with Jesuke — anime tattoo artist, Philippines. Guest spots, flash licensing, press, and studio partnerships. Use the professional inquiry form.',
  canonical: '/professional',
  keywords: [
    'anime tattoo artist collaboration',
    'tattoo flash licensing Philippines',
    'anime tattoo press',
    'tattoo artist collaboration Philippines',
    'anime tattoo studio partnership',
    'manga tattoo licensing',
    'guest spot anime tattoo artist',
    'Jesuke professional',
    'anime tattoo convention Philippines',
    'tattoo artist trade inquiry',
  ],
});

const breadcrumbs = [
  { name: 'Jesuke', href: '/' },
  { name: 'Professional', href: '/professional' },
];

export default function ProfessionalPage() {
  return (
    <>
      {/* Cinematic header */}
      <div className="relative overflow-hidden" style={{ height: 'clamp(420px, 65vh, 680px)' }}>
        <Image
          src={img('/work/junji/junji-9.jpg')}
          alt=""
          fill
          priority
          className="object-cover"
          style={{ objectPosition: '50% 20%' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(11,11,13,0.10) 0%, rgba(11,11,13,0.08) 40%, rgba(11,11,13,0.55) 72%, rgba(11,11,13,1) 100%)',
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 screentone opacity-10" aria-hidden="true" />

        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-6 pb-10">
          <p className="eyebrow mb-3" style={{ color: 'var(--color-ink-100)', opacity: 0.45 }}>
            Professional / trade
          </p>
          <h1
            className="font-display leading-none text-paper-50"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
          >
            Work together.
          </h1>
        </div>
      </div>

      {/* Form section — ink register */}
      <div style={{ background: 'var(--color-ink-900)' }}>
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
            {/* Left — sticky intro */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p
                className="text-sm leading-relaxed mb-8"
                style={{ color: 'var(--color-ink-100)', opacity: 0.6 }}
              >
                For collaborators, licensing enquiries, press, and other professional
                arrangements. All sessions are in Bulacan, Philippines — no travel.
                Use this form, not the commission form.
              </p>

              <ul className="space-y-4">
                {[
                  'Artist collaborations',
                  'Flash licensing',
                  'Press and editorial',
                  'Other professional arrangements',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-1 flex-shrink-0 w-1 h-1 rounded-full"
                      style={{ background: 'var(--color-seal)' }}
                      aria-hidden="true"
                    />
                    <span
                      className="text-xs leading-relaxed"
                      style={{ color: 'var(--color-ink-100)', opacity: 0.5 }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div
                className="mt-10 h-px"
                style={{ background: 'var(--color-ink-800)', maxWidth: '80px' }}
                aria-hidden="true"
              />
            </div>

            {/* Right — form */}
            <div>
              <ProfessionalForm />
            </div>
          </div>
        </div>
      </div>

      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
    </>
  );
}
