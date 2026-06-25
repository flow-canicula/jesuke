'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { img } from '@/lib/imageLoader';
import { Seal } from '@/components/layout/Seal';

export function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function onMouseMove(e: MouseEvent) {
      if (reducedMotion.current) return;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;  // -1 … 1
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;
        setMouse({ x: nx, y: ny });
      });
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  // Max parallax travel: ±14px on X, ±10px on Y
  const bgX = mouse.x * -14;
  const bgY = mouse.y * -10;

  return (
    <section
      className="relative min-h-[100svh] flex flex-col justify-end bg-ink-900 overflow-hidden"
      aria-label="Hero"
    >
      {/* Full-bleed background photo with cursor parallax */}
      <div
        className="absolute inset-[-3%]"
        style={{
          transform: `translate(${bgX}px, ${bgY}px)`,
          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
        }}
      >
        <Image
          src={img('/work/may-oct-2025/tattoo-015.jpg')}
          alt=""
          fill
          priority
          className="object-cover object-center"
          aria-hidden="true"
        />
      </div>

      {/* Overlays — outside the parallax div so they stay flush to the section */}
      {/* Heavy ink gradient — bottom up */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(11,11,13,1) 0%, rgba(11,11,13,0.75) 40%, rgba(11,11,13,0.35) 75%, rgba(11,11,13,0.10) 100%)',
        }}
        aria-hidden="true"
      />
      {/* Side vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(11,11,13,0.55) 0%, transparent 40%, transparent 60%, rgba(11,11,13,0.55) 100%)',
        }}
        aria-hidden="true"
      />
      {/* Screentone */}
      <div className="absolute inset-0 screentone opacity-30 pointer-events-none" aria-hidden="true" />

      {/* Hanko seal */}
      <div className="absolute top-8 right-8 z-10">
        <Seal size={60} />
      </div>

      {/* Country tag */}
      <div className="absolute top-8 left-6 z-10">
        <p className="eyebrow text-ink-100 opacity-40">🇵🇭 Bulacan, Philippines</p>
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20 md:pb-36 w-full">
        <p className="eyebrow text-ink-100 opacity-50 mb-6 reveal-ink" style={{ animationDelay: '0ms' }}>
          Anime · Manga · Manhwa
        </p>

        <h1
          className="font-display leading-none tracking-tight text-paper-50 mb-10"
          style={{ fontSize: 'clamp(3.5rem, 12vw, 8rem)' }}
        >
          <span className="block overflow-hidden">
            <span className="block reveal-ink" style={{ animationDelay: '80ms' }}>Lines borrowed</span>
          </span>
          <span className="block overflow-hidden">
            <span className="block reveal-ink" style={{ animationDelay: '160ms', color: 'var(--color-ink-100)', opacity: 0.65 }}>from the page,</span>
          </span>
          <span className="block overflow-hidden">
            <span className="block reveal-ink" style={{ animationDelay: '240ms' }}>set in ink.</span>
          </span>
        </h1>

        <p
          className="text-ink-100 opacity-55 text-sm leading-relaxed max-w-sm mb-12 reveal-ink"
          style={{ animationDelay: '340ms' }}
        >
          Anime, manga, and manhwa tattoos only.
          Original blackwork and fine-line — no other styles accepted.
        </p>

        <div className="flex flex-wrap items-center gap-6 reveal-ink" style={{ animationDelay: '420ms' }}>
          <Link
            href="/booking"
            className="inline-flex items-center gap-3 bg-paper-50 text-ink-900 px-8 py-4 text-sm font-body font-medium tracking-wide hover:bg-paper-100 transition-colors"
          >
            Commission a piece
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/work"
            className="eyebrow text-ink-100 opacity-55 hover:opacity-90 transition-opacity"
          >
            See all work →
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2" aria-hidden="true">
        <div
          className="w-px bg-ink-100 opacity-20 reveal-ink"
          style={{ height: '48px', animationDelay: '600ms' }}
        />
      </div>

    </section>
  );
}
