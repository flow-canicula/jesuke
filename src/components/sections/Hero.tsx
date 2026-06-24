import Link from 'next/link';
import { Seal } from '@/components/layout/Seal';

export function Hero() {
  return (
    <section
      className="relative min-h-[90svh] flex flex-col justify-end bg-ink-900 overflow-hidden"
      aria-label="Hero"
    >
      {/* Screentone texture overlay */}
      <div className="absolute inset-0 screentone pointer-events-none" aria-hidden="true" />

      {/* TODO: replace with author-prepared hero image in public/work/ */}
      {/* Placeholder dark panel — swap for <Image> once photography is ready */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-800/60 to-ink-700/20"
        aria-hidden="true"
      />

      {/* Hanko seal — top-right corner */}
      <div className="absolute top-8 right-8">
        <Seal size={52} />
      </div>

      {/* Hero content */}
      <div className="relative max-w-6xl mx-auto px-6 pb-16 md:pb-24 w-full">
        <p className="eyebrow text-ink-100 opacity-50 mb-4 reveal-ink" style={{ animationDelay: '0ms' }}>
          Anime · Manga · Ink
        </p>

        <h1
          className="text-[clamp(3rem,10vw,6.5rem)] font-display leading-none tracking-tight text-paper-50 mb-8 reveal-ink"
          style={{ animationDelay: '80ms' }}
        >
          Lines borrowed
          <br />
          from the page,
          <br />
          set in ink.
        </h1>

        <div className="reveal-ink" style={{ animationDelay: '200ms' }}>
          <Link
            href="/booking"
            className="inline-flex items-center gap-3 bg-paper-50 text-ink-900 px-8 py-4 text-sm font-body font-medium tracking-wide hover:bg-paper-100 transition-colors focus-visible:outline-2 focus-visible:outline-ink-100"
          >
            Commission a piece
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
