import Link from 'next/link';
import Image from 'next/image';
import { img } from '@/lib/imageLoader';
import { Nav } from './Nav';

export function Header() {
  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{
        background: 'rgba(11,11,13,0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderColor: 'var(--color-line)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Logo + wordmark */}
        <Link
          href="/"
          className="flex items-center gap-3 group transition-opacity hover:opacity-80"
          aria-label="Jesuke — home"
        >
          <Image
            src={img('/logo.png')}
            alt=""
            width={120}
            height={40}
            className="h-8 w-auto object-contain"
            priority
            aria-hidden="true"
          />
          <span
            className="font-display tracking-tight uppercase"
            style={{ fontSize: '1.25rem', color: 'var(--color-ink-100)', lineHeight: 1 }}
          >
            Jesuke
          </span>
        </Link>

        <Nav />
      </div>
    </header>
  );
}
