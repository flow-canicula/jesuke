import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy — Jesuke',
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="section-paper min-h-screen py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-6">
        <Link
          href="/"
          className="eyebrow text-paper-700 opacity-40 hover:opacity-70 transition-opacity text-xs block mb-12"
        >
          ← Jesuke
        </Link>

        <h1 className="font-display text-paper-700 text-4xl mb-10">
          Privacy.
        </h1>

        <div className="space-y-8 text-paper-700 opacity-80 text-sm leading-relaxed">
          <section>
            <h2 className="font-display text-paper-700 opacity-100 text-xl mb-3">
              What we collect
            </h2>
            <p>
              This site collects only what you voluntarily submit through the two
              contact forms — a commission inquiry (name, contact, idea, size,
              placement, budget, availability, and optional reference links) or a
              professional inquiry (name, organisation, role, inquiry type, dates,
              and message).
            </p>
          </section>

          <section>
            <h2 className="font-display text-paper-700 opacity-100 text-xl mb-3">
              How it is used
            </h2>
            <p>
              Submissions are transmitted directly from your browser to Formspree
              (TLS-encrypted), forwarded to the artist's inbox, and stored in the
              Formspree dashboard under{' '}
              <a
                href="https://formspree.io/legal/privacy-policy"
                className="underline opacity-70 hover:opacity-100"
                target="_blank"
                rel="noopener noreferrer"
              >
                Formspree's privacy policy
              </a>
              . This site does not process, store, or log submitted data.
            </p>
          </section>

          <section>
            <h2 className="font-display text-paper-700 opacity-100 text-xl mb-3">
              Third parties
            </h2>
            <p>
              Data is not sold or shared with third parties beyond Formspree for
              routing and delivery. No analytics cookies are set. No social embeds
              run on this site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-paper-700 opacity-100 text-xl mb-3">
              Your rights
            </h2>
            <p>
              You may request access, correction, or deletion of any data you
              have submitted by emailing{' '}
              <a
                href="mailto:security@jesuke.ink"
                className="underline opacity-70 hover:opacity-100"
              >
                security@jesuke.ink
              </a>
              . Published client photos are removed on request.
            </p>
          </section>

          <section>
            <h2 className="font-display text-paper-700 opacity-100 text-xl mb-3">
              Photo consent
            </h2>
            <p>
              Photographs of client tattoos are published only with the client's
              express consent, recorded at the time of the commission consult.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
