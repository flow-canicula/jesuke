import Link from 'next/link';
import { SOCIAL } from '@/content/site';
import { Seal } from './Seal';

export function Footer() {
  return (
    <footer className="border-t hairline bg-ink-900">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Signature block */}
        <div className="flex items-center gap-4">
          <Seal size={40} />
          <p className="text-ink-100 text-sm">Signed, Jesuke.</p>
        </div>

        {/* Social links */}
        <nav aria-label="Social links">
          <ul className="flex gap-6" role="list">
            <li>
              <a
                href={SOCIAL.instagram}
                className="eyebrow text-ink-100 opacity-60 hover:opacity-100 transition-opacity"
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
                className="eyebrow text-ink-100 opacity-60 hover:opacity-100 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Jesuke on Facebook"
              >
                Facebook
              </a>
            </li>
          </ul>
        </nav>

        {/* Legal / privacy */}
        <div className="flex gap-6 items-center">
          <Link
            href="/privacy"
            className="eyebrow text-ink-100 opacity-40 hover:opacity-60 transition-opacity text-xs"
          >
            Privacy
          </Link>
          <p className="eyebrow text-ink-100 opacity-30 text-xs">
            © {new Date().getFullYear()} Jesuke
          </p>
        </div>
      </div>
    </footer>
  );
}
