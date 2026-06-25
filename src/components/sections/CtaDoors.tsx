'use client';
import Link from 'next/link';
import Image from 'next/image';
import { img } from '@/lib/imageLoader';
import { useReveal } from '@/lib/useReveal';

export function CtaDoors() {
  const sectionRef = useReveal(0.1);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative overflow-hidden"
      aria-labelledby="cta-heading"
      style={{ minHeight: '80vh' }}
    >
      {/* Full-bleed background photo */}
      <div className="absolute inset-0">
        <Image
          src={img('/work/ragnarok-series/ragnarok-003.jpg')}
          alt=""
          fill
          className="object-cover object-center"
          aria-hidden="true"
        />
        {/* Dark ink wash over the whole section */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(11,11,13,0.82)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 screentone opacity-25 pointer-events-none" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-36">
        <h2
          id="cta-heading"
          className="font-display leading-tight mb-20 overflow-hidden"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--color-paper-50)' }}
        >
          <span className="block" data-reveal="wipe">Two ways in.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Door A — Commission */}
          <div
            className="p-10 md:p-14 flex flex-col justify-between gap-12 border"
            style={{
              background: 'rgba(11,11,13,0.6)',
              borderColor: 'rgba(185,183,176,0.12)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              minHeight: '380px',
            }}
            data-reveal="rise"
            data-delay="1"
          >
            <div>
              <p className="eyebrow mb-5" style={{ color: 'var(--color-ink-100)', opacity: 0.45 }}>
                Personal commission
              </p>
              <h3
                className="font-display mb-5"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--color-paper-50)' }}
              >
                A piece for you.
              </h3>
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--color-ink-100)', opacity: 0.65 }}>
                Anime, manga, or manhwa subjects only. Describe the mood, the placement, the feeling.
              </p>
            </div>
            <Link
              href="/booking"
              className="self-start inline-flex items-center gap-3 px-8 py-4 text-sm font-body tracking-wide transition-opacity hover:opacity-80"
              style={{ background: 'var(--color-paper-50)', color: 'var(--color-ink-900)' }}
            >
              Commission inquiry
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Door B — Professional */}
          <div
            className="p-10 md:p-14 flex flex-col justify-between gap-12 border"
            style={{
              background: 'rgba(239,236,227,0.08)',
              borderColor: 'rgba(185,183,176,0.15)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              minHeight: '380px',
            }}
            data-reveal="rise"
            data-delay="2"
          >
            <div>
              <p className="eyebrow mb-5" style={{ color: 'var(--color-ink-100)', opacity: 0.45 }}>
                Professional / trade
              </p>
              <h3
                className="font-display mb-5"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--color-paper-50)' }}
              >
                Work together.
              </h3>
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--color-ink-100)', opacity: 0.65 }}>
                Studios, collaborations, and trade arrangements.
                A different door, a different conversation.
              </p>
            </div>
            <Link
              href="/professional"
              className="self-start inline-flex items-center gap-3 px-8 py-4 text-sm font-body tracking-wide transition-opacity hover:opacity-80"
              style={{
                border: '1px solid rgba(185,183,176,0.3)',
                color: 'var(--color-paper-50)',
              }}
            >
              Professional inquiry
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
