import Link from 'next/link';
import { HOME_FEATURED } from '@/content/work';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { t } from '@/lib/messages';

export function FlashIndex() {
  return (
    <section
      className="relative py-28 md:py-40"
      aria-labelledby="flash-heading"
      style={{ background: 'var(--color-ink-900)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="eyebrow mb-4" style={{ color: 'var(--color-ink-100)', opacity: 0.4 }}>
              {t.flashIndex.eyebrow}
            </p>
            <h2
              id="flash-heading"
              className="font-display leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--color-paper-50)' }}
            >
              {t.flashIndex.heading}
            </h2>
          </div>
          <Link
            href="/work"
            className="eyebrow opacity-50 hover:opacity-100 transition-opacity hidden md:block"
            style={{ color: 'var(--color-ink-100)' }}
          >
            Full catalogue →
          </Link>
        </div>

        <GalleryGrid pieces={HOME_FEATURED} basePath={process.env.NEXT_PUBLIC_BASE_PATH ?? ''} />

        <div className="mt-10 md:hidden">
          <Link
            href="/work"
            className="eyebrow opacity-50 hover:opacity-100 transition-opacity"
            style={{ color: 'var(--color-ink-100)' }}
          >
            Full catalogue →
          </Link>
        </div>
      </div>
    </section>
  );
}
