'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const PANELS = [
  {
    letter: 'J',
    swap: 'T',
    image: '/work/may-oct-2025/tattoo-001.jpg',
    imageWidth: 1080,
    imageHeight: 1080,
    alt: 'Anime tattoo by Jesuke — May–October 2025',
  },
  {
    letter: 'E',
    swap: 'A',
    image: '/work/may-oct-2025/tattoo-010.jpg',
    imageWidth: 1080,
    imageHeight: 1080,
    alt: 'Manga-inspired blackwork tattoo — May–October 2025',
  },
  {
    letter: 'S',
    swap: 'T',
    image: '/work/ragnarok-series/ragnarok-004.jpg',
    imageWidth: 1080,
    imageHeight: 1080,
    alt: 'Large blackwork tattoo of a deity figure — divine combatant series',
  },
  {
    letter: 'U',
    swap: 'T',
    image: '/work/ragnarok-series/ragnarok-001.jpg',
    imageWidth: 1080,
    imageHeight: 1080,
    alt: 'Blackwork tattoo of a powerful divine figure in stance',
  },
  {
    letter: 'K',
    swap: 'O',
    image: '/work/may-oct-2025/tattoo-040.jpg',
    imageWidth: 1080,
    imageHeight: 1080,
    alt: 'Fine-line anime tattoo by Jesuke — May–October 2025',
  },
  {
    letter: 'E',
    swap: 'O',
    image: '/work/may-oct-2025/tattoo-050.jpg',
    imageWidth: 1080,
    imageHeight: 1080,
    alt: 'Recent anime blackwork tattoo by Jesuke — 2025',
  },
] as const;

// Height scale per column index — center tallest, outer shortest (mirrors Menken layout)
const HEIGHT_SCALE = [0.72, 0.84, 0.96, 0.96, 0.84, 0.72] as const;

// flex-grow when a sibling is hovered: compressed
const FLEX_IDLE = 1;
const FLEX_ACTIVE = 2.2;
const FLEX_COMPRESSED = 0.7;

export function NameBanner({ basePath = '' }: { basePath?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [wordHovered, setWordHovered] = useState(false);

  // Reduced-motion check
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Entrance: fire once when section scrolls into view
  useEffect(() => {
    if (reducedMotion) { setEntered(true); return; }
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0]?.isIntersecting) { setEntered(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const BASE_HEIGHT = 520; // px — tallest column (center)

  return (
    <section
      ref={sectionRef}
      aria-label="Jesuke — tattoo artist"
      className="w-full overflow-hidden bg-ink-900 py-16"
      onMouseEnter={() => setWordHovered(true)}
      onMouseLeave={() => { setWordHovered(false); setHoveredIdx(null); }}
    >
      {/* Screen-reader label that reflects hover state */}
      <span className="sr-only">{wordHovered ? 'Tattoo' : 'Jesuke'}</span>

      <div className="flex w-full items-end justify-center gap-1 px-4 md:px-8">
        {PANELS.map((panel, i) => {
          const isHovered = hoveredIdx === i;
          const hasSiblingHovered = hoveredIdx !== null && !isHovered;

          // flex-grow: expand active, compress siblings
          const flexGrow = hoveredIdx === null
            ? FLEX_IDLE
            : isHovered
              ? FLEX_ACTIVE
              : FLEX_COMPRESSED;

          // Column height: stepped by position, taller on hover
          const baseH = BASE_HEIGHT * (HEIGHT_SCALE[i] ?? 1);
          const targetH = isHovered ? baseH * 1.08 : baseH;

          // Entrance: columns slide up from below, staggered
          const staggerMs = reducedMotion ? 0 : i * 80;
          const entranceStyle = reducedMotion
            ? {}
            : {
                opacity: entered ? 1 : 0,
                transform: entered ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: `${staggerMs}ms`,
              };

          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                flexGrow,
                flexShrink: 1,
                flexBasis: 0,
                height: targetH,
                ...entranceStyle,
                transition: reducedMotion
                  ? 'none'
                  : `flex-grow 600ms cubic-bezier(0.4,0,0.2,1),
                     height 600ms cubic-bezier(0.4,0,0.2,1),
                     opacity 700ms ease,
                     transform 700ms ease`,
              }}
              className="relative overflow-hidden cursor-default"
            >
              {/* Photo */}
              <Image
                src={`${basePath}${panel.image}`}
                alt={panel.alt}
                width={panel.imageWidth}
                height={panel.imageHeight}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  filter: hasSiblingHovered ? 'brightness(0.6)' : 'brightness(1)',
                  transition: reducedMotion ? 'none' : 'filter 500ms ease',
                  transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                  transitionProperty: 'filter, transform',
                  transitionDuration: '500ms',
                }}
              />

              {/* Gradient overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(11,11,13,0.80) 0%, rgba(11,11,13,0.25) 55%, transparent 100%)',
                }}
              />

              {/* Hairline border */}
              <div aria-hidden="true" className="absolute inset-y-0 right-0 w-px bg-white/10" />

              {/* Letter swap — JESUKE / TATTOO */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                {/* JESUKE letter */}
                <span
                  aria-hidden="true"
                  className="absolute font-display text-paper-50 leading-none"
                  style={{
                    fontSize: 'clamp(2rem, 5vw, 5rem)',
                    opacity: wordHovered ? 0 : 1,
                    transform: wordHovered ? 'translateY(-10px)' : 'translateY(0)',
                    transition: reducedMotion ? 'none' : 'opacity 400ms ease, transform 400ms ease',
                  }}
                >
                  {panel.letter}
                </span>
                {/* TATTOO letter */}
                <span
                  aria-hidden="true"
                  className="absolute font-display leading-none"
                  style={{
                    fontSize: 'clamp(2rem, 5vw, 5rem)',
                    color: 'var(--color-seal)',
                    opacity: wordHovered ? 1 : 0,
                    transform: wordHovered ? 'translateY(0)' : 'translateY(10px)',
                    transition: reducedMotion ? 'none' : 'opacity 400ms ease, transform 400ms ease',
                  }}
                >
                  {panel.swap}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
