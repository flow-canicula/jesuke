'use client';
import { useRef } from 'react';
import { t } from '@/lib/messages';
import { useReveal } from '@/lib/useReveal';
import { CharReveal } from '@/components/ui/CharReveal';

export function Manifesto() {
  const sectionRef = useReveal(0.1);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-28 md:py-40 overflow-hidden"
      aria-labelledby="manifesto-heading"
      style={{ background: 'var(--color-paper-50)' }}
    >
      {/* Angled ink bleed from top */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, var(--color-ink-900) 0%, transparent 100%)',
          clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0 100%)',
        }}
        aria-hidden="true"
      />

      {/* Large decorative background numeral */}
      <div
        className="absolute -right-8 top-1/2 -translate-y-1/2 font-display leading-none select-none pointer-events-none"
        style={{
          fontSize: 'clamp(12rem, 30vw, 24rem)',
          color: 'var(--color-paper-100)',
          opacity: 0.5,
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Eyebrow: character-by-character ink bleed */}
        <p
          className="eyebrow mb-8"
          style={{ color: 'var(--color-paper-700)', opacity: 0.4 }}
        >
          <CharReveal text={t.manifesto.eyebrow} stagger={55} />
        </p>

        {/* Heading: scissors split — line 1 from left, line 2 from right */}
        <h2
          id="manifesto-heading"
          className="font-display leading-tight mb-16"
          style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', color: 'var(--color-paper-700)', maxWidth: '14ch' }}
        >
          <span className="block overflow-hidden">
            <span className="block" data-reveal="slam-left" data-delay="1">
              {t.manifesto.headline.replace(t.manifesto.headlineAccent, '')}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="block" data-reveal="slam-right" data-delay="2">
              <span style={{ color: 'var(--color-seal)' }}>{t.manifesto.headlineAccent}</span>
              {' '}in skin.
            </span>
          </span>
        </h2>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 text-sm leading-relaxed"
          style={{ color: 'var(--color-paper-700)', maxWidth: '900px' }}
        >
          <p style={{ opacity: 0.75 }} data-reveal="rise" data-delay="3">{t.manifesto.body1}</p>
          <p style={{ opacity: 0.75 }} data-reveal="rise" data-delay="4">{t.manifesto.body2}</p>
          <p className="md:col-span-2" style={{ opacity: 0.55 }} data-reveal="rise" data-delay="5">{t.manifesto.body3}</p>
        </div>

        {/* Horizontal rule */}
        <div
          className="mt-16 h-px"
          style={{ background: 'var(--color-paper-100)', maxWidth: '200px' }}
          data-reveal="line"
          data-delay="6"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
