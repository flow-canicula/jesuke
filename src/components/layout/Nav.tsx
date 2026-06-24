'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { NAV_LINKS } from '@/content/site';
import { Seal } from './Seal';

export function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav aria-label="Main navigation" className="relative">
      {/* Desktop nav */}
      <ul className="hidden md:flex items-center gap-8" role="list">
        {NAV_LINKS.map((link) => {
          const active = pathname === link.href || pathname.startsWith(link.href + '/');
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={[
                  'eyebrow transition-opacity',
                  active
                    ? 'text-paper-50 opacity-100'
                    : 'text-ink-100 opacity-60 hover:opacity-100',
                ].join(' ')}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Mobile menu toggle */}
      <button
        type="button"
        className="md:hidden flex items-center justify-center w-10 h-10 text-ink-100"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span aria-hidden="true" className="text-xl leading-none">
          {menuOpen ? '✕' : '☰'}
        </span>
      </button>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="absolute right-0 top-12 z-50 w-52 bg-ink-800 border border-line rounded-sm p-6 flex flex-col gap-5"
        >
          <div className="flex justify-end mb-2">
            <Seal size={32} />
          </div>
          <ul role="list" className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={[
                      'eyebrow block transition-opacity',
                      active ? 'text-paper-50' : 'text-ink-100 opacity-70',
                    ].join(' ')}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
