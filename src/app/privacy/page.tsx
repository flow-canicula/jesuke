import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy — Jesuke',
  robots: { index: false, follow: true },
};

const SECTIONS = [
  {
    title: 'What we collect',
    body: (
      <>
        This site collects only what you voluntarily submit through the two
        contact forms — a commission inquiry (name, contact, idea, size,
        placement, budget, availability, and optional reference links) or a
        professional inquiry (name, organisation, role, inquiry type, dates,
        and message).
      </>
    ),
  },
  {
    title: 'How it is used',
    body: (
      <>
        Submissions are transmitted directly from your browser to Formspree
        (TLS-encrypted), forwarded to the artist&apos;s inbox, and stored in the
        Formspree dashboard under{' '}
        <a
          href="https://formspree.io/legal/privacy-policy"
          className="underline hover:opacity-100 transition-opacity"
          style={{ opacity: 0.7 }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Formspree&apos;s privacy policy
        </a>
        . This site does not process, store, or log submitted data.
      </>
    ),
  },
  {
    title: 'Third parties',
    body: (
      <>
        Data is not sold or shared with third parties beyond Formspree for
        routing and delivery. No analytics cookies are set. No social embeds
        run on this site.
      </>
    ),
  },
  {
    title: 'Your rights',
    body: (
      <>
        You may request access, correction, or deletion of any data you
        have submitted by emailing{' '}
        <a
          href="mailto:security@jesuke.ink"
          className="underline hover:opacity-100 transition-opacity"
          style={{ opacity: 0.7 }}
        >
          security@jesuke.ink
        </a>
        . Published client photos are removed on request.
      </>
    ),
  },
  {
    title: 'Photo consent',
    body: (
      <>
        Photographs of client tattoos are published only with the client&apos;s
        express consent, recorded at the time of the commission consult.
      </>
    ),
  },
] as const;

export default function PrivacyPage() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: 'var(--color-ink-900)' }}
    >
      {/* Screentone */}
      <div className="absolute inset-0 screentone opacity-20 pointer-events-none" aria-hidden="true" />

      {/* Large background word */}
      <div
        className="absolute top-0 right-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display leading-none block"
          style={{
            fontSize: 'clamp(8rem, 25vw, 18rem)',
            color: 'var(--color-ink-800)',
            opacity: 0.5,
            lineHeight: 0.85,
          }}
        >
          Privacy
        </span>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Back link */}
        <Link
          href="/"
          className="eyebrow opacity-30 hover:opacity-60 transition-opacity text-xs block mb-16"
          style={{ color: 'var(--color-ink-100)' }}
        >
          ← Jesuke
        </Link>

        {/* Page title */}
        <div className="mb-20">
          <p className="eyebrow mb-4" style={{ color: 'var(--color-ink-100)', opacity: 0.35 }}>
            Legal
          </p>
          <h1
            className="font-display leading-none"
            style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', color: 'var(--color-paper-50)' }}
          >
            Privacy.
          </h1>
        </div>

        {/* Sections — horizontal ruled list */}
        <div className="space-y-0">
          {SECTIONS.map((section, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-16 py-10 border-t"
              style={{ borderColor: 'var(--color-line)' }}
            >
              <h2
                className="font-display"
                style={{ fontSize: '1.1rem', color: 'var(--color-paper-50)' }}
              >
                {section.title}
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-ink-100)', opacity: 0.6 }}
              >
                {section.body}
              </p>
            </div>
          ))}
          {/* Bottom border */}
          <div className="border-t" style={{ borderColor: 'var(--color-line)' }} />
        </div>

        {/* Footer note */}
        <p
          className="eyebrow mt-16 opacity-25"
          style={{ color: 'var(--color-ink-100)' }}
        >
          Last updated {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
