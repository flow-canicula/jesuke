import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Inquiry sent — Jesuke',
  robots: { index: false, follow: true },
};

export default function ProfessionalThanksPage() {
  return (
    <div className="section-paper min-h-screen flex items-center py-24">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="eyebrow text-paper-700 opacity-50 mb-6">Professional inquiry</p>
        <h1 className="text-[clamp(2rem,6vw,4.5rem)] font-display text-paper-700 leading-none mb-8">
          Inquiry sent.
        </h1>
        <p className="text-paper-700 opacity-70 text-base leading-relaxed mb-12 max-w-md mx-auto">
          It went through. Professional inquiries are reviewed and responded to
          directly — expect to hear back within a few days.
        </p>
        <Link
          href="/"
          className="eyebrow text-paper-700 opacity-50 hover:opacity-100 transition-opacity"
        >
          ← Back to the work
        </Link>
      </div>
    </div>
  );
}
