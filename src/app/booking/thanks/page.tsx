import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Inquiry sent — Jesuke',
  robots: { index: false, follow: true },
};

export default function BookingThanksPage() {
  return (
    <div className="section-paper min-h-screen flex items-center py-24">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="eyebrow text-paper-700 opacity-50 mb-6">Commission inquiry</p>
        <h1 className="text-[clamp(2rem,6vw,4.5rem)] font-display text-paper-700 leading-none mb-8">
          Inquiry sent.
        </h1>
        <p className="text-paper-700 opacity-70 text-base leading-relaxed mb-12 max-w-md mx-auto">
          It went through. You will hear back within a week if the project is
          a fit — check your inbox, including the spam folder.
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
