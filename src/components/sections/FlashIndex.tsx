import Link from 'next/link';
import { FEATURED } from '@/content/work';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';

export function FlashIndex() {
  return (
    <section
      className="section-ink py-20 md:py-28"
      aria-labelledby="flash-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="eyebrow text-ink-100 opacity-50 mb-3">
              Flash — selected
            </p>
            <h2
              id="flash-heading"
              className="text-[clamp(1.5rem,4vw,3rem)] font-display text-paper-50 leading-tight"
            >
              Available work
            </h2>
          </div>
          <Link
            href="/work"
            className="eyebrow text-ink-100 opacity-60 hover:opacity-100 transition-opacity hidden md:block"
          >
            Full catalogue →
          </Link>
        </div>

        <GalleryGrid pieces={FEATURED} />

        <div className="mt-8 md:hidden">
          <Link
            href="/work"
            className="eyebrow text-ink-100 opacity-60 hover:opacity-100 transition-opacity"
          >
            Full catalogue →
          </Link>
        </div>
      </div>
    </section>
  );
}
