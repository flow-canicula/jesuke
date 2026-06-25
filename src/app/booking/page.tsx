import type { Metadata } from 'next';
import Image from 'next/image';
import { img } from '@/lib/imageLoader';
import { CommissionForm } from '@/components/forms/CommissionForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Commission inquiry',
  description:
    'Book a custom anime, manga or manhwa tattoo with Jesuke in the Philippines. Blackwork and fine-line only. Describe your idea — no finished brief needed.',
  canonical: '/booking',
  keywords: [
    'book anime tattoo Philippines',
    'anime tattoo commission',
    'custom anime tattoo Manila',
    'manga tattoo booking',
    'anime tattoo appointment Philippines',
    'custom manga tattoo',
    'anime tattoo inquiry',
    'book tattoo artist Philippines',
    'anime tattoo Bulacan',
    'custom blackwork anime tattoo',
    'manhwa tattoo commission',
    'Jesuke commission',
  ],
});

const breadcrumbs = [
  { name: 'Jesuke', href: '/' },
  { name: 'Commission', href: '/booking' },
];

export default function BookingPage() {
  return (
    <>
      {/* Cinematic header */}
      <div className="relative overflow-hidden" style={{ height: 'clamp(520px, 80vh, 820px)' }}>
        {/*
          Face sits at ~42% from the top of the source image.
          We render the image full-width, then translate it up so that
          42% of the image height aligns with 50% of the container height:
            translateY = containerHeight*0.5 - imageHeight*0.42
          Since we don't know exact px values at render time, we use a percentage
          trick: position absolute, width 100%, top 50%, then translateY(-42%)
          so the face focal point lands exactly at the container midline.
        */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Image
            src={img('/work/waifu/waifu-13.jpg')}
            alt=""
            width={760}
            height={1013}
            priority
            style={{
              width: '100%',
              height: 'auto',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -42%)',
              minWidth: '100%',
              minHeight: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(11,11,13,0.10) 0%, rgba(11,11,13,0.08) 40%, rgba(11,11,13,0.55) 72%, rgba(11,11,13,1) 100%)',
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 screentone opacity-10" aria-hidden="true" />

        {/* Header text — bottom of the cinematic strip */}
        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-6 pb-10">
          <p className="eyebrow mb-3" style={{ color: 'var(--color-ink-100)', opacity: 0.5 }}>
            Personal commission
          </p>
          <h1
            className="font-display leading-none text-paper-50"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
          >
            Commission a piece.
          </h1>
        </div>
      </div>

      {/* Form section — paper register */}
      <div style={{ background: 'var(--color-paper-50)' }}>
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          {/* Two-column: intro left, form right */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
            {/* Left — sticky intro */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p
                className="text-sm leading-relaxed mb-8"
                style={{ color: 'var(--color-paper-700)', opacity: 0.65 }}
              >
                Anime, manga, and manhwa subjects only — no other styles. Blackwork, fine-line, and restrained color accepted; no portrait style. Describe your idea: a direction, a mood, a placement. No finished brief needed.
              </p>

              {/* Rules list */}
              <ul className="space-y-4">
                {[
                  'Anime, manga, and manhwa only',
                  'Blackwork, fine-line, and restrained color — no portrait style',
                  'Custom pieces and available flash',
                  'Deposit required to secure a slot',
                  'Philippines-based — local and visiting clients welcome',
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-3">
                    <span
                      className="mt-1 flex-shrink-0 w-1 h-1 rounded-full"
                      style={{ background: 'var(--color-seal)' }}
                      aria-hidden="true"
                    />
                    <span
                      className="text-xs leading-relaxed"
                      style={{ color: 'var(--color-paper-700)', opacity: 0.55 }}
                    >
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div
                className="mt-10 h-px"
                style={{ background: 'var(--color-paper-100)', maxWidth: '80px' }}
                aria-hidden="true"
              />
            </div>

            {/* Right — form */}
            <div>
              <CommissionForm />
            </div>
          </div>
        </div>
      </div>

      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
    </>
  );
}
