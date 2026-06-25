'use client';
import { useReveal } from '@/lib/useReveal';

const STEPS = [
  {
    n: '01',
    title: 'Inquiry',
    body: 'Send a commission inquiry with your idea, size, and placement. No full brief needed — a direction is enough to start.',
  },
  {
    n: '02',
    title: 'Consult',
    body: 'We align on concept, style weight, and session estimate. A deposit secures your slot and covers drawing time.',
  },
  {
    n: '03',
    title: 'Stencil',
    body: 'The design is drawn to fit your anatomy. You review the stencil placement before any ink touches skin.',
  },
  {
    n: '04',
    title: 'Session',
    body: 'Single-session blackwork up to a forearm. Larger builds are split across sessions with healing time in between.',
  },
  {
    n: '05',
    title: 'Aftercare',
    body: 'A full aftercare sheet at the end of every session. Two to four weeks for the ink to settle. Touch-ups handled if needed.',
  },
] as const;

export function Process() {
  const sectionRef = useReveal(0.1);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-28 md:py-40 overflow-hidden"
      aria-labelledby="process-heading"
      style={{ background: 'var(--color-ink-900)' }}
    >
      {/* Screentone */}
      <div className="absolute inset-0 screentone opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div>
            <p className="eyebrow mb-6" style={{ color: 'var(--color-ink-100)', opacity: 0.4 }} data-reveal="rise">
              How it works
            </p>
            <h2
              id="process-heading"
              className="font-display leading-tight overflow-hidden"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--color-paper-50)', maxWidth: '16ch' }}
            >
              <span className="block" data-reveal="wipe" data-delay="1">From inquiry</span>
              <span className="block" data-reveal="wipe" data-delay="2">to healed ink.</span>
            </h2>
          </div>
          {/* Large step count — decorative */}
          <p
            className="font-display leading-none select-none"
            style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', color: 'var(--color-ink-800)', opacity: 0.8 }}
            aria-hidden="true"
            data-reveal="rise"
            data-delay="3"
          >
            05
          </p>
        </div>

        <ol role="list" className="space-y-0">
          {STEPS.map((step, i) => (
            <li
              key={step.n}
              className="grid grid-cols-[auto_1fr] md:grid-cols-[80px_1fr_2fr] items-start gap-6 md:gap-12 py-8 border-t"
              style={{ borderColor: 'var(--color-line)' }}
              data-reveal="slide-left"
              data-delay={String((i + 1) as 1 | 2 | 3 | 4 | 5) as string}
            >
              {/* Step number */}
              <p
                className="eyebrow pt-1"
                style={{ color: 'var(--color-ink-100)', opacity: 0.3 }}
              >
                {step.n}
              </p>
              {/* Title */}
              <h3
                className="font-display"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--color-paper-50)' }}
              >
                {step.title}
              </h3>
              {/* Body — hidden on mobile col-span-2 fallback */}
              <p
                className="col-start-2 md:col-start-3 text-sm leading-relaxed"
                style={{ color: 'var(--color-ink-100)', opacity: 0.65 }}
              >
                {step.body}
              </p>
            </li>
          ))}
          {/* Bottom border */}
          <li className="border-t" style={{ borderColor: 'var(--color-line)' }} aria-hidden="true" />
        </ol>
      </div>
    </section>
  );
}
