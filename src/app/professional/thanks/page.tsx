import type { Metadata } from 'next';
import Link from 'next/link';
import { Seal } from '@/components/layout/Seal';

export const metadata: Metadata = {
  title: 'Inquiry sent — Jesuke',
  robots: { index: false, follow: true },
};

export default function ProfessionalThanksPage() {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center py-24 overflow-hidden"
      style={{ background: 'var(--color-ink-900)' }}
    >
      {/* Screentone */}
      <div className="absolute inset-0 screentone opacity-30 pointer-events-none" aria-hidden="true" />

      {/* Large background numeral */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-display leading-none"
          style={{ fontSize: 'clamp(12rem, 40vw, 28rem)', color: 'var(--color-ink-800)', opacity: 0.6 }}
        >
          ✓
        </span>
      </div>

      <div className="relative text-center px-6 max-w-lg">
        <div className="mb-8 flex justify-center">
          <Seal size={48} />
        </div>

        <p className="eyebrow mb-5" style={{ color: 'var(--color-ink-100)', opacity: 0.4 }}>
          Professional inquiry
        </p>

        <h1
          className="font-display leading-none mb-8"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', color: 'var(--color-paper-50)' }}
        >
          Inquiry sent.
        </h1>

        <p
          className="text-sm leading-relaxed mb-3 max-w-sm mx-auto"
          style={{ color: 'var(--color-ink-100)', opacity: 0.6 }}
        >
          Professional inquiries are reviewed and responded to directly —
          expect to hear back within a few days.
        </p>
        <p
          className="text-xs leading-relaxed mb-14 max-w-sm mx-auto"
          style={{ color: 'var(--color-ink-100)', opacity: 0.35 }}
        >
          If the inquiry is time-sensitive, note that in your message.
        </p>

        <Link
          href="/"
          className="eyebrow opacity-40 hover:opacity-80 transition-opacity"
          style={{ color: 'var(--color-ink-100)' }}
        >
          ← Back to the work
        </Link>
      </div>
    </div>
  );
}
