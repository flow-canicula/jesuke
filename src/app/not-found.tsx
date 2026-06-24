import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 — Jesuke',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="section-ink min-h-screen flex flex-col items-center justify-center py-24 relative overflow-hidden">
      {/* Screentone */}
      <div className="absolute inset-0 screentone pointer-events-none" aria-hidden="true" />

      <div className="relative text-center px-6 max-w-lg">
        {/* Large number — decorative, not a heading */}
        <p
          className="font-display text-[clamp(6rem,20vw,12rem)] text-ink-800 leading-none select-none mb-8"
          aria-hidden="true"
        >
          404
        </p>

        <h1 className="font-display text-paper-50 text-3xl mb-6 leading-tight">
          Nothing here.
        </h1>

        <p className="text-ink-100 opacity-60 text-sm leading-relaxed mb-12 max-w-xs mx-auto">
          The page you are looking for does not exist, or has moved.
          The work is still there.
        </p>

        <Link
          href="/"
          className="eyebrow text-ink-100 opacity-60 hover:opacity-100 transition-opacity"
        >
          ← Back to the work
        </Link>
      </div>
    </div>
  );
}
