import Link from 'next/link';
import { Nav } from './Nav';

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-ink-900/90 backdrop-blur-sm border-b hairline">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="eyebrow text-ink-100 hover:text-paper-50 transition-colors"
          aria-label="Jesuke — home"
        >
          Jesuke
        </Link>
        <Nav />
      </div>
    </header>
  );
}
