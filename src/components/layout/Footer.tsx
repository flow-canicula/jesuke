import Link from 'next/link';
import { SOCIAL } from '@/content/site';
import { Seal } from './Seal';

export function Footer() {
  return (
    <footer
      className="border-t"
      style={{ background: 'var(--color-ink-900)', borderColor: 'var(--color-line)' }}
    >
      {/* Top strip — large display text */}
      <div
        className="border-b px-6 py-10 overflow-hidden"
        style={{ borderColor: 'var(--color-line)' }}
      >
        <p
          className="font-display leading-none select-none"
          style={{
            fontSize: 'clamp(3rem, 12vw, 8rem)',
            color: 'var(--color-ink-800)',
            letterSpacing: '-0.02em',
          }}
          aria-hidden="true"
        >
          Jesuke.
        </p>
      </div>

      {/* Bottom row */}
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Signature */}
        <div className="flex items-center gap-4">
          <Seal size={36} />
          <p className="text-sm" style={{ color: 'var(--color-ink-100)', opacity: 0.5 }}>
            Signed, Jesuke.
          </p>
        </div>

        {/* Social */}
        <nav aria-label="Social links">
          <ul className="flex gap-8" role="list">
            <li>
              <a
                href={SOCIAL.instagram}
                className="eyebrow opacity-50 hover:opacity-100 transition-opacity"
                style={{ color: 'var(--color-ink-100)' }}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Jesuke on Instagram"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={SOCIAL.facebook}
                className="eyebrow opacity-50 hover:opacity-100 transition-opacity"
                style={{ color: 'var(--color-ink-100)' }}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Jesuke on Facebook"
              >
                Facebook
              </a>
            </li>
          </ul>
        </nav>

        {/* Legal */}
        <div className="flex items-center gap-6">
          <Link
            href="/privacy"
            className="eyebrow transition-opacity"
            style={{ color: 'var(--color-ink-100)', opacity: 0.3, fontSize: '0.65rem' }}
          >
            Privacy
          </Link>
          <p className="eyebrow" style={{ color: 'var(--color-ink-100)', opacity: 0.2, fontSize: '0.65rem' }}>
            © {new Date().getFullYear()} Jesuke
          </p>
        </div>
      </div>
    </footer>
  );
}
